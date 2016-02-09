/*!
* Portfolio Common js file
*
* Copyright 2016, Ajency.in http://ajency.in @amit
* Released under the GPL v2 License
*
* Date: Nov 26, 2015
*/


$(document).ready(function() {

      // Masonry Image
 // external js: masonry.pkgd.js, imagesloaded.pkgd.js

// init Masonry
var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  percentPosition: true,
  columnWidth: '.grid-sizer'
});
// layout Isotope after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.masonry();
});  

      
      // Footer Heart 
          $('.click-heart').on('click', function(){
            $(this).toggleClass('animated-heart');
          });
      
      // responsive menu  
         $("ul#menu li a").click(function(event) {
          $(".navbar-collapse").collapse('hide');
        });

      // jQuery to collapse the navbar on scroll
      $(window).scroll(function() {
          if ($(".navbar").offset().top > 50) {
              $(".navbar-fixed-top").addClass("top-nav-collapse");
          } else {
              $(".navbar-fixed-top").removeClass("top-nav-collapse");
          }
      });
      
      // jQuery for page scrolling feature - requires jQuery Easing plugin
      $(function() {
          $('a.page-scroll').bind('click', function(event) {
              var $anchor = $(this);
              $('html, body').stop().animate({
                  scrollTop: $($anchor.attr('href')).offset().top
              }, 1500, 'easeInOutExpo');
              event.preventDefault();
          });
      });


      //Resize 
        function resize()
      {
         var heights = window.innerHeight - 180;
         document.getElementById("window-right").style.height = heights + "px";
         document.getElementById("window-left").style.height = heights + "px";
      }
      resize();
      window.onresize = function() {
         resize();
      };

      //Scroll Top Function
      $(window).scroll(function () {
          if ($(this).scrollTop() > 100) {
          $('.scrollup').fadeIn();
          } else {
          $('.scrollup').fadeOut();
          }
      });

      //Loader Animation
        $(".animsition").animsition({
            inClass: 'fade-in',
            outClass: 'fade-out',
            inDuration: 1500,
            outDuration: 800,
            loading: true,
            loadingParentElement: 'body', //animsition wrapper element
            loadingClass: 'animsition-loading',
            loadingInner: '', // e.g '<img src="loading.svg" />'
            timeout: true,
            timeoutCountdown: 5000,
            onLoadEvent: true,
            overlay:false,
         
        });


        
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 4,
        paginationClickable: true,
        spaceBetween: 30,
        loop: true
    });
    

});