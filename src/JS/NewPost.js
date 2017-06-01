import React, { Component } from 'react';
import UploadForm from './UploadForm';
// import MusicUploadForm from './MusicUploadForm';
// import ImageUploadForm from './ImageUploadForm';
// import TextUploadForm from './TextUploadForm';
// import {change_tab} from './utils';
import '../CSS/newpost.css';


class NewPost extends Component{
	constructor(){
		super();
		this.state = {
			'current_tab': null
		}
	}

	handleSwitch(newTab){
		this.setState({
			"current_tab" : newTab
		});
	}

	render(){
		return (
			<div className="new-post-container">
				<div className="tab-container">
					<button onClick={()=>{this.handleSwitch('video')}} className={this.state.current_tab === "video" ? "selected-tab": "tab"}> Video</button>
					<button onClick={()=>{this.handleSwitch('music')}} className={this.state.current_tab === "music" ? "selected-tab": "tab"}> Music</button>
					<button onClick={()=>{this.handleSwitch('image')}} className={this.state.current_tab === "image" ? "selected-tab": "tab"}> Image</button>
					<button onClick={()=>{this.handleSwitch( null ) }} className={this.state.current_tab === null    ? "close-tab"   : "close-tab"}>Close</button>
				</div>
				{ 
					this.state.current_tab === null
					? <div className="blank"><br/></div>
					: <UploadForm close={()=>this.handleSwitch( null )} postType={this.state.current_tab} addNot={this.props.addNot} currentUser={this.props.currentUser }/>
				}


				
			</div>
		)
	}
}

export default NewPost;


// {this.state.current_tab === "Music" ? <MusicUploadForm addNot={this.props.addNot} currentUser={this.props.currentUser}/> : ''}
// {this.state.current_tab === "Image" ? <ImageUploadForm addNot={this.props.addNot} currentUser={this.props.currentUser}/> : ''}
// {this.state.current_tab === "Text"  ? <TextUploadForm  addNot={this.props.addNot} currentUser={this.props.currentUser}/> : ''}	
// {this.state.current_tab === null  ? <div className="blank"><br/></div> : ''}	


// 	<button onClick={()=>{this.handleSwitch('text')}} className={this.state.current_tab === "text" ? "selected-tab": "tab"}>Text</button>







