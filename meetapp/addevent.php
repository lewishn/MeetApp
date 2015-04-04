<?php
	include("db.php");
	session_start();
	if(isset($_GET['data']))
	{
		$data = $_GET['data'];
		
		error_log($data);
		$input = json_decode($data,true);
		// generate random unique url
		while (true)
		{
			$key = md5(uniqid());
			$key = substr($key,0,6);
			$result = pg_query($db,"SELECT uid FROM event WHERE uid='$key'");
			$count = pg_num_rows($result);
			
			if ($count == 0) break;
		}
		error_log($key);
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
		$uid = $input["owner"];
		
		$getEvent = "SELECT event,name FROM user WHERE uid ='$uid'";
		$res = $db->query($getEvent);
		$row = pg_fetch_row($res);
		$eventArray = $row[0];
		$name = $row[1];
		error_log($name);
		$eventArray = unserialize($eventArray);
		
		
		if ($eventArray == "") 
		{
			
			$eventArray = array();
		}
		array_push($eventArray,$key);
		$eventArray = serialize($eventArray);
		
		$test = unserialize($eventArray);
		
		$addEvent = $db -> prepare("UPDATE user SET event=? WHERE uid =?");
		$addEvent -> bind_param("si", $eventArray, $input["owner"]);
		$addEvent -> execute();
		$addEvent -> close();
		
		echo $key;
		// add all data to events
		$displayDayArray = json_encode($input["displayDay"]);
		$responseArray = json_encode($input["response"]);
		$commentArray = json_encode($input["comment"]);
		$addData = $db -> prepare("INSERT INTO event (uid,name,duration,owner,mode,startD,endD,startT,endT,displayDay,response,comment) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)");
		$addData -> bind_param("sssssssiisss",$key,$input["name"],$input["duration"],$name,$input["mode"], $input["startD"], $input["endD"], $input["startT"], $input["endT"], $displayDayArray, $responseArray, $commentArray);
		$addData -> execute();
		$addData -> close();
		
	}
?>