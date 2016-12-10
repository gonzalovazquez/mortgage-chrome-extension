console.log('Background script loaded');

// POST Mortgage info
var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", "http://104.196.221.188:8080/api/v1/research/");
xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

// GET Stock Symbol
var xmlhttp_GET = new XMLHttpRequest();   // new HttpRequest instance 


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
  console.assert(port.name);
  if (port.name === 'mortgage') {
    port.onMessage.addListener(function(msg) {
      console.log(msg);
      xmlhttp.send(JSON.stringify(msg));
    });
  } else if (port.name === 'stock') {
    port.onMessage.addListener(function(msg) {
      console.log(msg);
      xmlhttp_GET.open("GET", "http://finance.google.com/finance/info?client=ig&q=NASDAQ:GOOGL", true);
      xmlhttp_GET.send();
      xmlhttp_GET.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           var stockInfo = this.responseText;
            console.log(stockInfo);
              chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var activeTab = tabs[0];
                console.log('current tab', activeTab);
                console.log('Sending message back', stockInfo);
                chrome.tabs.sendMessage(activeTab.id, {"stock_info": stockInfo});
              });
        }
      };
    });
  }
});







  

