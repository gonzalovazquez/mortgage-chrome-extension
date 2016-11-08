$(document).ready(function () {

  // Global monthly mortgage amount
  var monthlyPayments = 0;
  var prevSavedValueArray = [];

  // Checking for saved searches
  (function () {
    // TODO: Value gets overwritten, need to create new DOM elements based on number of saved searches
    chrome.storage.sync.get('value', function (res) {
      prevSavedValueArray = res.value;

      if (prevSavedValueArray.length > 0) {
        var previousSearchTxt = '\n';
        prevSavedValueArray.forEach(function (elem, i) {
          previousSearchTxt += 'Search History ' + (i + 1) + ': ' + '$' + elem.amount + ' monthly' + '\n';
        });

        $('#td-previous').show();
        $("#td-url").attr("href", res.value.url);
        $('#td-prev-amount').text(previousSearchTxt);
      }
      else {
        chrome.storage.sync.set({'value': []}, function () {
          console.log('prevSSavedValueArray is reset to empty array');
        });
      }
    });
  })();

  // Create DOM for calculator
  document.body.innerHTML = document.body.innerHTML + (
      '<div id="td-widget-pane">' +
      '<h1 class="td-title">Mortgage Calculator</h1>' +
      '<span class="td-banner"></span>' +
      '<img class="td-logo" src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Toronto-Dominion_Bank_logo.svg"/>' +
      '<div class="inner-container">' +
      '<h4 id="td-balance"></h4>' +
      '<p class="td-paragraph"><strong>What would you like to calculate?</p>' +
      '<div>' +
      '  <label for="balance" class="td-mortgage-label">Loan balance</label>' +
      '  <input name="balance" id="td-balance" type="text" />' +
      ' </div>' +
      '<div>' +
      '   <label for="rate" class="td-mortgage-label">Interest rate (%)</label>' +
      '   <input name="rate" id="td-rate" type="text" />' +
      ' </div>' +
      ' <div>' +
      '   <label for="term" class="td-mortgage-label">Loan term (years)</label>' +
      '   <input name="term" id="td-term" type="text" />' +
      ' </div>' +
      ' <div>' +
      '   <label for="period" class="td-mortgage-label">Period</label>' +
      '   <select name="period" id="td-period">' +
      '     <option>Select</option>' +
      '     <option value="12">Monthly</option>' +
      '     <option value="6">Bimonthly</option>' +
      '   </select>' +
      ' </div>' +
      '</div>' +
      '<button class="td-btn td-btn-2 td-btn-2a td-btn-fl" id="td-calculate">Calculate</button>' +
      '<button class="td-btn td-btn-2 td-btn-2a" id="td-save">Save</button>' +
      '<div id="td-results"><h3>Your monthly payments are:<span class="td-amount"></span></h3></div>' +
      '<div class="inner-container">' + 
      '<div id="td-previous"><p class="td-paragraph"><strong>Previous Searches:</strong></p><a id="td-url" href="#">Link: </a><span id="td-prev-amount"></span></div>' +
      '<div class="widget-pane-toggle-button-container"><button class="widget-pane-toggle-button"></button></div>' + 
      '</div>' +
      '</div>'
    );

  // TODO: Do this everytime document changes
  // TODO: improve filter
  var priceTags = document.body.innerText.split(/\s+/)
    .filter(function (w) {
      return w[0] === '$';
    })
    .filter(function (e, i, array) {
      return array.includes(e);
    });
  document.body.innerHTML = priceTags.reduce(function (innerHtml, priceTag) {
    return innerHtml.replace(new RegExp('\\' + priceTag, 'g'), "<span class='td-mortgage'>" + priceTag + "</span>");
  }, document.body.innerHTML);

  // Grab price and mouse event and insert into DOM modal
  $('span.td-mortgage').click(function () {
    $('div#td-widget-pane').css("display", "block");
    $('input#td-balance').val($(event.target).text());
    $('div#td-widget-pane').addClass('slide');
  });
  
  // Expand and collapse modal
  $('.widget-pane-toggle-button').click(function() {
    console.log('Toggle pane');
    $('div#td-widget-pane').toggleClass('slide');
  });

  // Calculate Mortgage
  $('#td-calculate').click(function () {

    //TODO: Improve mortgage calculation
    var principalAmount = parseInt($('input#td-balance').val().replace(/,/g, "").substring(1)),
      interestRate = ($('#td-rate').val() / 100) / 12,
      period = $('#td-period').val(),
      years = $('#td-term').val(),
      numberOfPayments = years * period;
    
    var leftSideofEquation = interestRate * Math.pow((1 + interestRate), numberOfPayments);
    var rightSideofEquation = Math.pow(1 + interestRate, numberOfPayments) - 1;
    monthlyPayments = parseInt(principalAmount * (leftSideofEquation / rightSideofEquation));

    // Change value dynamically
    //TODO: Add comma separation
    $('span.td-amount').text('$' + monthlyPayments);

    // Show monthly payments
    $('#td-results').show();

  });

  // Save Research
  $('#td-save').click(function () {
    //TODO: Create a options page to set number of previous saved amounts required. Till then numberOfSavedAmounts is set to 3
    var numberOfSavedAmounts = 3;
    var locationOfHome = $(location).attr('href');
    var valueObjToSave = {
      url: locationOfHome,
      amount: monthlyPayments
    };

    if (prevSavedValueArray.length < numberOfSavedAmounts) {
      prevSavedValueArray.push(valueObjToSave);
    }
    else {
      prevSavedValueArray.shift();
      prevSavedValueArray.push(valueObjToSave);
    }

    //TODO: Implement save function
    chrome.storage.sync.set({'value': prevSavedValueArray}, function () {
      // Notify that we saved.
      alert('Saved');
      if (prevSavedValueArray.length > 0) {
        var previousSearchTxt = '\n';
        prevSavedValueArray.forEach(function (elem, i) {
          previousSearchTxt = previousSearchTxt + 'Search History ' + (i + 1) + ': ' + '$' + elem.amount + ' monthly' + '\n';
        });
        $('#td-prev-amount').text(previousSearchTxt);
      }
      else {
        chrome.storage.sync.set({'value': []}, function () {
          console.log('prevSSavedValueArray is reset to empty array');
        });
      }
      console.log('saved');
    });
  });
});