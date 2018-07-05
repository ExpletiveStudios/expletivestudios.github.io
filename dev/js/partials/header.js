
$(document).ready(function() { 
	// Reset header nav checkbox on page load
	resetNavMenu();
});

// Reset mobile header nav menu
function resetNavMenu() { 
	$(document).find('.nav__toggle-switch').prop('checked', false); 
	$(document).find('.header').find('.nav__menu').removeClass('nav__menu--visible');
}

// Toggle state of mobile header navigation menu
$(document).on('click', '.nav__toggle-switch', function() {
	var menu = $(this).closest('.nav__container').find('.nav__menu');

	menu.toggleClass('nav__menu--visible');
});

var isFirstScrollUp = true,
	scrollTopLast = 0,
	scrollTopNew,
	headerTop;

$(document).on('scroll', function() { 
	if ($(window).width() >= 768) { return; }

	handleScroll(); 
});

$(window).on('resize', function() { 
	if ($(window).width() < 768) { return; }

	setFixed($(document).find('.header'));
});

// Reveal header on scroll up
function handleScroll() {
	var header = $(document).find('.header');
	scrollTopNew = $(window).scrollTop();
	
	// Handle when new scroll top is greater than last
	if(scrollTopNew > scrollTopLast) {
		// Switch header position to absolute
		if(isFirstScrollUp && header.css('position') === 'fixed') { setAbsolute(header, scrollTopNew); };

		// Indicate scroll down has occurred
		isFirstScrollUp = false;

		// Close potentially open header nav menu
		resetNavMenu();
	}
	else {
		// Clear header top style
		headerTop = header.css('top').replace(/[^-\d\.]/g, '');

		if(!isFirstScrollUp && scrollTopNew > 0 && headerTop < scrollTopNew - header.outerHeight(true)) {
			header.css({ top: scrollTopNew - header.outerHeight(true) });
		};

		// Switch header position to fixed
		if(headerTop > scrollTopNew) { setFixed(header); };

		// Indicate scroll up has occurred
		isFirstScrollUp = true;
	}

	// Update last scroll top
	scrollTopLast = scrollTopNew;
}

// Apply fixed position
function setFixed(element) {
	element.css({
		position: 'fixed',
		top: 0
	});
}

// Apply absolute position a current scroll top
function setAbsolute(element, scrollTop) {
	element.css({
		position: 'absolute',
		top: Math.max(scrollTop, 0)
	});
}
