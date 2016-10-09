$(document).ready(function() {
  console.log("Page reported as ready.");
  window.startTime = Date.now();
  findTextAreas();
});

$(document).on("DOMNodeInserted", function(e) {
  if ($(e.target).is("textarea") && !$(e.target).is(".kindness-textarea")) {
    console.log("New textarea available!");
     setupTextArea(e.target);
  }
});

function findTextAreas() {
  // Add an icon to all input fields of class text
  console.log("Searching for textareas...");
  var textAreas = document.getElementsByTagName("textarea");
  console.log(textAreas)
  for (var i = 0; i < textAreas.length; i++) {
    setupTextArea(textAreas[i]);
  }
}

function setupTextArea(textArea) {
  if (textArea.readOnly == false) {
    console.log("Found a textarea. Modifying now...");
    console.log(textArea);
    // var elem = document.createElement("img");
    // elem.setAttribute("src", "icon.png");
    // inputField.parentElement.appendChild(elem);
    var oldParent = textArea.parentElement;
    textArea.style.resize = "none";
    $(textArea).addClass("kindness-textarea");

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
    $(textArea).bind('input propertychange', function() {
      inputChanged(textArea);
    });
  }
}

function inputChanged(textArea) {
	if((Date.now() - window.startTime) > 500) {
		window.startTime = Date.now();
		sendInput(textArea);
	}
}

function sendInput(textArea) {
	 var xmlHttp = new XMLHttpRequest();
   xmlHttp.onreadystatechange = function() {
     if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
         callback(xmlHttp.responseText, textArea);
     }
   }
   text = encodeURIComponent(textArea.value);
   url = "https://ec2-54-163-44-93.compute-1.amazonaws.com:8443/?text=" + text;
   xmlHttp.open("GET", url, true); // true for asynchronous
   xmlHttp.send(null);
}

function callback(responseText, textArea) {
  var neededBar = $(textArea.parentElement).find(".kindness-bar");
  scaledReponse = responseText * 60.0;
  var hue = 60 + scaledReponse;
  console.log(hue);// go from green to red
  neededBar.css("background-color", "hsl(" + hue + ", 100%, 50%)");
}
