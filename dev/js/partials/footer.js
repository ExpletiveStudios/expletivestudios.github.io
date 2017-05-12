// Inject bottom padding to main content equal to footer height
function adjustPadding() { $('#main-container').css('padding-bottom', $('#footer').outerHeight() - 1); };

// Initial injection
$(document).ready(function() { 
	adjustPadding();
});

// Inject on window resize
$(window).resize(function() { adjustPadding(); });
