<?php
require 'database.php';

// recieve all post data
$user_id = $_POST ['user_id'];

//for now just query every single post 
$stmt = $mysqli->prepare ( "SELECT * FROM posts INNER JOIN users ON users.user_id=posts.user_id ORDER BY posts.timestamp DESC LIMIT 500" );


if (! $stmt) {
	echo json_encode ( array (
			"success" => false,
			"message" => $mysqli->error 
	) );
	exit ();
}

$stmt->execute ();

$result = $stmt->get_result ();

$i = 0;
while ( $row = $result->fetch_assoc () ) {

	// turn the hoot data into an array
	$posts [$i] = array (
			"title" => $row['title'],
			"link" => $row['link'],
			"description" => $row['description'],
			"type" => $row['type'],
			"isLink" => $row['isLink'],
			"thumbnail" => $row['thumbnail'],
			"embeddedLink" => $row['embeddedLink'],
			"user" => array (
				"first" => $row['first_name'],
				"last"  => $row['last_name'] ,
				"username" => $row['username'],
				"picture" => $row['profile_picture'],
				"user_id" => $row['user_id']
			)
	);
	$i ++;
}

$stmt->close ();


echo json_encode ( array (
		"success" => true,
		"posts" => $posts, 
		
) );

?>