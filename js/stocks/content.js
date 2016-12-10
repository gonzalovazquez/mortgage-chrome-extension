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
    console.log(stockInfo, companyInfo);
    // Format Data
    var stockInfo = JSON.parse(stockInfo.replace(/[^\\dA-Za-z0-9{}," :.]/g, ""));
    var newsTitle = JSON.parse(companyInfo).value[0].name;
    var newsBody = JSON.parse(companyInfo).value[0].description;


    document.querySelector('p#company-name').innerHTML = 'Google';  
    document.querySelector('p#stock-data').innerHTML = '<strong>Stock Price:</strong> $' + stockInfo.l;
    document.querySelector('p#company-data').innerHTML = newsTitle;
    document.querySelector('p#company-news').innerHTML = newsBody;  

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