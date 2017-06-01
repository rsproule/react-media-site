import React, { Component } from 'react';
import LoginForm from './LoginForm';
import Footer from './Footer';
import '../CSS/footer.css';

class Login extends Component{


	render(){
		return(
			<div className="login-super-container">
				<LoginForm addNot={this.props.addNot}/>
				<Footer/>
			</div>
		);
	}
}

export default Login;