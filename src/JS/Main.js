import React, { Component } from 'react';
import {setCookie, getCookie, verify_user} from './utils';
import NewPost from './NewPost';
import Feed from './Feed';



class Main extends Component{
	constructor(){
		super();
		this.state = {
			user_id: '',
		}
	}

	verifyCallback(result){
		var user_id = getCookie('user_id');
		if (result.success) {
				this.setState({user_id: user_id});
		}else{
			//verification error
			this.props.addNot(result.message, 'error');
			window.location.href='#/login';
		}
	}

	componentDidMount(){
		var user_id = getCookie('user_id');
		if (user_id!=='') {
			verify_user(user_id, this.verifyCallback.bind(this));
		}else{
			this.props.addNot("Not logged in. Try again", 'error');
			window.location.href='#/login';	
		}
		
		
		
	}
	// Current User: {this.state.user_id}
	render(){
		return (
			<div>
				<NewPost addNot={this.props.addNot} currentUser={this.state.user_id}/>

				<Feed currentUser={this.state.user_id}/>

				<button onClick={()=>{
					this.setState({user_id: ''})
					setCookie('user_id', '', 10);
					window.location.href='#/login';	
				}}>Temporary Log out</button>
			</div>
		)
	}
}

export default Main;