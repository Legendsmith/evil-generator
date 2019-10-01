define(function(){
	class Data{
		constructor(){
			this.realmData={};
			this.domainsData={};
			this.powersData={};
			this.weaponsData={};
			this.titlesData={};
			this.load()
		}
		loadrealms(callback){
			let realmshttp = new XMLHttpRequest();
			realmshttp.onreadystatechange=function(self){
				if (this.readyState== 4 && this.status==200){
					callback(JSON.parse(realmshttp.responseText));
					
				}
			}
			realmshttp.open("GET","/data/gen/evil/realms.json",true);
			realmshttp.send();
		}
		loaddomains(callback){
			let domainshttp = new XMLHttpRequest();
			domainshttp.onreadystatechange=function(self){
				if (this.readyState== 4 && this.status==200){
					callback(JSON.parse(domainshttp.responseText));
					
				}
			}
			domainshttp.open("GET","/data/gen/evil/domains.json",true);
			domainshttp.send();
		}
		loadpowers(callback){
			let xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function(self) {
			  if (this.readyState == 4 && this.status == 200) {
			    callback(JSON.parse(xmlhttp.responseText));
			    
			  }
			};
			xmlhttp.open("GET", "/data/gen/evil/powers.json", true);
			xmlhttp.send(); 
		}
		loadweapons(callback){
			let xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function(self) {
			  if (this.readyState == 4 && this.status == 200) {
			    callback(JSON.parse(xmlhttp.responseText));
			    
			  }
			};
			xmlhttp.open("GET", "/data/gen/evil/weapons.json", true);
			xmlhttp.send(); 
		}
		loadtitles(callback){
			let xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function(self) {
			  if (this.readyState == 4 && this.status == 200) {
			    callback(JSON.parse(xmlhttp.responseText));
			    
			  }
			};
			xmlhttp.open("GET", "/data/gen/evil/titles.json", true);
			xmlhttp.send(); 
		}
		buildTitleList(){
			let self = this;
			this.titlesData.bypower=new Array(self.titlesData.maxpower+1);
			for (var i = self.titlesData.maxpower+1; i >= 0; i--) {
				self.titlesData.bypower[i]=[]
			}
			for (var i = self.titlesData.titletypes.all.length - 1; i >= 0; i--) {
				var currenttype = self.titlesData.titletypes.all[i]
				for (var xi = self.titlesData.titles[currenttype].length - 1; xi >= 0; xi--) {
					self.titlesData.titles[currenttype][xi].type=currenttype
					self.titlesData.bypower[self.titlesData.titles[currenttype][xi].power].push(self.titlesData.titles[currenttype][xi]);
				}
			}
		}
		load(){
			console.log("Begin loading")
			let self = this;
			this.loadrealms(function(response){
				self.realmData=response;
				console.log("loaded realms")
			});
			this.loaddomains(function(response){
				self.domainsData=response;
				console.log("loaded domains")
			})
			this.loadpowers(function(response){
				self.powersData=response;
				console.log("loaded powers")
			})
			this.loadtitles(function(response){
				self.titlesData=response;
				self.buildTitleList()
				console.log("loaded titles")
			})
			this.loadweapons(function(response){
				self.weaponsData=response;
				console.log("loaded weapons")
			})
		}
	}
	return new Data();
})