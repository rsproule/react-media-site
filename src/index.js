import React    from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import Header from './JS/Header';
import Routes from './JS/Routes';



class Main extends React.Component{
	
	render(){
		return(
			<div>
				<Header/>
				<Routes/> 
				
		    </div>
		)
	}
}

ReactDOM.render((
  	<Main/>
  ),
  document.getElementById('root')
);
