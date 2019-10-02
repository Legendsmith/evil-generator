"use strict";

define(["gen/evil/data",'util/dom'],function(data,domUtil){
	class Title{
		//start class
		constructor(power,realm,subRealmIndex){
			this.ownerhistory =[]
			this.history=[]
			this.power = power
			console.log(power)
			if (realm===undefined){
				realm= domUtil.random(data.realmData.realmtypes)
			}else{
				this.realm = realm
			}
			
			if (subRealmIndex===undefined){
				this.subRealmIndex=domUtil.random(data.realmData.realms[realm])
			}
			else
			{
				this.subRealmIndex = subRealmIndex
			}
			this.rank = this.makenewRank(power,3)
			this.test(this.rank)

			
		}
		makenewRank(desiredPower){
			let powertoget = Math.min(desiredPower, data.titlesData.maxpower)
			let min = Math.max(desiredPower+data.titlesData.variancelow,1)
			let max = Math.min(desiredPower+data.titlesData.variancehigh,data.titlesData.maxpower)
			console.log(min,max)
			var possibletitles = []
			for (var i = min; i < max; i++) {
				possibletitles=possibletitles.concat(data.titlesData.bypower[i])
			}
			var rank=domUtil.random(possibletitles)
			console.log(possibletitles)
			let difference = powertoget - rank.power 
			console.log(difference)
			var adj= domUtil.random(data.titlesData.titleAdjPwr[difference.toString()])
			return {adjective:adj,name:rank}
		}
		test(rank){
			//prints rank to console
			if(rank.name.o !=undefined){
				console.log(rank.adjective.name+rank.name.o)
			}else{
				console.log(rank.adjective.name+rank.name.m)
			}
		}


		//end class
	}
	return Title

})