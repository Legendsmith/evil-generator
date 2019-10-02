define(['lib/domReady','util/dom','gen/evil/basic-generator','gen/evil/data','gen/evil/titles'], function(domReady, domUtil, evilGenBasic, evilGenData,Title) {
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
	//////////////////
	//Global functions, used ubiquitously.

	domReady(function(){
		document.querySelector('#btn_generate').addEventListener('click', evilGenBasic.generate)
	});


});
