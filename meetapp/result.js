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

	
});