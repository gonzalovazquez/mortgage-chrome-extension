// global namespace
var STOCKS = STOCKS || {};

// global in-memory object
var values = {};

// sub namespace
STOCKS.methods = {};

STOCKS.methods = {
  domCreation: function() {
    var mainContainer = document.createElement('div');
    mainContainer.setAttribute('id', 'td-widget-pane');
    var mainTitle = document.createElement('h1');
    mainTitle.setAttribute('id', 'td-title');
    mainTitle.innerHTML = 'Company Information';
    var banner = document.createElement('span');
    banner.setAttribute('class', 'td-banner');
    var image = document.createElement('img');
    image.setAttribute('class', 'td-logo');
    image.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Toronto-Dominion_Bank_logo.svg');


    var innerContainer = document.createElement('div');
    innerContainer.setAttribute('class', 'td-inner-container');
    var companyName = document.createElement('p');
    companyName.setAttribute('id', 'company-name');
    var stockData = document.createElement('p');
    stockData.setAttribute('id', 'stock-data');
    var companyData = document.createElement('p');
    companyData.setAttribute('id', 'company-data');
    var companyNews = document.createElement('p');
    companyNews.setAttribute('id', 'company-news');
    var companyImage = document.createElement('img');
    companyImage.setAttribute('id', 'company-image');

    innerContainer.appendChild(companyName);
    innerContainer.appendChild(stockData);
    innerContainer.appendChild(companyData);
    innerContainer.appendChild(companyImage);
    innerContainer.appendChild(companyNews);


    var buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('id', 'td-button-container');
    var saveButton = document.createElement('button');
    saveButton.setAttribute('class', 'td-btn td-btn-2 td-btn-2a');
    saveButton.setAttribute('id', 'td-save');
    saveButton.innerHTML = 'Save';
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
    mainContainer.appendChild(innerContainer2);
    mainContainer.appendChild(buttonContainer);
    mainContainer.appendChild(collapseContainer);
    // Last step: append calculator
    document.body.appendChild(mainContainer);
  }
};