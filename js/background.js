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
    console.log('called');
    console.log(request);
    switch (request.message) {
      case "open_new_tab":
        chrome.tabs.create({"url": request.url});
        break;
      case "mortgage_calculator":
        console.log("CALCULATOR");
        break;
      default:

    }
  }
);
