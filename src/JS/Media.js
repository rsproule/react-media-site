import React, { Component } from 'react';
import VideoPost from './VideoPost';
import ImagePost from './ImagePost';
import MusicPost from './MusicPost';

class Media extends Component{

	render(){
		return(
			<div>
			
			
				{
					this.props.type === 'video'
					? <VideoPost embedLink={this.props.embeddedLink} path={this.props.link} isLink={this.props.isLink}/>
					: ''
				}

				{
					this.props.type === 'image'
					? <ImagePost path={this.props.link} isLink={this.props.isLink}/>
					: ''
				}

				{
					this.props.type === 'music'
					? <MusicPost embedLink={this.props.embeddedLink} path={this.props.link} isLink={this.props.isLink}/>
					: ''

				}
			
			
			</div>
		)
	}
}

export default Media;