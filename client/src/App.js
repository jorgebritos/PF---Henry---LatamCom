import { Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { setUserData } from './redux/actions';
// import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import LandingPage from './components/landing/LandingPage';
import HomePage from './components/home/home/HomePage';
import NavBar from './components/NavBar/Navbar/NavBar.jsx';
import FooterBar from './components/Footer/FooterBar';
import Product from './components/home/ProductDetail/ProductDetail/Product';
import ProductShopCart from './components/shoppingCart/ProductShopCart.jsx';
import CreateProduct from './components/dashboard/CreateProduct/CreateProduct';
import CreateCategories from './components/dashboard/CreateCategories/CreateCategories';
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
import UpdateProfile from './components/NavBar/login/Profile/UpdataProfile/UpdateProfile';
import Success from './components/NavBar/login/Profile/Success';
import MyChatBot from './components/home/ChatBot/ChatBot.jsx';
import PurchasesAdmin from './components/dashboard/PurchasesAdmin/PurchasesAdmin';
import PrivateRoute from './components/PrivateRoute';
import ReportedComments from './components/dashboard/ReportedComments/ReportedComments';
import OutOfStock from './components/dashboard/OutOfStock/OutOfStock';

function App() {
	let location = useLocation();

	// const dispatch = useDispatch();
	const userNow = useSelector((state) => state.user);
	// let { isAuthenticated, user } = useAuth0();
	// const loggedUserJWT = JSON.parse(localStorage.getItem('loggedUserJWT'));
	// const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

	const isAllowed = !!userNow.name;

	// useEffect(() => {
	// 	const autenticarUsuario = () => {
	// 		if (isAuthenticated) {
	// 			window.localStorage.setItem('GoogleUser', JSON.stringify(user));
	// 		}
	// 		const googleUser = JSON.parse(localStorage.getItem('GoogleUser'));
	// 		if (googleUser) {
	// 			dispatch(
	// 				setUserData({
	// 					id: googleUser.id,
	// 					username: googleUser.name,
	// 					picture: googleUser.picture,
	// 					name: googleUser.given_name,
	// 					email: googleUser.email,
	// 				}),
	// 			);
	// 		}

	// 		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
	// 		console.log('userInfo', userInfo);
	// 		console.log(loggedUser)
	// 		if (loggedUser) {
	// 			dispatch(
	// 				setUserData({
	// 					username: userInfo.username,
	// 					picture: userInfo.picture,
	// 					name: userInfo.name,
	// 					email: userInfo.email,
	// 					admin: userInfo.admin,
	// 					jwt: loggedUserJWT,
	// 				}),
	// 			);
	// 		}
	// 	};

	// 	autenticarUsuario();
	// }, [dispatch, isAuthenticated, loggedUserJWT, loggedUser, user]);

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
			<Route path='/CreateUser' component={CreateUser} />
			<Route path='/createUser/usersended' component={UserSended} />
			<Route path='/LoginForm' component={LoginForm} />
			<Route exact path='/contact' component={ContactUs} />
			<Route path='/favorites' component={ShowFavorites} />
			<Route path='/SuccessPayment' component={SuccessedPayment} />

			<PrivateRoute
				path='/update'
				component={UpdateProduct}
				isAllowed={userNow.admin}
			/>
			<PrivateRoute
				path='/contact/messagesended'
				component={messageSended}
				isAllowed={isAllowed}
			/>
			<PrivateRoute
				path='/create/product'
				component={CreateProduct}
				isAllowed={isAllowed && userNow.admin}
			/>
			<PrivateRoute
				path='/create/productsended'
				component={ProductSended}
				isAllowed={isAllowed && userNow.admin}
			/>

			<PrivateRoute
				path='/dashboard'
				component={PurchasesAdmin}
				isAllowed={isAllowed && userNow.admin}
			/>
			
			<PrivateRoute
				path='/reportedcomments'
				component={ReportedComments}
				isAllowed={isAllowed && userNow.admin}
			/>
			
			<PrivateRoute
				path='/outofstock'
				component={OutOfStock}
				isAllowed={isAllowed && userNow.admin}
			/>

			<PrivateRoute
				exact
				path='/profile'
				component={Profile}
				isAllowed={isAllowed}
			/>
			<PrivateRoute
				path='/buyproducts'
				component={Buy}
				isAllowed={isAllowed && !userNow.admin}
			/>
			<Route
				path='/cancelpayment'
				component={CancelPayment}
			/>
			<PrivateRoute
				exact
				path='/profile/changedata'
				component={UpdateProfile}
				isAllowed={isAllowed}
			/>
			<PrivateRoute
				path='/profile/success'
				component={Success}
				isAllowed={isAllowed}
			/>

			<PrivateRoute path='/create/categories'
				component={CreateCategories}
				isAllowed={isAllowed && userNow.admin}
			/>

			{location.pathname === '/home' && <MyChatBot />}
			{location.pathname !== '/' && <FooterBar />}
		</div>
	);
}

export default App;
