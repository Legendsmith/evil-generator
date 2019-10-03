/// This file contains the Evil Generator core code.
/// It is responsible for everything Evil Generator related.

(function() {
    class Data {
        constructor() {
            this.realmData = {};
            this.domainsData = {};
            this.powersData = {};
            this.weaponsData = {};
            this.titlesData = {};
            this.appearanceData = {};
            this.load();
        }

        loadRealms(callback) {
            let realmshttp = new XMLHttpRequest();
            realmshttp.onreadystatechange=function(self){
                if (this.readyState== 4 && this.status==200){
                    callback(JSON.parse(realmshttp.responseText));
                    
                }
            }
            realmshttp.open("GET", g_AppPrefix + "data/gen/evil/realms.json", false);
            realmshttp.send();
        }
        loadDomains(callback) {
            let domainshttp = new XMLHttpRequest();
            domainshttp.onreadystatechange=function(self){
                if (this.readyState== 4 && this.status==200){
                    callback(JSON.parse(domainshttp.responseText));
                    
                }
            }
            domainshttp.open("GET", g_AppPrefix + "data/gen/evil/domains.json", false);
            domainshttp.send();
        }
        loadPowers(callback){
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function(self) {
                if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(xmlhttp.responseText));
                
                }
            };
            xmlhttp.open("GET", g_AppPrefix + "data/gen/evil/powers.json", false);
            xmlhttp.send(); 
        }
        loadWeapons(callback){
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function(self) {
                if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(xmlhttp.responseText));
                
                }
            };
            xmlhttp.open("GET", g_AppPrefix + "data/gen/evil/weapons.json", false);
            xmlhttp.send(); 
        }
        loadTitles(callback) {
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function(self) {
                if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(xmlhttp.responseText));
                
                }
            };
            xmlhttp.open("GET", g_AppPrefix + "data/gen/evil/titles.json", false);
            xmlhttp.send(); 
        }
        loadAppearances(callback) {
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function(self) {
                if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(xmlhttp.responseText));
                
                }
            };
            xmlhttp.open("GET", g_AppPrefix + "data/gen/evil/appearance.json", false);
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
                console.log("loaded appearance");
            });
        }
    }

    // Load data
    let data = new Data();

    // Expand me to pronouns later.
    let genders = [
        "m",
        "f",
    ];

    // Generation function
    function generate(name, gender) {
        console.log("Evil is generating...");

        if (gender === 0) {
            gender = g_Random.randomFromArray(genders);
        }

        let _titlemaintypeR= g_Random.randomFromArray(data.titlesData.titletypes.main)
        let _titlemaintype = _titlemaintypeR //title type raw
        let _titlemain = ""
        _titlemain = g_Random.randomFromArray(data.titlesData.titles[_titlemaintype])
        let _realmtype= g_Random.randomFromArray(data.realmData.realmtypes)
        let _realm = g_Random.randomFromArray(data.realmData.realms[_realmtype])
        let genAdj=""
        let power = _titlemain.power
        if (power == 1){
            power=2;
        };
        if(g_Random.randomRange(10)<4){
            genAdj = g_Random.randomFromArray(data.titlesData.titleAdj)
        }
        let outtext =`${genAdj}${_titlemain["o"] || _titlemain[gender]} of ${_realm}.`
        let antistall=0
        let realmlist = data.realmData.realms[_realmtype].slice(0)
        let titlelist = []
        while (power>1){
            let titleNextType = g_Random.randomFromArray(data.titlesData.titletypes.secondary)
            let titleNext = g_Random.randomFromArray(data.titlesData.titles[titleNextType])
            let i = g_Random.randomRange(realmlist.length)
            let realmNext = realmlist[i]
            realmlist.splice(i,1)
            let genAdjN=""
            if(titleNext.power <= power && realmNext!=_realm && realmlist.length >1){
                    if(g_Random.randomRange(10)<3){
                    genAdjN = g_Random.randomFromArray(data.titlesData.titleAdj)
                    }
                    titlelist.push(`${genAdjN}${titleNext["o"] || titleNext[gender]} of ${realmNext}`)
                    power -= titleNext.power
            }else if(antistall>10 || realmlist.length <1){
                break;
            }else{
                antistall++
            }
        }
        if(titlelist[0] !=undefined && titlelist[1]==undefined){
            outtext+=` ${(gender=='m')?"He":"She"} also holds the title ${titlelist[0]}.`
        }else if(titlelist[1]!=undefined){
            outtext+=` ${(gender=='m')?"He":"She"} also holds the titles `
            for (let i = 0; i < titlelist.length-1; i++) {
                
                outtext+=titlelist[i]+", "
            }
            outtext+=`and ${titlelist[titlelist.length-1]}.`
        }
        let headertext = outtext

        // Verb
        let weaponVerbiage = [
            "wields",
            "holds",
            "brandishes",
            "uses",
            "possesses",
        ];

        //Weapon
        let vowelx = new RegExp('[aeiouAEIOU]');
        let genweapon =  `${(g_Random.randomRange(4)>2)?g_Random.randomFromArray(data.weaponsData[_realmtype+("_wepAdj")])+" ":""}${g_Random.randomFromArray(data.weaponsData.origin)} ${g_Random.randomFromArray(data.weaponsData["generic_subtype"])} ${g_Random.randomFromArray(data.weaponsData.wepType)} of ${g_Random.randomFromArray(data.realmData.realms[_realmtype])}`;
        outtext += `\n	${(gender=='m')?"He":"She"} ${g_Random.randomFromArray(weaponVerbiage)} ${(vowelx.test(genweapon[0]))?"an":"a"} ${genweapon}.`;

        //domain
        let maindomain = g_Random.randomFromArray(data.domainsData.domains)
        let domaintext = ""
        let adjectives= new Array(g_Random.randomRange(2));
        let place = data.domainsData.domain[g_Random.randomFromArray(data.domainsData.domains)]
        let noun = data.domainsData.domain[g_Random.randomFromArray(data.domainsData.domains)]
        let descriptor = g_Random.randomFromArray(place.descriptorclass)
        let placearray = place.place.concat(data.domainsData.neutraldomains)
        let placeWord= g_Random.randomFromArray(placearray)
        let nounWord= g_Random.randomFromArray(noun.noun)
        // power of the location
        switch (g_Random.randomRange(6)){//0-5
            case 0:
                domaintext=`the ${placeWord} of ${nounWord}`
            break;
            case 1:
                domaintext=`the ${g_Random.randomFromArray(place.adjective)} ${placeWord} of ${nounWord}`
            break;
            case 2:
                domaintext=`the ${g_Random.randomFromArray(place.adjective)} ${noun.topleveladj} ${placeWord} of ${nounWord}`
            break;
            case 3:
                domaintext= `the ${g_Random.randomFromArray(place.adjective)} ${noun.topleveladj} ${placeWord} of ${g_Random.randomFromArray(data.domainsData.descriptors[descriptor])} ${nounWord}`
            break;
            case 4:
                domaintext= `the ${placeWord} of ${g_Random.randomFromArray(data.domainsData.descriptors[descriptor])} ${nounWord}`
            break;
            case 5:
                domaintext= `the ${placeWord} of ${noun.topleveladj} ${nounWord}`
            break;
        }

        outtext+=`\n\tLore states that ${(gender=='m')?"his":"her"} home is ${domaintext.titleCase()}.`

        return {
            'ta_output': `You have unleashed ${name} `  + outtext + "\n",
            'h3_header': `${g_Random.randomFromArray(data.titlesData.headertxt)} ${name} ${headertext}`,
        }
    }

    function gentitle(_type,realm){
        let txt = ""
        txt  =`${data.titlesData.titles[_type][g_Random.randomFromArray(data.titlesData.titles[_type])]} of ${realms[realm][g_Random.randomFromArray(realms[realm])]}`
        return txt
    }

    // Register
    registerSubMatrix('evil-generator', {
        'basic-generate': function(data) {
            if (!data.hasOwnProperty('name')) {
                // Silently fail for now.
                return;
            }

            postMessage({
				'source': 'evil-generator',
                'action': 'basic-generate',
                'data': generate(
                    data.name,
                    data.gender || 'm'
                ),
            })


        },
    });

    return{
        gentitle: gentitle,
        generate: generate,
    }
})();