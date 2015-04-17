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
						//alert("SUCCESS LOGIN");
						window.location.href = "manage.php";
					}				
					else
					{
						//alert("FAIL LOGIN");
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



// Note, these have to be outside here or it won't work.
(function() {
	var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	po.src = 'https://apis.google.com/js/client:plusone.js?onload=signinCallback';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();

function signinCallback(authResult) {
	if (authResult['status']['signed_in']) {
	    doGoogleLogin();
	} else {
	    console.log('Sign-in state: ' + authResult['error']);
	}
}

function doGoogleLogin() {
	var user_id, user_name, user_image_url;

	gapi.client.load('plus', 'v1', function() {
		  var request = gapi.client.plus.people.get({
		    'userId': 'me'
		  });
		  request.execute(function (resp){
		    console.log(resp);
		    if(resp.id){
		      user_id = resp.id;
		    }
		    if(resp.displayName){
		      user_name = resp.displayName;
		    }
		    if(resp.image && resp.image.url){
		      user_image_url = resp.image.url;
		    }
		});
	});

	// do ajax whatever here.
	
}