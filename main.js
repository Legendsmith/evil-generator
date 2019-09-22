//setup


//btn setup
btn_generate.onclick=generate;
function getId(str){
  return document.getElementById(str)
}
/*
Apparently this makes Mobile Phone Battries cry.
function randum(_array){
	var nx = new Uint8ClampedArray(1)
	window.crypto.getRandomValues(nx)
	var ni = Math.floor(((nx[0])/256) * _array.length)
	return _array[ni]
}
function randumInt(max){
	var nx = new Uint8ClampedArray(1)
	window.crypto.getRandomValues(nx)
	return Math.floor(((nx[0])/255) * max)
}*/
function randum(_array){
	var ni = Math.floor(Math.random() * _array.length)
	return _array[ni]
}
function randumInt(max){
	return Math.floor(Math.random() * max)
}

function generate(){
	var namex = donames()
	var name = namex[0]
	var gender = namex[1].toLowerCase()
	var _titlemaintypeR= randum(titletypes.main)
	var _titlemaintype = _titlemaintypeR //title type raw
	var _titlemain = ""
	_titlemain = randum(titles[_titlemaintype])
	var _realmtype= randum(realmtypes)
	var _realm = randum(realms[_realmtype])
	var genAdj=""
	var power = _titlemain.power
	if (power == 1){
		power=2;
	};
	if(randumInt(10)<4){
		genAdj = randum(titleAdj)
	}
	var outtext =`${genAdj}${_titlemain["o"] || _titlemain[gender]} of ${_realm}.`
	var antistall=0
	var realmlist = realms[_realmtype].slice(0)
	var titlelist = []
	while (power>1){
		var titleNextType = randum(titletypes.secondary)
		var titleNext = randum(titles[titleNextType])
		var i = randumInt(realmlist.length)
		var realmNext = realmlist[i]
		realmlist.splice(i,1)
		var genAdjN=""
		if(titleNext.power <= power && realmNext!=_realm && realmlist.length >1){
				if(randumInt(10)<3){
				genAdjN = randum(titleAdj)
				}
				titlelist.push(`${genAdjN}${titleNext["o"] || titleNext[gender]} of ${realmNext}`)
				power -= titleNext.power
		}else if(antistall>10 || realmlist.length <1){
			break;
		}else{
			antistall++
		}
	}
	if(titlelist[0] !=undefined && titlelist[1]==undefined){
		outtext+=` ${(gender=='m')?"He":"She"} also holds the title ${titlelist[0]}.`
	}else if(titlelist[1]!=undefined){
		outtext+=` ${(gender=='m')?"He":"She"} also holds the titles `
		for (var i = 0; i < titlelist.length-1; i++) {
			
			outtext+=titlelist[i]+", "
		}
		outtext+=`and ${titlelist[titlelist.length-1]}.`
	}
	var headertext = outtext

	//Weapon
	var vowelx = new RegExp('[aeiouAEIOU]')
	var genweapon =  `${(randumInt(4)>2)?randum(meleewepdefs[_realmtype+("_wepAdj")])+" ":""}${randum(meleewepdefs.origin)} ${randum(meleewepdefs["generic_subtype"])} ${randum(meleewepdefs.wepType)} of ${randum(realms[_realmtype])}`
	outtext += `\n	${(gender=='m')?"He":"She"} ${p("wields|holds|brandishes|uses|possesses")} ${(vowelx.test(genweapon[0]))?"an":"a"} ${genweapon}.`
	//domain
	var maindomain = randum(domainsData.domains)
	var domaintext = ""
	var adjectives= new Array(randumInt(2));
	//if(maindomain.ofOnly || randumInt(2)>0)
	var place = domainsData.domain[randum(domainsData.domains)]
	var noun = domainsData.domain[randum(domainsData.domains)]
	var descriptor = randum(place.descriptorclass)
	var placeWord= randum(place.place)
	var nounWord= randum(noun.noun)
	// power of the location
	switch (randumInt(6)){//0-5
		case 0:
			domaintext=`the ${placeWord} of ${nounWord}`
		break;
		case 1:
			domaintext=`the ${randum(place.adjective)} ${placeWord} of ${nounWord}`
		break;
		case 2:
			domaintext=`the ${randum(place.adjective)} ${noun.topleveladj} ${placeWord} of ${nounWord}`
		break;
		case 3:
			domaintext= `the ${randum(place.adjective)} ${noun.topleveladj} ${placeWord} of ${randum(domainsData.descriptors[descriptor])} ${nounWord}`
		break;
		case 4:
			domaintext= `the ${placeWord} of ${randum(domainsData.descriptors[descriptor])} ${nounWord}`
		break;
		case 5:
			domaintext= `the ${placeWord} of ${noun.topleveladj} ${nounWord}`
		break;
	}

	outtext+=`\n\tLore states that ${(gender=='m')?"his":"her"} home is the ${titleCase(domaintext)}.`

	//Output
	getId("ta_output").value = getId("ta_output").value + `You have unleashed ${name} `  + outtext + "\n"
	getId("h3_header").innerHTML = `${randum(headertxt)} ${name} ${headertext}`
	getId("ta_output").scrollTop = getId("ta_output").scrollHeight;
}

function gentitle(_type,realm){
	var txt = ""
	txt  =`${titles[_type][randum(titles[_type])]} of ${realms[realm][randum(realms[realm])]}`
	return txt
}


function pick(){
	return arguments[randumInt(arguments.length)]
}
function p(string){
	var a = string.split("|")
	return a[randumInt(a.length)]
}
function titleCase(str){ // https://reactgo.com/how-to-titlecase-javascript/
   str = str.toLowerCase().split(' ');
   let final = [ ];
    for(let  word of str){
      final.push(word.charAt(0).toUpperCase()+ word.slice(1));
    }
  return final.join(' ')

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
