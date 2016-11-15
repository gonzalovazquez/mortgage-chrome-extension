console.log('Background script loaded');

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