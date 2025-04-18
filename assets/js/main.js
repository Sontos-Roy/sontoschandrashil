'use strict';

//Open mobile menu
$('.menu__mobile-button, .mobile-menu__close').on('click', function () {
    $('.mobile-menu').toggleClass('active');
});

//Close mobile menu after click
$('.mobile-menu__wrapper ul li a').on('click', function () {
    $('.mobile-menu').removeClass('active');
});

//Settings for carousel from bootstrap 4.0
$('.carousel').carousel({
    pause: "hover",
    interval: 5000
});

$(".carousel-control-prev").click(function(){
    $(".carousel").carousel("prev");
});

$(".carousel-control-next").click(function(){
    $(".carousel").carousel("next");
});

//Filter project cards
var previousClickedMenuLink = undefined;
$('.portfolio-menu').on('click', 'a', function(event){
    event.preventDefault();

    if (previousClickedMenuLink) {
        previousClickedMenuLink.removeClass('portfolio-menu__link--active');
    }
    var link = $(event.target);
    link.addClass('portfolio-menu__link--active');
    previousClickedMenuLink = link;

    var targetTag = $(event.target).data('portfolio-target-tag');
    var portfolioItems = $('.portfolio-cards').children();

    if (targetTag === 'all') {
        portfolioItems.fadeIn({duration: 500});
    } else {
        portfolioItems.hide();
    }

    portfolioItems.each(function(index, value){
        var item = $(value);
        if (item.data('portfolio-tag') === targetTag) {
            item.fadeIn({duration: 500});
        }
    });
});

//Animate headers of .section
var hideHeader = function(header) {
    header.css('text-indent', '-9999px');
};

var showHeader = function(header) {
    header.css('text-indent', '0px');
};

var animateHeader = function(header, text) {
    //clear header text
    header.text("");
    //and animate it
    var nextAnimationStep = function() {
        if (text.length > 0) {
            header.text(header.text() + text.substr(0,1));
            text = text.substr(1);
            setTimeout(nextAnimationStep, 100);
        }
    };
    nextAnimationStep();
};

var animateHeaders = function(headers) {
    return Object.keys(headers).map(function(key, index) {
        var elementSelector = key;
        var offset = headers[key];
        var header = $(elementSelector);
        hideHeader(header);
        var waypoint = {};
        waypoint[key] = header.waypoint({
            handler: function() {
                showHeader(header);
                animateHeader(header, header.text());
                this.destroy();
            },
            offset: offset
        })[0];
        return waypoint;
    }).reduce(Object.assign, {});
};

//All ids of titles should be written here to animation work
var animatedHeaders = animateHeaders({
    "#hello_header": '90%',
    "#resume_header": '70%',
    "#portfolio_header": '70%',
    "#testimonials_header": '70%',
    "#blog_header": '70%',
    "#contacts_header": '70%',
    "#other_posts": '70%'
});


//Animate progress-bar
$('.js-progress-list').waypoint({
    handler: function () {
        $(".progress-bar").each(function () {
            $(this).animate({
                width: $(this).attr('aria-valuenow') + '%'
            }, 200);
        });
        this.destroy();
    }, offset: '50%'
});



//Anchors
$(function(){
    $('a[href^="#"]').click(function(){
        var target = $(this).attr('href');
        $('html, body').animate({scrollTop: $(target).offset().top - 50}, 800);
        return false;
    });
});

//Fixed-top menu
function fixedHeader() {
    var ww = $(window).scrollTop();
    if(ww > 0){
        $('.menu').addClass('menu--active');
        $('.mobile-menu').addClass('mobile-menu--active');
    }else{
        $('.menu').removeClass('menu--active');
        $('.mobile-menu').removeClass('mobile-menu--active');
    }
}
fixedHeader();
$(window).on('scroll', function () {
    fixedHeader();
});

