import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import s from './Profile.module.css';
import Loading from '../../../loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import usericon from '../../../../asset/usericon.png';
import { getUserPurchases } from '../../../../redux/actions';
import { useHistory } from 'react-router-dom';

export const Profile = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const history = useHistory();
	const dispatch = useDispatch();

	const userNow = useSelector((state) => state.user);
	const userPurchases = useSelector((state) => state.userPurchases);

	useEffect(() => {
		if (userNow.id) {
			dispatch(getUserPurchases(userNow.id));
		}
	}, [dispatch, userNow.id]);

	if (isLoading) {
		return (
			<div className={s.cont}>
				<Loading />
			</div>
		);
	}
	console.log("userNow",userNow)
	// Object.keys(userNow).length > 0 && !name ? setItems(userNow) : isAuthenticated ? setItems(user) : setItems(voidItem)

	return (
		<>
			{Object.keys(userNow).length > 0 || isAuthenticated ? (
				<div className={s.conten}>
					<div className={s.barPerfil}>
						<div className={s.imgPerfil}>
						
							{userNow.picture ? (
								<img
									src={userNow.picture}
									alt={userNow.name}
									className={s.img}
								/>
							) : (
								<img src={usericon} alt={'user icon'} className={s.img} />
							)}
						</div>
						<div className={s.infoPerfil}>
							<h2>{user ? user.name : userNow.name}</h2>
							<p>Email: {user ? user.email : userNow.email}</p>
						</div>
					</div>
					<div className={s.conCompra}>
						<h2>Shopping Console</h2>
						<div>
							{userPurchases.length > 0
								? userPurchases.map((p) => {
										return (
											<div className={s.contG} key={p.id}>
												<div>
													<p>
														Purchase made at: {p.createdAt.split('T', 1).join()}
													</p>
												</div>

												<div className={s.contItem}>
													{p.products.map((producto, index) => {
														return (
															<div className={s.producCard} key={index}>
																<div className={s.cimg}>
																	<img
																		className={s.img2}
																		src={producto.image}
																		alt='product_image'
																	/>
																</div>
																<div>
																	<p className={s.nameP}>{producto.name}</p>
																	<p>Amount: {producto.amount}</p>
																</div>

																<div>
																	<p className={s.precio}>
																		Price: {producto.price}
																	</p>
																</div>
															</div>
														);
													})}
												</div>
												<div>
													<p>Total Price: {p.totalPrice}</p>
												</div>
											</div>
										);
								  })
								: ''}
						</div>
					</div>
					<div>
						<button
							className={s.btn}
							onClick={() => history.push(`/profile/changedata`)}>
							Edit information
						</button>
					</div>
				</div>
			) : (
				<h1>Inicie Sesión</h1>
			)}
		</>
	);
};

export default Profile;
