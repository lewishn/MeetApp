<?php
session_start();
if(!empty($_SESSION['login_user']))
{
	readfile("setting.html");
}
else
{
readfile("welcome.html");
}

?>