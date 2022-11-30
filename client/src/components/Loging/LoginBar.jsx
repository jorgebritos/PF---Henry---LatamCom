/* eslint-disable no-lone-blocks */
import React, { useState, useRef, useEffect } from 'react';
import usericon from '../../asset/usericon.png';
import { useSelector } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import { UserName } from '../../components/login/userName';
import { useHistory } from "react-router-dom";
// import { Popover, Transition } from "@headlessui/react";
import Swal from "sweetalert2"
import s from './LoginBar.module.css';

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

	// const active = s.active;
	// const inactive = s.inactive;

	return (
		<div className={s.conten} ref={menuRef}>
			<div
				className={s.menu_trigger}
				onClick={() => {
					setOpen(!open);
				}}>
				<img className={s.img} src={usericon} alt='' height='25px' />
			</div>
			<UserName>
				{isAuthenticated ? (
					<div className={`s.dropdown_menu${open ? '.active' : '.inactive'}`}>
						<h3 className={s.h3}> {user?.name}</h3>
						{solutions.map((item) => (
							<ul key={item.name} onClick={item.href}>
								<DropdownItem text={item.name} />
							</ul>
						))}
					</div>
				) : (
					<p onClick={() => loginWithRedirect()}>Login</p>
				)}
				{/* <h3 className={s.h3}>{user.username}</h3> */}
			</UserName>
		</div>
	);
};

function DropdownItem(props) {
	return (
		<li className='dropdownItem'>
			<img src={props.img} alt=''></img>
			<a href={' '}>{props.text}</a>
		</li>
	);
}

export default LoginRegister;
