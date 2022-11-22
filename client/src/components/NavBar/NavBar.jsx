import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import usericon from '../../asset/usericon.png';
import Logo from '../../asset/Logo.png';
import SearchBar from './Modules/SearchBar.jsx';

import './NavBar.css';
import LoginRegister from './Modules/LoginBar';

function NavBar() {
	return (
		<div className='navBar'>
			<nav className='navbar'>
				<div className='logodiv'>
					<img src={Logo} alt='Logo' className='logo' />
				</div>
				<div className='options'>
					<div className='navOption'>Home</div>
					<div className='navOption'>Shop</div>
				</div>
				<div className='searchbar'>
					<SearchBar />
				</div>
				<div className='useroptions'>
					<div className='login'>
						<LoginRegister />
					</div>
					<div className='cart'>Cart icon</div>
					<div className='favorites'>♥</div>
				</div>
			</nav>
		</div>
	);
}

export default NavBar;
