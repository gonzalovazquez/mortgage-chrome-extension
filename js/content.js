console.log('Content.js loaded - access to page');

// Global monthly mortgage amount
var monthlyPayments = 0;
var prevSavedValueArray = [];
var selectedAmount = 0;
var openModal;

// Listening to message from context menu
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		    openModal(request.message);
		}
);


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

        document.querySelector('#td-previous').style.display = 'block';
        document.querySelector('#td-url').setAttribute('href', res.value.url);
        document.querySelector('#td-prev-amount').textContent = previousSearchTxt;
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
  '<div class="td-inner-container">' +
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
  '<div id="td-button-container">' +
  '<button class="td-btn td-btn-2 td-btn-2a td-btn-fl" id="td-calculate">Calculate</button>' +
  '<button class="td-btn td-btn-2 td-btn-2a" id="td-save">Save</button>' +
  '</div>' + 
  '<div id="td-results"><h3>Your monthly payments are:<span class="td-amount"></span></h3></div>' +
  '<div class="td-inner-container">' + 
  '<div id="td-previous"><p class="td-paragraph"><strong>Previous Searches:</strong></p><a id="td-url" href="#">Link: </a><span id="td-prev-amount"></span></div>' +
  '<div class="td-widget-pane-toggle-button-container"><button class="td-widget-pane-toggle-button"></button></div>' + 
  '</div>' +
  '</div>'
);


// Grab price and mouse event and insert into DOM modal
openModal = function(amount){
  console.log('Open!', amount);
  document.querySelector('input#td-balance').value = '$' + amount;
  document.querySelector('div#td-widget-pane').style.display = 'block';
  document.querySelector('div#td-widget-pane').classList.add('td-slide');

};
  
// Expand and collapse modal
var toggleButton = document.querySelector('.td-widget-pane-toggle-button');
toggleButton.addEventListener('click', toggleModal, false);

function toggleModal() {
  console.log('Toggle modal');
  var leftpane = document.querySelector('#td-widget-pane');
  
  if (leftpane.classList[0] === 'td-slide') {
    leftpane.classList.remove('td-slide');
  } else {
    leftpane.classList.add('td-slide');
  }
}

// Calculate Mortgage
var calculate = document.querySelector('#td-calculate');
calculate.addEventListener('click', calculateMortgage, false);

function calculateMortgage() {
  //TODO: Improve mortgage calculation
  var principalAmount = document.querySelector('input#td-balance').value.replace(/[,$]/g,""),
      interestRate = document.querySelector('#td-rate').value / 100 / 12,
      period = document.querySelector('#td-period').value,
      years = document.querySelector('#td-term').value,
      numberOfPayments = years * period;
    
  var leftSideofEquation = interestRate * Math.pow((1 + interestRate), numberOfPayments);
  var rightSideofEquation = Math.pow(1 + interestRate, numberOfPayments) - 1;
  monthlyPayments = parseInt(principalAmount * (leftSideofEquation / rightSideofEquation));

  // Change value dynamically
  //TODO: Add comma separation
  document.querySelector('span.td-amount').innerHTML = '$' + monthlyPayments;

  // Show monthly payments
  document.querySelector('#td-results').style.display = 'block';
}

// Save Research

var saveButton = document.querySelector('#td-save');
saveButton.addEventListener('click', saveResults, false);

function saveResults() {
  //TODO: Create a options page to set number of previous saved amounts required. Till then numberOfSavedAmounts is set to 3
  var numberOfSavedAmounts = 3;
  var locationOfHome = window.location.href;
  var valueObjToSave = {
      url: locationOfHome,
      amount: monthlyPayments
  };

  if (prevSavedValueArray.length < numberOfSavedAmounts) {
      prevSavedValueArray.push(valueObjToSave);
  } else {
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
          document.querySelector('#td-prev-amount').innerHTML = previousSearchTxt;
          //TODO: Call API with saved parameters
      } else {
          chrome.storage.sync.set({'value': []}, function () {
            console.log('prevSavedValueArray is reset to empty array');
          });
      }
      console.log('Saved');
    });
}