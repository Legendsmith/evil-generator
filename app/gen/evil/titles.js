define(["gen/evil/data",'util/dom'],function(data,domutils){
	class Title{
		//start class
		constructor(power,realm,realmnumber){
			this.ownerhistory =[]
			this.history=[]
			this.power = power
			if (realm===undefined){
				domUtil.random(data.realmData.realmtypes)
			}else{
				this.realm = realm
			}
			
			if (realmnumber===undefined){
				this.realmnumber=domutils.random(data.realmData.realms[realm])
			}
			else
			{
				this.realmnumber = realmnumber
			}
			this.rank = this.makenewRank()

			
		}
		makenewRank(desiredPower,range){
			let powertoget = desiredPower
			if (range === undefined){
				range = domutils.randomInt(data.titlesData.variance)+1
			}
			let min = Math.max(desiredPower-range,1)
			let max = Math.min(desiredPower+range,data.titlesData.maxpower)
			var possibletitles = []
			for (var i =  max; i >= min; i--) {
				possibletitles=possibletitles.concat(data.titlesData.bypower[i])
			}
			var rank=domutils.random(possibletitles)
			let difference = powertoget - rank.power 
			var adj= domutils.random(data.titlesData.titleAdjPwr[difference.toString()])
			console.log({adjective:adj,rank:rank})
			return {adjective:adj,rank:rank}
		}


		//end class
	}
	return Title

})