import React from 'react';
import Logo from '../../../asset/Logo.png';
import Carito from '../../../asset/carrito.png';
import star from '../../../asset/star.png';
import SearchBar from '../searchBar/SearchBar.jsx';
import { Link } from 'react-router-dom';
import s from './NavBar.module.css';
import LoginRegister from '../LoginBar/LoginBar';
import {useDispatch, useSelector} from "react-redux"
import { newSearch } from '../../../redux/actions/index'

function NavBar() {
	const dispatch= useDispatch()
	const products = useSelector((state) => state.searchedProducts)
	let cart = '';
	if (localStorage.getItem('cart')) {
		cart = JSON.parse(localStorage.getItem('cart'));
	}

	const local = useSelector((state)=>state.localstorage)

	function search(e) {
		dispatch(newSearch(''))
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
						<li className={s.li}>
							<Link to={'/create/product'} className={s.Link}>
								<h3>Create-Product</h3>
							</Link>
						</li>
					</ul>
				</div>
				<div>
					<SearchBar />
				</div>

				<div>
					<LoginRegister />
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
				</div>
			</nav>
		</div>
	);
}

export default NavBar;
