"use strict";
define(['util/dom','gen/evil/data'],function(domutils,data){
	class actor{
		constructor(name,gender,title,appearance){
			this.name = name
			this.maintitle = title
			this.gender=gender
			this.realmtype=""
			this.home={}
			this.titles=[]
			this.power=maintitle.power
			this.ownedsites=[]
			this.ambition={}
			this.weapon={}
			this.resentment={}
			this.personality={}
			this.appearance=appearance
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
		getAmbition(){
		//other title
		//build location
		//get weapon
		//reclamation
		
		}
	}
	
	class ActorFactory {
		loadddata(callback){
			let httpReq = new XMLHttpRequest();
			var self = this
			httpReq.onreadystatechange=function(self){
				if (this.readyState== 4 && this.status==200){
					callback(JSON.parse(httpReq.responseText));
					self.ready = true
					console.log("Actor Factory ready")
				}
			}
			httpReq.open("GET","data/alphabet.json",true);
			httpReq.send();
		}
		donamesRand(){
			var name = ""
			var pattern = randum(this.alphabet.patterns).split("")
			for (var i = 0; i < pattern.length; i++) {
				name+=randum(this.alphabet[pattern[i]])
			}
			return titleCase(name)
		}
		generate(_firstpower){
		var namex = this.donamesRand()
		var name = namex[0]
		var gender = namex[1].toLowerCase()
		
		}
		constructor(){
			this.titlesDatalist={};
			this.titlesDatalist.bypower=new Array(16);
			var self = this
			self.alphabet={}
			self.ready=false
			
			for (var i = self.titlesDatalist.bypower.length - 1; i >= 0; i--) {
				self.titlesDatalist.bypower[i]=[]
			}
			for (var i = data.titlesData.titletypes.all.length - 1; i >= 0; i--) {
				var currenttype = data.titlesData.titletypes.all[i]
				for (var xi = data.titlesData.titles[currenttype].length - 1; xi >= 0; xi--) {
					data.titlesData.titles[currenttype][xi].type=currenttype
					self.titlesDatalist.bypower[data.titlesData.titles[currenttype][xi].power].push(data.titlesData.titles[currenttype][xi]);
				}
			}
			this.loadddata(
				function(response){
					self.alphabet=response;
				}
			);
		}
	}
	return{
		Actor:Actor
		ActorFactory:ActorFactory
	}

})