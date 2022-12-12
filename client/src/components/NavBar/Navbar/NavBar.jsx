import React from 'react';
import Logo from '../../../asset/Logo.png';
import Carito from '../../../asset/carrito.png';
import star from '../../../asset/star.png';
import SearchBar from '../searchBar/SearchBar.jsx';
import { Link } from 'react-router-dom';
import s from './NavBar.module.css';
import LoginRegister from '../LoginBar/LoginBar';
import { useDispatch, useSelector } from 'react-redux';
import { newSearch } from '../../../redux/actions/index';
import { useAuth0 } from '@auth0/auth0-react';
import { getAllUsers } from '../../../redux/actions';
import { useEffect } from 'react';
import { setUserData } from '../../../redux/actions';

function NavBar() {
	const dispatch = useDispatch();

	const { isAuthenticated, user } = useAuth0();
	const userNow = useSelector((state) => state.user);
	const loggedUserJWT =JSON.parse( localStorage.getItem('loggedUserJWT'));
	const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);

	useEffect(() => {
		const autenticarUsuario = () => {
			if(isAuthenticated){
				window.localStorage.setItem("GoogleUser", JSON.stringify(user))
			}
			const googleUser = JSON.parse(localStorage.getItem('GoogleUser'));
			if(googleUser){
			dispatch(setUserData({
				username:googleUser.name,
				picture: googleUser.picture,
				name: googleUser.given_name,
				email:googleUser.email,
			}))}
			
		  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
		  console.log("userInfo", userInfo)
		  if(loggedUser) {
			dispatch(setUserData({
				username: userInfo.username,
				picture: userInfo.picture,
				name: userInfo.name,
				email: userInfo.email,
				admin: userInfo.admin,
				jwt: loggedUserJWT
			}))
		  }
		};

		autenticarUsuario();
	  }, []);
	let cart = '';
	let favorites = useSelector((state) => state.favorites);
	if (localStorage.getItem('cart')) {
		cart = JSON.parse(localStorage.getItem('cart'));
	}
	const local = useSelector((state) => state.localstorage);

	function search(e) {
		dispatch(newSearch(''));
	}

	return (
		<div className={s.navBar}>
			<nav className={s.navbar}>
				<div className={s.logodiv}>
					<Link to={'/'}>
						<img src={Logo} alt='Logo' height='40px' />
					</Link>
				</div>
				<div>
					<ul className={s.ul}>
						<li className={s.li}>
							<Link to={'/home'} className={s.Link} onClick={(e) => search(e)}>
								<h3>Home</h3>
							</Link>
						</li>
						{isAuthenticated || userNow.admin ? (
							<li className={s.li}>
								<Link to={'/create/product'} className={s.Link}>
									<h3>Create-Product</h3>
								</Link>
							</li>
						) : (
							<p></p>
						)}
						{isAuthenticated || userNow.admin ? (
							<li className={s.li}>
								<Link to={'/update'} className={s.Link}>
									<h3>Update-Product</h3>
								</Link>
							</li>
						) : (
							<p></p>
						)}
						{isAuthenticated || userNow.admin ? (
							<li className={s.li}>
								<Link to={'/dashboard'} className={s.Link}>
									<h3>Dashboard</h3>
								</Link>
							</li>
						) : (
							<p></p>
						)}
					</ul>
				</div>
				<div>
					<SearchBar />
				</div>

				<div>
					<LoginRegister
						items={[
							{ anchor: 'Configuration', slug: '' },
							{ anchor: 'Log Out', slug: '' },
						]}
						dropdownTitle='USER'
					/>
				</div>

				<div>
					<Link to='/shoppingcart' className={s.cart}>
						<img src={Carito} alt='Carro de compras' height='25px' />
						{localStorage.getItem('cart') ? (
							<div className={s.CarritoCantidad}> {cart.length}</div>
						) : (
							<div className={s.CarritoCantidad}> 0</div>
						)}
					</Link>
				</div>

				<div className={s.favorites}>
					<Link to='/favorites' className={s.cart}>
						<img src={star} alt='estrella de favoritos' height='25px' />
						<p className={s.favoritoCantidad}>{favorites.length}</p>
					</Link>
				</div>
			</nav>
		</div>
	);
}

export default NavBar;
