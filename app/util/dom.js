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

// -- Should be moved into another file.
	//Title Case function.
	function titleCase(str){ // https://reactgo.com/how-to-titlecase-javascript/
		str = str.toLowerCase().split(' ');
		let final = [ ];
		for(let	word of str){
			final.push(word.charAt(0).toUpperCase()+ word.slice(1));
		}
		return final.join(' ')
	}

	return{
		byId: byId,
		pick: pick,
		p: p,
		titleCase: titleCase,
		random: random,
		randomInt: randomInt
	}

})