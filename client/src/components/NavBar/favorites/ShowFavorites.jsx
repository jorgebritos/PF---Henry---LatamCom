import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	getFavorites,
	removeAllFavorites,
	removeFavorite,
} from '../../../redux/actions';
import s from './ShowFavorites.module.css';

const ShowFavorites = () => {
	const [productsSelected, setProductsSelected] = useState([]);
	const history = useHistory();
	const dispatch = useDispatch();
	let favorites = useSelector((state) => state.favorites);
	const user = useSelector((state) => state.user);

	const deleteProduct = (e, id) => {
		e.preventDefault();
		favorites = favorites.filter((p) => p.id !== id);
		if (user.id) {
			dispatch(removeFavorite(user.id, id));
		}
	};

	useEffect(() => {
		if (user.id) {
			dispatch(getFavorites(user.id));
		}
	}, [dispatch, favorites]);

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
												onClick={(e) => deleteProduct(e, producto.id)}>
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
