$(function() {

var q_ids = $('.deck-item').map(function() { return this.id; }).get();
// var q_help_ids = q_slide_ids[]
var delay = 800;
var quizN = 0;
var totalN = 10;
var slides = [];
var curr;
var prev;

$('.deck-item').first().fadeIn();
$("#go-back")
            .click(function(){
                getPrevSlide();
            });

$('#init')
    .click(function(){
        $(window).bind('beforeunload', function(){ /* return null;*/ });
        $("#go-back")
            .attr('disabled', false);
        getNextSlide($(this));
});


$('.deck-item')
    .find('button')
        .click(function() {
            if (!$(this).parent().hasClass('multi') && !$(this).hasClass('next')) {
                $(this).siblings().removeClass('selected');
            }
            if (this.type!="text") {
                $(this).not('.next').toggleClass('selected');
                $(this).siblings('.next').attr('disabled', false);
                if ($(this).parents('.deck-item').find('.team-quote').length != 0) {
                    sendMessage(this);
                }
            } else if (this.type=="text") {
                $(this).addClass('selected');
                $(this).siblings().removeClass('selected');
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
                getNextSlide($(this).parents('.q-options'));
            };
    });


$(".team-quote").hide();

function sendMessage(ans) {
    var msg;
    var img = "//placehold.it/150x150";
    var img = "";
    switch (ans.id) {
        case 'role-pe':
            msg = "You’re in great company! Did you know that most Billion Mile Race run clubs are led by PE teachers? Welcome to the team.";
            break;
        case 'role-class':
            msg = "Nice! When kids are more active at school, classroom teachers get to see the benefits firsthand – better academic performance, enhanced attention, and improved brain health<sup>[1]</sup>";
            break;
        case 'role-nurse':
            msg = "Awesome! Nurses make everything better, including run clubs.";
            break;
        case 'role-parent':
            msg = "Cool! Moms and dads just like you are organizing run clubs at their children’s schools all across the country.";
            break;
        case 'role-admin':
            msg = "Fantastic! The support and buy-in of a school’s administration can really help make your run club a success! You rock!";
            break;
        case 'role-other':
            msg = "";
            break;
        case 'freq-1':
        case 'freq-2-4':
        case 'freq-all':
        case 'freq-idk':
            msg = "It’s recommended that kids get 30 minutes of physical activity a day at school. When designing your schedule, consider all the opportunities your students have to be active and how adding a run club can help your school meet this target. <br> &ndash; <em>Emily</em>, Billion Mile Race Team"
            break;
        case 'dur-15'   :
        case 'dur-30'   :
        case 'dur-45'   :
        case 'dur-60'   :
        case 'dur-plus' :
            msg = "Consider this when planning your run club: the recommended amount of physical activity is 60 minutes/day, with 30 minutes recommended happening at school. <br> &ndash; Dan, <em>Billion Mile Race Team</em>"
            break;
        case 'where-field':
        case 'where-path':
        case 'where-gym':
        case 'where-hall':
        case 'where-idk':
            msg = "Great! Remember your go-to location doesn’t need to be your only location. Mixing up where you run club takes place is a great way to introduce variety into your routine. <em>Sarah</em>, Billion Mile Race Team"
            break;
        case 'lead-2'   :
        case 'lead-3'   :
        case 'lead-4'   :
        case 'lead-idk' :
            msg = "It’s important to partner up with at least one other leader at your school to make sure your run club is sustainable!";
            break;
    }
    $(ans).parents('.deck-item')
        .find('.message').html(msg);
    $(ans).parents('.deck-item')
        .find('img.team-pic')
        .attr('src', img);

    $(ans).parents('.deck-item')
        .find('.team-quote')
        .show()
        .animateCss('bounceInRight');
}

$(".tile")
    .flip({
        trigger: 'hover',
        speed: 500
        // ,axis: 'x'
    })
    .on('flip:done', function() {
        $(this).delay(200);
    });

    // .children("div")
    //     .addClass("w-100");

// $(".back")
//     .mCustomScrollbar()
//     .css('z-inxex', '0');

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
        delay: 200,
        html: true
    })
;



function getNextSlide(t) {
    curr = t.parents(".deck-item");
    setResult(curr);
    next = curr.next();
    if (next.attr("id") != "final") {
        updateProgress(1);
    } else if (next.attr("id") == "final") {
        $("#progress").animate({
          value: 1,
          easing: 'swing'
        }, delay/1.5);
        $("#iter-progress")
            .text("Done!")
            .parents('.progress-container')
                .delay(2500)
                .fadeOut(delay);
    }
    curr.hide();
    next.fadeIn(delay);
    prev = curr;
    curr = next;
    if (next.find('div.team-quote').length != 0) {
        next.find('div.team-quote').animateCss('bounceInRight');
    }
};

function getPrevSlide() {
    // var prev = slides.shift();
    console.log('back');
    next.hide();
    prev.fadeIn(delay);
    next = prev;
    prev = prev.prev();
    updateProgress(-1);
}

function updateProgress(n) {
    quizN += n;
    console.log(quizN);
    $("#progress").animate({
      value: quizN / (totalN + 1),
      easing: 'swing'
    }, delay/1.5);
    $("#iter-progress").text("Question " + quizN + " of " + totalN);
}

// Check if any value in array is in another array
// [1, 2, 7, 8, 10].forEach(function(el){if ([1, 2, 3].includes(el)) {window.foo = true;}})


function setResult(q) {
    var question = "#"+curr.attr('id');
    var response = [];
    var role_other = "";
    var when_other = "";
    var motiv_other = "";
    curr.find('.selected').not('.next').each(function() {
        switch (this.id) {
            case 'role-other':
            case 'when-other':
            case 'motiv-other':
                response.push($(this).val());
                break;
            default:
                response.push(this.id);
        };
    });
    $(question).data('response', response);
    var answer = question.replace('q-', 'a-');
    $(answer).find('span').text(response);
};

$("#view-summary").click(function() {
    var prtContent = document.getElementById("responses");
    var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    WinPrint.document.write('<link rel="stylesheet" href="/style.css">')
    WinPrint.document.write('<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.3/css/bootstrap.min.css" integrity="sha384-MIwDKRSSImVFAZCVLtU0LMDdON6KVCrZHyVQQj6e8wIEJkW4tvwqXrbMIya1vriY" crossorigin="anonymous">')
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
});

// $("#facebook").click(function() {
//     FB.ui({
//     method: 'feed',
//     caption: 'popup',
//     link: null,
//   }, function(response){});
// });

// var twt = "http://twitter.com/intent/tweet?"+
//           "text=Hooray for the @BillionMileRace";
// $("#twitter").attr('href', twt);

// $("#email").attr('href', 'http://billionmilerace.org/tellafriend');


// TODO
// ----------------------------------------------------------------------------
// Multiple Choice -- DONE
// Store user input -- DONE
// Back functionality -- DONE
// Post form data
//     see: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/Sending_forms_through_JavaScript
//          #Using_XMLHttpRequest_and_the_FormData_object


// Thoughts
// ----------------------------------------------------------------------------
// "other" field woes:      http://jsfiddle.net/raKbZ/1/

}); // *_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*




