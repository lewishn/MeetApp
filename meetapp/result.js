$(function()
{
	var p2 = window.location.host;
	var p3 = window.location.pathname;
	p3 = p3.substring(0, p3.lastIndexOf("/") + 1);
	
	var eventKey = $.cookie('ekey');
	var newURL = p2 + p3 + "view.php?e="+eventKey;
	console.log(eventKey);
	$("#key").html(newURL);

	var addAgain = $.cookie('addagain');
	if (addAgain == 1) $("#title").html("OK!");
	
	$.removeCookie('ekey');
	$.removeCookie('addagain');

	window.fbAsyncInit = function() {
		FB.init({
			appId      : '1603365533241044',
			//status : true,
			xfbml      : true,
			version    : 'v2.3'
			});

		$(".panel-body").html(
			"<div class='fb-send' data-href='"+ newURL +"' data-width='300' data-height='100' data-colorscheme='dark'></div>"
		);
		FB.XFBML.parse();
	};

	(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/en_US/sdk.js";
		  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
});