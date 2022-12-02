/* eslint-disable no-lone-blocks */
import React, { useState, useRef, useEffect } from 'react';
import usericon from '../../../asset/usericon.png';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { UserName } from '../login/userName';
import { useHistory } from 'react-router-dom';
// import { Popover, Transition } from "@headlessui/react";
import Swal from 'sweetalert2';
import './LoginBar.css';

const LoginRegister = () => {
	// const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
	const history = useHistory();
	const [open, setOpen] = useState(false);
	let menuRef = useRef();

	const userConfig = () => {
		history.push('/profile');
	};

	const Logout = () => {
		Swal.fire({
			title: 'Sure about loging out?',
			icon: 'warning',
			showCancelButton: true,
			cancelButtonColor: '#d33',
			confirmButtonColor: '#3085d6',
			confirmButtonText: 'Log out!',
		}).then((result) => {
			if (result.isConfirmed) {
				logout();
				history.push('/home');
				Swal.fire('Log out succesfully!', '', 'success');
			} else {
				history.push('/home');
				Swal.fire('Log out canceled!', '', 'warning');
			}
		});
	};

	const solutions = [
		{
			name: 'Configuration',
			href: userConfig,
		},
		{
			name: 'Log Out',
			href: Logout,
		},
	];

	useEffect(() => {
		let handler = (e) => {
			if (!menuRef.current.contains(e.target)) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handler);

		return () => {
			document.removeEventListener('mousedown', handler);
		};
	});

	return (
		<>
			<div className='conten_menu' ref={menuRef}>
				<div
					className='menu'
					onClick={() => {
						setOpen(!open);
					}}>
					<img className='imgagen' src={usericon} alt='' height='25px' />
					<UserName />

					{isAuthenticated ? (
						<>
							<div className={`dropdown_menu${open ? `active` : `inactive`}`}>
								{solutions.map((item) => (
									<ul key={item.name} onClick={item.href}>
										<DropdownItem className='text' text={item.name} />
									</ul>
								))}
							</div>
						</>
					) : (
						<p onClick={() => loginWithRedirect()}>Login</p>
					)}
				</div>
			</div>
		</>
	);
};

function DropdownItem(props) {
	return (
		<li className='li'>
			<a href={' '}>{props.text}</a>
		</li>
	);
}

// import React, { useState, useEffect, useRef } from 'react';
// import {
// 	dropdown_wrapper,
// 	dropdown_activator,
// 	dropdown_item_list,
// 	active,
// 	item_list,
// } from './LoginBar.module.css';

// function LoginRegister({ items = [], dropdownTitle }) {
// 	const activatorRef = useRef(null);
// 	const dropdownListRef = useRef(null);
// 	const [isOpen, setIsOpen] = useState(false);

// 	const clickHandler = () => {
// 		setIsOpen(!isOpen);
// 	};

// 	const keyHandler = (event) => {
// 		// console.log(event);
// 		if (event.key === 'Escape' && isOpen) {
// 			setIsOpen(false);
// 		}
// 	};

// 	const clickOutsideHandler = (event) => {
// 		if (dropdownListRef.current) {
// 			if (
// 				dropdownListRef.current.contains(event.target) ||
// 				activatorRef.current.contains(event.target)
// 			) {
// 				return;
// 			}

// 			setIsOpen(false);
// 		}
// 	};

// 	useEffect(() => {
// 		if (isOpen) {
// 			dropdownListRef.current.querySelector('a').focus();
// 			document.addEventListener('mousedown', clickOutsideHandler);
// 		} else {
// 			document.addEventListener('mousedown', clickOutsideHandler);
// 		}
// 	}, [isOpen]);

// 	return (
// 		<div className={dropdown_wrapper} onKeyUp={keyHandler}>
// 			<button
// 				className={dropdown_activator}
// 				aria-haspopup='true'
// 				aria-controls={dropdownTitle}
// 				onClick={clickHandler}
// 				ref={activatorRef}>
// 				{dropdownTitle}{' '}
// 				{isOpen ? (
// 					<svg
// 						height='24'
// 						fill='rgb(70,70,70)'
// 						viewBox='0 0 24 24'
// 						width='24'
// 						xmlns='http://www.w3.org/2000/svg'>
// 						<path d='m0 0h24v24h-24z' fill='none' />
// 						<path d='m7.41 15.41 4.59-4.58 4.59 4.58 1.41-1.41-6-6-6 6z' />
// 					</svg>
// 				) : (
// 					<svg
// 						height='24'
// 						fill='rgb(70,70,70)'
// 						viewBox='0 0 24 24'
// 						width='24'
// 						xmlns='http://www.w3.org/2000/svg'>
// 						<path d='m0 0h24v24h-24z' fill='none' />
// 						<path d='m7.41 8.59 4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z' />
// 					</svg>
// 				)}
// 			</button>
// 			<ul
// 				ref={dropdownListRef}
// 				className={`${dropdown_item_list} ${isOpen ? active : ''} `}>
// 				{items.map((item, index) => {
// 					return (
// 						<li className={item_list} key={index}>
// 							<a href={item.slug}>{item.anchor}</a>
// 						</li>
// 					);
// 				})}
// 			</ul>
// 		</div>
// 	);
// }

export default LoginRegister;
