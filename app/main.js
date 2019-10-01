define(['lib/domReady','app/utils','app/basicgen','app/data'],function (doc){
	//require
	var data = require('app/data')
	var basicgen = require('app/basicgen')
	var utils = require('app/utils')
	var domReady = require('lib/domReady')
	//require
	//tabs
	function openPage(pageName, elmnt) {
		//tabs
		// Hide all elements with class="tabcontent" by default */
		var i, tabcontent, tablinks;
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
		}
	
		// Show the specific tab content
		document.getElementById(pageName).style.display = "block";
		tablinks = document.getElementsByClassName("tablink");
		for (i = 0; i < tablinks.length; i++) {
		tablinks[i].style.background = "";
		}
		elmnt.style.background="linear-gradient(to bottom, #d0451b 5%, #bc3315 100%)"
	}
	window.openPage = openPage
	
	// Get the element with id="defaultOpen" and click on it
	document.getElementById("defaultOpen").click(); 
	//////////////////
	//Global functions, used ubiquitously.

	domReady(function(){
		document.querySelector('#btn_generate').addEventListener('click', basicgen.generate)
	});


});
