$(document).ready(function () {
    console.log('Content.js loaded - access to page');

    var closeModal = function() {
      console.log('closing modal');
    };
 
    // Listening to message from icon click handler
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log('We got the message');
            if (request.message === "clicked_browser_action" ) {
                // TODO: An action to be called when the user clicks on the TD badge
                
                // Send back to background that new that we want to open
                chrome.runtime.sendMessage({"message": "open_new_tab", "url": 'http://www.theglobeandmail.com/globe-investor/markets/stocks/summary/?q=' + quote});
            }
        }
    );
}, true); 