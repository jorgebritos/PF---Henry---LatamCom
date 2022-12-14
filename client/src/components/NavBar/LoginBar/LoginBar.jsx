import React, { useState, useEffect, useRef } from 'react';
//import axios from "axios";
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
	// const dispatch = useDispatch();
	const history = useHistory();
	let { logout, isAuthenticated, user } = useAuth0();
	const userNow = useSelector((state) => state.user);
	let functionalUser;
	//const userInfo = JSON.parse(localStorage.getItem('userInfo'));
	// const loggedUserJWT = JSON.parse(localStorage.getItem('loggedUserJWT'));
	// const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
	//const [usuario, setUsuario]=useState([]);



	// const [usuario, setUsuario]=useState([]);


	// console.log(loggedUserJWT)
	// console.log(loggedUser)

	const userConfig = (e) => {
		e.preventDefault();
		setIsOpen(!isOpen)
		history.push('/profile');
	};


	// useEffect(()=>{

	// 	console.log(userInfo.username)
	// })

	const Logout = /*async*/ (e) => {
		e.preventDefault();
		setIsOpen(!isOpen)
		// const domain = "dev-g1jtn0qvoq0x04y4.us.auth0.com";
		// const clientId = "jSKxgpG26EO0rS6t8vN35jzlpMo9gjPL";
		// const returnTo =  "http://localhost:3000";

		// const response = await fetch(
		//   `https://${domain}/logout?client_id=${clientId}&returnTo=${returnTo}`,
		//   { redirect: "manual" }
		// );
		// window.location.replace(response.url);

		// console.log('entre');
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
				localStorage.removeItem("GoogleUser");
				localStorage.removeItem("loggedUserJWT");
				localStorage.removeItem("loggedUser");
				localStorage.removeItem("userInfo");
				localStorage.removeItem("total");
				localStorage.removeItem("cart");
				logout();
				history.push('/home');
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

	// useEffect(() => {
	// 	const autenticarUsuario = () => {
	// 		if(isAuthenticated){
	// 			window.localStorage.setItem("GoogleUser", JSON.stringify(user))
	// 		}
	// 		const googleUser = JSON.parse(localStorage.getItem('GoogleUser'));
	// 		if(googleUser){
	// 		dispatch(setUserData({
	// 			id: googleUser.id,
	// 			username:googleUser.name,
	// 			picture: googleUser.picture,
	// 			name: googleUser.given_name,
	// 			email:googleUser.email,
	// 		}))}

	// 	  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
	// 	  console.log("userInfo", userInfo)
	// 	  if(loggedUser) {
	// 		dispatch(setUserData({
	// 			id: userInfo.id,
	// 			username: userInfo.username,
	// 			picture: userInfo.picture,
	// 			name: userInfo.name,
	// 			email: userInfo.email,
	// 			admin: userInfo.admin,
	// 			jwt: loggedUserJWT
	// 		}))
	// 	  }
	// 	};

	// 	autenticarUsuario(); // eslint-disable-next-line
	// }, []);
	//   console.log(user)
	// let JWT;
	// 	if (localStorage.getItem('loggedUserJWT')) {
	// 		JWT = JSON.parse(localStorage.getItem('loggedUserJWT'));
	// 	}
	// 	let userR;
	// 	if (localStorage.getItem('loggedUser')) {
	// 		userR = JSON.parse(localStorage.getItem('loggedUser'));
	// 	}
	// 	console.log("soy userR:" + userR)
	// // useEffect(()=>{
	// // },[])
	// if(!userNow){
	// 	setUsuario({...userNow, email:userR.email, password:userR.password, JWT:JWT})
	// }
	// console.log(userR)

	return (
		<>
			{/* { console.log("USERNOW:: ", userNow) } */}
			{/* {loggedUser? userNow.email= loggedUser.email : null } */}
			{Object.keys(userNow).length > 0
				? (functionalUser = userNow.username)
				: user
					? (functionalUser = user.name)
					: ''}
			{Object.keys(userNow).length > 0 || isAuthenticated ? (
				<div className={dropdown_wrapper} onKeyUp={keyHandler}>
					<button
						className={dropdown_activator}
						aria-haspopup='true'
						// aria-controls={dropdownTitle}
						onClick={clickHandler}
						ref={activatorRef}>
						{functionalUser}
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
										href=' '
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
					<h6 onClick={() => history.push('/LoginForm')} className={h4}>
						Login
					</h6>
				</div>
			)}
		</>
	);
}

export default LoginRegister;
