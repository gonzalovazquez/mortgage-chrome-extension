(function () {
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

  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
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

})();