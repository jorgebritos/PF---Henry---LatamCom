import React from 'react';
import { Link } from 'react-router-dom';
import s from './CardProduct.module.css';
import { addFavorites } from '../../../redux/actions/index.js';
import { useDispatch, useSelector } from 'react-redux';
import star from '../../../asset/puntajes.png';

export default function CardProduct({ id, name, price, image, rating }) {
	const favorites = useSelector((state) => state.favorites);
	const dispatch = useDispatch();

	const addFavorite = async (event) => {
		event.preventDefault();

		let product = {
			id,
			name,
			price,
			image,
		};

		let exists = await favorites.find((f) => f.id === Number(id));

		if (exists) {
			return alert('Este objeto ya es de tus favoritos');
		} else {
			dispatch(addFavorites({ idProduct: product.id, idUser: 1 }));
		}
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
							{rating ? <div><label>{rating.toFixed(1)}</label> <img className={s.star} src={star} height={'15px'} /></div> : ''}

						</p>
						<div>
							<button className={s.btn} onClick={(e) => addFavorite(e)}>
								ADD FAVORITE
							</button>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}
