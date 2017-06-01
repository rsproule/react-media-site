import React, { Component } from 'react';

class VideoPost extends Component{
	render(){
		return(
			<div>
				{this.props.isLink === 1
					? <iframe width="100%" height="470px" src={this.props.embedLink} frameBorder="0" allowFullScreen></iframe>
					:(<video width="100%" height="470px" controls>
						  <source src={this.props.path}/>
					 </video>
					)
				}
			</div>
		)
	}
}

export default VideoPost;