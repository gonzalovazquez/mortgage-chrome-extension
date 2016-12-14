// global namespace
var COMMON = COMMON || {};

// sub namespace
COMMON.commonMethod = {};

COMMON.commonMethod = {
  guid: function() {
    function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  },
  collapsePane: function() {
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
  }
};