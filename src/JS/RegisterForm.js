import React, { Component } from 'react';
import '../CSS/register.css';
import logo from '../logo.svg';
import {register_ajax} from './utils';
// import NotificationSystem from 'react-notification-system';


class RegisterForm extends Component{

    registerCallback(result){
        if (result.success) {
            this.props.addNot('Registration Successful. Welcome ' + result.first_name + '! Login to get started', 'success');
            window.location.href='#/login';
        }else{
            this.props.addNot(result.message, 'error');
        }
    }

    render(){
    	return(
    		<div className="register-container">
        		<img src={logo} className="App-logo" alt="logo" />

        		<div className="break">
            		<input type='text' id="first-name" placeholder="First Name"/>
            		<input type='text' id="last-name" placeholder="Last Name"/>
                </div>
                <br/><br/><br/>
        		<div className="break">
        		    <input className="username-reg" type='text' id="username" placeholder="Username"/>
                </div>
                
        		<div className="break">
        		    <input className="password" type='password' id="password1" placeholder="Password"/>
                </div>
                <br/><br/><br/>
        		<div className="break">
        		    <input className="password" type='password' id="password2" placeholder="Confirm Password"/>
        		</div>

        		<button id="register-button" onClick={() => {
                    register_ajax(this.registerCallback.bind(this));
                }}> Register </button>
        		<span className="login"> Already have an account? <a href="#/login">Login</a></span>
    		</div>
    		)
    }
}

export default RegisterForm;