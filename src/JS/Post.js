import React, { Component } from 'react';
import logo from '../logo.svg';
import '../CSS/post.css';
import Media from './Media';


class Post extends Component{
	constructor(){
		super();
		this.state = {
			'media_state' : "closed",
			
		}


	}

	componentDidMount(){
		// console.log(this.props.info)
		if (this.props.info.type === 'text') {
			this.setState({'media_state' : null});
		}

		var a = this.props.currentUser;
		var b = this.props.info.user.user_id;
		var isCurrent_users_post = (a === b);
		// console.log(a+ " " +b + ": " + isCurrent_users_post);
		this.setState({'isCurrent_users_post': isCurrent_users_post});
		
	}

	handlePlay(){
		this.setState({'media_state' : 'opened'});
		
	}
	handleClose(){
		this.setState({'media_state' : 'closed'});
	}

	render(){
		return(
			<div>
				<div className="post-container">

					<div className="post-info-container">
						<div className="user-info-container">
							<img src={logo} className="profile-picture" alt="profile-pic" />
							<a className="name-label">{this.props.info.user.first + " " + this.props.info.user.last}</a>
							<br/>
							<a href="#/profilepage" className="username-label">{"@"+this.props.info.user.username}</a>
							<br/><br/>
						</div>


						<div className="post-left-container">
							{this.props.info.type !== 'text'
							? <a href={this.props.info.link}> <img src={this.props.info.thumbnail} className="thumbnail" alt="thumbnail" /></a>
							: <a> <img src="http://www.housingeurope.eu/site/theme/_assets/img/type-article.png" className="thumbnail" alt="thumbnail" /> </a>
							}

							
						</div>



						<div className="post-center-container">
							{this.props.info.type !== 'text'
							? <a className="post-title" href={this.props.info.link}>{this.props.info.title}</a>
							: <a className="post-title">{this.props.info.title}</a>
							}
							<br/>
							{this.props.info.type !== 'text'
								? <div className="description-container"> <b className="description-header">Description:</b> <p className="post-description">{this.props.info.description}</p></div>
								: <p className="post-description">{this.props.info.description}</p>
								 
							}	
						</div>

					</div>

					<div className="media-container">
						<div className="button-container">
							{
								this.state.media_state === 'opened'
								? <button className='toggle-button' onClick={this.handleClose.bind(this)}> - </button>
								: ''
							}

							{
								this.state.media_state === 'closed' 
								? <button className='toggle-button' onClick={this.handlePlay.bind(this)}> + </button>
								: ''
							}
						</div>
						<br/><br/>
						<div className="post-content">
						{
							this.state.media_state === 'opened'
							?<Media type={this.props.info.type} link={this.props.info.link} embeddedLink={this.props.info.embeddedLink} isLink={this.props.info.isLink}/> 
							:''
						}
						</div>
					</div>
					


					

				</div>
				<br/><br/>
			</div>
			
		)
	}
}

export default Post;