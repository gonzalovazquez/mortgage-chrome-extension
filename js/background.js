console.log('Background script loaded');

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    });
});


// Listen to the event of opening a new tab from content
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {
      chrome.tabs.create({"url": request.url});
    }
  }
);

// Send seletected to content page
var clickHandler = function(e) {
  var selectedText = e.selectionText;
  console.log(selectedText);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    console.log('Sending to', activeTab);
    chrome.tabs.sendMessage(activeTab.id, {"message": selectedText});
  });
};

// Add Context Menu
chrome.contextMenus.create({
  "title": "TD This",
  "contexts": ["page", "selection", "image", "link"],
  "onclick" : clickHandler
});