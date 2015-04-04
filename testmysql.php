<?php 
	require_once 'db.php';
	

	if ($db->connect_errno)
		exit("Failed" . $db->connect_errno . " ". $db->connect_error);
	else echo "OK";
?> 