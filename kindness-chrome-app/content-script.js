// Add an icon to all input fields of class text
var inputFields = document.getElementsByTagName("input");
for (var i = 0; i < inputFields.length; i++) {
  var inputField = inputFields[i];
  if (inputField.getAttribute("type") == "text") {
    var elem = document.createElement("img");
    elem.setAttribute("src", "icon.png");
    inputFields[i].parentElement.appendChild(elem);
  }
}
