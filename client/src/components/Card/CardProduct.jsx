import React from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom';
import s from './CardProduct.module.css';
import { addFavorites } from "../../redux/actions/index.js"

export default function CardProduct({ id, name, price, image, categories }) {

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

		let exists = await favorites.find((f) => f.id == id);

		if (exists) {
			return alert("Este objeto ya es de tus favoritos")
		} {
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