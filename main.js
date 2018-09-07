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
	var namex = donames()
	var name = namex[0]
	var gender = namex[1]
	console.log(gender)
	var _titletype= randum(titletypes)
	var _title= randum(titles[_titletype])
	var _realmtype= randum(realmtypes)
	var _realm = randum(realms[_realmtype])
	var outtext =`${randum(adj)}${_title} of ${_realm}`
	getId("ta_output").value = getId("ta_output").value + `You have unleashed ${name} `  + outtext + "\n"
	getId("h3_header").innerHTML = `${randum(headertxt)} ${name} ${outtext}`
	getId("ta_output").scrollTop = getId("ta_output").scrollHeight;
}

function gentitle(_type,realm){
	var txt = ""
	txt  =`${titles[_type][randum(titles[_type])]} of ${realms[realm][randum(realms[realm])]}`
	return txt
}

function doheader(){
	getId("h3_header").style.color = getRandomColor()
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function donames(){
	var namelist = getId("ta_nameput")
	var name ="the"
	var gender = "m"
	if (namelist.value != ""){
		var namevalue =namelist.value.replace("	","\n")
		var namearray = namevalue.split("\n")
		name =namearray[0].trim()+","
		gender = namearray[0].split("|")[1]
		namearray.splice(0,1)
		text = namearray.join("\n")
		namelist.value = text
	}
	return [name,gender]
}