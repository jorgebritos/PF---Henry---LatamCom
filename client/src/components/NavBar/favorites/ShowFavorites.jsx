import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getFavorites, removeFavorite } from '../../../redux/actions';

const ShowFavorites = () => {
	const dispatch = useDispatch()
	let favorites = useSelector((state) => state.favorites)
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
			dispatch(getFavorites(user.id))
		}
	}, [dispatch, favorites, user.id])

	return (
		<div>
			<h1>FAVORITES</h1>
			<div>
				<div>
					{favorites.map((producto) => {
						return (
							<div key={producto.id}>
								<Link to={`/product/${producto.id}`}>
									<div>
										<img
											src={producto.image}
											width='100px'
											alt=''
										/>
									</div>
									<div>
										<div>
											<h4>{producto.name}</h4>
										</div>
										<button
											onClick={(e) => deleteProduct(e, producto.id)}>
											REMOVE ITEM
										</button>
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
