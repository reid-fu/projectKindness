$(document).ready(function() {
  console.log("Page Ready!");
  $(document).live("onchange",function() {
    console.log("Page Changed!");
    findTextAreas();
  });
});

function findTextAreas() {
  // Add an icon to all input fields of class text
  var textAreas = document.getElementsByTagName("textarea");
  for (var i = 0; i < textAreas.length; i++) {
    var textArea = textAreas[i];
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
      inputField.onpropertychange = inputField.oninput;
    }
  }
}

function inputChanged() {
  console.log("new text for analysis");
}

function sendInputForFeedback() {
  
}
