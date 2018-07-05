
var copyright = $(document).find('[copyright-year]');

if (copyright) { copyright[0].innerHTML = (new Date()).getFullYear(); }
