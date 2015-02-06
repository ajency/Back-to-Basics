// Ripple-effect animation
    $(".ripple-effect").click(function(e){
        var rippler = $(this);

        // create .ink element if it doesn't exist
        if(rippler.find(".ink").length == 0) {
            rippler.append("<span class='ink'></span>");
        }

        var ink = rippler.find(".ink");

        // prevent quick double clicks
        ink.removeClass("animate");

        // set .ink diametr
        if(!ink.height() && !ink.width())
        {
            var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
            ink.css({height: d, width: d});
        }

        // get click coordinates
        var x = e.pageX - rippler.offset().left - ink.width()/2;
        var y = e.pageY - rippler.offset().top - ink.height()/2;

        // set .ink position and add class .animate
        ink.css({
          top: y+'px',
          left:x+'px'
        }).addClass("animate");
    })

// Fly Labels
    if (Modernizr.input.placeholder) {
        $('body').flyLabels();
    }

// Menu drop down effect
    $('.dropdown-toggle').dropdownHover().dropdown();
    $(document).on('click', '.fhmm .dropdown-menu', function(e) {
        e.stopPropagation()
    })

// Slick Slider
    $('.full-slider').slick({
        mobileFirst: true
    });
    $('.slider1').slick({
        mobileFirst: true,
        infinite: true,
        slidesToShow: 3
    });