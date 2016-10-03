$(document).ready(function () {
    console.log('Content script loaded Jquery');

    var firstHref = $("a[href^='http']").eq(0).attr("href");
    console.info(firstHref);

    // Listening to message from icon click handler
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log('We got the message');
            console.log(request);
            console.log(sender);

            if (request.message === "clicked_browser_action" ) {
                firstHref = $("a[href^='http']").eq(0).attr("href");
                console.log(firstHref);
                // Send back to background that new that we want to open
                chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
            } else {
                console.log(request.message);

            }
        }
    );
}, true);  
