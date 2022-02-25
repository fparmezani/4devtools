$.noConflict();

setTimeout(()=>{
    const cookieContainer = document.querySelector('.cookie-container');
    const accepted = localStorage.getItem('cookieAccepted');
    if (!accepted) {
        cookieContainer?.classList.add('active');
    }
}, 2000);



jQuery(document).ready(function($) {
    'use strict';

    $('#menuToggle').on('click', function(event) {
        var windowWidth = $(window).width();
        if (windowWidth < 1010) {
            $('body').removeClass('open');
            if (windowWidth < 760) {
                $('#left-panel').slideToggle();
            } else {
                $('#left-panel').toggleClass('open-menu');
            }
        } else {
            $('body').toggleClass('open');
            $('#left-panel').removeClass('open-menu');
        }
    });

    $('.menu-item-has-children.dropdown').each(function() {
        $(this).on('click', function() {
            var $temp_text = $(this).children('.dropdown-toggle').html();
            $(this).children('.sub-menu').prepend('<li class="subtitle">' + $temp_text + '</li>');
        });
    });

    // Load Resize
    $(window).on('load resize', function(event) {
        var windowWidth = $(window).width();
        if (windowWidth < 1010) {
            $('body').addClass('small-device');
        } else {
            $('body').removeClass('small-device');
        }
    });

    // var i = function() {
    //     (window.innerWidth > 0 ? window.innerWidth : this.screen.width) < 1170
    //         ? ($('body').addClass('mini-sidebar'),
    //           $('.navbar-brand span').hide(),
    //           $('.scroll-sidebar, .slimScrollDiv').css('overflow-x', 'visible').parent().css('overflow', 'visible'),
    //           $('.sidebartoggler i').addClass('ti-menu'))
    //         : ($('body').removeClass('mini-sidebar'), $('.navbar-brand span').show());
    //     var i = (window.innerHeight > 0 ? window.innerHeight : this.screen.height) - 1;
    //     (i -= 70) < 1 && (i = 1), i > 70 && $('.page-wrapper').css('min-height', i + 'px');
    // };
});
