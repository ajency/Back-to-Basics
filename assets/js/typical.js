/*!
* Typical Portfolio Common js file
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
// 10. Ellipsis style for masonary grids
// 11. for the lightbox gallery
// 12. Create a dummy element for feature detection
// 13. Portfolio lightbox init code


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
    $grid.find('a').each(function() {
      $(this).attr('data-size', $(this).find('img').get(0).naturalWidth + 'x' + $(this).find('img').get(0).naturalHeight);
    });
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
  $(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
      $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
  });
  
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


  // 10. Ellipsis style for masonary grids
  $(".grid2-left-title h2").each(function(){
    if ($(this).text().length > 60) {
      $(this).text($(this).text().substr(0, 57));
      $(this).append('...');
    }
  });

  $(".grid1-left-title h2").each(function(){
    if ($(this).text().length > 30) {
      $(this).text($(this).text().substr(0, 27));
      $(this).append('...');
    }
  });


  // 11. for the lightbox gallery
  // $("#lightgallery a").each(function() {
  //   $(this).attr('data-size', $(this).find('img').get(0).naturalWidth + 'x' + $(this).find('img').get(0).naturalHeight);
  // });

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

  // 12. Create a dummy element for feature detection
  if (!('placeholder' in $('<input>')[0])) {
    // Select the elements that have a placeholder attribute
    $('input[placeholder], textarea[placeholder]').blur(add).focus(remove).each(add);
    // Remove the placeholder text before the form is submitted
    $('form').submit(function(){
      $(this).find('input[placeholder], textarea[placeholder]').each(remove);
    });
  }
});


// 13. Portfolio lightbox init code
(function() {

  var initPhotoSwipeFromDOM = function(gallerySelector) {

    var parseThumbnailElements = function(el) {
      var thumbElements = el.childNodes,
      numNodes = thumbElements.length,
      items = [],
      el,
      childElements,
      thumbnailEl,
      size,
      item;

      for(var i = 0; i < numNodes; i++) {
        el = thumbElements[i];

              // include only element nodes 
              if(el.nodeType !== 1) {
                continue;
              }

              childElements = el.children;

              size = el.getAttribute('data-size').split('x');

              // create slide object
              item = {
                src: el.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10),
            author: ''//el.getAttribute('data-author')
          };

              item.el = el; // save link to element for getThumbBoundsFn

              if(childElements.length > 0) {
                item.msrc = childElements[0].getAttribute('src'); // thumbnail url
                if(childElements.length > 1) {
                    item.title = $(thumbElements[i]).attr('data-sub-html') //childElements[1].innerHTML; // caption (contents of figure)
                  }
                }


                var mediumSrc = el.getAttribute('data-med');
                if(mediumSrc) {
                  size = el.getAttribute('data-med-size').split('x');
                  // "medium-sized" image
                  item.m = {
                    src: mediumSrc,
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                  };
                }
                // original image
                item.o = {
                  src: item.src,
                  w: item.w,
                  h: item.h
                };

                items.push(item);
              }

              return items;
            };

      // find nearest parent element
      var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
      };

      var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        var clickedListItem = closest(eTarget, function(el) {
          return el.tagName === 'A';
        });

        if(!clickedListItem) {
          return;
        }

        var clickedGallery = clickedListItem.parentNode;

        var childNodes = clickedListItem.parentNode.childNodes,
        numChildNodes = childNodes.length,
        nodeIndex = 0,
        index;

        for (var i = 0; i < numChildNodes; i++) {
          if(childNodes[i].nodeType !== 1) { 
            continue; 
          }

          if(childNodes[i] === clickedListItem) {
            index = nodeIndex;
            break;
          }
          nodeIndex++;
        }

        if(index >= 0) {
          openPhotoSwipe( index, clickedGallery );
        }
        return false;
      };

      var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

          if(hash.length < 5) { // pid=1
            return params;
          }

          var vars = hash.split('&');
          for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
              continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
              continue;
            }           
            params[pair[0]] = pair[1];
          }

          if(params.gid) {
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

            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                  // See Options->getThumbBoundsFn section of docs for more info
                  var thumbnail = items[index].el.children[0],
                  pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                  rect = thumbnail.getBoundingClientRect(); 

                  return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                },

                addCaptionHTMLFn: function(item, captionEl, isFake) {
                  if(!item.title) {
                    captionEl.children[0].innerText = '';
                    return false;
                  }
            // '<br/><small>Photo: ' + item.author + '</small>' add this after if author name isrequired
            captionEl.children[0].innerHTML = item.title ;
            return true;
          },

          closeOnScroll: false
          
        };


        if(fromURL) {
          if(options.galleryPIDs) {
              // parse real index when custom PIDs are used 
              // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
              for(var j = 0; j < items.length; j++) {
                if(items[j].pid == index) {
                  options.index = j;
                  break;
                }
              }
            } else {
              options.index = parseInt(index, 10) - 1;
            }
          } else {
            options.index = parseInt(index, 10);
          }

          // exit if index not found
          if( isNaN(options.index) ) {
            return;
          }



        // var radios = document.getElementsByName('gallery-style');
        // for (var i = 0, length = radios.length; i < length; i++) {
        //     if (radios[i].checked) {
        //         if(radios[i].id == 'radio-all-controls') {

        //         } else if(radios[i].id == 'radio-minimal-black') {
        //          options.mainClass = 'pswp--minimal--dark';
        //          options.barsSize = {top:0,bottom:0};
        //      options.captionEl = false;
        //      options.fullscreenEl = false;
        //      options.shareEl = false;
        //      options.bgOpacity = 0.85;
        //      options.tapToClose = true;
        //      options.tapToToggleControls = false;
        //         }
        //         break;
        //     }
        // }

        if(disableAnimation) {
          options.showAnimationDuration = 0;
        }

          // Pass data to PhotoSwipe and initialize it
          gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

          // see: http://photoswipe.com/documentation/responsive-images.html
          var realViewportWidth,
          useLargeImages = false,
          firstResize = true,
          imageSrcWillChange;

          gallery.listen('beforeResize', function() {

            var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
            dpiRatio = Math.min(dpiRatio, 2.5);
            realViewportWidth = gallery.viewportSize.x * dpiRatio;


            if(realViewportWidth >= 1200 || (!gallery.likelyTouchDevice && realViewportWidth > 800) || screen.width > 1200 ) {
              if(!useLargeImages) {
                useLargeImages = true;
                imageSrcWillChange = true;
              }

            } else {
              if(useLargeImages) {
                useLargeImages = false;
                imageSrcWillChange = true;
              }
            }

            if(imageSrcWillChange && !firstResize) {
              gallery.invalidateCurrItems();
            }

            if(firstResize) {
              firstResize = false;
            }

            imageSrcWillChange = false;

          });

          gallery.listen('gettingData', function(index, item) {
            // if( useLargeImages ) {
              item.src = item.o.src;
              item.w = item.o.w;
              item.h = item.o.h;
            // } else {
            //   item.src = item.m.src;
            //   item.w = item.m.w;
            //   item.h = item.m.h;
            // }
          });

          gallery.init();
        };

      // select all gallery elements
      var galleryElements = document.querySelectorAll( gallerySelector );
      for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
      }

      // Parse URL and open gallery if it contains #&pid=3&gid=1
      var hashData = photoswipeParseHash();
      if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid,  galleryElements[ hashData.gid - 1 ], true, true );
      }
  };

  initPhotoSwipeFromDOM('.photoswipe-wrap');

})();

