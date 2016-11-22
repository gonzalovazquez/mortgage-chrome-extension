console.log('Background script loaded');

var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", "http://104.196.221.188:8080/api/v1/research/");
xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

chrome.contextMenus.create({
  "title": "TD This",
  "contexts": ["page", "selection", "image", "link"],
  "onclick" : genericOnClick
});

function genericOnClick(e) {
  var contextEvent = e;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": contextEvent.selectionText});
  });
}

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "mortgage");
  port.onMessage.addListener(function(msg) {
    console.log(msg);
    xmlhttp.send(JSON.stringify(msg));
  });
});