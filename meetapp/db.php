<?php
	/*
	define("db_host","localhost");
	define("db_uid","root");
	define("db_pwd","");
	define("db_name","meetapp");
	
	$db = new mysqli(db_host,db_uid,db_pwd,db_name);
	*/

	function pg_connection_string_from_database_url() {
 		extract(parse_url($_ENV["DATABASE_URL"]));
 		return "user=$user password=$pass host=$host dbname=" . substr($path, 1); # <- you may want to add sslmode=require there too
	}
	
	$pg_conn = pg_connect(pg_connection_string_from_database_url());
?>