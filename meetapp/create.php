<?php
session_start();
if(!empty($_SESSION['login_user']))
{
	readfile("create.html");
}
else
{
readfile("welcome.html");
}

?>