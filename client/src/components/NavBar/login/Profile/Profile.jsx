import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import s from './Profile.module.css';
import Loading from '../../../loading/Loading';
import usericon from '../../../../asset/usericon.png';

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
						{user.picture ? (
							<img src={usericon} alt={'user icon'} className={s.img} />
						) : (
							<img src={user.picture} alt={user.name} className={s.img} />
						)}
					</div>
					<div className={s.infoPerfil}>
						<h2>{user.name}</h2>
						<p>Email: {user.email}</p>
					</div>
				</div>
				<div className={s.conCompra}>
					<h2>Consola de Compras</h2>
					<div></div>
				</div>
			</div>
		)
	);
};

export default Profile;
