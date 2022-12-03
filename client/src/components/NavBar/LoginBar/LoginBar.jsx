import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import usericon from '../../../asset/usericon.png';
import {
	dropdown_wrapper,
	dropdown_activator,
	dropdown_item_list,
	active,
	h4,
	item_list,
	componet_login,
} from './LoginBar.module.css';
import { useSelector } from 'react-redux';

function LoginRegister({ items = [] }) {
	const history = useHistory();
	let { logout, isAuthenticated, loginWithRedirect, user } = useAuth0();
	const userNow = useSelector((state) => state.user);
	let functionalUser = {};

	const userConfig = (e) => {
		e.preventDefault();
		history.push('/profile');
	};

	const Logout = (e) => {
		e.preventDefault();
		console.log('entre');
		Swal.fire({
			title: 'Sure about loging out?',
			icon: 'warning',
			showCancelButton: true,
			cancelButtonColor: '#d33',
			confirmButtonColor: '#3085d6',
			confirmButtonText: 'Log out!',
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire('Log out succesfully!', '', 'success');
				history.push('/home');
				logout();
			} else {
				history.push('/home');
				Swal.fire('Log out canceled!', '', 'warning');
			}
		});
	};

	const activatorRef = useRef(null);
	const dropdownListRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	const clickHandler = () => {
		setIsOpen(!isOpen);
	};

	const keyHandler = (event) => {
		if (event.key === 'Escape' && isOpen) {
			setIsOpen(false);
		}
	};

	const clickOutsideHandler = (event) => {
		if (dropdownListRef.current) {
			if (
				dropdownListRef.current.contains(event.target) ||
				activatorRef.current.contains(event.target)
			) {
				return;
			}
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			dropdownListRef.current.querySelector('a').focus();
			document.addEventListener('mousedown', clickOutsideHandler);
		} else {
			document.addEventListener('mousedown', clickOutsideHandler);
		}
	}, [isOpen]);

	return (
		<>
			{Object.keys(userNow).length > 0 ? functionalUser = userNow : user}
			{Object.keys(userNow).length > 0 || isAuthenticated ? (
				<div className={dropdown_wrapper} onKeyUp={keyHandler}>
					<button
						className={dropdown_activator}
						aria-haspopup='true'
						// aria-controls={dropdownTitle}
						onClick={clickHandler}
						ref={activatorRef}>
						{!functionalUser.name ? functionalUser.username : functionalUser.name}{' '}
						{isOpen ? (
							<svg
								height='24'
								fill='rgb(70,70,70)'
								viewBox='0 0 24 24'
								width='24'
								xmlns='http://www.w3.org/2000/svg'>
								<path d='m0 0h24v24h-24z' fill='none' />
								<path d='m7.41 15.41 4.59-4.58 4.59 4.58 1.41-1.41-6-6-6 6z' />
							</svg>
						) : (
							<svg
								height='24'
								fill='rgb(70,70,70)'
								viewBox='0 0 24 24'
								width='24'
								xmlns='http://www.w3.org/2000/svg'>
								<path d='m0 0h24v24h-24z' fill='none' />
								<path d='m7.41 8.59 4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z' />
							</svg>
						)}
					</button>
					<ul
						ref={dropdownListRef}
						className={`${dropdown_item_list} ${isOpen ? active : ''} `}>
						{items.map((item, index) => {
							return (
								<li className={item_list} key={index}>
									<a
										onClick={(e) =>
											item.anchor === 'Configuration'
												? userConfig(e)
												: Logout(e)
										}>
										{item.anchor}
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			) : (
				<div className={componet_login}>
					<img src={usericon} alt='' height={'25px'} />
					<h6 onClick={() => history.push("/LoginForm")} className={h4}>
						Login
					</h6>
				</div>
			)}
		</>
	);
}

export default LoginRegister;
