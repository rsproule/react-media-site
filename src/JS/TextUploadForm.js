import React, { Component } from 'react';
import '../CSS/newpost.css';
import {upload_post_ajax} from './utils';

class TextUploadForm extends Component{

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
			<div id="text-form" className="tab-content">
				<br/>
				<input type="text" id="text-title" className="title" placeholder="Give your post a descriptive title."/>
				<textarea type="text" id="text-description" className="text" placeholder="Post Here"></textarea>	
				<button id="submit-text" className="form-button" onClick={()=>{
					upload_post_ajax(this.uploadCallback.bind(this), 'text', this.props.currentUser, false);
				}}> Post </button>
			</div>
		)
	}
}
export default TextUploadForm;