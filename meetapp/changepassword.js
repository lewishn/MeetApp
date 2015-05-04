$(function() {
	
	$("#alertmessage").hide();
	$("#changepwd").click(function() {
		
		var pwd1 = $("#password1").val();
		var pwd2 = $("#password2").val();
		
		console.log(pwd1);
		console.log(pwd2);
		
		if (pwd1 == pwd2)
		{
			
			if ($.trim(pwd1).length == 0)
			{
				
				// empty
				$("#wrongpassword").html("Passwords can't be empty");
				$("#alertmessage").show();
			}
			else
			{
				// same password
				
				// ajax change password
				var dataString = "uid="+uid+"&password="+pwd1;
				
				
				
				$.ajax({
					type: "POST",
					url: "changePassword.php",
					data: dataString,
					cache: false,
					success: function(data){
						
						if(data)
						{
							//or
							console.log(data);
							//alert("Success");
							window.location.href = "manage.php";
						}
						else
						{
							$("#wrongpassword").html("Something is wrong !!!!");
							$("#alertmessage").show();
						}
					}
				})
				
				
				
				// redirect back to manage
			}
		}
		else
		{
			// show alert
			$("#wrongpassword").html("Passwords don't match");
			$("#alertmessage").show();
			$("#password1").val("");
			$("#password2").val("");
		}
		
		return false;
	});
});