<?php
	include("db.php");
	session_start();
	if(isset($_GET['data']))
	{
		$data = $_GET['data'];
		
		error_log($data);
		$input = json_decode($data,true);
		// generate random unique url
		$key = $_GET['key'];
		error_log($key);
		$uid = $input["user"];
		
		$getEvent = "SELECT event,name FROM user WHERE uid ='$uid'";
		$res = $db->query($getEvent);
		$row = mysqli_fetch_row($res);
		$eventArray = $row[0];
		$name = $row[1];
		error_log($name);
		$eventArray = unserialize($eventArray);
		
		error_log("CHECK THIS");
		error_log($eventArray);
		if ($eventArray == "") 
		{	
			$eventArray = array();
		}
		
		$isAdd = $_GET['addevent'];
		error_log($isAdd);
		if ($isAdd == "true") 
		{
			error_log("YES");
			array_push($eventArray,$key);
		}
		
		$eventArray = serialize($eventArray);
		
		$test = unserialize($eventArray);
		
		$addEvent = $db -> prepare("UPDATE user SET event=? WHERE uid =?");
		$addEvent -> bind_param("si", $eventArray, $uid);
		$addEvent -> execute();
		$addEvent -> close();
		
		
		// add all data to events
		$responseArray = serialize($input["response"]);
		$commentArray = $input["comment"];
		
		if ($isAdd == "true")
		{
			$addToDetailTable = $db -> prepare("INSERT INTO detail (uid,eid,response,comment,lastmode) VALUES(?,?,?,?,?)");
			$addToDetailTable -> bind_param("issss",$uid,$key,$responseArray,$commentArray,$input["mode"]);
			$addToDetailTable -> execute();
			$addToDetailTable -> close();
		}
		else
		{
			$addToDetailTable = $db -> prepare("UPDATE detail SET response=?, comment=?,lastmode=? WHERE uid=? AND eid=?");
			$addToDetailTable -> bind_param("sssis",$responseArray,$commentArray,$input["mode"],$uid,$key);
			$addToDetailTable -> execute();
			$addToDetailTable -> close();
		}
	}
?>