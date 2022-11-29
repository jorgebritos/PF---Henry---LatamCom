import React from 'react';
import { Link } from 'react-router-dom';
import s from './CardProduct.module.css';
import { addFavorites } from "../../redux/actions/index.js"
import { useDispatch, useSelector } from 'react-redux';

export default function CardProduct({ id, name, price, image }) {

	const favorites = useSelector((state) => state.favorites)
	const dispatch = useDispatch()

	const addFavorite = async (event) => {
		event.preventDefault();

		let product = {
			id,
			name,
			price,
			image
		}

		let exists = await favorites.find((f) => f.id === Number(id));

		if (exists) {
			return alert("Este objeto ya es de tus favoritos")
		} else {
			dispatch(addFavorites(product))
		}

	}


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
						{/* <br /> */}
						{/* Categories:{' '}
						{categories.map((e) => {
							return (
								<div key={e.name}>
									<p>{e.name}</p>
								</div>
							);
						})} */}

					</div>
					<div>
						<button className={s.btn} onClick={e => addFavorite(e)}>ADD FAVORITE</button>
					</div>
				</div>
			</Link>

		</div>
	);
}