<?php
	require 'database.php';
	
	$first_name = $_POST['first_name'];
	$last_name = $_POST['last_name'];
	$username = $_POST['username'];
	$raw_password = $_POST['password'];
	$password_hash = password_hash($raw_password, PASSWORD_DEFAULT);
	$unique_id = password_hash($username, PASSWORD_DEFAULT);

	
	$stmt = $mysqli->prepare("INSERT INTO users (first_name, last_name, username, password_hash, uniqueID) VALUES (?, ?, ?, ?, ?)");
	if(!$stmt){
		echo json_encode ( array (
				"success" => false,
				"message" => $mysqli->error
		) );
		exit ();
	}
	
	$stmt->bind_param('sssss', $first_name, $last_name, $username, $password_hash, $unique_id);
	
	$stmt->execute();
	
	$stmt->close();
	
	echo json_encode ( array (
			"success" => true,
			'first_name' => $first_name,
			'last_name' => $last_name,
			'username' => $username,
			'password' => $password_hash,
			'unique_id' => $unique_id
			
	) );
	
?>