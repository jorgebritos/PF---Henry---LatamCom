import React from 'react';
import Logo from '../../asset/Logo.png';
import Carito from '../../asset/carrito.png';
import star from '../../asset/star.png';
import SearchBar from '../searchBar/SearchBar.jsx';
import { Link } from 'react-router-dom';
import s from './NavBar.module.css';
import LoginRegister from '../Loging/LoginBar';

function NavBar() {

	let cart = ""
	if (localStorage.getItem("cart")) {
		cart = JSON.parse(localStorage.getItem("cart"))
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
							<Link to={'/home'} className={s.Link}>
								<h3>Home</h3>
							</Link>
						</li>
						<li className={s.li}>
							<Link to={'/shop'} className={s.Link}>
								<h3>Shop</h3>
							</Link>
						</li>
					</ul>
				</div>
				<div>
					{(localStorage.getItem("cart")) && <div className={s.CarritoCantidad}> {cart.length}</div>  }
				</div>
				<div>
					<SearchBar />
				</div>

				<div>
					<LoginRegister />
				</div>

				<div className={s.cart}>
					<Link to="/shoppingcart">
						<img src={Carito} alt='Carro de compras' height='25px' />
					</Link>
				</div>
				<div className={s.favorites}>
					<img src={star} alt='estrella de favoritos' height='25px' />
				</div>
			</nav>
		</div>
	);
}

export default NavBar;
