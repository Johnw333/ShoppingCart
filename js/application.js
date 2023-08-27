$(document).ready(function() {
  $('.btn-add').click(function() {
    var newItem = $(this).closest('.col').find('.item').val();
    var newPrice = parseFloat($(this).closest('.col').find('.price').val());
    var newQuantity = parseInt($(this).closest('.col').find('.quantity input').val())  || 0;


    var newRow = $('<tr>');
    newRow.append('<td class="item">' + newItem + '</td>');
    newRow.append('<td class="price">' + '$' + newPrice.toFixed(2) + '</td>');
    newRow.append('<td class="quantity"><label>QTY</label><input type="number" min="0" value="0"><button class="btn-remove">Remove</button></td>');

    var subtotal = newPrice * newQuantity;
    newRow.append('<td class="subtotal">' + '$' + subtotal.toFixed(2) + '</td>');

    $('tbody').append(newRow);

    $('.item').val('');
    $('.price').val('');
    $('.quantity input').val('');

    updateTotalPrice();

    return false;
  });

  $('#totalCart').text('$0.00');
  $('.subtotal').text('$0.00');


  $('tbody').on('click', '.btn-remove', function() {
    $(this).closest('tr').remove();
    updateTotalPrice();
  });

  $('tbody').on('change', '.quantity input', function() {
    updateSubtotal($(this));
    updateTotalPrice();
  });

  function updateSubtotal(inputElement) {
    const row = inputElement.closest('tr');
    const price = parseFloat(row.find('.price').text().replace('$', ''));
    const quantity = parseFloat(inputElement.val());
    const subtotal = price * quantity;
    row.find('.subtotal').text('$' + subtotal.toFixed(2));
  }

  function updateTotalPrice() {
    const subtotalElements = $('.subtotal');
    let totalPrice = 0;

    subtotalElements.each(function() {
      const subtotal = parseFloat($(this).text().replace('$', ''));
      
      if (!isNaN(subtotal)) {
        totalPrice += subtotal;
      }   
    });

    $('#totalCart').text('$' + totalPrice.toFixed(2));
  }


});

