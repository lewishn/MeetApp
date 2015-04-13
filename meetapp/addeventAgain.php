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
		$uid = $input["owner"];
		
		$getEvent = "SELECT event,name FROM user WHERE uid ='$uid'";
		$res = $db->query($getEvent);
		$row = mysqli_fetch_row($res);
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
		/*
		$addEvent = $db -> prepare("UPDATE user SET event=? WHERE uid =?");
		$addEvent -> bind_param("si", $eventArray, $input["owner"]);
		$addEvent -> execute();
		$addEvent -> close();
		*/
		echo $key;
		// add all data to events
		$displayDayArray = json_encode($input["displayDay"]);
		$responseArray = serialize($input["response"]);
		$commentArray = $input["comment"];
		
		//delete previous event detail
		$deleteEvent = "DELETE FROM event WHERE eid ='$key'";
		$res = $db->query($deleteEvent);
		
		$addData = $db -> prepare("INSERT INTO event (eid,name,duration,owner,ownerid,mode,startD,endD,startT,endT,displayDay,finalize) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)");
		$addData -> bind_param("ssssisssiiss",$key,$input["name"],$input["duration"],$name,$uid,$input["mode"], $input["startD"], $input["endD"], $input["startT"], $input["endT"], $displayDayArray, $input["finalize"]);
		$addData -> execute();
		$addData -> close();
		
		// update new detail
		$addToDetailTable = $db -> prepare("UPDATE detail SET response=?, comment=?, lastmode=? WHERE uid=? AND eid=?");
		$addToDetailTable -> bind_param("sssis",$responseArray,$commentArray,$input["mode"],$uid,$key);
		$addToDetailTable -> execute();
		$addToDetailTable -> close();
	}
?>