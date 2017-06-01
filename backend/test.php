<?php
/* ---upload_linkpost.php--- */
// $title = $_POST['title'];
// $link = $_POST['link'];
// $description = $_POST['description'];
// $user_id = $_POST['user_id'];
$title = "blah";
$link = "blh";
$description = "balh";
$user_id = 26;

$stmt = $mysqli->prepare ( "INSERT INTO `posts` (`title`, `user_id`, `link`, `timestamp`, `description`, `post_type`)
								 VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?)" );
if (! $stmt) {
	echo json_encode ( array (
			"success" => false,
			"message" => $mysqli->error 
	) );
	exit ();
}

$stmt->bind_param ( 'ssss', $title, $user_id, $link, $description );

$stmt->execute ();

$stmt->close ();

echo json_encode ( array (
		"success" => true,
		"message" => "Upload Success" 
) );
?>