class Data {
	constructor() {
		this.realmData = {};
		this.domainsData = {};
		this.powersData = {};
		this.weaponsData = {};
		this.titlesData = {};
		this.appearanceData={};
		this.load();
	}

	loadRealms(callback) {
		let realmshttp = new XMLHttpRequest();
		realmshttp.onreadystatechange=function(self){
			if (this.readyState== 4 && this.status==200){
				callback(JSON.parse(realmshttp.responseText));
				
			}
		}
		realmshttp.open("GET","/data/gen/evil/realms.json", false);
		realmshttp.send();
	}
	loadDomains(callback) {
		let domainshttp = new XMLHttpRequest();
		domainshttp.onreadystatechange=function(self){
			if (this.readyState== 4 && this.status==200){
				callback(JSON.parse(domainshttp.responseText));
				
			}
		}
		domainshttp.open("GET","/data/gen/evil/domains.json", false);
		domainshttp.send();
	}
	loadPowers(callback){
		let xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function(self) {
			if (this.readyState == 4 && this.status == 200) {
			callback(JSON.parse(xmlhttp.responseText));
			
			}
		};
		xmlhttp.open("GET", "/data/gen/evil/powers.json", false);
		xmlhttp.send(); 
	}
	loadWeapons(callback){
		let xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function(self) {
			if (this.readyState == 4 && this.status == 200) {
			callback(JSON.parse(xmlhttp.responseText));
			
			}
		};
		xmlhttp.open("GET", "/data/gen/evil/weapons.json", false);
		xmlhttp.send(); 
	}
	loadTitles(callback) {
		let xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function(self) {
			if (this.readyState == 4 && this.status == 200) {
			callback(JSON.parse(xmlhttp.responseText));
			
			}
		};
		xmlhttp.open("GET", "/data/gen/evil/titles.json", false);
		xmlhttp.send(); 
	}
	loadAppearances(callback) {
		let xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function(self) {
			if (this.readyState == 4 && this.status == 200) {
			callback(JSON.parse(xmlhttp.responseText));
			
			}
		};
		xmlhttp.open("GET", "/data/gen/evil/appearance.json", false);
		xmlhttp.send(); 
	}

	buildTitleList() {
		let self = this;
		this.titlesData.bypower = new Array(self.titlesData.maxpower+1);
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

	load() {
		console.log("Begin loading")
		let self = this;

		let loaders = [
			{
				alias: "realms",
				display: "Realm Data",
			},
		];

		this.loadRealms(function(response) {
			self.realmData = response;
			console.log("loaded realms")
		});

		this.loadDomains(function(response) {
			self.domainsData = response;
			console.log("loaded domains")
		});

		this.loadPowers(function(response) {
			self.powersData = response;
			console.log("loaded powers")
		});

		this.loadWeapons(function(response) {
			self.weaponsData = response;
			console.log("loaded weapons");
		});

		this.loadTitles(function(response) {
			self.titlesData = response;
			self.buildTitleList();
			console.log("loaded titles");
		});
		this.loadAppearances(function(response) {
			self.appearanceData = response;
			self.buildTitleList();
			console.log("loaded appearance");
		});
	}
}

// Load data
g_Data = new Data();