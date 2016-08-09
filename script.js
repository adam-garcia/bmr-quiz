$(function() {

startQuiz();

var delay = 800;
var quizN = 0;

$('#init').click(function(){
    $(window).bind('beforeunload', function(){
        // return null;
    });
    quizN = 1;
    getNextSlide($(this));
});


$('.deck-item').find('input').click(function() {
    if (this.id == "other-role") {
        var txt = $("<input type='text' placeholder='Tell us more!' id='other-role'>").hide();
        $(this).replaceWith(txt);
        $("#other-role").fadeIn("slow").focus();
        $("#other-role-adv").prop("disabled", false);
    } else if (this.id=="other-motiv") {
        var txt = $("<input type='text' placeholder='Tell us about them!' id='other-motiv'>").hide();
        $(this).replaceWith(txt);
        $("#other-motiv").fadeIn("slow").focus();
        $("#other-motiv-adv").prop("disabled", false);
    } else if (this.type=="text") {
        console.log("test");
    } else {
        setResult($("#other-role").parent(), $(this));
        getNextSlide($(this).parent());
    };
});

$(".adv").click(function(){
    setResult($(this).parent(), $(this).parent().find("input"));
    getNextSlide($(this).parent());
});


function getPopoverTitle(el) {
    // return(el);
    return "Placeholder Title";

}
function getPopoverBody(el) {
    // return(el);
    return "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
}



$.fn.extend({
    setPOTitle: function() {
        return this.each(function() {
            $(this).attr('title', getPopoverTitle(this.id));
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
    quizN += 1;
    updateProgress();
};

function updateProgress() {
    quizN += 1;
    $("#progress").animate({
      value: $("#progress").val() + 100/11,
      easing: 'swing'
    }, delay/1.5);
}

function back(t) {
    var curr = t.parent();
    var prev = curr.prev();
    $('[data-toggle="popover"]').popover("hide");

    curr.replaceWith(prev);
    prev.fadeIn(delay);
    $("#progress").animate({
      value: $("#progress").val() - 100/11,
      easing: 'swing'
    }, delay/1.5);
}

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





