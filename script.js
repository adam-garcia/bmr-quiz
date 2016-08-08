$(function() {

var lipsum = "More info"

// var 

startQuiz();

var delay = 800;

$('#init').click(function(){
    $(window).bind('beforeunload', function(){
        return null;
    });
    getNextSlide($(this));
});


$('.deck-item').find('input').click(function() {
    if (this.id == "other-role") {
        // console.log('aaa');
        var txt = $("<input type='text' placeholder='Tell us more!' id='other-role'>").hide();
        $(this).replaceWith(txt);
        $("#other-role").fadeIn("slow")
                   .focus();
        $("#other-adv").prop("disabled", false);
    } else if (this.type=="text") {
        console.log("test");
    } else {
        setResult($("#other-role").parent(), $(this));
        getNextSlide($(this).parent());
    };
});

$('#other-adv').click(function(){
    // setResult($(this).parent(), $(this));
    setResult($("#other-role").parent(), $("#other-role"));
    getNextSlide($("#other-role").parent());
});


function getPopoverBody(el) {
    return(el);
}



$.fn.extend({
    setPOTitle: function() {
        return this.each(function() {
            $(this).attr('title', lipsum);
        });
    },
    setPOBody: function() {
        return this.each(function() {
            $(this).attr('data-content', getPopoverBody(this.id))
        });
    }
});

$('[data-toggle="popover"]')
    .attr('type', 'button')
    .attr('attr', 'value')
    .attr('type', 'button')
    .attr('class', 'btn btn-warning')
    .setPOTitle()
    .setPOBody()
    .html('<i class="fa fa-info" aria-hidden="true"></i>')
    .popover({
        trigger: 'focus',
        container: 'body',
        placement: 'right'
    })
;


function startQuiz() {
    $('.deck-item').first().fadeIn();
    $('blockquote').each(function() {
        $(this).matchHeight({
            target: $(this).parents('.team-quote').find('img')
        });
    });
}

function getNextSlide(t) {
    var curr = t.parent();
    var next = curr.next();
    $('[data-toggle="popover"]').popover("hide");
    
    curr.replaceWith(next);
    next.fadeIn(delay);

    // curr.fadeOut(delay);
    // curr.hide();
    // curr.removeClass('deck-active');

    // next.fadeIn(delay);
    // next.addClass('deck-active');
    pval = $("#progress").val() + 100/11;
    $("#progress").animate({
      value: $("#progress").val() + 100/11
    }, delay);
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





