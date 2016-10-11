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
      console.log("Clicked TD icon");
      chrome.runtime.sendMessage({type:"price_clicked"});
      //alert('Show mortage calculator');
  });
});
