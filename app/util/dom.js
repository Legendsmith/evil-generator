define(function(){
	function byId(str) {
		return document.getElementById(str)
	}
	function random(_array){
		var ni = Math.floor(Math.random() * _array.length)
		return _array[ni]
	}
	function randomInt(max){
		return Math.floor(Math.random() * max)
	}
	//randomly picks from all the args
	function pick(){
		return arguments[randomInt(arguments.length)]
	}
	//used in string manipulation.
	function p(string){
		var a = string.split("|")
		return a[randomInt(a.length)]
	}
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