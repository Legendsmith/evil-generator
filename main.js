btn_generate.onclick=generate;
function getId(str){
  return document.getElementById(str)
}

function randum(_array){
	var nx = new Uint8ClampedArray(1)
	window.crypto.getRandomValues(nx)
	var ni = Math.floor(((nx[0])/256) * _array.length)
	return _array[ni]
}

function generate(){
	console.log("Generating...")
	var namex = donames()
	var name = namex[0]
	var gender = namex[1].toLowerCase()
	var _titletypeR= randum(titletypes)
	var _titletype = _titletypeR.split(":")[0] //title type raw
	var _title = ""
	if (_titletypeR.split(":")[1]=="g") {
		_title= randum(titles[_titletype])[gender]
	}else{
		_title= randum(titles[_titletype])
	};
	
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

function donames(){
	var namelist = getId("ta_nameput")
	var name ="the"
	var gender = "m"
	if (namelist.value != ""){
		var namevalue =namelist.value.replace("	","\n")
		var namearray = namevalue.split("\n")
		name =namearray[0].split(":")[0].trim()+","
		gender = namearray[0].split(":")[1]
		namearray.splice(0,1)
		text = namearray.join("\n")
		namelist.value = text
	}
	if (gender==null){
		gender="m"
	}
	return [name,gender]
}
