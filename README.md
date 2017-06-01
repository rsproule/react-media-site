# React Media Site #

### Created By: Ryan Sproule ###

## What is this App? ##

The React media app is a reddit style social media site where the users can add media links or upload videos. In the main app view the media files are displayed embedded in the feed where the user can press an expand button to view it. 
Media file types include video, audio and images. The video can be posted as either a link or an uploaded file, the uploaded files are hosted on my ec2 instance. Whenever a user posts a link it is converted into an embedded version server side and then displayed in an iframe client side. Video link formats that are supported so far: Youtube, vimeo, and dailymotion. Audio works the same way. Audio links that are supported: Spotify and soundcloud. All image links and file types are suported.
