import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import s from './Profile.module.css';
import Loading from '../../../loading/Loading';

export const Profile = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return (
			<div className={s.cont}>
				<Loading />
			</div>
		);
	}

	return (
		isAuthenticated && (
			<div className={s.conten}>
				<div className={s.barPerfil}>
					<div className={s.imgPerfil}>
						<img src={user.picture} alt={user.name} className={s.img} />
					</div>
					<div>
						<h2>{user.name}</h2>
						<p>Email: {user.email}</p>
					</div>
				</div>
				<div>Consola de compras</div>
			</div>
		)
	);
};

export default Profile;
