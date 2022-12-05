import React from 'react';
import Logo from '../../../asset/Logo.png';
import Carito from '../../../asset/carrito.png';
import star from '../../../asset/star.png';
import SearchBar from '../searchBar/SearchBar.jsx';
import { Link } from 'react-router-dom';
import s from './NavBar.module.css';
import LoginRegister from '../LoginBar/LoginBar';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';


function NavBar() {
	let cart = '';
	let favorites = useSelector((state) => state.favorites)
	if (localStorage.getItem('cart')) {
		cart = JSON.parse(localStorage.getItem('cart'));
	}
	
	const { user, isLoading, isAuthenticated } = useAuth0();

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
							<Link to={'/home'} className={s.Link}>
								<h3>Home</h3>
							</Link>
						</li>
						{isAuthenticated? (
						
						<li className={s.li}>
							<Link to={'/create/product'} className={s.Link}>
								<h3>Create-Product</h3>
							</Link>
						</li>
						):(<p></p>
					)}
					</ul>
				</div>
				<div>
					<SearchBar />
				</div>

				<div>
					<LoginRegister items={[{ anchor: 'Configuration', slug: '' }, { anchor: 'Log Out', slug: '', }]} dropdownTitle="USER" />
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
				<div></div>
				<div className={s.favorites}>
					<img src={star} alt='estrella de favoritos' height='25px' />
					{favorites.length}
				</div>
			</nav>
		</div>
	);
}

export default NavBar;
