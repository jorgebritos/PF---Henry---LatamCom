import React from 'react';
import { Link } from 'react-router-dom';
import s from './CardProduct.module.css';
import { addFavorites } from '../../../redux/actions/index.js';
import { useDispatch, useSelector } from 'react-redux';
import star from '../../../asset/puntajes.png';

export default function CardProduct({ id, name, price, image, rating, stock }) {
	const favorites = useSelector((state) => state.favorites);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const addFavorite = async (event, idUser) => {
		event.preventDefault();

		let product = {
			id,
			name,
			price,
			image,
		};

		let exists = await favorites.find((f) => f.id === Number(id));

		if (exists) return alert('Este objeto ya es de tus favoritos');
		if (!idUser) return alert('Debes estar logueado para realizar esta acción');
		dispatch(addFavorites({ idProduct: product.id, idUser }));
	};

	return (
		<div className={s.espacio}>
			<Link to={`/product/${id}`} className={s.Link}>
				<div className={s.card}>
					<div className={s.cimg}>
						<img src={image} className={s.img} alt='imagen' height='150px' />
					</div>
					<div className={s.cardBody}>
						<p className={s.name}>{name}</p>
						<p className={s.price}>${price} USD</p>
						<p className={s.price}>
							{rating ? (
								<label>
									<span>{rating.toFixed(1)}</span>{' '}
									<img className={s.star} src={star} height={'15px'} alt='' />
								</label>
							) : (
								''
							)}
						</p>
						{/* {stock > 0 ? <p>Stock: {stock}</p> : <p>OUT OF STOCK</p>} */}
						<div>
							<button
								className={s.btn}
								onClick={(e) => addFavorite(e, user.id)}>
								ADD FAVORITE
							</button>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}
