<?php
//makes connection to the database
$mysqli = new mysqli('localhost', 'wustl_inst', 'wustl_pass', 'summerProj');

if($mysqli->connect_errno) {
	printf("Connection Failed: %s\n", $mysqli->connect_error);
	exit;
}
?>