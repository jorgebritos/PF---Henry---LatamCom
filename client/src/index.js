import React from 'react';
import ReactDOM from 'react-dom';
import {Auth0Provider} from '@auth0/auth0-react'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store/index';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<React.StrictMode>
				<Auth0Provider
					domain='dev-g1jtn0qvoq0x04y4.us.auth0.com' 
					clientId='Q1ECCnW06dOsoEzDoVuw1DD8lFveOnsR'
					redirectUri={window.location.origin}>
						<App />
				</Auth0Provider>	
			</React.StrictMode>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
