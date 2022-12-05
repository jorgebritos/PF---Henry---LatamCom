import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import s from './Login.module.css';

export const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();

	return (
		<button onClick={() => loginWithRedirect()}>
			<h6 className={s.h4}>User</h6>
		</button>
	);
};
