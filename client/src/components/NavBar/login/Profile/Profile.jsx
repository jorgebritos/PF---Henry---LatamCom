import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import s from './Profile.module.css';
import Loading from '../../../loading/Loading';
import { useSelector } from 'react-redux';
import usericon from '../../../../asset/usericon.png';

export const Profile = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	const userNow = useSelector((state) => state.user);

	if (isLoading) {
		return (
			<div className={s.cont}>
				<Loading />
			</div>
		);
	}


	// Object.keys(userNow).length > 0 && !name ? setItems(userNow) : isAuthenticated ? setItems(user) : setItems(voidItem)

	return (
		<>
			{
				Object.keys(userNow).length > 0 || isAuthenticated ? (
					<div className={s.conten}>
						<div className={s.barPerfil}>
							<div className={s.imgPerfil}>
								{user ? (
									<img src={user.picture} alt={user.name ? user.name : userNow.name} className={s.img} />
								) : userNow.picture ? (
									<img src={userNow.picture} alt={userNow.name} className={s.img} />
								) :
									<img src={usericon} alt={'user icon'} className={s.img} />
								}
							</div>
							<div className={s.infoPerfil}>
								<h2>{user ? user.name : userNow.name}</h2>
								<p>Email: {user ? user.email : userNow.email}</p>
							</div>
						</div>
						<div className={s.conCompra}>
							<h2>Consola de Compras</h2>
							<div></div>
						</div>
					</div>
				) : (<h1>Inicie Sesión</h1>)}
		</>
	);
};

export default Profile;
