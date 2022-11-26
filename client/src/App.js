import { useAuth0 } from '@auth0/auth0-react';

import { Route, useLocation } from 'react-router-dom';

import LandingPage from './components/landing/LandingPage';
import HomePage from './components/home/HomePage.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import Product from './components/ProductDetail/Product';
import CreateProduct from './components/CreateProduct';
import { Profile } from './components/login/Profile'

function App() {
	let location = useLocation();
	return (
		<div className='App'>
			{location.pathname !== '/' && <NavBar />}
			<Route path='/' exact component={LandingPage} />
			<Route exact path='/home' component={HomePage} />
			<Route path='/SearchResults' exact component={HomePage} />
			<Route path='/product/:id' component={Product} />
			<Route path='/create/product' component={CreateProduct} />
			<Route path='/profile' component={Profile} />
		</div>
	);
}

export default App;