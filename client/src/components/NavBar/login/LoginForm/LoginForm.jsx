import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector, useDispatch } from 'react-redux';
import { authTokenRouterLog } from '../../../../redux/actions';
import { useHistory } from 'react-router-dom';
import logoSimbolo from '../../../../asset/logoS.png';
import s from './LoginForm.module.css';
import { setUserData } from '../../../../redux/actions';

// import queryString from 'query-string';

export const LoginForm = ({ location }) => {

	const { isLoading, loginWithRedirect, user,isAuthenticated } = useAuth0();
	const history = useHistory();
	const logg = useSelector((state) => state.login);
	const dispatch = useDispatch();
	const user1 = useSelector((state)=> state.user)
	const loggedUserJWT =JSON.parse( localStorage.getItem('loggedUserJWT'));
	const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
	const [logged, setLogin] = useState({
		email:"",
		password:""
	})

	
	useEffect (()=>{
		if(logg.length>1){
			window.localStorage.setItem("loggedUserJWT", JSON.stringify(logg))
			window.localStorage.setItem("userInfo", JSON.stringify(user1))
			history.push("/home")
		}
		if(user1.length>1){
			history.push("/home")
		}
	})
	
	useEffect(() => {
		const autenticarUsuario = () => {
			if(isAuthenticated){
				window.localStorage.setItem("GoogleUser", JSON.stringify(user))
			}
			const googleUser = JSON.parse(localStorage.getItem('GoogleUser'));
			if(googleUser){
			dispatch(setUserData({
				username:googleUser.name,
				picture: googleUser.picture,
				name: googleUser.given_name,
				email:googleUser.email,
			}))}
			
		  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
		  console.log("userInfo", userInfo)
		  if(loggedUser) {
			dispatch(setUserData({
				id: userInfo.id,
				username: userInfo.username,
				picture: userInfo.picture,
				name: userInfo.name,
				email: userInfo.email,
				admin: userInfo.admin,
				jwt: loggedUserJWT
			}))
		  }
		};

		autenticarUsuario();
	  }, []);
	
	if (isLoading) {
		return <div>Loading...</div>;
	}

	const log = async () => {
		loginWithRedirect();
	};

	function handleInputChange(e) {
		e.preventDefault();
		setLogin({
			...logged,
			[e.target.name]: e.target.value,
		});
		return logged;
	}
	// console.log(`user1 antes del dispatch: ${user1}`);

	// console.log(`logg antes del dispatch: ${logg}`);
	/* 	const [input, setInput] = useState({email:"", password:""});
	const [error, setErrors] = useState({email:"", password:""}); */

	/* 	const validateInput = (input) => {
		let errors = {};
		let expreg = /[.*+\-?^${}()|[\]\\/]/;
	} */

	function confirmUser(e) {
		e.preventDefault();
/* 		const value = e.target.value;
		const property = e.target.name; */

		/* 		setInput({ ...input, [property]: value });
		setErrors(validateInput({ ...input, [property]: value })); */
		// seeUser();
		dispatch(authTokenRouterLog({ ...logged, confirm: true }));

		//   console.log(a)
		window.localStorage.setItem('loggedUser', JSON.stringify(logged));

		// console.log(`logg despues del dispatch: ${logg}`);
		// console.log(`user1: ${user1}`);
		if (logg === 'IncorrectPassword') {
			alert('La contraseña es incorrecta');
		} else {
			setLogin({ email: '', password: '', admin: '' });
		}
	}
	
	// if(logg){
	// 	window.localStorage.setItem("loggedUserJWT", JSON.stringify(logg))
	// 	history.push("/home")
	// }
	// console.log("antes del if:" + logg)
	
	

	return (
	
		<div className={s.back_ground}>
			<h1 className={s.form_title}>LOG IN WITH</h1>
			<div className={s.conten_form}>
				<div className={s.cont}>
					<img src={logoSimbolo} alt='Logo simbolo' height={'40px'} />
					<br />
					<div className={s.from}>
						<label className={s.label}>Enter your email</label>
						<input
							className={s.input}
							name='email'
							type='text'
							value={logged.email}
							onInput={(e) => handleInputChange(e)}
							placeholder=' Email..'
						/>
						<label className={s.label}>Enter your password</label>
						<input
							className={s.input}
							onInput={(e) => handleInputChange(e)}
							type='password'
							name='password'
							value={logged.password}
							placeholder=' Password..'
						/>
					</div>
					<br />
					<button
						className={s.btn}
						id='confirm'
						onClick={(e) => confirmUser(e)}>
						Let`s get started
					</button>
					<br />
					<button className={s.btn} onClick={() => history.push('/CreateUser')}>
						Register
					</button>
					<br />
					<hr width='150px' />
					<h5>Or...</h5>
					{/* <div>{challengesData}</div> */}
					<button className={s.btnG} onClick={() => log()}>
						<img
							src='https://img.icons8.com/fluency/25/null/google-logo.png'
							alt=''
						/>
						<p className={s.p}>Google</p>
					</button>
				</div>
			</div>
		</div>
	);
};
