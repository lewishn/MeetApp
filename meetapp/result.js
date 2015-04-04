$(function()
{
	var eventKey = $.cookie('ekey');
	console.log(eventKey);
	$("#key").html("meetapp.org/view.php?e="+eventKey);
});