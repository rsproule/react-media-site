<?php
	require 'database.php';

	$user_id = $_POST['user_id'];

	$stmt = $mysqli->prepare("SELECT uniqueId from users WHERE user_id=?");

	if (!$stmt) {
		echo json_encode ( array (
				"success" => false,
				"message" => $mysqli->error
		) );
		exit ();
	}

	$stmt->bind_param('s', $user_id);
	
	$stmt->execute();
	
	$stmt->bind_result($unique_id);

	$stmt->fetch();

	$stmt->close();

	echo json_encode( array(
		'success' => true,
		'DB_unique_id' => $unique_id
	));
?>