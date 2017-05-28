// Create new image overlay or hide existing one associated with target
function handleImageOverlay(target) {
	// Check whether overlay is currently active
	if(!target.hasClass('overlay__image--open')) {
		var targetImage = target.find('img'),
			targetImageRef = targetImage.attr('src'),
			targetImageRatio = targetImage.height() / targetImage.width(),
			overlayBackground = $('<div class="overlay__background"></div>'),
			overlayImage = $('<div class="overlay__image"><span class="overlay__nav--prev"></span><span class="overlay__nav--next"></span></div>');
		var img = new Image()
		img.src = targetImageRef;

		if ($(window).width() <= img.width) {
			var overlayImageWidth = $(window).width();
		} else {
			var overlayImageWidth = img.width;
		}
		var overlayImageHeight  = targetImageRatio * overlayImageWidth;

		// Add overlay background on when not existing
		if(target.find('.overlay__background').length == 0) {
			overlayBackground.append(overlayImage);
			target.append(overlayBackground);
		}
		else {
			// Otherwise find existing overlay image
			overlayImage = target.find('.overlay__image');
		}

		// Update overlay image based on selected image and window dimensions
		overlayImage.css({
			'background-image': 'url(' + targetImageRef + ')',
			height: overlayImageHeight,
			left: 'calc(50% - ' + overlayImageWidth / 2 + 'px)',
			top: 'calc(50% - ' + overlayImageHeight / 2 + 'px)',
			width: overlayImageWidth
		});

		// Handle adding overlay styles
		target.addClass('overlay__image--open');
		$(document).find('body').addClass('overlay--open');
	}
	else {
		// Handle removing overlay styles
		target.removeClass('overlay__image--open');
		$(document).find('body').removeClass('overlay--open');
	}
}

// Display image overlay on click
$(document).on('click', '[overlay="image"]', function() {
	handleImageOverlay($(this));
});

$(document).on('click', '.overlay__nav--prev', function(e) {
	e.stopPropagation();

	var current = $(this).closest('[overlay="image"]'),
		prev = current.prev('[overlay="image"]');

	// Retrieve last image when current is first
	if(prev.length <= 0) { prev = current.parent().find('[overlay="image"]').last(); }

	// Hide current overlay
	handleImageOverlay(current);

	// Display next overlay
	handleImageOverlay(prev);
});

$(document).on('click', '.overlay__nav--next', function(e) {
	e.stopPropagation();

	var current = $(this).closest('[overlay="image"]'),
		next = current.next('[overlay="image"]');

	// Retrieve first image when current is last
	if(next.length <= 0) { next = current.parent().find('[overlay="image"]').first(); }

	// Hide current overlay
	handleImageOverlay(current);

	// Display next overlay
	handleImageOverlay(next);
});

$(document).keyup(function(e){
	var current = $(document).find('.overlay__image--open');

	if(e.keyCode == 39) {
		var next = current.next('[overlay="image"]');

		// Retrieve first image when current is last
		if(next.length <= 0) { next = current.parent().find('[overlay="image"]').first(); }

		// Hide current overlay
		handleImageOverlay(current);

		// Display next overlay
		handleImageOverlay(next);
	} else if(e.keyCode == 37) {
		var prev = current.prev('[overlay="image"]');

		// Retrieve last image when current is first
		if(prev.length <= 0) { prev = current.parent().find('[overlay="image"]').last(); }

		// Hide current overlay
		handleImageOverlay(current);

		// Display next overlay
		handleImageOverlay(prev);
	}
});

// Update overlay image dimensions on window resize
$(window).on('resize', function() {
	var target = $(document).find('.overlay__image--open');

	// Check whether an overlay is currently active
	if(target.length > 0) {
		var targetImage = target.find('img'),
			targetImageRef = targetImage.attr('src'),
			targetImageRatio = targetImage.height() / targetImage.width(),
			overlayImage = target.find('.overlay__image');
		var img = new Image();
		img.src = targetImageRef;

		if ($(window).width() <= img.width) {
			var overlayImageWidth = $(window).width();
		} else {
			var overlayImageWidth = img.width;
		}
		var overlayImageHeight  = targetImageRatio * overlayImageWidth;

		// Update overlay image based on selected image and window dimensions
		overlayImage.css({
			'background-image': 'url(' + targetImageRef + ')',
			height: overlayImageHeight,
			left: 'calc(50% - ' + overlayImageWidth / 2 + 'px)',
			top: 'calc(50% - ' + overlayImageHeight / 2 + 'px)',
			width: overlayImageWidth
		});
	}
});
