import React, { Component } from 'react';
import {get_file_name, clear_file, upload_post_ajax, check_hide_label, hide_link, show_link} from './utils';
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
		var name = get_file_name(this.props.postType + '-file');
		this.setState({
			filename: name,
			isFileUploaded: true
		});

		hide_link(this.props.postType);
	}

	handleRemove(){
		clear_file(this.props.postType + '-file');
		this.setState({
			filename: null,
			isFileUploaded: false
		});

		//show the link input
		show_link(this.props.postType);
	}

	uploadCallback(result){
		if (result.success) {
			this.props.addNot(result.message, 'success');
			this.setState({
				filename: null,
				isFileUploaded: false
			});
			this.props.close(); // closes the submit automatically
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
			<div id={this.props.postType+ "-form"} className="tab-content">
				<div className="left-side-container">

					<input type="text" id={this.props.postType + "-title"} className="title-input" 
							placeholder={"Give your " + this.props.postType + " a title."}/>

					<input type="text" id={this.props.postType + "-link" } className="title-input"  
							placeholder={"URL to " + this.props.postType} onChange={()=>{check_hide_label(this.props.postType)}}/>

				</div>

				<div className="right-side-container">
					<input type="file" id={this.props.postType + "-file" } className="file" onChange={this.handleChange.bind(this)} 
										accept={this.props.postType+"/*"}/>
				
					<label id={this.props.postType + "-file-label"} htmlFor={this.state.isFileUploaded ? "" : this.props.postType + '-file'} className={this.state.isFileUploaded ? "done-uploaded" :"file-label"}>{
						this.state.filename === null 
						?  "📥  Upload " + this.props.postType + " File" 
						: <span>{this.state.filename}</span>
					} </label>
					{this.state.isFileUploaded ? <div><br/><span onClick={this.handleRemove.bind(this)} className="remove-file"> Remove </span> </div>: ''}
				</div>

				
				<div className="bottom-container">
					<textarea type="text" id={this.props.postType+"-description"} className="description-input" placeholder="Description"></textarea>	

					<button id={ "upload-"+ this.props.postType } className="form-button" onClick={()=>{
						upload_post_ajax(this.uploadCallback.bind(this), this.props.postType, this.props.currentUser, false);
					}}>{"Post " + this.props.postType} </button>

				</div>
				
				
				
			</div>
		)

	}
}
export default UploadForm;