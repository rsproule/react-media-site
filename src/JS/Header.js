import React, { Component } from 'react';
import '../CSS/header.css';



class Header extends Component{
	// 
	render(){
		return(
			<div className='container'>
				<ol>
					<li className="left"> <a href="#/">&#127968; Home</a> </li>
					<div className="center"> <a className="site-name" href="#/">hum.or</a></div>
					<li className="right"> <a href="#/register">📝 Register    </a></li>
					<li className="right"> <a href="#/login"   >&#128273; Login</a></li>
				</ol>
			</div>		
		)
	}
}

export default Header;