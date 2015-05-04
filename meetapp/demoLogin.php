<?php
	include("db.php");
	session_start();
	
	ob_start();
	
	$_SESSION['login_user']= 1;
	$_SESSION['login_name']= "Stranger";//Storing user session value.
	
	header("Location: create.php");
	
?>