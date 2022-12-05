import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getFavorites, removeAllFavorites, removeFavorite } from '../../../redux/actions';

const ShowFavorites = () => {
	const [productsSelected, setProductsSelected] = useState([]);
	const history = useHistory()
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
	}, [dispatch, favorites])

	return (
		<div>
			<h1>SHOPPING CART</h1>
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
