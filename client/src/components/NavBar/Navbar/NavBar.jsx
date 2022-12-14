import React, { useState } from 'react';
import Logo from '../../../asset/Logo.png';
import Carito from '../../../asset/carrito.png';
import star from '../../../asset/star.png';
import Dropdown from '../dropdown/Dropdown'
import SearchBar from '../searchBar/SearchBar.jsx';
import { Link } from 'react-router-dom';
import s from './NavBar.module.css';
import LoginRegister from '../LoginBar/LoginBar';
import { useDispatch, useSelector } from 'react-redux';
import { authTokenRouterLog, newSearch } from '../../../redux/actions/index';
import { useAuth0 } from '@auth0/auth0-react';
import { getAllUsers, createUser } from '../../../redux/actions';
import { useEffect } from 'react';
import { setUserData } from '../../../redux/actions';
import Swal from 'sweetalert2';

function NavBar() {
	const dispatch = useDispatch();

	const { isAuthenticated, user } = useAuth0();
	const userNow = useSelector((state) => state.user);
	const loggedUserJWT = JSON.parse(localStorage.getItem('loggedUserJWT'));
	const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
	const userInfo = JSON.parse(localStorage.getItem("userInfo"));

	const allUsers = useSelector((state) => state.allUsers);
	const [flag, setFlag] = useState(true)
	const [flagLogged, setFlagLogged] = useState(true)

	// Renderización de favoritos //////////////////////
	const [renderFavorites,setrenderFavorites] = useState(0)
	
	if(allUsers.length && renderFavorites === 0){
		let exist = allUsers.length > 0 ? allUsers.filter((u) => u.email === userNow.email)[0] : {}
		if (exist) {
			let { email, password } = exist
			dispatch(authTokenRouterLog({ email, password, confirm: true }))
			setrenderFavorites(1)
		}
	}
	////////////////////////////////////////////////////

	const exists = () => {
		let exist = allUsers.length > 0 ? allUsers.filter((u) => u.email === user.email)[0] : {}
		if (exist) {
			let { email } = user
			dispatch(authTokenRouterLog({ email, password: email, confirm: true }))
		} else {
			Swal.fire({
			title: 'Loged in!',
			icon: 'success'
		}).then((result) => {
			if (result.isConfirmed) {
			let { email, given_name, family_name, nickname } = user
			let data = {
				email,
				firstname: given_name,
				lastname: family_name,
				username: nickname,
				password: email
			}
			dispatch(createUser(data))
			window.location.reload()
		}
		setFlag(!flag)
	});
	}}

	const loginUser = () => {
		console.log("userInfo", userInfo)
		console.log(loggedUser)
		if (loggedUser !== null) {
			dispatch(setUserData({
				id: userInfo.id,
				username: userInfo.username,
				picture: userInfo.picture,
				name: userInfo.name,
				email: userInfo.email,
				admin: userInfo.admin,
				jwt: loggedUserJWT
			}))
		}
		setFlagLogged(!flagLogged)
	}
	useEffect(() => {
		dispatch(getAllUsers());

	}, [dispatch]);

	

	// useEffect(() => {
	// 	const autenticarUsuario = () => {
	// 		if (isAuthenticated) {
	// 			window.localStorage.setItem("GoogleUser", JSON.stringify(user))
	// 		}
	// 		const googleUser = JSON.parse(localStorage.getItem('GoogleUser'));
	// 		if (googleUser) {
	// 			dispatch(setUserData({
	// 				id: googleUser.id,
	// 				username: googleUser.name,
	// 				picture: googleUser.picture,
	// 				name: googleUser.given_name,
	// 				email: googleUser.email,
	// 			}))
	// 		}

	// 		const userInfo = JSON.parse(localStorage.getItem("userInfo"));
	// 		console.log("userInfo", userInfo)
	// 		if (loggedUser) {
	// 			dispatch(setUserData({
	// 				id: userInfo.id,
	// 				username: userInfo.username,
	// 				picture: userInfo.picture,
	// 				name: userInfo.name,
	// 				email: userInfo.email,
	// 				admin: userInfo.admin,
	// 				jwt: loggedUserJWT
	// 			}))
	// 		}
	// 	};

	// 	autenticarUsuario();
	// }, [dispatch, isAuthenticated, loggedUser, loggedUserJWT, user]);
	let cart = '';
	let favorites = useSelector((state) => state.favorites);
	if (localStorage.getItem('cart')) {
		cart = JSON.parse(localStorage.getItem('cart'));
	}
	useSelector((state) => state.localstorage);

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
						{isAuthenticated && flag && allUsers.length > 1 && !userNow.username ? exists() : ""}
						{userInfo && flagLogged && !userNow.username ? loginUser() : ""}
						{(isAuthenticated && userNow.admin) || userNow.admin ? (
							<Dropdown
								items={[
									{ anchor: 'Create Category', slug: '/create/categories' },
									{ anchor: 'Create Product', slug: '/create/product' },
									{ anchor: 'Update Product', slug: '/update' },
									{ anchor: 'Purchases', slug: '/dashboard' },
									{ anchor: 'Reported Comments', slug: '/reportedcomments' },
									{ anchor: 'Items Out Of Stock', slug: '/outofstock' },
								]}
								dropdownTitle='DASHBOARD'
							/>
						) : <p></p>}
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
