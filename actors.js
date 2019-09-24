if (data==undefined){
	data = new Data();
}

class actor{
	constructor(name,title){
		this.name = name
		this.maintitle = title
		this.realmtype=""
		this.home={}
		this.titles=[]
		this.power=maintitle.power
		this.ownedsites=[]
		this.ambition={}
		this.weapon={}
		this.resentment={}
		this.personality={}
	}
	getEffPowerBase(){
		this.power=this.maintitle.power
		var powertotal
		for (var i = thos.titles.length - 1; i >= 0; i--) {
			powertotal += this.titles[i].power
		}
		this.power+=Math.floor(powertotal/3)
		for (var i = ownedsites.length - 1; i >= 0; i--) {
			this.power+=ownedsites[i].power
		}
		if(this.weapon){
			this.power+=this.weapon.power
		}
		return this.power
	}
	loseLastSite(newowner){
		newowner.ownedsites.push(this.ownedsites.pop())
		if (this.resentment[newowner]==undefined) {this.resentment[newowner]=1}
		this.resentment[newowner]+=1
	}
	setRandomResentmentTarget(){
		let _array = []
		for (let key in this.resentment){
			for (var i = 0; i < resentment[key]; i++) {//should provide weight since those with many resentment will get multiple entries.
				_array.push(key)
			}
		}
		return _array[randumInt(_array.length)]
	}
	gainTitle(title){
		this.titles.push(title);
		title.history.push(this)
	}
}




function explodeD(max){
	var num = Math.ceil(Math.random() * max)
	var lastgen = num
	while(lastgen>=max){
		lastgen=Math.ceil(Math.random() * max)
		num+=lastgen
	}
	return num
}

function battle(actorOne,actorTwo){//first is the attacker
	var actorOneEffPower=actorOne.getEffPowerBase()+explodeD(6)
	var actorTwoEffPower=actorTwo.getEffPowerBase()+explodeD(6)
	var winner = {}
	if(actorOneEffPower>actorTwoEffPower){
		winner=actorOne
	}else{
		winner=actorTwo
	}
	return winner

}

function actorfactory(){

}

function setAbmbition(){
	//other title
	//build location
	//get weapon
	//reclamation
	
}

function generate(_firstpower){
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