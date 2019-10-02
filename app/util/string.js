define(function(){
    if (String.prototype.hasOwnProperty("__generatorFoundry")) {
        return;
    }

	String.prototype.titleCase = function() {
		var str = this.toLowerCase().split(' ');
		let final = [ ];
		for(let	word of str){
			final.push(word.charAt(0).toUpperCase()+ word.slice(1));
		}
		return final.join(' ')
	}
})