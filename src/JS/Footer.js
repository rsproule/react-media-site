import React, { Component } from 'react';
import '../CSS/footer.css';


class Footer extends Component{

	render(){
		return(
			<div className="footer-container">
				<div className="credits">Created by: <a className="mysite" target="_blank" href="http://www.ryansproule.me/">Ryan Sproule</a></div>
			</div>
		)
	}
}

export default Footer;