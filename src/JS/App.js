import React, { Component } from 'react';
import Main from './Main';

class App extends Component {
  render() {
    return (
		<Main addNot={this.props.addNot}/>        
    );
  }
}

export default App;
