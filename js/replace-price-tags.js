$(document).ready(function() {
  // TODO: Do this everytime document changes
  // TODO: improve filter
  var priceTags = document.body.innerText.split(/\s+/)
                  .filter(function(w) { return w[0] === '$'; })
                  .filter(function(e, i, array) { return array.includes(e); });
  document.body.innerHTML = priceTags.reduce(function(innerHtml, priceTag) {
    return innerHtml.replace(new RegExp('\\' + priceTag, 'g'), "<span class='td-mortgage'>" + priceTag + "</span>");
  }, document.body.innerHTML);
  $('span.td-mortgage').click(function() {  
    alert('Show mortage calculator');
    var priceTag = $(event.target).text();
    console.log(priceTag)
  });
});
