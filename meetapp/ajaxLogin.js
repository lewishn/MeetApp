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
			$("#error").html("Error: Info can't be empty");
		return false;
	});
});



// Note, these have to be outside here or it won't work.
/*
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

//Google Login
function doGoogleLogin() {
	var user_id, user_name, user_image_url;

	gapi.client.load('plus', 'v1', function() {
		  var request = gapi.client.plus.people.get({
		    'userId': 'me'
		  });
		  request.execute(function (resp){
		    if(resp.id){
		      user_id = "google" + resp.id;
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
	console.log("GOOGLE LOGIN");
	console.log(user_id);
	console.log(user_name);
	console.log(user_image_url);

}
*/
/**************************FACEBOOK****************************/
window.fbAsyncInit = function() {
	FB.init({
		appId      : '1381181512206767',
		//status : true,
		xfbml      : true,
		version    : 'v2.3'
	});
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
	FB.getLoginStatus(function(response) {
  		statusChangeCallback(response);
	});
}

function statusChangeCallback(response) {	
	if (response.status === 'connected') {
		// connected
		var user_id, user_name, user_image_url;
		FB.api("/me", function (apiResponse) {
			if (apiResponse && ! apiResponse.error) {
				user_id = apiResponse.id;
				user_name = apiResponse.name;
			}
		});

		FB.api("/me/picture", function (apiResponse) {
			if (apiResponse && ! apiResponse.error) {
				user_image_url = apiResponse.data.url;
			}
		});

		//do whatever AJAX you want here (should be exactly the same as google version)
		//Can just call the function
		var name = user_name;
		var email = user_id;
		var dataString = "name=" + name+ "&email=" + email;
		
		console.log("FACEBOOK LOGIN");
		console.log(user_name);
		console.log(user_id);
		if($.trim(email).length>0 && $.trim(name).length > 0)
		{
			$.ajax({
				type: "POST",
				url: "facebookLogin.php",
				data: dataString,
				cache: false,
				beforeSend: function(){ $("#join").val('Connecting...');},
				success: function(data){
					console.log(data);
					if (data)
					{
						//or
						console.log(data);
						//alert("Success");
						window.location.href = "manage.php";
					}
					else
					{
						//console.log("FAIL REGISTER");
						$("#join").val("Join");
						$("#error").html("Error: Invalid email or password. ");
					}
				}
			})
		}
		else
		 $("#error").html("Error: Name, Email, and Password cannot be empty");
		return false;
	
	} else if (response.status === 'not_authorized') {
	// The person is logged into Facebook, but not MeetApp.
		
	} else {
		//Not logged into Facebook
		console.log("Not logged in to facebook");
	}
}
