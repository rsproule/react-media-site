import React, { Component } from 'react';
import Feed from './Feed';
import UserInfoSideBar from './UserInfoSideBar';
import '../CSS/profile.css';


class Profile extends Component{

	componentDidMount(){
		
	}

	render(){
		return(
			<div className="profile-page-container">
				<h1>Profile Page</h1>

				<div className="user-sideinfo-container">
					<UserInfoSideBar/> 
				</div>

				<div className="profile-feed-container">
					<h2>Users Posts:</h2>
					<Feed/>  {/* Users posts only... may need to do this differently than the main page feed */}
				</div>
			</div>
		)
	}
}

export default Profile;