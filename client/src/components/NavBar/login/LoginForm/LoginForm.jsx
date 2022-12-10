import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector, useDispatch } from 'react-redux';
import { authTokenRouterLog } from '../../../../redux/actions';
import { useHistory } from 'react-router-dom';
import logoSimbolo from '../../../../asset/logoS.png';
import s from './LoginForm.module.css';

// import queryString from 'query-string';

export const LoginForm = ({ location }) => {
	// const {code} =queryString.parse(location.search);
	// const [challengesData, setChallengesData] = useState("none");

	// useEffect(() => {
	//   fetch(`http://localhost:3001/home?code=${code}`, {
	// 	method: 'GET',
	// 	headers: {
	// 	  "Content-Type": "application/json",
	// 	  Accept: "application/json",
	// 	}
	//   })
	//   .then(res => res.json())
	//   .then(res => setChallengesData(JSON.stringify(res)))
	// }, [code]);
	

	const { isLoading, loginWithRedirect, user } = useAuth0();
	const history = useHistory();
	const logg = useSelector((state) => state.login)
	const dispatch = useDispatch();
	const user1 = useSelector((state)=> state.user)
	const [logged, setLogin] = useState({
		email:"",
		password:""
	})
	useEffect(() => {
		localStorage.removeItem("GoogleUser");
		localStorage.removeItem("loggedUserJWT");
		localStorage.removeItem("loggedUser");
		localStorage.removeItem("userInfo");
	  },[]);
	useEffect (()=>{
		if(logg.length>1){
			window.localStorage.setItem("loggedUserJWT", JSON.stringify(logg))
			window.localStorage.setItem("userInfo", JSON.stringify(user1))
			history.push("/home")
		}
	})
	// const [userA, setUserA]=useState({
	// 	prop1:"",
	// 	prop2:""
	// })
	

	// const usuario = user && allUser.find((u) => u.email === user.email);
	// console.log(allUser);
	// useEffect(() => {
	// 	dispatch(getAllUsers());
	// }, [dispatch]);
	// const seeUser = () => {
	// 	let JWT = [];
	// 	if (localStorage.getItem('loggedUserJWT')) {
	// 		JWT = JSON.parse(localStorage.getItem('loggedUserJWT'));
	// 	}
	// 	let userR = [];
	// 	if (localStorage.getItem('loggedUser')) {
	// 		userR = JSON.parse(localStorage.getItem('loggedUser'));
	// 	}		

	// 	setLogin({...logged, email:userR.email, password:userR.password, token:JWT})
	// };
	
	// console.log(logged)
	// useEffect(() => {
	// 	seeUser();
	// }, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	
	const log= async ()=>{
		loginWithRedirect();
		// const domain = 'dev-g1jtn0qvoq0x04y4.us.auth0.com';
		// const audience = 'https://www.PF---Henry---LatamCom.com';
		// const scope = "read:PF-Henry";
		// const clientId = "jSKxgpG26EO0rS6t8vN35jzlpMo9gjPL";
		// const responseType = "code";
		// const redirectUri = "http://localhost:3000/home";

		// const response = await fetch(
		// 	`https://${domain}/authorize?` +
		// 	`audience=${audience}&` +
		// 	`scope=${scope}&` +
		// 	`response_type=${responseType}&` +
		// 	`client_id=${clientId}&` +
		// 	`redirect_uri=${redirectUri}`, {
		// 	  redirect: "manual"
		// 	}
		//   );
		//   window.location.replace(response.url);
	};

	function handleInputChange(e) {
		e.preventDefault();
		setLogin({
			...logged,
			[e.target.name]: e.target.value
		})
		return logged
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
		// if ([email, password].includes("")) {
		// 	setAlerta({ msg: "Ambos campos son requeridos", error: true });
		// 	setTimeout(() => {
		// 	  setAlerta({});
		// 	}, 2500);
		// 	return;
		// };
		// let confirm = true
		// console.log(login)
/* 		const value = e.target.value;
		const property = e.target.name; */

/* 		setInput({ ...input, [property]: value });
		setErrors(validateInput({ ...input, [property]: value })); */
		// seeUser();
	   	dispatch(authTokenRouterLog({...logged, confirm: true,}))

	//   console.log(a)
	  	window.localStorage.setItem("loggedUser", JSON.stringify(logged))

		// console.log(`logg despues del dispatch: ${logg}`);
		// console.log(`user1: ${user1}`);
		// if (logg === "IncorrectPassword") {
		// 	alert("La contraseña es incorrecta")
		// }else{
		// setLogin({email: "", password: "", admin:""})}
		
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
						<input className={s.input} name="email" type='text' value={logged.email} onInput={e => handleInputChange(e)} placeholder=' Email..' />
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
