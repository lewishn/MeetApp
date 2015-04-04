<?php
	session_start();
	$out = array("name" => $_SESSION['login_name'], "id" => $_SESSION['login_user']);
	echo json_encode($out);
?>