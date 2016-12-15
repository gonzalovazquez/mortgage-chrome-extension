(function () {
  console.log('Content.js loaded - access to page');

  // Global monthly mortgage amount
  var monthlyPayments = 0;
  var prevSavedValueArray = [];
  var initializeMortgageModal;
  var objectToApi = {};

  // Listening to message from context menu
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var widget = document.querySelector('#td-widget-pane');
        if (request.type === 'mortgage') {
            if (!widget) {
                MORTGAGE.methods.domCreation();
            }
            COMMON.commonMethod.collapsePane();
            MORTGAGE.methods.calculateMortgage();
            initializeMortgageModal(request.message);
            MORTGAGE.methods.saveAction();
        } else if (request.type === 'stocks') {
            if (!widget) {
                STOCKS.methods.domCreation();
            }
            COMMON.commonMethod.collapsePane();
            initializeStockModal(request.message);
        } else if (request.stock_info) {
            populateModal(request.stock_info, request.company_info);
        }
      }
  );

  // Grab price and mouse event and insert into DOM modal
  initializeMortgageModal = function(amount){
    console.log('Open!', amount);
    document.querySelector('input#td-balance').value = '$' + amount;

    // Show Pane
    slideOut();
  };

  // Grab price and mouse event and insert into DOM modal
  initializeStockModal = function(ticker){
    console.log('Open!', ticker);
    // Send Message to background.js to POST Object
    var port = chrome.runtime.connect({name: "stock"});
    port.postMessage(ticker);
  };

  // Populate Stock Modal
  populateModal = function(stockInfo, companyInfo) {
    console.log(JSON.parse(stockInfo), JSON.parse(companyInfo));
    // Normalize Data
    var formalizedCompanyData = JSON.parse(companyInfo).value[0];
    var stockInfo = JSON.parse(stockInfo).query.results.quote;
    var newsTitle = formalizedCompanyData.name;
    var newsBody = formalizedCompanyData.description;


    document.querySelector('p#company-name').innerHTML = 'Google';  
    document.querySelector('p#stock-data').innerHTML = '<strong>Stock Price:</strong> $' + stockInfo.Bid;
    document.querySelector('p#company-data').innerHTML = newsTitle;
    document.querySelector('p#company-news').innerHTML = newsBody;
    document.querySelector('img#company-image').setAttribute('src', formalizedCompanyData.image.thumbnail.contentUrl);

    // Show Pane
    slideOut();
  }

  // Slide Out Modal
  function slideOut() {
    document.querySelector('div#td-widget-pane').style.display = 'block';
    document.querySelector('div#td-widget-pane').classList.add('td-slide');
  }
})();