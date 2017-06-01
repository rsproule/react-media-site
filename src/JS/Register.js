import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import Footer from './Footer';
import '../CSS/footer.css';


class Register extends Component{
	render(){
		return(
			<div className="register-super-container">
				<RegisterForm addNot={this.props.addNot}/>
				<Footer/>
			</div>
		)
	}
}

export default Register;