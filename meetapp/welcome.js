$(document).ready(function() {
	
	init();
	formredirect();
	joinbutton();
	loginbutton();
});

function init()
{
	$("#form-signin").hide();
}

function joinbutton()
{
	$("#ChangeJoin").click(function() {
		$("#form-signup").show();
		$("#form-signin").hide();
		
	});
}

function loginbutton()
{
	$("#ChangeLogin").click(function() {
		$("#form-signin").show();
		$("#form-signup").hide();
		
	});
}

function formredirect()
{
}
