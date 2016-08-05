$(function() {

var lipsum = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

$.ajax({
    dataType: "json",
    url: "quiz_data.json",
    data: 
})


// window.qd = null;

startQuiz();

var delay = 800;

$('#init').click(function(){
    $(window).bind('beforeunload', function(){
        // return null;
    });
});


$('.deck-item').find('button').click(function() {
    if ($(this).id == "init") {
        getNextSlide($(this));
    }
});


$('.deck-item').find('input').click(function() {
    if (this.id == "other") {
        // console.log('aaa');
        var txt = $("<input type='text' placeholder='Tell us more!' id='other'>").hide();
        $(this).replaceWith(txt);
        $("#other").fadeIn("slow")
                   .focus();
        $("#other-adv").prop("disabled", false);
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
    setPOTitle: function() {
        return this.each(function() {
            $(this).attr('title', getPopoverBody(this.id));
        });
    },
    setPOBody: function() {
        return this.each(function() {
            $(this).attr('data-content', lipsum)
        });
    }
});

$('[data-toggle="popover"]')
    .attr('type', 'button')
    .attr('attr', 'value')
    .attr('type', 'button')
    .attr('class', 'btn btn-info')
    .setPOTitle()
    .setPOBody()
    .html('<i class="fa fa-info" aria-hidden="true"></i>')
    .popover({
        trigger: 'click',
        container: 'body',
        placement: 'bottom'
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





