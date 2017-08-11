$(window).load(function(){
	"use strict";
	
	function randomString(length, chars) {
	    var result = '';
	    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	    return result;
	}
	var ticket = randomString(32, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');

    $('#med-TICKET').val(ticket);

	
	//preloader animation
	$('#loader-wrapper').delay(300).fadeOut('slow');
    $('#loader-wrapper #loader, #loader-wrapper p').fadeOut();
	
	
	
	//top navigation smooth scroll settings
	$(".navbar .nav a").smoothScroll({speed: 1200});
	$(window).scroll(function () {
        if ($(window).scrollTop() > $(".navbar").height()+30) {
            $("nav").addClass("show-nav");
        	} else {
            	$("nav").removeClass("show-nav");
				$("nav .navscroll").collapse({toggle: false});
				$("nav .navscroll").collapse("hide");
				$("nav .navbar-toggle").addClass("collapsed");
        		}
    	});
		
		
		
	//wow animations
	var wow = new WOW({
    	offset:100,
    	mobile:false
  	});
	wow.init();
	
	
	//main banner text animation
	$('.tlt').textillate({
  // the default selector to use when detecting multiple texts to animate
  selector: '.texts',

  // enable looping
  loop: true,

  // sets the minimum display time for each text before it is replaced
  minDisplayTime: 4000,

  // sets the initial delay before starting the animation
  // (note that depending on the in effect you may need to manually apply 
  // visibility: hidden to the element before running this plugin)
  initialDelay: 0,

  // set whether or not to automatically start animating
  autoStart: true,

  // custom set of 'in' effects. This effects whether or not the 
  // character is shown/hidden before or after an animation  
  inEffects: [],

  // custom set of 'out' effects
  outEffects: [ 'hinge' ],

  // in animation settings
  in: {
    // set the effect name
    effect: 'fadeInLeftBig',

    // set the delay factor applied to each consecutive character
    delayScale: 1.5,

    // set the delay between each character
    delay: 50,

    // set to true to animate all the characters at the same time
    sync: false,

    // randomize the character sequence 
    // (note that shuffle doesn't make sense with sync = true)
    shuffle: true,

    // reverse the character sequence 
    // (note that reverse doesn't make sense with sync = true)
    reverse: false,

    // callback that executes once the animation has finished
    callback: function () {}
  },

  // out animation settings.
  out: {
    effect: 'fadeOutUp',
    delayScale: 1.5,
    delay: 50,
    sync: false,
    shuffle: true,
    reverse: false,
    callback: function () {}
  },

  // callback that executes once textillate has finished 
  callback: function () {}
});
	
	
	//tooltip settings
	$('.tip').tooltip();	
	
	//Nivo lightbox settings
	$('.lightbox').nivoLightbox();
	
	
	//Client Slider (owl carousel settings)
	$("#owl-carousel").owlCarousel({
		items: 6,
		itemsDesktop: [1199,5],
		itemsDesktopSmall: [980,4],
		itemsTablet: [768,3],
		itemsTabletSmall: [590,2],
		itemsMobile: [479,1],
		autoPlay: true,
		stopOnHover: true,
		pagination: false,
		});
	
	//Testimonials Slider (owl carousel settings)
	$("#testimonial-carousel").owlCarousel({
		items: 1,
		itemsDesktop: [1199,1],
		itemsDesktopSmall: [980,1],
		itemsTablet: [768,1],
		itemsTabletSmall: [590,1],
		itemsMobile: [479,1],
		autoPlay: true,
		stopOnHover: true,
		pagination: false,
		transitionStyle: 'fadeUp'
		});
		
	/* stats countTo animation */
	$(function() {
		$(".stat").appear(function(){
			$('.stat').each(function(){
		       	var dataperc = $(this).attr('data-perc');
				$(this).find('.factor').delay(6000).countTo({
			        from: 0,
			        to: dataperc,
			        speed: 3000,
			        refreshInterval: 50,
	            
        		});  
			});
		});
	});
	
	//faq accordian settings
	$('.panel-heading').click(function(){
		if($(this).find('i').hasClass('pe-7s-less')){
			$(this).find('i').removeClass('pe-7s-less').addClass('pe-7s-plus');
			}else 
			if($(this).find('i').hasClass('pe-7s-plus')){
			$('.panel-heading').find('i').removeClass('pe-7s-less').addClass('pe-7s-plus');
			$(this).find('i').removeClass('pe-7s-plus').addClass('pe-7s-less');
				}
		});
		
	});
