document.addEventListener("DOMContentLoaded", function(event) {
  // Get the element with the "background" class
  var backgroundElement = document.querySelector(".background");

  // Remove the child node(s) of the "background" element
  while (backgroundElement.firstChild) {
    backgroundElement.removeChild(backgroundElement.firstChild);
  }
});