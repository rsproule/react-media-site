/*
This file contains many of the helper functions used throughout the application.
	includes:
		register_ajax
		login_ajax
		verify_user 
		getcookie and setcookie
		and 

*/
export function register_ajax(callback){
	var first_name = document.getElementById("first-name").value;
	var last_name = document.getElementById("last-name").value;
	var username = document.getElementById("username").value; // Get the username from the form
	var password1 = document.getElementById("password1").value; // Get the password from the form
	var password2 = document.getElementById("password2").value;

	//checks to make sure none of the fields were left blank
	if (field_is_valid(first_name) && field_is_valid(last_name) &&
	 	field_is_valid(username) && field_is_valid(password1) && field_is_valid(password2)) {
		if (password2 !== password1) {
			// try again 
			// return false;
			callback({'success':false, 'message': "Passwords do not match"})
		}else{
			// Make a URL-encoded string for passing POST data:
			var dataString = "first_name=" + encodeURIComponent(first_name) + "&last_name=" + encodeURIComponent(last_name) 
							+ "&username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password1);
			//alertdata(dataString);
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.open("POST", 'http://52.14.73.202/~rsproule/summer/registerUser.php', true); 
			xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xmlHttp.addEventListener("load", function(event){
				var jsonData = JSON.parse(event.target.responseText); 
				if(jsonData.success){ 
					//window.location.href='#/login'; // move to the login screen... maybe better to move to the main screen ill see
					//alert("Registered successful!");
					callback(jsonData);
					document.getElementById("first-name").value = "";
					document.getElementById("last-name").value = "";
					document.getElementById("username").value = ""; // Get the username from the form
					document.getElementById("password1").value = ""; // Get the password from the form
					document.getElementById("password2").value = "";
				}
				else{
					alert("You were not registered.  " + jsonData.message);
				}
			}, false);
			xmlHttp.send(dataString); 
			}
	}else{
		callback( {'success':false, 'message': "All fields are required"});
	}
}

export function upload_post_ajax(callback, type, user_id, isVerified){
	if (!isVerified) {
		verify_user(user_id, function(result){
			if (result.success) {
				upload_post_ajax(callback, type, user_id, true);
			}
			else{
				callback({'success':false, 'message' : "Unable to verify user, refresh the page."});
			}
		});
	}
	else{

		if (type === "text") {
			var text_title = document.getElementById(type + "-title").value;
			var post = document.getElementById("text-description").value;
			text_post_upload(callback, type, text_title, post, user_id);
		}
		else{

			var title = document.getElementById(type + "-title").value;
			var link = document.getElementById(type + "-link").value;
			var file = document.getElementById(type + "-file").files[0];
			var description = document.getElementById(type + "-description").value;
			

			if (field_is_valid(title) && field_is_valid(description)) {
			}
			else{
				callback({"success":false, 'message': "Posts need a title and a description"});
			}


			//decide what type of post this is... link or file if neither throw error 
			if ( (link === null) || (link === '') ) {
				if (file !== null && file !== '') {
					file_upload(callback, type, title, file, description, user_id);
				}else{
					callback({'success': false, 'message': "The post needs to have a link to a "+ type +" or a " + type + " file."})
				}
			}
			else{
				link_upload(callback, type, title, link, description, user_id, true);
			}
		}
	}
}

export function login_ajax(callback){
	var username = document.getElementById("username").value;
	var pswrd_guess = document.getElementById("password").value;
	if (field_is_valid(username) && field_is_valid(pswrd_guess)) {
			var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(pswrd_guess);
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.open("POST", 'http://52.14.73.202/~rsproule/summer/login.php', true); 
			xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			//Asynchronous part
			xmlHttp.addEventListener('load', function(){
				var jsonData = JSON.parse(xmlHttp.responseText);
				// setCookie('unique_id', jsonData.unique_id, 4);
				callback(jsonData); 

			}, false);

			xmlHttp.send(dataString); 


	}else{
		callback( {'success':false, 'message': "All fields are required"});
	}
}

export function get_posts(callback, current_user_id) {
	var dataString = "user_id=" + encodeURIComponent(current_user_id);

	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", 'http://52.14.73.202/~rsproule/summer/get_posts.php', true); 
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); 
		if(jsonData.success){ 
			callback(jsonData);
		}
		else{
			callback({'success': false, 'message': jsonData.message});
		}
	}, false);
	xmlHttp.send(dataString); 
			
}

export function verify_user(user_id, callback){
	var cookieID  = getCookie('user_id');
	var dataString = "user_id=" + encodeURIComponent(cookieID);
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", 'http://52.14.73.202/~rsproule/summer/verify_user.php', true); 
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	//Asynchronous part
	xmlHttp.addEventListener('load', function(){
		var jsonData = JSON.parse(xmlHttp.responseText);
		if (jsonData.success) {

			var cookieUID = getCookie('unique_id');
			var DBUID = jsonData.DB_unique_id;
			if (cookieUID === DBUID) {
				//this machine matches the database
				callback({'success':true, 'message': "User Verified"})
			}
			else{
				callback({'success':false, 'message': "Unable to verify user"})
			}
		}

	}, false);

	xmlHttp.send(dataString); 	
}

export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function get_file_name(type){
	var file = document.getElementById(type);
	
	if (file === null) {
		return "Upload Video File";
	}else{
		var split = file.value.split("\\");
		var fileName = split[split.length-1]; // the end of the string/array
		if (fileName.length > 25) {  //shorten the name if it is super long 
			fileName = fileName.slice(0, 12) + "..." +fileName.slice(fileName.length-12, fileName.length);
		}

		return fileName;
	}
}

export function check_hide_label(type){
	var linkInput = document.getElementById(type + '-link').value;
	var file = document.getElementById(type+'-file-label');
	if (linkInput !== "") {
		file.setAttribute('class', 'hide-file-label');
	}else{
		file.setAttribute('class', 'file-label')
	}
}

export function hide_link(type) {
	var linkInput = document.getElementById(type + '-link');
	linkInput.setAttribute('class', "hide-file-label");
}
export function show_link(type) {
	var linkInput = document.getElementById(type + '-link');
	linkInput.setAttribute('class', "title-input");
}

export function clear_file(type){
	document.getElementById(type).value = null;
}


// private functions 

function text_post_upload(callback, type, title, post, user_id) {
	// Make a URL-encoded string for passing POST data:
	var dataString = "title=" + encodeURIComponent(title) + "&description=" + encodeURIComponent(post) + "&user_id=" + 
	encodeURIComponent(user_id) + "&link=" + encodeURIComponent('') + "&type=" + encodeURIComponent(type);
	//alertdata(dataString);
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", 'http://52.14.73.202/~rsproule/summer/upload_linkpost.php', true); 
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); 

		if(jsonData.success){ 
			
			callback(jsonData);

			//reset all fields
			document.getElementById("text-title").value = '';
			document.getElementById("text-description").value = '';
			
		}
		else{
			callback('success': false, 'message': "Upload failed. Try again.");
		}
	}, false);
	xmlHttp.send(dataString); 
}

function link_upload(callback, type, title, link, description, user_id, isLink) {
	// Make a URL-encoded string for passing POST data:
	var dataString = "title=" + encodeURIComponent(title) + "&link=" + encodeURIComponent(link) + "&user_id=" +
	 encodeURIComponent(user_id) + "&description=" + encodeURIComponent(description) + "&type=" + encodeURIComponent(type) + "&isLink=" + encodeURIComponent(isLink);
	//alertdata(dataString);
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", 'http://52.14.73.202/~rsproule/summer/upload_linkpost.php', true); 
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); 

		if(jsonData.success){ 
			
			callback(jsonData);

			//reset all fields
			// document.getElementById(type + "-title").value = '';
			// document.getElementById(type + "-link").value = '';
			// document.getElementById(type + "-file").value = ''; // Get the username from the form
			// document.getElementById(type + "-description").value = '';
		}
		else{
			callback({'success': false, 'message': jsonData.message});
		}
	}, false);
	xmlHttp.send(dataString); 
}

function file_upload(callback, type, title, file, description, user_id) {
	var fd = new FormData();
	fd.append("file", file);

	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", 'http://52.14.73.202/~rsproule/summer/upload_filepost.php', true); 
	// xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); 

		if(jsonData.success){
			//calls as a normal link upload but the link is just the path to the file on my server  

			link_upload(callback, type, title, jsonData.path,  description, user_id, false);

			//reset all fields
			document.getElementById(type + "-title").value = '';
			document.getElementById(type + "-link").value = '';
			clear_file(type+'-file');
			document.getElementById(type + "-description").value = '';
		}
		else{
			callback({'success': false, 'message': jsonData.message});
		}
	}, false);
	xmlHttp.send(fd); 

}



function field_is_valid(arg) {
	if (arg === "") {
		return false;
	}else return true;
}

