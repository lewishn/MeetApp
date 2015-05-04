<?php
	include("db.php");
	session_start();
	if(isset($_POST['uid']) && isset($_POST['password']))
	{
		$uid = mysqli_real_escape_string($db,$_POST['uid']);
		$pwd=md5(mysqli_real_escape_string($db,$_POST['password'])); 
		error_log($uid);
		error_log($pwd);
		$result=mysqli_query($db,"UPDATE user SET pwd='$pwd' WHERE uid='$uid'");
		echo 'ok';
	}
?>