<?php
	include("db.php");
	session_start();
	if(isset($_GET["data"]))
	{
		$eid = $_GET["data"];
		
		error_log($eid);
		$json = array();
		
		$getEventInfo = "SELECT user.uid, user.name, detail.response, detail.comment, detail.lastmode FROM detail INNER JOIN user ON detail.eid = '$eid' AND user.uid = detail.uid";
		$res = $db -> query($getEventInfo);
		while ($row = mysqli_fetch_row($res))
		{
			$temp = array();
			array_push($temp,$row[1], unserialize($row[2]), $row[3], $row[4]);
			$json[] = array($row[0] => $temp);
		}
		
		$passToJS = json_encode($json);
		error_log($passToJS);
		echo $passToJS;
		
	}
?>