$(document).ready(function() {
  console.log("page ready.");
  findTextAreas();

  $(document).on("DOMNodeInserted", function(e) {
    if ($(e.target).is("textarea")) {
      console.log("new textarea available");
       setupTextArea(e.target);
    }
  });
});

function findTextAreas() {
  // Add an icon to all input fields of class text
  console.log("finding textareas");
  var textAreas = document.getElementsByTagName("textarea");
  for (var i = 0; i < textAreas.length; i++) {
    setupTextArea(textAreas[i]);
  }
}

function setupTextArea(textArea) {
  if (textArea.readOnly == false) {
    // var elem = document.createElement("img");
    // elem.setAttribute("src", "icon.png");
    // inputField.parentElement.appendChild(elem);
    var oldParent = textArea.parentElement;
    textArea.style.resize = "none";

    // make a new container for the textarea and bar
    var newContainer = document.createElement("div");
    $(newContainer).addClass("kindness-content");

    // make the bar
    var bar = document.createElement("div");
    $(bar).addClass("kindness-bar")

    // add content to the bar
    var toolbarText = document.createElement("p");
    $(toolbarText).text("Welcome to the Kindness Project.");

    var logo = document.createElement("img");
    logo.src = chrome.extension.getURL("kindness.png");

    // insert everything needed
    oldParent.insertBefore(newContainer, textArea);
    newContainer.appendChild(bar);
    newContainer.appendChild(textArea);
    bar.appendChild(logo);

    // We have to check for modifications to these fields
    $('textarea').bind('input propertychange', function() {
      inputChanged();
    });
  }
}

charCount = 0;
function inputChanged(textBox) {
	charCount++;
	if(charCount % 10 == 0)
		sendInputForFeedback(textBox);
}

function sendInputForFeedback(textBox) {

}
