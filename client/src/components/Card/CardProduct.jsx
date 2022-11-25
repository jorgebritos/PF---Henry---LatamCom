import React from 'react';
import { Link } from 'react-router-dom';
import s from './CardProduct.module.css';

export default function CardProduct({ id, name, price, image, categories }) {
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
		</div>
	);
}
