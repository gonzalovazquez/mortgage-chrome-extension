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
        if (request.type === 'mortgage') {
            MORTGAGE.methods.domCreation();
            MORTGAGE.methods.addEventHandler();
            initializeMortgageModal(request.message);
            var values = MORTGAGE.methods.calculateMortgage();
            MORTGAGE.methods.saveAction(values);
        } else if (request.type === 'stock') {
            // Create stock DOM
        }
      }
  );

  
  // Grab price and mouse event and insert into DOM modal
  initializeMortgageModal = function(amount){
    console.log('Open!', amount);
    document.querySelector('input#td-balance').value = '$' + amount;
    document.querySelector('div#td-widget-pane').style.display = 'block';
    document.querySelector('div#td-widget-pane').classList.add('td-slide');

  };
})();