import React, { Component } from 'react';
import {get_file_name, clear_file, upload_post_ajax, check_hide_label} from './utils';
import '../CSS/newpost.css';

class MusicUploadForm extends Component{

	constructor(){
		super();
		this.state = {
			'filename' : null,
			'isFileUploaded' : false,

		}

	}

	//for whenever a file is uploaded the label changes 
	handleChange() {
		var name = get_file_name('music-file');
		this.setState({
			filename: name,
			isFileUploaded: true
		});
	}

	handleRemove(){
		clear_file('music-file');
		this.setState({
			filename: null,
			isFileUploaded: false
		});
	}

	uploadCallback(result){
		if (result.success) {
			this.props.addNot(result.message, 'success');
		}
		else{
			this.props.addNot(result.message, 'error');
		}
	}

	render(){

		return (
			
			<div id="video-form" className="tab-content">
				<br/>
				<input type="text" id="music-title" className="title" placeholder="Give your song a descriptive title."/>
				<input type="text" id="music-link" className="link" placeholder="URL to Song" onChange={()=>{check_hide_label('music')}}/>
				<input type="file" id="music-file" className="file" onChange={this.handleChange.bind(this)} 
										accept="audio/aac, .aac, audio/mp4, .mp4, .m4a, audio/mpeg, .mp1, .mp2,
										 .mp3, .mpg, .mpeg, audio/ogg, .oga, .ogg, audio/wav, .wav, audio/webm, .webm"/>
				<br/>
				<label id="music-file-label" htmlFor={this.state.isFileUploaded ? "" :'music-file'} className={this.state.isFileUploaded ? "done-uploaded" :"file-label"}>{
					this.state.filename === null 
					?  "📥  Upload Audio File" 
					: <span>{this.state.filename}</span>
				} </label>
				<br/>
				{this.state.isFileUploaded ? <span onClick={this.handleRemove.bind(this)} className="remove-file"> Remove </span> : ''}
				<textarea type="text" id="music-description" className="description" placeholder="Description"></textarea>	
				<button id="submit-music" className="form-button" onClick={()=>{
					upload_post_ajax(this.uploadCallback.bind(this), 'music', this.props.currentUser, false);
				}}> Post Song </button>
			</div>
			
		)
	}
}
export default MusicUploadForm;