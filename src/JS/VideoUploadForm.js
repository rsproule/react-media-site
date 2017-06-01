import React, { Component } from 'react';
import {get_file_name, clear_file, upload_post_ajax, check_hide_label} from './utils';
import '../CSS/newpost.css';

class UploadForm extends Component{
	constructor(){
		super();
		this.state = {
			'filename' : null,
			'isFileUploaded' : false,
		}
	}

	//for whenever a file is uploaded the label changes 
	handleChange() {
		var name = get_file_name('video-file');
		this.setState({
			filename: name,
			isFileUploaded: true
		});
	}

	handleRemove(){
		clear_file('video-file');
		this.setState({
			filename: null,
			isFileUploaded: false
		});
	}

	uploadCallback(result){
		if (result.success) {
			this.props.addNot(result.message, 'success');
			this.setState({
				filename: null,
				isFileUploaded: false
			});
		}
		else{
			this.props.addNot(result.message, 'error');
		}
	}
	//.mp4, .flv, .m3u8, .ts, .3gp, .mov, .avi, .wmv,
	// video/x-flv, video/mp4, application/x-mpegURL, video/MP2T,
 	// video/3gpp, video/quicktime, video/x-msvideo, video/x-ms-wmv
	render(){
		return(
			<div id="video-form" className="tab-content">
				<br/>
				<input type="text" id="video-title" className="title" placeholder="Give your video a descriptive title."/>
				<input type="text" id="video-link" className="link" placeholder="URL to Video" onChange={()=>{check_hide_label('video')}}/>
				<input type="file" id="video-file" className="file" onChange={this.handleChange.bind(this)} 
										accept="video/*"/>
				<br/>
				<label id="video-file-label" htmlFor={this.state.isFileUploaded ? "" :'video-file'} className={this.state.isFileUploaded ? "done-uploaded" :"file-label"}>{
					this.state.filename === null 
					?  "📥  Upload Video File" 
					: <span>{this.state.filename}</span>
				} </label>
				<br/>
				{this.state.isFileUploaded ? <span onClick={this.handleRemove.bind(this)} className="remove-file"> Remove </span> : ''}
				<textarea type="text" id="video-description" className="description" placeholder="Description"></textarea>	
				<button id="submit-video" className="form-button" onClick={()=>{
					upload_post_ajax(this.uploadCallback.bind(this), 'video', this.props.currentUser, false);
				}}> Post Video </button>
			</div>
		)

	}
}
export default UploadForm;