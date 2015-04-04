<?php
	include("db.php");
	session_start();
	if(isset($_POST['email']) && isset($_POST['password']) && isset($_POST['name']))
	{
		$name=mysqli_real_escape_string($db,$_POST['name']); 	
		$email=mysqli_real_escape_string($db,$_POST['email']); 	
		$pwd=md5(mysqli_real_escape_string($db,$_POST['password'])); 
		
		$result=mysqli_query($db,"SELECT uid FROM user WHERE email='$email'");
		$count=mysqli_num_rows($result);
		$row=mysqli_fetch_array($result,MYSQLI_ASSOC);
		// If result matched $username and $password, table row  must be 1 row
		if($count==0)
		{
			$addquery = mysqli_query($db, "INSERT INTO user (name,email,pwd) VALUES('$name','$email','$pwd')");
			$result=mysqli_query($db,"SELECT uid,name FROM user WHERE email='$email'");
			$row=mysqli_fetch_array($result,MYSQLI_ASSOC);
			$_SESSION['login_user']=$row['uid'];
			$_SESSION['login_name']=$row['name'];//Storing user session value.
			echo $row['uid'];
		}
		
	}
	
?>