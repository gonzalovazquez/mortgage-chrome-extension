$(document).ready(function () {
    console.log('Content.js loaded - access to page');
 
    // Listening to message from icon click handler
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log('We got the message');
            console.log(request);
            console.log(sender);
 
            if (request.message === "clicked_browser_action" ) {
                firstHref = $("a[href^='http']").eq(0).attr("href");
                console.log(firstHref);
                var quote = 'AAPL-Q';
                // Send back to background that new that we want to open
                chrome.runtime.sendMessage({"message": "open_new_tab", "url": 'http://www.theglobeandmail.com/globe-investor/markets/stocks/summary/?q=' + quote});
            } else {
                console.log(request.message);
                var iframe = document.createElement('iframe');
                iframe.style.cssText = "width:400px; height: 400px; position: absolute; left: 0; top: 0; background-color:#bbb5b5; z-index: 10000;";
                var widgetHtml =
                '<div id="main">'+
                    '<h1>TD Mortgage Calculator</h1>'+
                    '<img src="http://tdstandards.com/assets-tdos/images/logos/td_shield.gif">' +
                    '<label for="amount">Mortgage Amount:</label>' +
                    '<input id="amount" name="amount" type="text" class="table" size="15" maxlength="10" value=' + request.message + '> <br/>' +
                    '<label for="amount">Payment Frequency:</label>' +
                    '<select id="frequency1" name="frequency1" class="table">' +
                      '<option value="NONE">- Select -</option>' +
                      '<option value="WEEKLY">Weekly</option>' +
                      '<option value="WEEKLY RAPID">Rapid Weekly</option>' +
                      '<option value="BIWEEKLY">Bi-Weekly</option>' +
                      '<option value="BIWEEKLY RAPID">Rapid Bi-Weekly</option>' +
                      '<option value="MONTHLY">Monthly</option>' +
                    '</select> <br />'+
                    '<label for="inrate1">Interest Rate:</label>' +
                    '<select class="table width150px" id="rate1" name="rate1" onchange="checkAndHideRate(1)">'+
                    '<option value="">- Select -</option>'+
                    '<option value="CUSTOM">Enter your own Rate</option>'+
                    '<option value="F10;term?6 months;compounds?2;rate?3.140"> 6 Month Convertible </option>'+     
                    '<option value="F9;term?1 year;compounds?2;rate?6.300">           1 Year Open </option>'+
                    '<option value="F1;term?1 year;compounds?2;rate?2.990"> 1 Year Closed </option>'+
                    '<option value="F2;term?2 years;compounds?2;rate?2.840">2 Year Closed </option>'+
                    '<option value="F3;term?3 years;compounds?2;rate?3.390">3 Year Closed </option>'+
                    '<option value="F4;term?4 years;compounds?2;rate?3.890">4 Year Closed </option>'+
                    '<option value="F5;term?5 years;compounds?2;rate?4.540">5 Year Closed </option> <br />'+
                    '<label for="amortizYears1">Amortization Period: </label>' +
                    '<input id="amortizYears1" name="amortizYears1" type="table" class="table" size="4" value=""> years(s) <br />' +
                    '<input style="margin-right:10px;" type="submit" id="submit" class="td-button td-button-primary" value="Calculate" alt="Calculate">'
                '</div>';
 
                document.documentElement.appendChild(iframe);
                iframe.contentDocument.body.innerHTML = widgetHtml;
            }
        }
    );
}, true); 