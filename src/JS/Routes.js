import { HashRouter as Router, Route } from 'react-router-dom'; 
import React from 'react';
import App from './App';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import NotificationSystem from 'react-notification-system';

class Routes extends React.Component{
	constructor() {
		super()
		this._notificationSystem = null
	}

	_addNotification(event, message, level) {
		event.preventDefault();
		if (this._notificationSystem) {
			this._notificationSystem.addNotification({
				message: message,
				level: level,
				position: "br"
			});
		}
	}

	notHandler(message, level){
		this._addNotification(event, message, level);

	}

	render(){
		return(
			<div>
			<Router>
			<div>
			  	<Route exact path="/"      component={() => (<App      addNot={this.notHandler.bind(this)}/>)}/>
			  	<Route path="/login"       component={() => (<Login    addNot={this.notHandler.bind(this)}/>)}/>
			  	<Route path="/register"    component={() => (<Register addNot={this.notHandler.bind(this)}/>)}/>
			  	<Route path="/profilepage" component={() => (<Profile  addNot={this.notHandler.bind(this)}/>)}/>
			  	<NotificationSystem ref={n => this._notificationSystem = n	} />
			</div>
			</Router>
			</div>
		)
	}
}

export default Routes;