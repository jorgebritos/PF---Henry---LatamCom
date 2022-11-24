import React from 'react';
import usericon from '../../asset/usericon.png';
import { getUser, getAllUsers } from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import s from './LoginBar.module.css';

const LoginRegister = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(getAllUsers());
		dispatch(getUser(1));
	});
	return (
		<div className={s.Login}>
			{/* {user.username ? ( */}
			<div className={s.Login}>
				<img src={usericon} alt='' height='35px' />
				<h3 className={s.h3}>{user.username}</h3>
			</div>
			{/* ) : (
				'Esto no existe'
			)} */}
		</div>
	);
};

export default LoginRegister;
