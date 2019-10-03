define([
	'core/foundry',
	'lib/domReady',
	'util/dom',
	'util/string'
], function(foundry, domReady, domUtil) {
	function openPage(pageName, element) {
		// Hide all elements with class="tabcontent" by default
		let i, tabcontent, tablinks;
		tabcontent = document.getElementsByClassName("tabcontent");
		for (let i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
		}
	
		// Show the specific tab content
		domUtil.byId(pageName).style.display = "block";
		tablinks = document.getElementsByClassName("tablink");
		for (let i = 0; i < tablinks.length; i++) {
			tablinks[i].style.background = "";
		}
		element.style.background="linear-gradient(to bottom, #d0451b 5%, #bc3315 100%)"
	}
	window.openPage = openPage
	
	// Get the element with id="defaultOpen" and click on it
	domUtil.byId("defaultOpen").click(); 

// ------------------------------------------
// Generator load
	window.GeneratorFoundry.load(
		window.prefix + 'genfoundry/modules/evil/generator.js', 'evil'
	);

	// This should fail with nothing more than a console log.
	window.GeneratorFoundry.load(
		window.prefix + 'genfoundry/modules/cult/generator.js', 'cult'
	);

// ------------------------------------------
// This can be moved elsewhere later.
	// Register the submatrix for evil.
	window.GeneratorFoundry.registerSubMatrix('evil-generator', {
		// Response from basic-generate
		'basic-generate': function(data) {
			domUtil.byId("ta_output").value = domUtil.byId("ta_output").value + data.data.ta_output;
			domUtil.byId("h3_header").innerHTML = data.data.h3_header;
			domUtil.byId("ta_output").scrollTop = domUtil.byId("ta_output").scrollHeight;
		}
	});

	// Register a feedback handler to do the DOM updates.
	// This can be moved elsewhere later.
	let generateButtonFunction = function() {
		// Pull a line.
		function getLine() {
			let namelist = domUtil.byId("ta_nameput");
			let name = "the";

			// Fallback to zero here
			let gender = 0;
			if (namelist.value != ""){
				let  namevalue = namelist.value.replace("	","\n");
				let  namearray = namevalue.split("\n");
				name = namearray[0].split(":")[0].trim()+",";
				gender = namearray[0].split(":")[1];
				namearray.splice(0,1);
				let text = namearray.join("\n");
				namelist.value = text;
			}
			if (gender==null){
				gender="m"
			}
			return [name,gender]
		}

		let line = getLine();

		window.GeneratorFoundry.worker.postMessage(
			{
				'source': 'evil-generator',
				'action': 'basic-generate',
				'name': line[0],
				'gender': line[1],
			}
		);
	}

	let generateButtonFunctionCallback = function(data) {

	}

	domReady(function(){
		document.querySelector('#btn_generate').addEventListener(
			'click', generateButtonFunction);
		document.querySelector('#btn_reseed').addEventListener(
			'click', function() {
				let seed0 = domUtil.byId("reseed0").value;
				let seed1 = domUtil.byId("reseed1").value;
				window.GeneratorFoundry.worker.postMessage(
					{'source': 'foundry', 'action': 'reseed', 'seed0': seed0, 'seed1': seed1}
				);
			}
		);
	});
// ------------------------------------------
});
