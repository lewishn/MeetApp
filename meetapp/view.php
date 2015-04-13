<?php
	session_start();
	if (!empty($_SESSION['login_user']))
	{
		echo "yes";
		//readfile("view.html?e="+$_GET['e']);
		$str = "view.html?e=" . $_GET['e'];
		
		header("Location: $str");
	}
	else
	{
		readfile("welcome.html");
	}
?>