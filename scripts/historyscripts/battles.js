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