$(document).ready(function() {

  // Create DOM for calculator
  document.body.innerHTML = document.body.innerHTML + (
    '<div id="ex1" style="display:none;">' +
    '<h1 class="td-title">Mortgage Calculator</h1>' +
    '<span class="td-banner"></span>' + 
    '<img class="td-logo" src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Toronto-Dominion_Bank_logo.svg"/>' +
    '<h4 id="td-balance"></h4>' +
      '<p><strong>What would you like to calculate?</p>'+
      '<div>'+
      '  <label for="balance" class="td-mortgage-label">Loan balance</label>'+
      '  <input name="balance" id="td-balance" type="text" />'+
     ' </div>'+
      '<div>'+
     '   <label for="rate" class="td-mortgage-label">Interest rate (%)</label>'+
     '   <input name="rate" id="td-rate" type="text" />'+
     ' </div>'+
     ' <div>'+
     '   <label for="term" class="td-mortgage-label">Loan term (years)</label>'+
     '   <input name="term" id="td-term" type="text" />'+
     ' </div>'+
     ' <div>'+
     '   <label for="period" class="td-mortgage-label">Period</label>'+
     '   <select name="period" id="td-period">'+
     '     <option>Select</option>'+
     '     <option value="12">Monthly</option>'+
     '     <option value="6">Bimonthly</option>'+
     '   </select>'+
     ' </div>'+
     '<button class="td-btn td-btn-2 td-btn-2a td-btn-fl" id="td-calculate">Calculate</button>' +
     '<button class="td-btn td-btn-2 td-btn-2a" id="td-save">Save</button>' +
     '<div id="td-results"><h3>Your monthly payments are:<span class="td-amount"></span></h3></div>' +
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
    $('input#td-balance').val($(event.target).text());
  });

  // Calculate Mortgage
  $('#td-calculate').click(function() {

    //TODO: Improve mortgage calculation
    var principalAmount = parseInt($('input#td-balance').val().replace(/,/g, "").substring(1)),
        interestRate = ($('#td-rate').val() / 100) / 12,
        period = $('#td-period').val(),
        years = $('#td-term').val(),
        monthlyPayments = 0,
        numberOfPayments = years * period;

    var leftSideofEquation = interestRate * Math.pow((1 + interestRate), numberOfPayments);
    var rightSideofEquation = Math.pow(1 + interestRate, numberOfPayments) - 1;
    numberOfPayments = parseInt(principalAmount * (leftSideofEquation / rightSideofEquation));

    // Change value dynamically
    //TODO: Add comma separation
    $('span.td-amount').text('$' + numberOfPayments);

    // Show monthly payments  
    $('#td-results').show();

  });

  // Save Research
  $('#td-save').click(function() {
    alert('Saved');
    //TODO: Implement save function
  });
});
