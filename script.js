$(function() {

startQuiz();

var delay = 800;

$('#init').click(function(){
    $(window).bind('beforeunload', function(){
        // return null;
    });
});


// $('.option-list').children()
//     .addClass("u-full-width");

$('.deck-item').find('button').click(function() {
    if ($(this).id == "init") {
        getNextSlide($(this));
    }
});

$('.deck-item').find('input').click(function() {
    if (this.id == "other") {
        // console.log('aaa');
        $(this).fadeOut(delay/12)
        $("#other-val").css("dipslay", "block")
                       .fadeIn(delay/2)
                       .focus();
    } else if (this.type=="text") {
        console.log("test");
    } else {
        setResult($(this).parent(), this);
        getNextSlide($(this).parent());
    };
});


function getPopoverBody(el) {
    return(el);
}

jQuery.fn.extend({
    setPOBody: function() {
        return this.each(function() {
            $(this).attr('data-content', getPopoverBody(this.id));
        });
    }
});

$('[data-toggle="popover"]')
    .attr('type', 'button')
    .attr('attr', 'value')
    .attr('type', 'button')
    .attr('class', 'btn btn-info')
    .attr('data-placement', 'right')
    .attr('title', 'hello')
    .setPOBody()
    .html('<i class="fa fa-info" aria-hidden="true"></i>')
    .popover({
        trigger: 'focus',
        container: 'body'
    })
;




$("#other-advance").click(function(e) {
    setResult($(this).parent(), $(this).siblings('input'));
    getNextSlide($(this).parent().parent());
});

function startQuiz() {
    $('.deck-item').first().fadeIn();
    $.getJSON('quiz_data.json', function(d) {
        window.qd = d;
    });
}

function getNextSlide(t) {
    var curr = t.parent();
    var next = curr.next();
    curr.fadeOut(delay);
    curr.hide();
    curr.removeClass('deck-active');
    next.fadeIn(delay);
    next.addClass('deck-active');
};

function setResult(field, option) {
    console.log(option);
};



// TODO
// ----------------------------------------------------------------------------
// Multiple Choice
// Store user input
// Back functionality


// Thoughts
// ----------------------------------------------------------------------------
// "other" field woes:      http://jsfiddle.net/raKbZ/1/

}); // *_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*





