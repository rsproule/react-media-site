import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';

class MyComponent extends Component {

    constructor() {
        super()
        this._notificationSystem = null
    }

    _addNotification(event) {
        event.preventDefault();
        if (this._notificationSystem) {
            this._notificationSystem.addNotification({
                message: 'Notification message',
                level: 'success'
            });
        }
    }

    render() {
        return (
            <div>
                <button onClick={this._addNotification.bind(this)}>Add notification</button>
                <NotificationSystem ref={n => this._notificationSystem = n} />
            </div>
        );
    }

};

export default MyComponent;
