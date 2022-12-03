import { useAuth0 } from '@auth0/auth0-react';
import { Route, useLocation } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import HomePage from './components/home/home/HomePage';
import NavBar from './components/NavBar/Navbar/NavBar.jsx';
import FooterBar from './components/Footer/FooterBar';
import Product from './components/home/ProductDetail/ProductDetail/Product';
import ProductShopCart from './components/shoppingCart/ProductShopCart.jsx';
import CreateProduct from './components/CreateProduct/CreateProduct';
import ProductSended from './components/CreateProduct/ProductSended.jsx';
import Profile from './components/NavBar/login/Profile/Profile';
import { LoginForm } from './components/NavBar/login/LoginForm';

function App() {
	let location = useLocation();
	return (
		<div className='App'>
			{location.pathname !== '/' && <NavBar />}

			<Route path='/' exact component={LandingPage} />
			<Route exact path='/home' component={HomePage} />
			<Route path='/SearchResults' exact component={HomePage} />
			<Route path='/product/:id' component={Product} />
			<Route path='/shoppingcart' component={ProductShopCart} />
			<Route path='/create/product' component={CreateProduct} />
			<Route path='/create/productsended' component={ProductSended} />
			<Route path='/profile' component={Profile} />
			<Route path='/LoginForm' component={LoginForm} />
			{location.pathname !== '/' && <FooterBar />}

		</div>
	);
}

export default App;
