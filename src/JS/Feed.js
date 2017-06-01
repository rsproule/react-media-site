import React, { Component } from 'react';
import '../CSS/feed.css';
import Post from './Post';
import {get_posts} from './utils';

class Feed extends Component{
	constructor(){
		super();
		this.state = {
			'posts' : []
		}
	}

	componentDidMount(){
		get_posts(this.handleGetPosts.bind(this), this.props.currentUser);
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

			<div className="feed-container">
				{this.state.posts.map((post, i)=>(
					<Post currentUser={this.props.currentUser} key={i} info={post}/>
				))}
	
			</div>
		)
	}
}

export default Feed;