# React Media Site #

### Created By: Ryan Sproule ###

## What is this App? ##

  The React media app is a reddit style social media site where the users can add media links or upload videos. In the main app view the media files are displayed embedded in the feed where the user can press an expand button to view it. 
Media file types include video, audio and images.
  Video can be posted as either a link or an uploaded file, the uploaded files are saved on an apache server where the SQL database and PHP files are being served. Whenever a user posts a link it is converted into an embedded version server side and then displayed in an iframe client side. Video link formats that are supported so far: Youtube, vimeo, and dailymotion. Audio works the same way. Audio links that are supported: Spotify and soundcloud. All image links and file types are suported.


## Why did I create this? ## 

   The original motivation to make a social network site like this was to apply a mutual friends finder via a matrix map reduce that I created for a class. I have yet to implement the social network aspect but working on that now, but the app as it currently is works fully and has a satisfying UI for hosting some of my favorite videos, songs and pictures. 
