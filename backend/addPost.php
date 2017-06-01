<?php
	require 'database.php';
	
	//pull post data
	$title = $_POST['title'];
	$user_id = $_POST['user_id'];
	$link = $_POST['link']; // optional because below
	$media = $_POST['media'];  // if the post is not a link the media will be added to the server and given a filepath
	$description = $_POST['description'];
	$type = $_POST['type']; // video or music file etc
	$category = $_POST['category'];
	
	$stmt = $mysqli->prepare("INSERT INTO `posts` (`title`, `user_id`, `link`, `media`, `timestamp`, `description`,
																 `post_type`, `post_category`)
						 		VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?);");
	
	if (! $stmt) {
		echo json_encode ( array (
				"success" => false,
				"message" => $mysqli->error
		) );
		exit ();
	}
	
	$stmt->bind_param ( "sssssss", $title, $user_id, $link, $media, $description, $type, $category );
	
	$stmt->execute ();
	
	$stmt->close ();
	
	echo json_encode ( array (
			"success" => true
	) );
	
	
?>