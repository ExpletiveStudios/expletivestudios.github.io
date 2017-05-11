$(document).on('click', '[overlay="image"]', function() {
	var target = $(this);

	// Check whether overlay is currently active
	if(!target.hasClass('overlay__image--open')) {
		var targetImage = target.find('img'),
			targetImageRef = targetImage.attr('src'),
			targetImageRatio = targetImage.height() / targetImage.width(),
			overlayBackground = $('<div class="overlay__background"></div>'),
			overlayImage = $('<div class="overlay__image"></div>'),
			overlayImageWidth = $(window).width(),
			overlayImageHeight  = targetImageRatio * overlayImageWidth;

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
			right: 'calc(50% - ' + overlayImageWidth / 2 + 'px)',
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
});
