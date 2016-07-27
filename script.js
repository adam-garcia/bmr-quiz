$(function() {

$('.deck-item').first().addClass('deck-active');

var delay = 800;
$('.deck-item').find('button').click(function() {
    var curr = $(this).parent().parent();
    var next = curr.next();
    curr.fadeOut(delay);
    curr.hide();
    curr.removeClass('deck-active');
    next.fadeIn(delay);
    next.addClass('deck-active');
});

})


// TODO
// ----------------------------------------------------------------------------
// Back functionality
// Multiple Choice
// Store user input
