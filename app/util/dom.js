define(function(){
	function byId(str) {
		return document.getElementById(str)
	}
	function random(data){
		var ni = Math.floor(Math.random() * data.length)
		return data[ni]
	}
	function randomInt(max) {
		return Math.floor(Math.random() * max)
	}
	//randomly picks from all the args
	function pick(){
		return arguments[randomInt(arguments.length)]
	}
	// return true if in range, otherwise false
	function inRange(x, min, max) {
	    return ((x-min)*(x-max) <= 0);
	}

// -- Should be moved into another file.
	//used in string manipulation.
	function p(string){
		var a = string.split("|")
		return a[randomInt(a.length)]
	}

	return{
		byId: byId,
		pick: pick,
		p: p,
		random: random,
		randomInt: randomInt
	}

})