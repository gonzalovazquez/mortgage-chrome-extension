$(document).ready(function() {

  // Create DOM for calculator
  document.body.innerHTML = document.body.innerHTML + (
    '<div id="ex1" style="display:none;">' +
    '<h1 class="title">Mortgage Calculator</h1>' +
    '<span class="banner"></span>' + 
    '<img class="td-logo" src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Toronto-Dominion_Bank_logo.svg"/>' +
    '<h4 id="balance"></h4>' +
      '<p><strong>What would you like to calculate?</p>'+
      '<div>'+
      '  <label for="balance" class="mortgage-label">Loan balance</label>'+
      '  <input name="balance" id="balance" type="text" />'+
     ' </div>'+
      '<div>'+
     '   <label for="rate" class="mortgage-label">Interest rate (%)</label>'+
     '   <input name="rate" id="rate" type="text" />'+
     ' </div>'+
     ' <div>'+
     '   <label for="term" class="mortgage-label">Loan term (years)</label>'+
     '   <input name="term" id="term" type="text" />'+
     ' </div>'+
     ' <div>'+
     '   <label for="period" class="mortgage-label">Period</label>'+
     '   <select name="period" id="period">'+
     '     <option>Select</option>'+
     '     <option value="12">Monthly</option>'+
     '     <option value="6">Bimonthly</option>'+
     '   </select>'+
     ' </div>'+
     '<button class="btn btn-2 btn-2a btn-fl" id="calculate">Calculate</button>' +
     '<button class="btn btn-2 btn-2a" id="save">Save</button>' +
     '<div id="results"><h3>Your monthly payments are:<span class="amount">$500 per month</span></h3></div>' +
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
    $('input#balance').val($(event.target).text());
  });

  // Calculate Mortgage
  $('#calculate').click(function() {
    $('#results').show();
    //TODO: Implement mortgage calculation
  });

  // Save Research
  $('#save').click(function() {
    alert('Saved')!
    //TODO: Implement save function
  });
});
