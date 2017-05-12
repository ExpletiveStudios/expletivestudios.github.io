
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
		// Animate scroll over specified time
		$('html, body').animate({
			scrollTop: $(scrollTarget).offset().top
		}, 500, 'linear');
	}
});
