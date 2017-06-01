<?php
/*    									---upload_linkpost.php---									*/
require 'database.php';

$title = $_POST['title'];
$link = $_POST['link'];
$description = ($_POST['description']);
$user_id = $_POST['user_id'];
$type = $_POST['type'];
$isLink = $_POST['isLink'] == 'true';
$thumbnail = "undefined";
$embeddedLink = "undefined";


	# DO all the annoying link conversions to give us embedded links 
if ($type == 'video') {


	if ($isLink) {
		//because for some reason dailmotion embedded links do not have http: in them 
		if (preg_match('/dailymotion/', $link)) {
			$stuff = convertLinkToEmbedded($link, $type);
			$embeddedLink = $stuff['link'];
			$thumbnail = $stuff['thumbnail']; 
		}
		else {
			//normal scenario
			if(isValidUrl($link)){
				$stuff = convertLinkToEmbedded($link, $type);
				$embeddedLink = $stuff["link"];
				$thumbnail = $stuff['thumbnail'];
			}
			
          else{
              echo json_encode(array(
                  "success" => false,
                  "message" => "Not a valid URL"
                  ));
              exit();
          }

          
      }
  }else{
		//set all the link stuff as null
    $link = "http://52.14.73.202/uploads/".$link;
    $embeddedLink = null;
    $thumbnail = "http://www.ncat.edu/divisions/its/policy/Video%20Clip";

}
}

if ($type == 'image') {
  if ($isLink) {
    if(isValidUrl($link)){
      $thumbnail = $link;
    }else{
      echo json_encode(array(
                  "success" => false,
                  "message" => "Not a valid URL"
                  ));
              exit();
    }
    
  }else{
    $link = "http://52.14.73.202/uploads/".$link;
    $thumbnail = $link;
}

}

if ($type == 'music') {
    if ($isLink) {
        //sanity check
        if(isValidUrl($link)){
          //return the embedded link and the thumbnail
          $ar = convertLinkToEmbedded($link, $type);

          $embeddedLink = $ar['link'];
          $thumbnail = $ar['thumbnail'];

      }

      else{
            //weird soundcloud links fail isValidUrl so here :
        if (preg_match('/soundcloud/', $link)) {
          $stuff = convertLinkToEmbedded($link, $type);
          $embeddedLink = $stuff["link"];
          $thumbnail = $stuff['thumbnail'];
        }
        else{
          echo json_encode(array(
              "success" => false,
              "message" => "Not a valid URL (be sure to have http://)"
              ));
          exit();
        }
    }
  }
  else {
      //file upload 
      //set all the link stuff as null
      $link = "http://52.14.73.202/uploads/".$link;
      $thumbnail = "http://www.acmconsulting.ca/wp-content/uploads/2014/02/File-Audio-icon.png";
  }
}





$stmt = $mysqli->prepare("INSERT INTO `posts` (`title`, `user_id`, `link`, `timestamp`, `description`, `type`, `isLink`, 
  `thumbnail`, `embeddedLink`) VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?, ?, ?)");
if (! $stmt) {
  echo json_encode(array(
   "success" => false,
   "message" => $mysqli->error
   ));
  exit();
}

$stmt->bind_param('ssssssss', $title, $user_id, $link, $description, $type, $isLink, $thumbnail, $embeddedLink);

$stmt->execute();

$stmt->close();

echo json_encode(array(
  "success" => true,
  "message" => "Upload Success"
  ));



function isValidUrl($url){
        // first do some quick sanity checks:
  if(!$url || !is_string($url)){
    return false;
}
        // quick check url is roughly a valid http request: ( http://blah/... ) 
if( ! preg_match('/^http(s)?:\/\/[a-z0-9-]+(\.[a-z0-9-]+)*(:[0-9]+)?(\/.*)?$/i', $url) ){
    return false;
}
        // the next bit could be slow:
  if(getHttpResponseCode_using_curl($url) != 200){
     // if(getHttpResponseCode_using_getheaders($url) != 200){  // use this one if you cant use curl
        return false;
    }else{

    }
        // all good!
    return true;
}

function getHttpResponseCode_using_curl($url, $followredirects = true){
        // returns int responsecode, or false (if url does not exist or connection timeout occurs)
        // NOTE: could potentially take up to 0-30 seconds , blocking further code execution (more or less depending on connection, target site, and local timeout settings))
        // if $followredirects == false: return the FIRST known httpcode (ignore redirects)
        // if $followredirects == true : return the LAST  known httpcode (when redirected)
  if(! $url || ! is_string($url)){
    return false;
}
$ch = @curl_init($url);
if($ch === false){
    return false;
}
        @curl_setopt($ch, CURLOPT_HEADER         ,true);    // we want headers
        @curl_setopt($ch, CURLOPT_NOBODY         ,true);    // dont need body
        @curl_setopt($ch, CURLOPT_RETURNTRANSFER ,true);    // catch output (do NOT print!)
        if($followredirects){
          @curl_setopt($ch, CURLOPT_FOLLOWLOCATION ,true);
            @curl_setopt($ch, CURLOPT_MAXREDIRS      ,10);  // fairly random number, but could prevent unwanted endless redirects with followlocation=true
        }else{
            @curl_setopt($ch, CURLOPT_FOLLOWLOCATION ,false);
        }
//      @curl_setopt($ch, CURLOPT_CONNECTTIMEOUT ,5);   // fairly random number (seconds)... but could prevent waiting forever to get a result
//      @curl_setopt($ch, CURLOPT_TIMEOUT        ,6);   // fairly random number (seconds)... but could prevent waiting forever to get a result
//      @curl_setopt($ch, CURLOPT_USERAGENT      ,"Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1");   // pretend we're a regular browser
        @curl_exec($ch);
        if(@curl_errno($ch)){   // should be 0
          @curl_close($ch);
          return false;
      }
        $code = @curl_getinfo($ch, CURLINFO_HTTP_CODE); // note: php.net documentation shows this returns a string, but really it returns an int
        @curl_close($ch);
        return $code;
    }

    function getHttpResponseCode_using_getheaders($url, $followredirects = true){
        // returns string responsecode, or false if no responsecode found in headers (or url does not exist)
        // NOTE: could potentially take up to 0-30 seconds , blocking further code execution (more or less depending on connection, target site, and local timeout settings))
        // if $followredirects == false: return the FIRST known httpcode (ignore redirects)
        // if $followredirects == true : return the LAST  known httpcode (when redirected)
        if(! $url || ! is_string($url)){
          return false;
      }
      $headers = @get_headers($url);
      if($headers && is_array($headers)){
          if($followredirects){
                // we want the the last errorcode, reverse array so we start at the end:
            $headers = array_reverse($headers);
        }
        foreach($headers as $hline){
                // search for things like "HTTP/1.1 200 OK" , "HTTP/1.0 200 OK" , "HTTP/1.1 301 PERMANENTLY MOVED" , "HTTP/1.1 400 Not Found" , etc.
                // note that the exact syntax/version/output differs, so there is some string magic involved here
                if(preg_match('/^HTTP\/\S+\s+([1-9][0-9][0-9])\s+.*/', $hline, $matches) ){// "HTTP/*** ### ***"
                $code = $matches[1];
                return $code;
            }
        }
            // no HTTP/xxx found in headers:
        return false;
    }
        // no headers :
    return false;
}


function convertLinkToEmbedded($link, $type){
 if ($type == 'video') {
    			//YouTube case:
  if(preg_match('/(?:[?&]v=|\/embed\/|\/1\/|\/v\/|https:\/\/(?:www\.)?youtu\.be\/)([^&\n?#]+)/', $link, $match)){
    $link = "https://www.youtube.com/embed/".$match[1];
    $thumbnail = 'http://img.youtube.com/vi/'.$match[1].'/0.jpg';
    $ar = array(
     'link' => $link,
     'thumbnail' => $thumbnail
     );
    return $ar;

}
				//Vimeo case
else if(preg_match("/(https?:\/\/)?(www\.)?(player\.)?vimeo\.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/", $link, $output_array)){
   $id = $output_array[5];
   $nlink ='https://player.vimeo.com/video/'.$id;
   $data = file_get_contents("http://vimeo.com/api/v2/video/".$id.".json");
   $data = json_decode($data);
   $thumbnail = $data[0]->thumbnail_medium;
   $stuff = array(
     "link" => $nlink,
     "thumbnail" => $thumbnail
     );
   return $stuff;

}

else if (preg_match('/(?:dailymotion\.com(?:\/video|\/hub)|dai\.ly)\/([0-9a-z]+)(?:[\-_0-9a-zA-Z]+#video=([a-z0-9]+))?/', $link, $m)) {
   $nlink = '//www.dailymotion.com/embed/video/'. $m[1];
   $thumbnail = 'http://www.dailymotion.com/thumbnail/video/'.$m[1];
   $ar = array(
    'link' => $nlink,
    'thumbnail' => $thumbnail
    );
   return $ar;

}

else {
  echo json_encode(array(
   "success" => false,
   "message" => "Not a supported video link"
   ));
  exit();
}


// music
}
else if ($type == 'music') {
        //soundcloud version
    if (preg_match('/soundcloud/', $link)) {
      $eLink = "https://w.soundcloud.com/player/?url=".$link."&amp;auto_play=false&amp;buying=true&amp;liking=true&amp;download=true&amp;sharing=true&amp;show_artwork=true&amp;show_comments=true&amp;show_playcount=true&amp;show_user=true&amp;hide_related=false&amp;visual=true&amp;start_track=0&amp;callback=true";



      $ar = array(
        "link" => $eLink,
        "thumbnail" => "http://www.vectorsland.com/imgd/l75667-soundcloud-logo-63098.png"
        );
      return $ar;
  }
  else if (preg_match('/spotify/', $link)) {
      if (preg_match("/https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:track\/|\?uri=spotify:track:)((\w|-){22})/", $link, $match)) {
        $trackId = $match[1];
        $emd = "https://open.spotify.com/embed?uri=spotify:track:".$trackId;

          $url = "https://open.spotify.com/oembed?url=http://open.spotify.com/track/".$trackId;
          $ch = curl_init();
          $timeout = 5;
          curl_setopt($ch, CURLOPT_URL, $url);
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
          curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
          $data = curl_exec($ch);
          curl_close($ch);
          $trackDataJson = json_decode($data);
          foreach ($trackDataJson as $k => $v) {
              if($k == "thumbnail_url"){
                  $thumbUrl = $v;
              }
          }

        $ar = array(
          'link' => $emd,
          'thumbnail' => $thumbUrl
          );
        return $ar;
     }else{
        echo json_encode(array(
       "success" => false,
       "message" => "Not a supported spotify link, you can only link a single track"
       ));
      exit();
     }

}



}

}
?>