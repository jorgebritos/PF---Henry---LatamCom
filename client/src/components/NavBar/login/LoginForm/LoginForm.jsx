import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, authTokenRouterLog } from '../../../../redux/actions';
import { useHistory } from 'react-router-dom';
import logoSimbolo from '../../../../asset/logoS.png';
import s from './LoginForm.module.css';

export const LoginForm = () => {
	const { user, isLoading, loginWithRedirect } = useAuth0();
	const allUser = useSelector((state) => state.allUsers);
	const dispatch = useDispatch();
	const [login, setLogin] = useState({
		email: "john@gmail.com",
		password: "m38rmF$"
	})
	const history = useHistory();

	const usuario = user && allUser.find((u) => u.email === user.email);

	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	function handleInputChange(e) {
		e.preventDefault();
		setLogin({
			...login,
			[e.target.name]: e.target.value
		})
	}

	function confirmUser(e) {
		e.preventDefault();
		dispatch(authTokenRouterLog({...login}))
		setLogin({email: "", password: ""})
	}

	return (
		<div className={s.back_ground}>
			<h1 className={s.form_title}>LOG IN WITH</h1>
			<div className={s.conten_form}>
				<div className={s.cont}>
					<img src={logoSimbolo} alt='Logo simbolo' height={'40px'} />
					<br />
					<div className={s.from}>
						<label className={s.label}>Enter your email</label>
						<input className={s.input} name="email" type='text' value={login.email} onInput={e => handleInputChange(e)} placeholder=' Email..' />
						<label className={s.label}>Enter your password</label>
						<input
							className={s.input}
							onInput={(e) => handleInputChange(e)}
							type='text'
							name='password'
							value={login.password}
							placeholder=' Password..'
						/>
					</div>
					<br />
					<button className={s.btn} onClick={(e) => confirmUser(e)}>
						Let`s get started
					</button>
					<br />
					<button className={s.btn} onClick={() => history.push('/CreateUser')}>
						Register
					</button>
					<br />
					<hr width='150px' />
					<h5>Or...</h5>
					<button className={s.btnG} onClick={() => loginWithRedirect()}>
						<img
							src='https://img.icons8.com/fluency/16/null/google-logo.png'
							alt=''
						/>
						<p className={s.p}>Google</p>
					</button>
				</div>
			</div>
		</div>
	);
};
