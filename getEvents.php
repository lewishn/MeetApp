<?php
	include("db.php");
	session_start();
	if(isset($_SESSION["login_user"]))
	{
		$uid = $_SESSION["login_user"];
		
		error_log($uid);
		
		// generate random unique url
	
		/*
		$email=mysqli_real_escape_string($db,$_POST['email']); 	
		$pwd=md5(mysqli_real_escape_string($db,$_POST['password'])); 
		
		$result=mysqli_query($db,"SELECT uid,name FROM user WHERE email='$email' and pwd='$pwd'");
		$count=mysqli_num_rows($result);
		$row=mysqli_fetch_array($result,MYSQLI_ASSOC);
		*/
		// add all event to user table
		/*
		$getEvent = $db -> prepare("SELECT event FROM user WHERE uid =?");
		$getEvent -> bind_param("i", $input["owner"]);
		$getEvent -> execute();
		$getEvent -> store_result();
		$result = $getEvent->get_result();
		$row = $result -> fetch_assoc();
		*/
		
		$getEvent = "SELECT event FROM user WHERE uid ='$uid'";
		$res = pg_query($getEvent);
		$row = pg_fetch_row($res);
		$eventArray = $row[0];
		$eventArray = unserialize($eventArray);
		
		$json = array();
		
		for ($i = 0; $i < count($eventArray); $i++)
		{
			$eid = $eventArray[$i];
			error_log($eid);
			$temp = array();
			// query info for each event
			$getData = "SELECT name, duration, owner, finalize FROM event WHERE uid = '$eid'";
			$res = pg_query($getData);
			while ($row = pg_fetch_row($res))
			{
				array_push($temp,$row[0],$row[1],$row[2],$row[3]);
				$json[] = array($eid => $temp);
			}
		}
		
		$passToJS = json_encode($json);
		error_log($passToJS);
		echo $passToJS;
		
		
	}
?>