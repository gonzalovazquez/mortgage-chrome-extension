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
    var priceTag = $(event.target).text();
    console.log(priceTag);
    createCalculator(priceTag);
  });

  function createCalculator(price) {
    var container = document.createElement('div');
    container.classList.add("container");

    document.documentElement.appendChild(container);
    $('.container').append("<h1 class='title'> Mortgage Calculator </h1><p class='price'>" + price + "</p><a class='closeWin' href='#' title='Close window'>Close window</a>");

    // Append scripts
    $('head').append("<script type='text/javascript'>" + "$('.closeWin').click(function() { console.log('I am being clicked');}); " + "</" + "script>");
  }
});