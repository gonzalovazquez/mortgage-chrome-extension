(function () {
  // Create DOM for calculator
  var mainContainer = document.createElement('div');
  mainContainer.setAttribute('id', 'td-widget-pane');
  var mainTitle = document.createElement('h1');
  mainTitle.setAttribute('id', 'td-title');
  mainTitle.innerHTML = 'Stock Viewer';
  var banner = document.createElement('span');
  banner.setAttribute('class', 'td-banner');
  var image = document.createElement('img');
  image.setAttribute('class', 'td-logo');
  image.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Toronto-Dominion_Bank_logo.svg');


  var innerContainer = document.createElement('div');
  innerContainer.setAttribute('class', 'td-inner-container');
  var stockData = document.createElement('p');
  stockData.setAttribute('id', 'stock-data');
  var companyData = document.createElement('p');
  companyData.setAttribute('id', 'company-data');
  innerContainer.appendChild(stockData);
  innerContainer.appendChild(companyData);


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



  var innerContainer2 = document.createElement('div');
  innerContainer2.setAttribute('class', 'td-inner-container');
  
  var collapseContainer = document.createElement('div');
  collapseContainer.setAttribute('class', 'td-widget-pane-toggle-button-container');
  var collapseBtn = document.createElement('button');
  collapseBtn.setAttribute('class', 'td-widget-pane-toggle-button');
  collapseContainer.appendChild(collapseBtn);



  // Append childs to main container
  mainContainer.appendChild(mainTitle);
  mainContainer.appendChild(innerContainer);
  mainContainer.appendChild(banner);
  mainContainer.appendChild(image);
  mainContainer.appendChild(buttonContainer);
  mainContainer.appendChild(innerContainer2);
  mainContainer.appendChild(collapseContainer);
  // Last step: append calculator
  document.body.appendChild(mainContainer);


})();