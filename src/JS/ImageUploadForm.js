import React, { Component } from 'react';
import {get_file_name, clear_file, upload_post_ajax} from './utils';
import '../CSS/newpost.css';

class ImageUploadForm extends Component{
	constructor(){
		super();
		this.state = {
			'filename' : null,
			'isFileUploaded' : false,

		}

	}

	//for whenever a file is uploaded the label changes 
	handleChange() {
		var name = get_file_name('image-file');
		this.setState({
			filename: name,
			isFileUploaded: true
		});
	}

	handleRemove(){
		clear_file('image-file');
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
		return(
			<div id="image-form" className="tab-content">
				<br/>
				<input type="text" id="image-title" className="title" placeholder="Give your image a descriptive title."/>
				<input type="text" id="image-link" className="link" placeholder="URL to Image"/>
				<input type="file" id="image-file" className="file" onChange={this.handleChange.bind(this)} 
										accept="image/*"/>
				<br/>
				<label htmlFor={this.state.isFileUploaded ? "" :'image-file'} className={this.state.isFileUploaded ? "done-uploaded" :"file-label"}>{
					this.state.filename === null 
					?  "📥  Upload Image File" 
					: <span>{this.state.filename}</span>
				} </label>
				<br/>
				{this.state.isFileUploaded ? <span onClick={this.handleRemove.bind(this)} className="remove-file"> Remove </span> : ''}
				<textarea type="text" id="image-description" className="description" placeholder="Description"></textarea>	
				<button id="submit-image" className="form-button" onClick={()=>{
					upload_post_ajax(this.uploadCallback.bind(this), 'image', this.props.currentUser, false);
				}}> Post Image </button>
			</div>
		)

	}
}
export default ImageUploadForm;