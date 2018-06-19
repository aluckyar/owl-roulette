var stoping = false;
var itemSelected = 0;

jQuery(function ($) {
    var $owl = $('.owl-carousel');
    
    // Initialize Owl
    $('.owl-carousel').owlCarousel({
        center: true,
        loop: true,
        margin: 10,
        nav: false,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        responsive: {
            0: {
                items: 3
            },
            600: {
                items: 3
            },
            1000: {
                items: 7
            }
        }
    });

    // Click in button Jump
    $('#js-btn-jump').click(function (e) {
        e.preventDefault();
        stoping = false;
        // Random between 1 and 10
        itemSelected = Math.floor((Math.random() * 10) + 1);
        var $jump = $(this);
        $jump.html('Jumping ...');
        $jump.attr('disabled', 'disabled');
        // Trigger autoplay owl
        $owl.trigger('play.owl.autoplay', [100]);
        // Slow speed by step
        setTimeout(slowSpeed, 2000, $owl, 200);
        setTimeout(slowSpeed, 4000, $owl, 250);
        setTimeout(slowSpeed, 5000, $owl, 300);
        setTimeout(stopAutoplay, 6000);
        return false;
    });

    // Event changed Owl
    $owl.on('changed.owl.carousel', function (e) {
        if (stoping) {
            // Examine only if roulette stop
            var index = e.item.index;
            var element = $(e.target).find(".owl-item").eq(index).find('.element-roulette');
            var item = element.data('item');
            if (item == itemSelected) {
                // If element equals to random, stop roulette
                $owl.trigger('stop.owl.autoplay');
                $('#js-btn-jump').html('Jump');
                $('#js-btn-jump').removeAttr('disabled');
            }
        }
    });

    // Showcase
    slowSpeed($owl, 1400);

});

/**
 * Reduce speed roulette
 * @param {type} $owl
 * @param {type} speed
 * @returns {undefined}
 */
function slowSpeed($owl, speed) {
    $owl.trigger('play.owl.autoplay', [speed]);
}

/**
 * Stop autoplay roulette
 * @returns {undefined}
 */
function stopAutoplay() {
    stoping = true;
}