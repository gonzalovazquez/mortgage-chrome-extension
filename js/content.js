(function () {
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
  var mainContainer = document.createElement('div');
  mainContainer.setAttribute('id', 'td-widget-pane');
  mainContainer.setAttribute('class', 'td-slide');
  var mainTitle = document.createElement('h1');
  mainTitle.setAttribute('id', 'td-title');
  mainTitle.innerHTML = 'Mortgage Calculator';
  var banner = document.createElement('span');
  banner.setAttribute('class', 'td-banner');
  var image = document.createElement('img');
  image.setAttribute('class', 'td-logo');
  image.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Toronto-Dominion_Bank_logo.svg');
  var innerContainer = document.createElement('div');
  innerContainer.setAttribute('class', 'td-inner-container');
  var balance = document.createElement('h4');
  balance.setAttribute('id', 'td-balance');
  var calculateText = document.createElement('p');
  calculateText.setAttribute('class', 'td-paragraph');
  var strongText = document.createElement('strong');
  strongText.innerHTML = 'What would you like to calculate?';
  calculateText.appendChild(strongText);
  var anotherContainer = document.createElement('div');
  var loanBalance = document.createElement('label');
  loanBalance.setAttribute('class', 'td-mortgage-label');
  loanBalance.innerHTML = 'Loan Balance';
  var inputBalance = document.createElement('input');
  inputBalance.setAttribute('id', 'td-balance');
  inputBalance.type = 'text';
  anotherContainer.appendChild(loanBalance);
  anotherContainer.appendChild(inputBalance);
  var interestRateContainer = document.createElement('div');
  var rateLabel = document.createElement('label');
  rateLabel.setAttribute('class', 'td-mortgage-label');
  rateLabel.innerHTML = 'Interest rate (%)';
  var rateInput = document.createElement('input');
  rateInput.setAttribute('id', 'td-rate');
  rateInput.type = 'text';
  interestRateContainer.appendChild(rateLabel);
  interestRateContainer.appendChild(rateInput);
  var loanContainer = document.createElement('div');
  var loanLabel = document.createElement('label');
  loanLabel.setAttribute('class', 'td-mortgage-label');
  loanLabel.innerHTML = 'Loan term (years)';
  var loanInput = document.createElement('input');
  loanInput.setAttribute('id', 'td-term');
  loanInput.type = 'text';
  loanContainer.appendChild(loanLabel);
  loanContainer.appendChild(loanInput);
  var periodContainer = document.createElement('div');
  var periodLabel = document.createElement('label');
  periodLabel.setAttribute('class', 'td-mortgage-label');
  periodLabel.innerHTML = 'Period';
  var selectList = document.createElement("select");
  selectList.setAttribute('id', 'td-period');
  var opt = [{title: 'Monthly', value: '12'}, {title: 'Bimonthly', value: '6'}];
  for (var i = 0; i < opt.length; i++) {
    var option = document.createElement("option");
    option.value = opt[i].value;
    option.text = opt[i].title;
    selectList.appendChild(option);
}
  periodContainer.appendChild(periodLabel);
  periodContainer.appendChild(selectList);

  innerContainer.appendChild(calculateText);
  innerContainer.appendChild(balance);
  innerContainer.appendChild(anotherContainer);
  innerContainer.appendChild(interestRateContainer);
  innerContainer.appendChild(loanContainer);
  innerContainer.appendChild(periodContainer);

  var buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('id', 'td-button-container');
  var calculateButton = document.createElement('button');
  calculateButton.setAttribute('class', 'td-btn td-btn-2 td-btn-2a td-btn-fl');
  calculateButton.setAttribute('id', 'td-calculate');
  calculateButton.innerHTML = 'Calculate';
  var saveButton = document.createElement('button');
  saveButton.setAttribute('class', 'td-btn td-btn-2 td-btn-2a');
  saveButton.setAttribute('id', 'td-save');
  saveButton.innerHTML = 'Save';
  buttonContainer.appendChild(calculateButton);
  buttonContainer.appendChild(saveButton);

  var resultContainer = document.createElement('div');
  resultContainer.setAttribute('id', 'td-results');
  var monthlyHeadline = document.createElement('h3');
  var spanAmount = document.createElement('span');
  spanAmount.setAttribute('class', 'td-amount');
  monthlyHeadline.appendChild(spanAmount);
  resultContainer.appendChild(monthlyHeadline);


  // Append childs to main container
  mainContainer.appendChild(mainTitle);
  mainContainer.appendChild(innerContainer);
  mainContainer.appendChild(banner);
  mainContainer.appendChild(image);
  mainContainer.appendChild(buttonContainer);
  mainContainer.appendChild(resultContainer);
  // Last step: append calculator
  document.body.appendChild(mainContainer);


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
})();