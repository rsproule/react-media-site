<?php
require 'database.php';
 
$username = $_POST['username'];
$pwd_guess = $_POST['password'];


// Use a prepared statement
$stmt = $mysqli->prepare("SELECT COUNT(*), username, password_hash, user_id, uniqueID FROM users WHERE username=?");
if (!$stmt) {
	echo json_encode ( array (
			"success" => false,
			"message" => $mysqli->error
	) );
	exit ();
}
 
$stmt->bind_param('s', $username);

$stmt->execute();
 
// Bind the results
$stmt->bind_result($cnt, $username, $pwd_hash, $user_id, $uniqueID);
$stmt->fetch();
$stmt -> close();
if( $cnt == 1 && password_verify($pwd_guess, $pwd_hash)){	
	echo json_encode(array(
		"success" => true,
		"user_id" => $user_id,
		"unique_id" => $uniqueID
	));
	exit;
}else{
	echo json_encode(array(
		"success" => false,
		"message" => "Incorrect Username or Password"
	));
	exit;
}
?>