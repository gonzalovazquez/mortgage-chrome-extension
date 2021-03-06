// global namespace
var MORTGAGE = MORTGAGE || {};

// global in-memory object
var values = {};

// sub namespace
MORTGAGE.methods = {};

MORTGAGE.methods = {
  domCreation: function() {
    // Create DOM for calculator
    var mainContainer = document.createElement('div');
    mainContainer.setAttribute('id', 'td-widget-pane');
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
    var innerContainer2 = document.createElement('div');
    innerContainer2.setAttribute('class', 'td-inner-container');
    var previousSearch = document.createElement('div');
    previousSearch.setAttribute('id', 'td-previous');
    var previousSearchText = document.createElement('p');
    previousSearchText.setAttribute('class', 'td-paragraph');
    var previousStrong = document.createElement('strong');
    previousStrong.innerHTML = 'Previous Searches:';
    previousSearchText.appendChild(previousStrong);
    var previousLink = document.createElement('a');
    previousLink.setAttribute('id', 'td-url');
    previousLink.setAttribute('href', '#');
    previousLink.innerHTML = 'Link: ';
    var spanPrevious = document.createElement('span');
    spanPrevious.setAttribute('id', 'td-prev-amount');
    previousSearch.appendChild(previousSearchText);
    previousSearch.appendChild(previousLink);
    previousSearch.appendChild(spanPrevious);

    var collapseContainer = document.createElement('div');
    collapseContainer.setAttribute('class', 'td-widget-pane-toggle-button-container');
    var collapseBtn = document.createElement('button');
    collapseBtn.setAttribute('class', 'td-widget-pane-toggle-button');
    collapseContainer.appendChild(collapseBtn);

    var chartContainer = document.createElement('div');
    chartContainer.setAttribute('id', 'chart-container');

    // Append childs to main container
    mainContainer.appendChild(mainTitle);
    mainContainer.appendChild(innerContainer);
    mainContainer.appendChild(banner);
    mainContainer.appendChild(image);
    mainContainer.appendChild(buttonContainer);
    mainContainer.appendChild(resultContainer);
    mainContainer.appendChild(previousSearch);
    mainContainer.appendChild(innerContainer2);
    mainContainer.appendChild(collapseContainer);
    // Last step: append calculator
    document.body.appendChild(mainContainer);

    // Chart
    chartContainer.innerHTML = '<canvas id="myChart" width="400" height="400"></canvas>';
    innerContainer2.appendChild(chartContainer);
  },
  calculateMortgage: function() {
    var calculate = document.querySelector('#td-calculate');
    calculate.addEventListener('click', calculateMonthlyPayments, false);

    function calculateMonthlyPayments() {
      //TODO: Improve mortgage calculation
      var principalAmount = document.querySelector('input#td-balance').value.replace(/[,$]/g,""),
          interestRate = document.querySelector('#td-rate').value / 100 / 12,
          period = document.querySelector('#td-period').value,
          years = document.querySelector('#td-term').value,
          numberOfPayments = parseInt(years, 10) * parseInt(period, 10);
        
      var leftSideofEquation = interestRate * Math.pow((1 + interestRate), numberOfPayments);
      var rightSideofEquation = Math.pow(1 + interestRate, numberOfPayments) - 1;
      monthlyPayments = parseInt(principalAmount * (leftSideofEquation / rightSideofEquation));

      // Change value dynamically
      //TODO: Add comma separation
      console.log(monthlyPayments, 'monthlyPayments');
      document.querySelector('span.td-amount').innerHTML = '$' + monthlyPayments;

      // Show monthly payments
      document.querySelector('#td-results').style.display = 'block';
      var costOfBorrowing = (monthlyPayments * numberOfPayments) - principalAmount;

      // Create object with all values
      values = {
        "principalAmount": principalAmount, 
        "interestRate": interestRate, 
        "period": period, 
        "years": years,
        "numberOfPayments": numberOfPayments,
        "monthlyPayments": monthlyPayments
      };

      // Chart
      var ctx = document.getElementById("myChart");
      var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ["Loan", "Cost of Borrowing"],
                datasets: [{
                    label: '$',
                    data: [principalAmount, costOfBorrowing],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
      });
    };
  },
  saveAction: function() {
    var saveButton = document.querySelector('#td-save');
    saveButton.addEventListener('click', saveResults, false);
    //Save Research
    function saveResults() {
         objectToApi = {
            "entry": {
                "quote": {
                  "amount": values.principalAmount,
                  "interestRate": document.querySelector('#td-rate').value,
                  "termInMonths": values.numberOfPayments
                },
              "context": {
                "itemLocation": window.location.href,
                "site": window.location.hostname
              }
            },
            "header": {
              "requestId": COMMON.commonMethod.guid()
            }
         }
         //TODO: Call API with saved parameters
         //Send Message to background.js to POST Object
         var port = chrome.runtime.connect({name: "mortgage"});
         port.postMessage(objectToApi);
         console.log('Saved', objectToApi);
     }
  }
};