<?php
	include("db.php");
	session_start();
	if(isset($_POST['email']))
	{
		$email = mysqli_real_escape_string($db,$_POST['email']);
		
		$result=mysqli_query($db,"SELECT uid FROM user WHERE email='$email'");
		$count=mysqli_num_rows($result);
		$row=mysqli_fetch_array($result,MYSQLI_ASSOC);
		
		if ($count == 1)
		{
			// valid email
			
			$random = mt_rand(10000000,99999999);
			// generate new password
			$pwd=md5(mysqli_real_escape_string($db,(string)$random)); 
			$result=mysqli_query($db,"UPDATE user SET pwd='$pwd' WHERE email='$email'");
			
			// send email
			$to = $email;
			$subject = "MeetApp Password Recovery";
			
			$message = "
			<html>
			<head>
			<title>MeetApp</title>
			</head>
			<body>
			<p>Hi there,</p>
			<p>This is your new password $random </p>
			<p>Login <a href = 'meetapp.biz'>here</a></p>
			</body>
			</html>
			";
			
			// Always set content-type when sending HTML email
			$headers = "MIME-Version: 1.0" . "\r\n";
			$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
			
			if (mail($to,$subject,$message,$headers))
			{
				echo 'ok';
			}
		}
		
		// email invalid
		
	}
?>