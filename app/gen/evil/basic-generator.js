"use strict";

define(["gen/evil/data","util/dom"],function(data, domUtil) {
	function doNames() {
		let namelist = domUtil.byId("ta_nameput");
		let name ="the";
		let gender = domUtil.p("m|f");
		if (namelist.value != ""){
			let  namevalue = namelist.value.replace("	","\n");
			let  namearray = namevalue.split("\n");
			name =namearray[0].split(":")[0].trim()+",";
			gender = namearray[0].split(":")[1];
			namearray.splice(0,1);
			let text = namearray.join("\n");
			namelist.value = text;
		}
		if (gender==null){
			gender="m"
		}
		return [name,gender]
	}
	function generate() {
		console.log("generating")
		let namex = doNames()
		let name = namex[0]
		let gender = namex[1].toLowerCase()
		let _titlemaintypeR= domUtil.random(data.titlesData.titletypes.main)
		let _titlemaintype = _titlemaintypeR //title type raw
		let _titlemain = ""
		_titlemain = domUtil.random(data.titlesData.titles[_titlemaintype])
		let _realmtype= domUtil.random(data.realmData.realmtypes)
		let _realm = domUtil.random(data.realmData.realms[_realmtype])
		let genAdj=""
		let power = _titlemain.power
		if (power == 1){
			power=2;
		};
		if(domUtil.randomInt(10)<4){
			genAdj = domUtil.random(data.titlesData.titleAdj)
		}
		let outtext =`${genAdj}${_titlemain["o"] || _titlemain[gender]} of ${_realm}.`
		let antistall=0
		let realmlist = data.realmData.realms[_realmtype].slice(0)
		let titlelist = []
		while (power>1){
			let titleNextType = domUtil.random(data.titlesData.titletypes.secondary)
			let titleNext = domUtil.random(data.titlesData.titles[titleNextType])
			let i = domUtil.randomInt(realmlist.length)
			let realmNext = realmlist[i]
			realmlist.splice(i,1)
			let genAdjN=""
			if(titleNext.power <= power && realmNext!=_realm && realmlist.length >1){
					if(domUtil.randomInt(10)<3){
					genAdjN = domUtil.random(data.titlesData.titleAdj)
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
			for (let i = 0; i < titlelist.length-1; i++) {
				
				outtext+=titlelist[i]+", "
			}
			outtext+=`and ${titlelist[titlelist.length-1]}.`
		}
		let headertext = outtext
	
		//Weapon
		let vowelx = new RegExp('[aeiouAEIOU]')
		let genweapon =  `${(domUtil.randomInt(4)>2)?domUtil.random(data.weaponsData[_realmtype+("_wepAdj")])+" ":""}${domUtil.random(data.weaponsData.origin)} ${domUtil.random(data.weaponsData["generic_subtype"])} ${domUtil.random(data.weaponsData.wepType)} of ${domUtil.random(data.realmData.realms[_realmtype])}`
		outtext += `\n	${(gender=='m')?"He":"She"} ${domUtil.p("wields|holds|brandishes|uses|possesses")} ${(vowelx.test(genweapon[0]))?"an":"a"} ${genweapon}.`
		//domain
		let maindomain = domUtil.random(data.domainsData.domains)
		let domaintext = ""
		let adjectives= new Array(domUtil.randomInt(2));
		let place = data.domainsData.domain[domUtil.random(data.domainsData.domains)]
		let noun = data.domainsData.domain[domUtil.random(data.domainsData.domains)]
		let descriptor = domUtil.random(place.descriptorclass)
		let placearray = place.place.concat(data.domainsData.neutraldomains)
		let placeWord= domUtil.random(placearray)
		let nounWord= domUtil.random(noun.noun)
		// power of the location
		switch (domUtil.randomInt(6)){//0-5
			case 0:
				domaintext=`the ${placeWord} of ${nounWord}`
			break;
			case 1:
				domaintext=`the ${domUtil.random(place.adjective)} ${placeWord} of ${nounWord}`
			break;
			case 2:
				domaintext=`the ${domUtil.random(place.adjective)} ${noun.topleveladj} ${placeWord} of ${nounWord}`
			break;
			case 3:
				domaintext= `the ${domUtil.random(place.adjective)} ${noun.topleveladj} ${placeWord} of ${domUtil.random(data.domainsData.descriptors[descriptor])} ${nounWord}`
			break;
			case 4:
				domaintext= `the ${placeWord} of ${domUtil.random(data.domainsData.descriptors[descriptor])} ${nounWord}`
			break;
			case 5:
				domaintext= `the ${placeWord} of ${noun.topleveladj} ${nounWord}`
			break;
		}
	
		outtext+=`\n\tLore states that ${(gender=='m')?"his":"her"} home is ${domUtil.titleCase(domaintext)}.`
	
		//Output
		domUtil.byId("ta_output").value = domUtil.byId("ta_output").value + `You have unleashed ${name} `  + outtext + "\n"
		domUtil.byId("h3_header").innerHTML = `${domUtil.random(data.titlesData.headertxt)} ${name} ${headertext}`
		domUtil.byId("ta_output").scrollTop = domUtil.byId("ta_output").scrollHeight;
	}
	
	 function gentitle(_type,realm){
		let txt = ""
		txt  =`${data.titlesData.titles[_type][domUtil.random(data.titlesData.titles[_type])]} of ${realms[realm][domUtil.random(realms[realm])]}`
		return txt
	}
	return{
		gentitle:gentitle,
		generate:generate,
		donames:doNames
	}

});