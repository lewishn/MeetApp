$(function() {
	
	$("#forget").click(function() {
		
		var email = $("#email").val();
		
		
		
			
		if ($.trim(email).length == 0)
		{
			
			// empty
			$("#alertmessage").addClass('alert-warning');
			$("#alertmessage").removeClass('alert-info');
			$("#forgetpassword").html("Email can't be empty");
			$("#alertmessage").show();
		}
		else
		{
			// okay email
			
			// ajax send
			
			// back to welcome
			var dataString = "email="+email;
			//alert(dataString);
			
			$.ajax({
				type: "POST",
				url: "forget.php",
				data: dataString,
				cache: false,
				success: function(data){
					
					if(data)
					{
						//or
						console.log(data);
						//alert("Success");
						window.location.href = "welcome.html";
					}
					else
					{
						$("#alertmessage").addClass('alert-warning');
						$("#alertmessage").removeClass('alert-info');
						$("#forgetpassword").html("Invalid Email");
						$("#alertmessage").show();
					}
				}
			})
			
			
		}
	
		
		return false;
	});
});