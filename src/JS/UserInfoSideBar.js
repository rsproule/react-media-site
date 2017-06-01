import React, { Component } from 'react';
import logo from '../logo.svg';


class UserInfoSideBar extends Component{

	constructor(){
		super();
		this.state = {
			'posts' : []
		}
	}

	componentDidMount(){

		
		//get_profile_info(this.handleGetPosts.bind(this));
	}

	handleGetPosts(result){
		if (result.success) {
			this.setState({'posts' : result.posts});
		}
		else{
			console.log("here " + result.message);
		}
	}

	render(){
		return(
			<div>
				<a>firstname LASTNAME</a>
				<br/>
				<a href="#/profilepage" className="username-label">{"@username1"}</a>
				<br/><br/>
			</div>
		)
	}
}

export default UserInfoSideBar;