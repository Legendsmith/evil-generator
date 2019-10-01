define(["gen/evil/data",'util/dom'],function(data, domUtil){
	class Title{
		//start class
		constructor(power, realm, realmNumber) {
			this.ownerhistory  = [];
			this.history = [];
			this.power = power;
			if (realm === undefined) {
				domUtil.random(data.realmData.realmtypes)
			}else{
				this.realm = realm
			}
			
			if (realmNumber === undefined) {
				this.realmNumber = domUtil.random(data.realmData.realms[realm]);
			} else {
				this.realmNumber = realmNumber;
			}
			this.rank = this.makeNewRank();
		}

		makeNewRank(desiredPower,range){
			let powertoget = desiredPower
			if (range === undefined){
				range = domUtil.randomInt(data.titlesData.variance)+1
			}
			let min = Math.max(desiredPower-range,1)
			let max = Math.min(desiredPower+range,data.titlesData.maxpower)
			var possibletitles = []
			for (var i =  max; i >= min; i--) {
				possibletitles=possibletitles.concat(data.titlesData.bypower[i])
			}
			var rank=domUtil.random(possibletitles)
			let difference = powertoget - rank.power 
			var adj= domUtil.random(data.titlesData.titleAdjPwr[difference.toString()])
			console.log({adjective:adj,rank:rank})
			return {adjective:adj,rank:rank}
		}


		//end class
	}
	return Title

})