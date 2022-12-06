import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite } from '../../../redux/actions';
import s from './ShowFavorites.module.css'

const ShowFavorites = () => {
	const dispatch = useDispatch();
	let favorites = useSelector((state) => state.favorites);
	const user = useSelector((state) => state.user);

	const deleteProduct = (e, idProduct, idUser) => {
		e.preventDefault();
		favorites = favorites.filter((p) => p.id !== idProduct);
		if (user.id) {
			dispatch(removeFavorite(idUser, idProduct));
		}
	};

	useEffect(() => {
		if (user.id) {
			// dispatch(getFavorites(user.id));
		}
	}, [dispatch, favorites, user.id]);

	return (
		<div className={s.backg}>
			<h1>FAVORITES</h1>
			<div>
				<div className={s.conten_card}>
					{favorites.map((producto) => {
						return (
							<div key={producto.id}>
								<Link className={s.link} to={`/product/${producto.id}`}>
									<div className={s.card}>
										<div className={s.cimg}>
											<img
												className={s.img}
												src={producto.image}
												width='100px'
												alt=''
											/>
										</div>
										<div className={s.conte2}>
											<div>
												<h4 className={s.nameP}>{producto.name}</h4>
											</div>
											<button
												className={s.btn}
												onClick={(e) => deleteProduct(e, user.id, producto.id)}>
												REMOVE ITEM
											</button>
										</div>
									</div>
								</Link>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ShowFavorites;
