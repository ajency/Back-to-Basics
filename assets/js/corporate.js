/*!
* Corporate Common js file
*
* Copyright 2016, Ajency.in http://ajency.in @amit
* Released under the GPL v2 License
*
* Date: Jun 21, 2016
*/


$(document).ready(function() {

       //carousel options
            $('#quote-carousel').carousel({
            pause: true, interval: 10000,
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
        $('#quote-carousel').carousel({
          pause: true, interval: 10000,
        });
        
         //Accordion Active
         $(".panel.panel-default").removeClass("activePanel");
         $('.panel-collapse').on('show.bs.collapse', function () {
           // alert("fkjdsf");
           $(".panel.panel-default").removeClass("activePanel");
           $(this).parents(".panel.panel-default").addClass("activePanel");
         }) 
         $('.panel-collapse').on('hidden.bs.collapse', function () {
           // alert("fkjdsf");        
           $(this).parents(".panel.panel-default").removeClass("activePanel");
         })  

         $('#stickySocial').find('#stickyBtn').each(function(){
  var $el = $(this);
  var ssCount = $el.data("count");
  var ssClass = $el.attr("class").split(' ')[0];
  $('.'+ssClass+' .count').html(ssCount);
});
});