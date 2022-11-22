import React from 'react';
import { Link } from 'react-router-dom';
import usericon from '../../../asset/usericon.png';

const LoginRegister = () => {
	return (
		<Link to={`/login-register`} className='loginlink'>
			<img src={usericon} alt='user' className='user' />
			Login/Register
		</Link>
	);
};

export default LoginRegister;
