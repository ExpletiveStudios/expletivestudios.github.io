$(document).on('click', '.nav__toggle-switch', function() {
	$(this).closest('.nav__container').find('.nav__menu').toggleClass('nav__menu--visible');
});
