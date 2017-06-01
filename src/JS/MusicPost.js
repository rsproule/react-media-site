import React, { Component } from 'react';

class MusicPost extends Component{

	render(){
		return(
			<div>
				{
					
					this.props.isLink === 1
					? <iframe className="iframe" width="100%" height="auto" scrolling="no" frameBorder="no" src={this.props.embedLink}></iframe>
					: (<audio controls>
							<source src={this.props.path}/>
					   </audio>)
				}

			</div>
		)
	}
}

export default MusicPost;