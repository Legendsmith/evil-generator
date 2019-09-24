function openPage(pageName, elmnt) {
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

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click(); 