import React, { Component } from 'react';
import '../CSS/login.css';
import logo from '../logo.svg';
import {setCookie, login_ajax} from './utils';

class LoginForm extends Component{
	

	loginCallback(result){
		
		if(result.success){  
			setCookie("user_id", result.user_id, 4);
			setCookie("unique_id", result.unique_id, 4);
			this.props.addNot("Login Successful", 'success');
			window.location.href='#/';
		}
		else{
			this.props.addNot(result.message, 'error');
		}
	}

	render(){
		return(
			
			
			<div className="login-container">
				<img src={logo} className="App-logo" alt="logo" />
				
				<div className="user-pass-container">
					<input className="login-input" type="text"     id="username" placeholder="Username" autoCorrect='off'/>
					<input className="login-input" type="password" id="password" placeholder="Password" autoCorrect='off'/>
				</div>
				<br/>
				<button id="login-button" onClick={()=>{
					login_ajax(this.loginCallback.bind(this) );
				}}>Login</button>
				<div className="new-account"><span> Don't have an account? <a href="#/register">Create Account</a></span></div>

			</div>
			
			
		)
	}
}

export default LoginForm;