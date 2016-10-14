$(document).ready(function() {

  // Create DOM for calculator
  document.body.innerHTML = document.body.innerHTML + (
    '<div id="ex1" style="display:none;">' +
    '<p>Thanks for clicking.  That felt good.  <a href="#" rel="modal:close">Close</a> or press ESC</p>' +
    '<h1 id="priceTag"></h1>' +
    '</div>'
    );

  // TODO: Do this everytime document changes
  // TODO: improve filter
  var priceTags = document.body.innerText.split(/\s+/)
                  .filter(function(w) { return w[0] === '$'; })
                  .filter(function(e, i, array) { return array.includes(e); });
  document.body.innerHTML = priceTags.reduce(function(innerHtml, priceTag) {
    return innerHtml.replace(new RegExp('\\' + priceTag, 'g'), "<a href='#ex1' rel='modal:open'><span class='td-mortgage'>" + priceTag + "</span></a>");
  }, document.body.innerHTML);

  // Grab price and mouse event and insert into DOM modal
  $('span.td-mortgage').click(function() {
    $('#priceTag').text($(event.target).text());
  });

  // Functions for Modal 
  $('#priceTag').click(function() {
    alert('you clicked me')
  });
});
