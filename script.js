$(function() {

var q_ids = $('.deck-item').map(function() { return this.id; }).get();
// var q_help_ids = q_slide_ids[]
var delay = 800;
var quizN = 0;
var totalN = 10;
var slides = [];


$('.deck-item').first().fadeIn();


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
    .find('button')
        .click(function() {
            if (!$(this).parent().hasClass('multi')) {
                $(this).siblings().removeClass('selected');
            }
            if (this.type!="text") {
                $(this).toggleClass('selected');
                $(this).siblings('.next').attr('disabled', false);
                if ($(this).parents('.deck-item').find('.team-quote').length != 0) {
                    sendMessage(this);
                }
            };
            if (this.id == "role-other") {
                var txt = $("<input id='role-other'>")
                            .addClass("w-100 form-control m-b-1")
                            .attr('type', 'text')
                            .attr('placeholder', 'Tell Us What You Do!')
                            .hide();
                $(this).replaceWith(txt);
                $("#role-other")
                    .fadeIn("slow")
                    .toggleClass('selected')
                    .focus();
            } else if (this.id == "when-other") {
                var txt = $("<input id='when-other'>")
                            .addClass("w-100 form-control m-b-1")
                            .attr('type', 'text')
                            .attr('placeholder', "Tell Us What You're Thinking!")
                            .hide();
                $(this).replaceWith(txt);
                $("#when-other")
                    .fadeIn("slow")
                    .toggleClass('selected')
                    .focus();
            } else if (this.id=="motiv-other") {
                var txt = $("<input id='motiv-other'>")
                            .addClass("w-100 form-control m-b-1")
                            .attr('type', 'text')
                            .attr('placeholder', 'Tell us about them!')
                            .hide();
                $(this).replaceWith(txt);
                $("#motiv-other")
                    .fadeIn("slow")
                    .addClass('selected')
                    .focus();
            } if ($(this).hasClass('next')) {
                getNextSlide($(this).parent());
            };
    });


$(".team-quote").hide();

function sendMessage(ans) {
    var msg;
    var img = "//placehold.it/150x150";
    var img = "";
    switch (ans.id) {
        case 'role-pe':
            msg = "You’re in great company! Did you know over 65% of Billion Mile Race run clubs are led by PE teachers? Welcome to the team.";
            break;
        case 'role-class':
            msg = "Nice! When kids are more active at school, classroom teachers get to see the benefits firsthand – better focus, better attention, and better academic performance.";
            break;
        case 'role-nurse':
            msg = "Awesome! Nurses make everything better, including run clubs.";
            break;
        case 'role-parent':
            msg = "Cool! Moms and dads just like you are organizing run clubs at their children’s schools all across the country.";
            break;
        case 'role-admin':
            msg = "We tip our hats to you! No run club is possible without the support and buy-in of a school’s administration. You rock!";
            break;
        case 'role-other':
            msg = "";
            break;
        case 'dur-15'   :
        case 'dur-30'   :
        case 'dur-45'   :
        case 'dur-60'   :
        case 'dur-plus' :
            msg = "Consider this when planning your run club: the recommended amount of physical activity is 60 minutes/day, with 30 minutes recommended happening at school. Dan, Billion Mile Race Team"
            break;
        case 'lead-2'   :
        case 'lead-3'   :
        case 'lead-4'   :
        case 'lead-idk' :
            msg = "It’s important to partner up with at least one other leader at your school to make sure your run club is sustainable!";
            break;
    }
    $(ans).parents('.deck-item')
        .find('.message').text(msg);
    $(ans).parents('.deck-item')
        .find('img.team-pic')
        .attr('src', img);

    $(ans).parents('.deck-item')
        .find('.team-quote')
        .show()
        .animateCss('bounceInRight');
}


$(".adv")
    .click(function(){
        setResult($(this).parent(), $(this).parent().find("input"));
        getNextSlide($(this).parent());
    });

$(".tile")
    .flip({
        trigger: 'hover',
        speed: 500
    })
    .children("div").addClass("w-100");


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
        if (animationName.match('Out') != null) {
          $(this).addClass('animated ' + animationName);
        } else {
          $(this)
            .addClass('animated ' + animationName)
            .one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            })
        }
    }
});

$('[data-toggle="tooltip"]')
    .tooltip({
        trigger: 'hover',
        container: 'body',
        placement: 'right',
        offset: '0 -8px',
        delay: 200
    })
;



function getNextSlide(t) {
    curr = t.parents(".deck-item");
    var next = curr.next();
    curr.replaceWith(next);
    next.fadeIn(delay);
    if (next.attr("id") != "final") {
        updateProgress();
        if (next.find('div.team-quote').length != 0) {
            next.find('div.team-quote').animateCss('bounceInRight');
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





