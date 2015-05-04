<?php
	include("db.php");
	session_start();
	if(isset($_POST['email'])))
	{
		$email=mysqli_real_escape_string($db,$_POST['email']); 	
		
		$result=mysqli_query($db,"SELECT uid,name FROM user WHERE email='$email'");
		$count=mysqli_num_rows($result);
		$row=mysqli_fetch_array($result,MYSQLI_ASSOC);
		// If result matched $username and $password, table row  must be 1 row
		if($count==1)
		{
			$_SESSION['login_user']=$row['uid'];
			$_SESSION['login_name']=$row['name'];//Storing user session value.
			echo $row['uid'];
		}
	}
?>