import React from 'react';
// import { Link } from 'react-router-dom';
import usericon from '../../asset/usericon.png';
import { getUser, getAllUsers } from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const LoginRegister = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(getAllUsers());
		dispatch(getUser(1));
	});
	return (
		<div>
			{user.username ? (
				<div>
					<img src={usericon} alt='' />
					<h1>{user.username}</h1>
				</div>
			) : (
				'Esto no existe'
			)}
		</div>
	);
};

export default LoginRegister;
