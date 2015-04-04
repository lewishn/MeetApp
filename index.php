<?php
session_start();
if(!empty($_SESSION['login_user']))
{
	header('Location: manage.php');
}
else
{
readfile("welcome.html");
}

?>