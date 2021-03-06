﻿$(function() {

var q_ids = $('.deck-item').map(function() { return this.id; }).get();
// var q_help_ids = q_slide_ids[]
var delay = 800;
var quizN = 0;
var totalN = 10;
var slides = [];
var curr;
var prev;
var formData = {};

$('.deck-item').first().fadeIn();

$("#go-back").click(function(){
    getPrevSlide();
});

$('#init').click(function(){
    $(window).bind('beforeunload', function(){ /* return null;*/ });
    $("#go-back")
        .attr('disabled', false);
    getNextSlide($(this));
});


$('.deck-item')
    .find('button')
        .click(function() {
            var txt;
            if (!$(this).parent().hasClass('multi') && !$(this).hasClass('next')) {
                $(this).siblings().removeClass('selected');
            }
            if (this.type!="text") {
                $(this).not('.next').toggleClass('selected');
                $(this).siblings('.next').attr('disabled', false);
                if ($(this).parents('.deck-item').find('.team-quote').length !== 0) {
                    sendMessage(this);
                }
            } else if (this.type=="text") {
                $(this).addClass('selected');
                $(this).siblings().removeClass('selected');
            }
            if (this.id == "role-other") {
                txt = $("<input id='role-other'>")
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
                txt = $("<input id='when-other'>")
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
                txt = $("<input id='motiv-other'>")
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
            }
    });


$(".team-quote").hide();

function sendMessage(ans) {
    var msg;
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
            msg = "It’s recommended that kids get 30 minutes of physical activity a day at school. When designing your schedule, consider all the opportunities your students have to be active and how adding a run club can help your school meet this target. <br> &ndash; <em>Emily</em>, Billion Mile Race Team";
            break;
        case 'dur-15'   :
        case 'dur-30'   :
        case 'dur-45'   :
        case 'dur-60'   :
        case 'dur-plus' :
            msg = "Consider this when planning your run club: the recommended amount of physical activity is 60 minutes/day, with 30 minutes recommended happening at school. <br> &ndash; Dan, <em>Billion Mile Race Team</em>";
            break;
        case 'where-field':
        case 'where-path':
        case 'where-gym':
        case 'where-hall':
        case 'where-idk':
            msg = "Great! Remember your go-to location doesn’t need to be your only location. Mixing up where you run club takes place is a great way to introduce variety into your routine. <br> <em>Sarah</em>, Billion Mile Race Team";
            break;
        case 'lead-2'   :
        case 'lead-3'   :
        case 'lead-4'   :
        case 'lead-idk' :
            msg = "Great! Including multiple adult leaders can really help spread the workload and make your run club a true community affair! <br> <em>Lauren</em>, Billion Mile Race Team";
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
                $(this).attr('data-content', getPopoverBody(this.id));
            });
    },
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd' +
                           'oanimationend animationend';
        if (animationName.match('Out') !== null) {
          $(this).addClass('animated ' + animationName);
        } else {
          $(this)
            .addClass('animated ' + animationName)
            .one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    }
});

// $("button")
//     .filter(function() {
//         return $(this).find("i").length != 0
//     })
//     .tooltip({
//         trigger: 'click',
//         container: 'body',
//         placement: 'right',
//         offset: '0 -8px',
//         delay: 200,
//         html: true
//     });




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
    if (next.find('div.team-quote').length !== 0) {
        next.find('div.team-quote').animateCss('bounceInRight');
    }
    $('button [data-toggle="tooltip"]')
        .tooltip({
            trigger: 'hover',
            container: 'body',
            placement: 'right',
            offset: '0 -8px',
            delay: 200,
            html: true
        })
    ;

}

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
    if (curr.attr('id')!='intro') {
        var question = "#"+curr.attr('id');
        var responseData = [];
        var response = [];
        var role_other = "";
        var when_other = "";
        var motiv_other = "";
        curr.find('.selected').not('.next').each(function() {
            switch (this.id) {
                case 'role-other':
                case 'when-other':
                case 'motiv-other':
                    responseData.push("__other{" + $(this).val() + "}other__");
                    response.push($(this).val());
                    break;
                default:
                    responseData.push(this.id);
                    console.log($(this).find("span").first().text());
                    response.push($(this).find("span").text());
            }
        });
        $(question).data('response', responseData);
        var answer = question.replace('q-', 'a-');
        $(answer).text(response);
        formData[curr.attr('id')] = response;
    }
}

$("#submit-response").click(function() {
   $.ajax({
    url: "https://docs.google.com/forms/d/17cj1-BNgZafFSseDGzXxoOmp-YPJBIvnsrgYqcgOpLQ/formResponse",
    data: {
        "entry.562670068": formData["q-role"].toString(),
        "entry.1754370414": formData["q-year"].toString(),
        "entry.2083609488": formData["q-when"].toString(),
        "entry.2104531982": formData["q-freq"].toString(),
        "entry.1637119840": formData["q-dur"].toString(),
        "entry.972820970": formData["q-track"].toString(),
        "entry.1494732110": formData["q-lead"].toString(),
        "entry.910226216": formData["q-kids"].toString(),
        "entry.1029622032": formData["q-fun"].toString(),
        "entry.1114501558": "False" // change to "True" at time of production
    },
    type: "POST",
    dataType: "xml",
    statusCode: {
        0: function() {
            //Success message
        },
        200: function() {
            //Success Message
        }
    }
});
});


/**
 * End Page UX
 */

$("#view-summary").click(function() {
    var prtContent = document.getElementById("responses");
    var head = [
        '<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.3/css/bootstrap.min.css" integrity="sha384-MIwDKRSSImVFAZCVLtU0LMDdON6KVCrZHyVQQj6e8wIEJkW4tvwqXrbMIya1vriY" crossorigin="anonymous">',
        '<link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600|Oswald" rel="stylesheet" type="text/css">',
        '<link rel="stylesheet" href="./output.css">',
        "<style>",outputcss,"</style>",
        '<script src="https://use.typekit.net/gst0xpt.js"></script>',
        '<script>try{Typekit.load({ async: true });}catch(e){}</script>'
    ];
    var foot = [
        '<script src="http://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>',
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.matchHeight/0.7.0/jquery.matchHeight-min.js"></script>',
        '<script>$(function(){',
        '$("#output-freq  .half").matchHeight();',
        '$("#output-dur   .half").matchHeight();',
        '$("#output-where .half").matchHeight();',
        '$("#output-track .half").matchHeight();',
        '$("#output-kids  .half").matchHeight();',
        '$("#output-fun   .half").matchHeight();',
        '});</script>'
    ];
    var out = head.join('') + prtContent.innerHTML + foot.join('');
    out = out
        .replace("w6LigqzihKI=", "Jw==")
        .replace('<a class="btn btn-primary" id="save-doc">Save Me</a>', '')
        .replace('<a class="btn btn-primary" id="print-doc">Print Me</a>', '');
    var out64 = btoa(unescape(encodeURIComponent(out)));
    var data = "data:text/html;base64," + out64;
    window.data = data;
    window.saveprint = [
        '<script>$(function(){',
        '$("#print-doc").click(function() {',
        // '$.when(function(){',
            '$("#save-doc").remove();',
            '$("#print-doc").remove();',
        // '}).done(window.print());',
        '});',
        '$("#save-doc").attr("download", "foo.html");',
        '$("#save-doc").attr("href","', data, '");',
        '});</script>'
    ];
    var WinPrint = window.open('', '', 'left=0,top=0,width=850,height=900,toolbar=0,scrollbars=0,status=0');
    WinPrint.document.write(head.join(''));
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.write(foot.join(''));
    WinPrint.document.write(saveprint.join(''));
    WinPrint.document.close();
    window.WinPrint = WinPrint;
    WinPrint.focus();
});

$("#explore-programs").click(function() {
    window.open("http://www.billionmilerace.org/explore-programs", "_blank");
});
$("#visit-library").click(function() {
    window.open("http://www.billionmilerace.org/tools", "_blank");
});

/**
 * End Page UI
 */

$(".action i").matchHeight();
$(".action p").matchHeight();

var outputcss = "body{width:100%;}body div {max-width:780px; margin:0 auto;}ul{padding-left:15px}#page-1{z-index:999;margin-bottom:30px;box-shadow:0 1px 5px #e4e4e4}#page-2{z-index:999;margin-top:30px;box-shadow:0 -1px 5px #e4e4e4}img.logo{width:500px;background:#fff}.content-row,hr.dots{width:100%}.row{margin:0;min-height:8rem}.bg-blue{background-color:#11a9de}.bg-grey{background-color:#f2f3f4}.bg-red{background-color:#d30d2b}.bg-green{background-color:#85c340}h3{color:#d30d2b;font-family:league-gothic,Oswald,sans-serif}hr.dots{border-width:0 0 8px;border-style:dotted;border-image-source:url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjMwcHgiIGhlaWdodD0iMzBweCIgdmlld0JveD0iMCAwIDMwIDMwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4yLjIgKDk5ODMpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPmRvdHM8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBza2V0Y2g6dHlwZT0iTVNQYWdlIj4KICAgICAgICA8ZyBpZD0iQXJ0Ym9hcmQtMSIgc2tldGNoOnR5cGU9Ik1TQXJ0Ym9hcmRHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE0MC4wMDAwMDAsIC0xNTQuMDAwMDAwKSIgZmlsbD0iIzgwODI4NSI+CiAgICAgICAgICAgIDxnIGlkPSJkb3RzIiBza2V0Y2g6dHlwZT0iTVNMYXllckdyb3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNDAuMDAwMDAwLCAxNTQuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iZG90IiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj4KICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PSIzLjAiIGN5PSIzLjAiIHI9IjMuMCI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyBpZD0iZG90IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgMjQuMDAwMDAwKSIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCI+CiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iMy4wIiBjeT0iMy4wIiByPSIzLjAiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPGcgaWQ9ImRvdCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDEyLjAwMDAwMCkiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPgogICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9IjMuMCIgY3k9IjMuMCIgcj0iMy4wIj48L2NpcmNsZT4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDxnIGlkPSJkb3QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLjAwMDAwMCwgMC4wMDAwMDApIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj4KICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PSIzLjAiIGN5PSIzLjAiIHI9IjMuMCI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyBpZD0iZG90IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMi4wMDAwMDAsIDI0LjAwMDAwMCkiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPgogICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9IjMuMCIgY3k9IjMuMCIgcj0iMy4wIj48L2NpcmNsZT4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDxnIGlkPSJkb3QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI0LjAwMDAwMCwgMC4wMDAwMDApIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj4KICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PSIzLjAiIGN5PSIzLjAiIHI9IjMuMCI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyBpZD0iZG90IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNC4wMDAwMDAsIDI0LjAwMDAwMCkiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPgogICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9IjMuMCIgY3k9IjMuMCIgcj0iMy4wIj48L2NpcmNsZT4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDxnIGlkPSJkb3QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI0LjAwMDAwMCwgMTIuMDAwMDAwKSIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCI+CiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iMy4wIiBjeT0iMy4wIiByPSIzLjAiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=');border-color:#808285;border-image-slice:33% 33%;border-image-repeat:round;margin-top:0}h5{color:#11a9de;font-weight:700;font-family:proxima-nova,sans-serif}.rounded{border-radius:7px;display:inline-block;vertical-align:text-top}.output-answer{width:100%;height:2rem;padding:.5rem;font-size:.9rem;display:inline-block;background-color:#fff;border:1px solid #d1d2d4}.half{width:45%}.protip{color:#fff;font-size:.8rem;padding:.5rem;float:right}div.separator{background:#f5f5f5;width:100%;height:20px}#output-header{color:rgba(255,255,255,1);-webkit-print-color-adjust:exact;text-align:center}@media (print){#responses{margin-top:0!important;width:8.5in}#output-header{height:230px;color:rgba(255,255,255,1);-webkit-print-color-adjust:exact;text-align:center}#output-year .output-answer{height:2rem!important}#output-when{height:120px}#output-freq{height:180px}}";
var logodata = "";
// $("")

// TODO
// ----------------------------------------------------------------------------
// Multiple Choice -- DONE
// Store user input -- DONE
// Back functionality -- DONE
// Post form data -- DONE


// Thoughts
// ----------------------------------------------------------------------------
// "other" field woes:      http://jsfiddle.net/raKbZ/1/

}); // *_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*




