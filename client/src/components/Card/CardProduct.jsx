import React from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom';
import s from './CardProduct.module.css';
import { addProductToShoppingCart } from "../../redux/actions/index.js"

export default function CardProduct({ id, name, price, image, categories }) {

	const shopCart = useSelector((state) => state.shopCart)
	const dispatch = useDispatch()


	const addProduct = async (event) => {
		event.preventDefault()
		let product = {
			id,
			name,
			price,
			image,
			amount: 1
		}
		let cart = []

		if (localStorage.getItem("cart")) {
			cart = JSON.parse(localStorage.getItem("cart"))
		}
		if (cart.find((p) => p.id === product.id)) {
			return 0
		}
		cart.push(product)
		localStorage.setItem("cart", JSON.stringify(cart))

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
						<p className={s.price}>${price}</p>
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
				</div>
			</Link>

			<div>
				<button onClick={addProduct}>BUY</button>
			</div>
		</div>
	);
}