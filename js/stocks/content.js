(function () {
  console.log('Content.js loaded - access to page');

  // Global monthly mortgage amount
  var monthlyPayments = 0;
  var prevSavedValueArray = [];
  var selectedAmount = 0;
  var openModal, populateModal;
  var objectToApi = {};

  // Listening to message from context menu
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
          console.log(request);
          if (request.message) {
            openModal(request.message);
          } else if (request.stock_info) {
            populateModal(request.stock_info, request.company_info);
          }
      }
  );


  // Grab price and mouse event and insert into DOM modal
  openModal = function(ticker){
    console.log('Open!', ticker);

    // Send Message to background.js to POST Object
    var port = chrome.runtime.connect({name: "stock"});
    port.postMessage(ticker);

  };

  // Populate Modal
  populateModal = function(stockInfo, companyInfo) {
    console.log(JSON.parse(stockInfo), JSON.parse(companyInfo));
    // Format Data
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
    document.querySelector('div#td-widget-pane').style.display = 'block';
    document.querySelector('div#td-widget-pane').classList.add('td-slide');
  }

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

 
})();