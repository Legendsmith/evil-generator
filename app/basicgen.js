define(["app/data","app/utils"],function(data,utils) {
	var data = require('app/data')
	var utils = require('app/utils')
	function donames(){
		var namelist = utils.getId("ta_nameput")
		var name ="the"
		var gender = utils.p("m|f");
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
	function generate(){
		var namex = donames()
		var name = namex[0]
		var gender = namex[1].toLowerCase()
		var _titlemaintypeR= utils.randum(data.titlesData.titletypes.main)
		var _titlemaintype = _titlemaintypeR //title type raw
		var _titlemain = ""
		_titlemain = utils.randum(data.titlesData.titles[_titlemaintype])
		var _realmtype= utils.randum(data.realmData.realmtypes)
		var _realm = utils.randum(data.realmData.realms[_realmtype])
		var genAdj=""
		var power = _titlemain.power
		if (power == 1){
			power=2;
		};
		if(utils.randumInt(10)<4){
			genAdj = utils.randum(data.titlesData.titleAdj)
		}
		var outtext =`${genAdj}${_titlemain["o"] || _titlemain[gender]} of ${_realm}.`
		var antistall=0
		var realmlist = data.realmData.realms[_realmtype].slice(0)
		var titlelist = []
		while (power>1){
			var titleNextType = utils.randum(data.titlesData.titletypes.secondary)
			var titleNext = utils.randum(data.titlesData.titles[titleNextType])
			var i = utils.randumInt(realmlist.length-1)
			var realmNext = realmlist[i]
			realmlist.splice(i,1)
			var genAdjN=""
			if(titleNext.power <= power && realmNext!=_realm && realmlist.length >1){
					if(utils.randumInt(10)<3){
					genAdjN = utils.randum(data.titlesData.titleAdj)
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
			outtext+=` ${(gender=='f')?"He":"She"} also holds the titles `
			for (var i = 0; i < titlelist.length-1; i++) {
				
				outtext+=titlelist[i]+", "
			}
			outtext+=`and ${titlelist[titlelist.length-1]}.`
		}
		var headertext = outtext
	
		//Weapon
		var vowelx = new RegExp('[aeiouAEIOU]')
		var genweapon =  `${(utils.randumInt(4)>2)?utils.randum(data.weaponsData[_realmtype+("_wepAdj")])+" ":""}${utils.randum(data.weaponsData.origin)} ${utils.randum(data.weaponsData["generic_subtype"])} ${utils.randum(data.weaponsData.wepType)} of ${utils.randum(data.realmData.realms[_realmtype])}`
		outtext += `\n	${(gender=='m')?"He":"She"} ${utils.p("wields|holds|brandishes|uses|possesses")} ${(vowelx.test(genweapon[0]))?"an":"a"} ${genweapon}.`
		//domain
		var maindomain = utils.randum(data.domainsData.domains)
		var domaintext = ""
		var adjectives= new Array(utils.randumInt(2));
		var place = data.domainsData.domain[utils.randum(data.domainsData.domains)]
		var noun = data.domainsData.domain[utils.randum(data.domainsData.domains)]
		var descriptor = utils.randum(place.descriptorclass)
		let placearray = place.place.concat(data.domainsData.neutraldomains)
		var placeWord= utils.randum(placearray)
		var nounWord= utils.randum(noun.noun)
		// power of the location
		switch (utils.randumInt(6)){//0-5
			case 0:
				domaintext=`the ${placeWord} of ${nounWord}`
			break;
			case 1:
				domaintext=`the ${utils.randum(place.adjective)} ${placeWord} of ${nounWord}`
			break;
			case 2:
				domaintext=`the ${utils.randum(place.adjective)} ${noun.topleveladj} ${placeWord} of ${nounWord}`
			break;
			case 3:
				domaintext= `the ${utils.randum(place.adjective)} ${noun.topleveladj} ${placeWord} of ${utils.randum(data.domainsData.descriptors[descriptor])} ${nounWord}`
			break;
			case 4:
				domaintext= `the ${placeWord} of ${utils.randum(data.domainsData.descriptors[descriptor])} ${nounWord}`
			break;
			case 5:
				domaintext= `the ${placeWord} of ${noun.topleveladj} ${nounWord}`
			break;
		}
	
		outtext+=`\n\tLore states that ${(gender=='m')?"his":"her"} home is ${utils.titleCase(domaintext)}.`
	
		//Output
		utils.getId("ta_output").value = utils.getId("ta_output").value + `You have unleashed ${name} `  + outtext + "\n"
		utils.getId("h3_header").innerHTML = `${utils.randum(data.titlesData.headertxt)} ${name} ${headertext}`
		utils.getId("ta_output").scrollTop = utils.getId("ta_output").scrollHeight;
	}
	
	 function gentitle(_type,realm){
		var txt = ""
		txt  =`${data.titlesData.titles[_type][utils.randum(data.titlesData.titles[_type])]} of ${realms[realm][utils.randum(realms[realm])]}`
		return txt
	}
	return{
		gentitle:gentitle,
		generate:generate,
		donames:donames
	}

});