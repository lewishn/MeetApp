<?php
session_start();
if(!empty($_SESSION['login_user']))
{
	readfile("manage.html");
}
else
{
readfile("welcome.html");
}

?>