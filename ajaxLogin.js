$(document).ready(function()
{
	$('#login').click(function()
	{
		$("#error").html('');
		var email = $("#loginemail").val();
		var pwd = $("#loginpwd").val();
		var dataString = 'email=' + email + '&password='+pwd;
		
		if($.trim(email).length>0 && $.trim(pwd).length>0)
		{
			$.ajax({
				type: "POST",
				url: "ajaxLogin.php",
				data: dataString,
				cache: false,
				beforeSend: function(){ $("#login").val('Connecting...');},
				success: function(data){
					console.log(data);
					if(data)
					{
						//or
						console.log(data);
						alert("SUCCESS LOGIN");
						window.location.href = "manage.php";
					}				
					else
					{
						alert("FAIL LOGIN");
						$("#login").val("Login");
						$("#error").html("Error: Invalid email or password. ");
					}
				}
			})
		}
		else
			$("#error").html("Error: Email, and Password cannot be empty");
		return false;
	});
});