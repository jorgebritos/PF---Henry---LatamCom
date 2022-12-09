import { Route, useLocation } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import HomePage from './components/home/home/HomePage';
import NavBar from './components/NavBar/Navbar/NavBar.jsx';
import FooterBar from './components/Footer/FooterBar';
import Product from './components/home/ProductDetail/ProductDetail/Product';
import ProductShopCart from './components/shoppingCart/ProductShopCart.jsx';
import CreateProduct from './components/dashboard/CreateProduct/CreateProduct';
import ProductSended from './components/dashboard/CreateProduct/ProductSended.jsx';
import { Profile } from './components/NavBar/login/Profile/Profile';
import { LoginForm } from './components/NavBar/login/LoginForm/LoginForm';
import Buy from './components/BuyProducts/Buy';
import SuccessedPayment from './components/CompletePayment/Successedpayment';
import UpdateProduct from './components/dashboard/UpdateProduct/UpdateProduct';
import { ContactUs } from './components/Footer/Contact/ContactEmailJS';
import messageSended from './components/Footer/Contact/MessageSended';
import UserSended from './components/CreateUser/UserSended';
import CreateUser from './components/CreateUser/CreateUser';
import ShowFavorites from './components/NavBar/favorites/ShowFavorites';
import CancelPayment from './components/BuyProducts/CancelPayment';
import UpdateProfile from './components/NavBar/login/Profile/UpdateProfile';
import Success from './components/NavBar/login/Profile/Success';
import MyChatBot from './components/home/ChatBot/ChatBot.jsx';
import PurchasesAdmin from './components/dashboard/PurchasesAdmin/PurchasesAdmin';

function App() {
	let location = useLocation();
	return (
		<div className='App'>
			{location.pathname !== '/' && location.pathname !== '/SuccessPayment' && (
				<NavBar />
			)}

			<Route path='/' exact component={LandingPage} />
			<Route exact path='/home' component={HomePage} />
			<Route path='/SearchResults' exact component={HomePage} />
			<Route path='/product/:id' component={Product} />
			<Route path='/shoppingcart' component={ProductShopCart} />
			<Route path='/create/product' component={CreateProduct} />
			<Route path='/create/productsended' component={ProductSended} />
			<Route path='/CreateUser' component={CreateUser} />
			<Route path='/createUser/usersended' component={UserSended} />
			<Route exact path='/profile' component={Profile} />
			<Route path='/LoginForm' component={LoginForm} />
			<Route exact path='/contact' component={ContactUs} />
			<Route path='/contact/messagesended' component={messageSended} />
			<Route path='/buyproducts' component={Buy} />
			<Route path='/SuccessPayment' component={SuccessedPayment} />
			<Route path='/favorites' component={ShowFavorites} />
			<Route path='/update' component={UpdateProduct} />
			<Route path='/cancelpayment' component={CancelPayment} />
			<Route exact path='/profile/changedata' component={UpdateProfile} />
			<Route path='/profile/success' component={Success} />
			<Route path='/dashboard' component={PurchasesAdmin} />
			
			{location.pathname === '/home' && <MyChatBot/>}
			{location.pathname !== '/' && <FooterBar />}
			
		</div>
	);
}

export default App;
