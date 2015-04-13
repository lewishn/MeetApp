<?php
	include("db.php");
	session_start();
	if(isset($_GET["data"]))
	{
		$eid = $_GET["data"];
		
		error_log($eid);
		
		$temp = array();
		
		$getEventInfo = "SELECT name, duration, owner, ownerid, mode, startD, endD, startT, endT, displayDay, finalize FROM event WHERE eid = '$eid'";
		$res = $db -> query($getEventInfo);
		$row = mysqli_fetch_row($res);
		array_push($temp, $row[0], $row[1], $row[2], $row[3], $row[4],$row[5], $row[6],$row[7], $row[8], $row[9], $row[10]);
		
		$json = array();
		$json[] = array($eid => $temp);
		$passToJS = json_encode($json);
		error_log($passToJS);
		echo $passToJS;
		
	}
?>