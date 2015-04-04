$(document).ready(function()
{
	$('#join').click(function()
	{
		$("#error").html('');
		var name = $("#joinname").val();
		var email = $("#joinemail").val();
		var pwd = $("#joinpwd").val();
		var dataString = "name=" + name+ "&email=" + email + "&password="+pwd;
		
		
		
		
		if($.trim(email).length>0 && $.trim(pwd).length>0 && $.trim(name).length > 0)
		{
			$.ajax({
				type: "POST",
				url: "ajaxRegister.php",
				data: dataString,
				cache: false,
				beforeSend: function(){ $("#join").val('Connecting...');},
				success: function(data){
					console.log(data);
					if(data)
					{
						//or
						console.log(data);
						alert("Success");
						window.location.href = "manage.php";
					}
					else
					{
						console.log("FAIL REGISTER");
						$("#join").val("Join");
						$("#error").html("Error: Invalid email or password. ");
					}
				}
			})
		}
		else
		 $("#error").html("Error: Name, Email, and Password cannot be empty");
		return false;
	});
});