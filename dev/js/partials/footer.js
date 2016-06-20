// Inject bottom padding to main content equal to footer height
function adjustPadding() { $('.main-container').css('padding-bottom', $('.footer-container').height()); };

// Initial injection
adjustPadding();

// Inject on window resize
$(window).resize(function() { adjustPadding(); });