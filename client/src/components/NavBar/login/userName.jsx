import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';

export const UserName = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		isAuthenticated && (
			<div>
				<h2>{user.name}</h2>
			</div>
		)
	);
};

export default UserName;
