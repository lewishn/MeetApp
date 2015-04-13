$(function()
{
	/*
	$("#1").checkboxX({threeState: false, size:'lg'});
	$("#2").checkboxX({threeState: false, size:'lg'});
	$("#3").checkboxX({threeState: false, size:'lg'});
	$("#4").checkboxX({threeState: false, size:'lg'});
	$("#5").checkboxX({threeState: false, size:'lg'});
	$("#6").checkboxX({threeState: false, size:'lg'});
	$("#0").checkboxX({threeState: false, size:'lg'});
	*/
	$("#create").click(function()
	{
		var x = $(".time").html();
		x = x + "<span class='glyphicon glyphicon-user' aria-hidden='true'></span>";
		$(".time").html(x);
	});
	
});