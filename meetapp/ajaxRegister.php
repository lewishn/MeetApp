<?php
	include("db.php");
	session_start();
	if(isset($_POST['email']) && isset($_POST['password']) && isset($_POST['name']))
	{
		$name = pg_escape_string($db,$_POST['name']); 	
		$email = pg_escape_string($db,$_POST['email']); 	
		$pwd = md5(pg_escape_string($db,$_POST['password'])); 
		
		$result = pg_query($db,"SELECT uid FROM user WHERE email='$email'");
		$count = pg_num_rows($result);
		$row = pg_fetch_array($result, PGSQL_ASSOC);
		// If result matched $username and $password, table row  must be 1 row
		if($count == 0)
		{
			$addquery = pg_query($db, "INSERT INTO user (name,email,pwd) VALUES('$name','$email','$pwd')");
			$result = pg_query($db,"SELECT uid,name FROM user WHERE email='$email'");
			$row = pg_fetch_array($result, PGSQL_ASSOC);
			$_SESSION['login_user']=$row['uid'];
			$_SESSION['login_name']=$row['name'];//Storing user session value.
			echo $row['uid'];
		}
		
	}
	
?>