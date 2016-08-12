$(function() {

startQuiz();

var delay = 800;
var quizN = 0;
var totalN = 10;
var slides = [];

$('#init').click(function(){
    $(window).bind('beforeunload', function(){
        // return null;
    });
    getNextSlide($(this));
    $("#go-back").click(function(){
        getPrevSlide();
    })
});


$('.deck-item').find('input').click(function() {
    if (this.id == "role-other") {
        var txt = $("<input type='text' placeholder='Tell us more!' id='role-other'>").hide();
        $(this).replaceWith(txt);
        $("#role-other").fadeIn("slow").focus();
        $("#role-other-adv").prop("disabled", false);
    } else if (this.id=="other-motiv") {
        var txt = $("<input type='text' placeholder='Tell us about them!' id='other-motiv'>").hide();
        $(this).replaceWith(txt);
        $("#other-motiv").fadeIn("slow").focus();
        $("#other-motiv-adv").prop("disabled", false);
    } else if (this.type=="text") {
        console.log("test");
    } else {
        setResult($("#role-other").parent(), $(this));
        getNextSlide($(this).parent());
    };
});

$(".adv").click(function(){
    setResult($(this).parent(), $(this).parent().find("input"));
    getNextSlide($(this).parent());
});



function getPopoverTitle(el) {
    return(el);

}
function getPopoverBody(el) {
    return "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
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
    .attr('class', 'btn btn-primary')
    .setPOTitle(this)
    .setPOBody()
    .html('<i class="fa fa-question-circle-o fa-lg" aria-hidden="true"></i>')
    // .html('<div>?</div>')
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
    curr = t.parent().parent();
    var next = curr.next();
    slides.push(curr);
    console.log(slides);
    $('[data-toggle="popover"]').popover("hide");
    curr.replaceWith(next);
    next.fadeIn(delay);
    if (next.attr("id") != "final") {
        updateProgress();
    } else if (next.attr("id") == "final") {
        $("#progress").animate({
          value: 100,
          easing: 'swing'
        }, delay/1.5);
        $("#iter-progress").text("Done!");
    }
};

function updateProgress() {
    quizN += 1;
    $("#progress").animate({
      value: $("#progress").val() + 100/(totalN + 1),
      easing: 'swing'
    }, delay/1.5);
    $("#iter-progress").text("Question " + quizN + " of " + totalN);
}

function getPrevSlide() {
    alert("Go back a slide to " + slides.pop().attr('id') );
    // var prev = slides.pop();
    // curr = prev.next();
    // $('[data-toggle="popover"]').popover("hide");
    // curr.replaceWith(prev);
    // prev.fadeIn(delay);
    // $("#progress").animate({
    //   value: $("#progress").val() - 100/11,
    //   easing: 'swing'
    // }, delay/1.5);
}

function setResult(field, option) {
    console.log(option);
    // Show Encouraging Message
    // http://stackoverflow.com/questions/15066882/make-toastr-alerts-look-like-bootstrap-alerts
    $("#post-msg").html('<h3>hello</h3>');
                  
    $("#post-msg").delay(1000)
                  .replaceWith('<h3>&nbsp;</h3>')
                  .fadeIn();
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





