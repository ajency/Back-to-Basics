/*!
* Portfolio Common js file
*
* Copyright 2016, Ajency.in http://ajency.in @amit
* Released under the GPL v2 License
*
* Date: Nov 26, 2015
*/

// TABLE OF CONTENTS
// 1. init Masonry
// 2. layout Isotope after each image loads
// 3. Footer Heart 
// 4. responsive menu  
// 5. jQuery to collapse the navbar on scroll
// 6. jQuery for page scrolling feature - requires jQuery Easing plugin
// 7. Resize 
// 8. Scroll Top Function
// 9. Loader Animation
// 10. for the lightbox gallery
// 11. Create a dummy element for feature detection

$(document).ready(function() {

  // Masonry Image
  // external js: masonry.pkgd.js, imagesloaded.pkgd.js
  // $("#lightgallery").lightGallery(); 

  // 1. init Masonry
  var $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer'
  });

  // 2. layout Isotope after each image loads
  $grid.imagesLoaded().progress( function() {
    $grid.masonry();
  });

  // 3. Footer Heart 
  $('.click-heart').on('click', function(){
    $(this).toggleClass('animated-heart');
  });

  // 4. responsive menu  
  $("ul#menu li a").click(function(event) {
    $(".navbar-collapse").collapse('hide');
  });

  // 5. jQuery to collapse the navbar on scroll
  if ($(window).width() > 961) {
    $(window).scroll(function() {
      if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
      } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
      }
    });
  }
  else {
    $(".navbar-fixed-top").addClass("top-nav-collapse");
  }
      
  // 6. jQuery for page scrolling feature - requires jQuery Easing plugin
  $(function() {
    $('a.page-scroll').bind('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
    });
  });

  // 7. Resize 
  function resize() {
    var heights = window.innerHeight - 100;
    document.getElementById("window-right").style.height = heights + "px";
    document.getElementById("window-left").style.height = heights + "px";
  }
  resize();
  window.onresize = function() {
    resize();
  };

  // 8. Scroll Top Function
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.scrollup').fadeIn();
    } else {
      $('.scrollup').fadeOut();
    }
  });

  $(".scrollup").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

  // 9. Loader Animation
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


  // 10 for the lightbox gallery
  $("#lightgallery").each(function() {
    $(this).find('a').each(function() {
      $(this).attr('data-size', $(this).find('img').get(0).naturalWidth + 'x' + $(this).find('img').get(0).naturalHeight);
    });
  });

  var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
      var thumbElements = $(el).find('.photoswipe-wrap:not(.isotope-hidden) .grid-item').get(),
        numNodes = thumbElements.length,
        items = [],
        figureEl,
        linkEl,
        size,
        item;

      for (var i = 0; i < numNodes; i++) {

        figureEl = thumbElements[i]; // <figure> element

        // include only element nodes
        if (figureEl.nodeType !== 1) {
          continue;
        }

        linkEl = figureEl.children[0]; // <a> element

        size = linkEl.getAttribute('data-size').split('x');

        // create slide object
        if ($(linkEl).data('type') == 'video') {
          item = {
            html: $(linkEl).data('video')
          };
        } else {
          item = {
            src: linkEl.getAttribute('href'),
            w: parseInt(size[0], 10),
            h: parseInt(size[1], 10)
          };
        }

        if (figureEl.children.length > 1) {
          // <figcaption> content
          item.title = $(figureEl).attr('data-sub-html');
        }

        if (linkEl.children.length > 0) {
          // <img> thumbnail element, retrieving thumbnail url
          item.msrc = linkEl.children[0].getAttribute('src');
        }

        item.el = figureEl; // save link to element for getThumbBoundsFn
        items.push(item);
      }

      return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
      return el && (fn(el) ? el : closest(el.parentNode, fn));
    };

    function hasClass(element, cls) {
      return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : e.returnValue = false;

      var eTarget = e.target || e.srcElement;

      // find root element of slide
      var clickedListItem = closest(eTarget, function(el) {
        return (hasClass(el, 'grid-item'));
      });

      if (!clickedListItem) {
        return;
      }

      // find index of clicked item by looping through all child nodes
      // alternatively, you may define index via data- attribute
      var clickedGallery = clickedListItem.closest('.grid'),
        childNodes = $(clickedListItem.closest('.grid')).find('.photoswipe-wrap:not(.isotope-hidden) .grid-item').get(),
        numChildNodes = childNodes.length,
        nodeIndex = 0,
        index;

      for (var i = 0; i < numChildNodes; i++) {
        if (childNodes[i].nodeType !== 1) {
          continue;
        }

        if (childNodes[i] === clickedListItem) {
          index = nodeIndex;
          break;
        }
        nodeIndex++;
      }

      if (index >= -1) {
        // open PhotoSwipe if valid index found
        openPhotoSwipe(index, clickedGallery);
      }
      return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
      var hash = window.location.hash.substring(1),
        params = {};

      if (hash.length < 5) {
        return params;
      }

      var vars = hash.split('&');
      for (var i = 0; i < vars.length; i++) {
        if (!vars[i]) {
          continue;
        }
        var pair = vars[i].split('=');
        if (pair.length < 2) {
          continue;
        }
        params[pair[0]] = pair[1];
      }

      if (params.gid) {
        params.gid = parseInt(params.gid, 10);
      }

      return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
      var pswpElement = document.querySelectorAll('.pswp')[0],
        gallery,
        options,
        items;

      items = parseThumbnailElements(galleryElement);

      // define options (if needed)
      options = {
        
        closeOnScroll: false,
        
        // define gallery index (for URL)
        galleryUID: galleryElement.getAttribute('data-pswp-uid'),

        getThumbBoundsFn: function(index) {
          // See Options -> getThumbBoundsFn section of documentation for more info
          var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
            rect = thumbnail.getBoundingClientRect();

          return {
            x: rect.left,
            y: rect.top + pageYScroll,
            w: rect.width
          };
        }

      };

      // PhotoSwipe opened from URL
      if (fromURL) {
        if (options.galleryPIDs) {
          // parse real index when custom PIDs are used
          // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
          for (var j = 0; j < items.length; j++) {
            if (items[j].pid == index) {
              options.index = j;
              break;
            }
          }
        } else {
          // in URL indexes start from 1
          options.index = parseInt(index, 10) - 1;
        }
      } else {
        options.index = parseInt(index, 10);
      }

      // exit if index not found
      if (isNaN(options.index)) {
        return;
      }

      if (disableAnimation) {
        options.showAnimationDuration = 0;
      }

      // Pass data to PhotoSwipe and initialize it
      gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();

      gallery.listen('beforeChange', function() {
        var currItem = $(gallery.currItem.container);
        $('.pswp__video').removeClass('active');
        var currItemIframe = currItem.find('.pswp__video').addClass('active');
        $('.pswp__video').each(function() {
          if (!$(this).hasClass('active')) {
            $(this).attr('src', $(this).attr('src'));
          }
        });
      });

      gallery.listen('close', function() {
        $('.pswp__video').each(function() {
          $(this).attr('src', $(this).attr('src'));
        });
      });

    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll(gallerySelector);

    for (var i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute('data-pswp-uid', i + 1);
      galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
      openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }

  };
  // execute above function
  initPhotoSwipeFromDOM('.grid');

});

$(document).ready(function(){
  function add() {
    if($(this).val() === ''){
      $(this).val($(this).attr('placeholder')).addClass('placeholder');
    }
  }

  function remove() {
    if($(this).val() === $(this).attr('placeholder')){
      $(this).val('').removeClass('placeholder');
    }
  }

  // 11. Create a dummy element for feature detection
  if (!('placeholder' in $('<input>')[0])) {
    // Select the elements that have a placeholder attribute
    $('input[placeholder], textarea[placeholder]').blur(add).focus(remove).each(add);
    // Remove the placeholder text before the form is submitted
    $('form').submit(function(){
      $(this).find('input[placeholder], textarea[placeholder]').each(remove);
    });
  }
});