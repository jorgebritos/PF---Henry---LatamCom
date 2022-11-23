import React from 'react';
import Logo from '../../asset/Logo.png';
import SearchBar from '../searchBar/SearchBar.jsx';

import s from './NavBar.module.css';
import LoginRegister from '../Loging/LoginBar';

function NavBar() {
	return (
		<div className={s.navBar}>
			<nav className={s.navbar}>
				<div className={s.logodiv}>
					<img src={Logo} alt='Logo' height='40px' />
				</div>
				<div className={s.options}>
					<div className={s.navOption}>Home</div>
					<br />
					<div className={s.navOption}>Shop</div>
				</div>
				<div>
					<SearchBar />
				</div>

				<div>
					<div>
						<LoginRegister />
					</div>
				</div>
				<div className={s.cart}>Cart icon</div>
				<div className={s.favorites}>♥</div>
			</nav>
		</div>
	);
}

export default NavBar;
