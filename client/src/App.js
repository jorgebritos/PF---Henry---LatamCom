import { Route, useLocation } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import HomePage from './components/home/HomePage.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import FooterBar from './components/Footer/FooterBar';
import Product from './components/ProductDetail/Product';
import ProductShopCart from './components/shoppingCart/ProductShopCart.jsx';
import CreateProduct from './components/CreateProduct/CreateProduct';
import ProductSended from "./components/CreateProduct/ProductSended.jsx"
import Buy from "./components/BuyProducts/Buy.jsx"
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
			<Route path='/shoppingcart' component={ProductShopCart} />
			<Route path='/create/product' component={CreateProduct} />
			<Route path='/create/productsended' component={ProductSended} />
			<Route path='/profile' component={Profile} />
			<Route path="/buyproducts" component={Buy} />

			{location.pathname !== '/' && <FooterBar />}
		</div>
	);
}

export default App;
