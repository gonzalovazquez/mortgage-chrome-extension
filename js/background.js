console.log('Background script loaded');

// POST Mortgage info
var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
xmlhttp.open("POST", "http://104.196.221.188:8080/api/v1/research/");
xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

// GET Stock Symbol
var xmlhttp_GET = new XMLHttpRequest();   // new HttpRequest instance 

// GET NEWS Symbol
var xmlhttp_GET_NEWS = new XMLHttpRequest();   // new HttpRequest instance 


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
            var name = 'Google';
            console.log('Sending message back', stockInfo);
            xmlhttp_GET_NEWS.open("GET", "https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=" + name +"&count=1&offset=0&mkt=en-us&safeSearch=Moderate", true);
            xmlhttp_GET_NEWS.setRequestHeader("Ocp-Apim-Subscription-Key", "1dc5ab75449345b4b9f9613a809fe82c");
            xmlhttp_GET_NEWS.send();
            xmlhttp_GET_NEWS.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                var companyInfo = this.responseText;
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                  var activeTab = tabs[0];
                  console.log('current tab', activeTab);
                  console.log('Sending message back', companyInfo);
                  chrome.tabs.sendMessage(activeTab.id, {"stock_info": stockInfo, "company_info": companyInfo});
                });
              }
            }
        }
      };
    });
  }
});