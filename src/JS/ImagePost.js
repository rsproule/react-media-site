import React, { Component } from 'react';

class ImagePost extends Component {
	constructor(){
		super();
		this.style = {'maxWidth': '100%'}
		
	}

	render(){
		return(
			<div>
				{
					this.props.isLink
					?<img style={this.style} src={this.props.path} alt="not found"/>
					:<img style={this.style} src={this.props.path} alt="not found"/>
				}

			</div>
		)
	}
}

export default ImagePost;