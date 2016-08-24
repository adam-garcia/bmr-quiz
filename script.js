$(function() {

var q_ids = $('.deck-item').map(function() { return this.id; }).get();
// var q_help_ids = q_slide_ids[]
var delay = 800;
var quizN = 0;
var totalN = 10;
var slides = [];


$('.deck-item').first().fadeIn();


$('blockquote')
    .each(function() {
    $(this)
        .matchHeight({
            target: $(this).parents('.team-quote').find('img')
        });
        // .parents('.team-quote').hide();
    });


$('#init')
    .click(function(){
        $(window).bind('beforeunload', function(){ /* return null;*/ });
        getNextSlide($(this));
        $("#go-back")
            .attr('disabled', false)
            .click(function(){
                getPrevSlide();
            })
});


$('.deck-item')
    .find('input')
        .click(function() {
            if (this.id == "role-other") {
                var txt = $("<input id='role-other'>")
                            .attr('type', 'text')
                            .attr('placeholder', 'Tell us More!')
                            .hide();
                $(this).replaceWith(txt);
                $("#role-other").fadeIn("slow").focus();
                $("#role-other-adv").prop("disabled", false);
            } else if (this.id=="motiv-other") {
                var txt = $("<input id='motiv-other'>")
                            .attr('type', 'text')
                            .attr('placeholder', 'Tell us about them!')
                            .hide();
                $(this).replaceWith(txt);
                $("#motiv-other").fadeIn("slow").focus();
                $("#motiv-other-adv").prop("disabled", false);
            } else if (this.type!="text") {
                setResult($(this));
                getNextSlide($(this).parent());
        };
    });


$(".adv")
    .click(function(){
        setResult($(this).parent(), $(this).parent().find("input"));
        getNextSlide($(this).parent());
    });



function getPopoverTitle(el) {
    return(el);

}
function getPopoverBody(el) {
    return 
    var lipsum = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, " +
                 "sed do eiusmod tempor incididunt ut labore" +
                 " et dolore magna aliqua.";
}



$.fn.extend({
    setPOTitle: function() {
        return this
            .each(function() {
                $(this).attr('title', getPopoverTitle(this.id));
            });
    },
    setPOBody: function() {
        return this
            .each(function() {
                $(this).attr('data-content', getPopoverBody(this.id))
            });
    },
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd' +
                           'oanimationend animationend';
        $(this)
            .addClass('animated ' + animationName)
            .one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
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
    .popover({
        trigger: 'focus',
        container: 'body',
        placement: 'right'
    })
;



function getNextSlide(t) {
    curr = t.parents(".deck-item");
    var next = curr.next();
    slides.push(curr);
    // console.log(slides);
    $('[data-toggle="popover"]').popover("hide");
    curr.replaceWith(next);
    next.fadeIn(delay);
    console.log(t);
    if (next.attr("id") != "final") {
        updateProgress();
        if (next.find('div.team-quote').length != 0) {
            console.log('animate!');
            next.find('div.team-quote').animateCss('bounceInUp');
        }
    } else if (next.attr("id") == "final") {
        $("#progress").animate({
          value: 100,
          easing: 'swing'
        }, delay/1.5);
        $("#iter-progress").text("Done!");
    }
};

function getPrevSlide(t) {
    console.log(t);
}

function updateProgress() {
    quizN += 1;
    $("#progress").animate({
      value: $("#progress").val() + 100/(totalN + 1),
      easing: 'swing'
    }, delay/1.5);
    $("#iter-progress").text("Question " + quizN + " of " + totalN);
}


function setResult(option) {
    console.log(option.attr('id'));
    // console.log(option);
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





