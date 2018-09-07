btn_generate.onclick=generate;
function getId(str){
  return document.getElementById(str)
}

function randum(_array){
	return Math.floor(Math.random() * _array.length)
}

function generate(){
	var _titletype= titletypes[randum(titletypes)]
	var _title= titles[_titletype][randum(titles[_titletype])]
	var _realmtype= realmtypes[randum(realmtypes)]
	var _realm = realms[_realmtype][randum(realms[_realmtype])]
	var outtext =`You have unleashed the: ${adj[randum(adj)]}${_title} of ${_realm}\n`
	console.log(outtext)
	getId("ta_output").value = getId("ta_output").value + outtext

}

function generate2(){

}