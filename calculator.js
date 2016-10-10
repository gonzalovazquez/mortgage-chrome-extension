window.onload = function() {
    console.log('Loaded Calculator');

    chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
        console.log(request);

        var messagePost = document.getElementById('message');
        messagePost.innerHTML = request.message;

        sendResponse({message: "recieved"});
    });
}