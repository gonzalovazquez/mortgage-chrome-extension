$(document).ready(function() {
  // TODO: Do this everytime document changes
  // TODO: improve filter
  var priceTags = document.body.innerText.split(/\s+/)
                  .filter(function(w) { return w[0] === '$'; })
                  .filter(function(e, i, array) { return array.includes(e); });
  document.body.innerHTML = priceTags.reduce(function(innerHtml, priceTag) {
    return innerHtml.replace(new RegExp('\\' + priceTag, 'g'), "<span class='td-mortgage'>" + priceTag + "</span>");
  }, document.body.innerHTML);

  $('span.td-mortgage').click(function() {
    var priceTag = $(event.target).text();
    console.log(priceTag);
    createCalculator(priceTag);
  });

  function createCalculator(price) {
    var iframe = document.createElement('div');
    iframe.style.cssText = "width:400px; height: 400px; position: absolute; left: 0; top: 0; background-color:#bbb5b5; z-index: 10000;";
    var widgetHtml = '<div id="main">'+
                    '<h1>TD Mortgage Calculator</h1>'+
                    '<span onclick="closeModal();">x</span>' + 
                    '<img src="http://tdstandards.com/assets-tdos/images/logos/td_shield.gif">' +
                    '<label for="amount">Mortgage Amount:</label>' +
                    '<input id="amount" name="amount" type="text" class="table" size="15" maxlength="10" value=' + price + '> <br/>' +
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
});
