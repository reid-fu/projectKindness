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
    var newContainer = document.createElement("div");
    var toolbar = document.createElement("div");

    oldParent.insertBefore(newContainer, textArea);
    newContainer.appendChild(toolbar);
    newContainer.appendChild(textArea);

    // We have to check for modifications to these fields
    textArea.oninput = inputChanged();
    textArea.onpropertychange = textArea.oninput;
  }
}

function inputChanged() {
  console.log("new text for analysis");
}

function sendInputForFeedback() {

}
