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
			realmshttp.open("GET","data/realms.json",true);
			realmshttp.send();
		}
		loaddomains(callback){
			let domainshttp = new XMLHttpRequest();
			domainshttp.onreadystatechange=function(self){
				if (this.readyState== 4 && this.status==200){
					callback(JSON.parse(domainshttp.responseText));
					
				}
			}
			domainshttp.open("GET","data/domains.json",true);
			domainshttp.send();
		}
		loadpowers(callback){
			let xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function(self) {
			  if (this.readyState == 4 && this.status == 200) {
			    callback(JSON.parse(xmlhttp.responseText));
			    
			  }
			};
			xmlhttp.open("GET", "data/powers.json", true);
			xmlhttp.send(); 
		}
		loadweapons(callback){
			let xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function(self) {
			  if (this.readyState == 4 && this.status == 200) {
			    callback(JSON.parse(xmlhttp.responseText));
			    
			  }
			};
			xmlhttp.open("GET", "data/weapons.json", true);
			xmlhttp.send(); 
		}
		loadtitles(callback){
			let xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function(self) {
			  if (this.readyState == 4 && this.status == 200) {
			    callback(JSON.parse(xmlhttp.responseText));
			    
			  }
			};
			xmlhttp.open("GET", "data/titles.json", true);
			xmlhttp.send(); 
		}
		load(){
			console.log("Begin loading")
			self = this
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