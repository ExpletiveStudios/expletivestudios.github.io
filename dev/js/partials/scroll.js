
// Animate page scroll to reference element on same page
$(document).on('click', '[animate="scroll"]', function(e) {
	e.preventDefault();

	// Retrieve page target for scroll
	var scrollTarget = $(this).attr('href');
	var scrollTargetSplit = scrollTarget.split("/");

	// Handle any page references in path
	if(scrollTargetSplit.length > 1) {
		// Redirect to page reference at target element
		window.location.href = scrollTarget;
	}
	else {
		// Ensure nav menu is closed on mobile prior to auto-scrolling
		resetNavMenu();

		var header = $(document).find('.header');

		// Offset scroll target by fixed or absolute header height
		var offset = ($(window).width() < 768 && $(window).scrollTop() >= $(scrollTarget).offset().top) || 
					  $(window).width() >= 768 ? header.outerHeight(true) : 0;

		// Animate scroll over specified time
		$('html, body').animate({
			scrollTop: $(scrollTarget).offset() ? ($(scrollTarget).offset().top - offset) : 0
		}, 500, 'linear');
	}
});
