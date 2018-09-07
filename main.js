btn_generate.onclick=generate;
function getId(str){
  return document.getElementById(str)
}

function randum(_array){
	var nx = new Uint8Array(1)
	window.crypto.getRandomValues(nx)
	return _array[Math.floor(nx[0]/255 * _array.length)]
}

function generate(){
	var _titletype= randum(titletypes)
	var _title= randum(titles[_titletype])
	var _realmtype= randum(realmtypes)
	var _realm = randum(realms[_realmtype])
	var outtext =`You have unleashed the: ${randum(adj)}${_title} of ${_realm}\n`
	console.log(outtext)
	getId("ta_output").value = getId("ta_output").value + outtext

}

function gentitle(_type,realm){
	var txt = ""
	txt  =`${titles[_type][randum(titles[_type])]} of ${realms[realm][randum(realms[realm])]}`
	return txt
}