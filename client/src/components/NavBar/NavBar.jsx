import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import usericon from '../../asset/usericon.png';
import Logo from '../../asset/Logo.png';
import './NavBar.css';

function NavBar() {
	const [productName, setName] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		setName('');
	}

	function handleOnChange(e) {
		setName(e.target.value);
	}

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
					<form onSubmit={(e) => handleSubmit(e)}>
						<input
							type='text'
							name='product'
							id='productsearch'
							value={productName}
							onChange={(e) => handleOnChange(e)}
						/>
						<Link to={`/SearchResults/${productName}`}>
							<button type='submit' className='button'>
								SEARCH
							</button>
						</Link>
					</form>
				</div>
				<div className='useroptions'>
					<div className='login'>
						<Link to={`/login-register`} className='loginlink'>
							<img src={usericon} alt='user' className='user' />
							Login/Register
						</Link>
					</div>
					<div className='cart'>Cart icon</div>
					<div className='favorites'>♥</div>
				</div>
			</nav>
		</div>
	);
}

export default NavBar;
