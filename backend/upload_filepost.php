<?php
//upload file posts 

// If the name of the image is not in this array, the app didn't post anything.

if (empty ( $_FILES ["file"] )) {
	echo json_encode(array(
			"success" => false,
			"message" => "file is empty"
		));
		exit();
}
else {
	// Setup a filename for the file. Uniqid can be changed to anything, but this makes sure
	// that every file doesn't overwrite anything existing.
	$filename = uniqid(). '-' . basename($_FILES['file']['name']);
	// If the server can move the temporary uploaded file to the server
	if (move_uploaded_file ( $_FILES ['file'] ['tmp_name'], '/var/www/html/uploads/' . $filename )) {
		echo json_encode(array(
			"success" => true,
			"message" => "File Uploaded Successfully",
			"path" =>  $filename
		));
		exit();

	} else {
		echo json_encode(array(
			"success" => false,
			"message" => "Unable to move file, file cannot be larger than 50 MB for now."
		));
		exit();
		// $response ['message'] = "" . $_FILES ["file"] ["error"];
		// $response ['name'] = "" . $_FILES ["file"] ["name"];
		// $response ['path'] = "" .'/home/rsproule/hoot_images/' . $filename;
		// $response ['type'] = "" . $_FILES ["file"] ["type"];
	}
}


?>