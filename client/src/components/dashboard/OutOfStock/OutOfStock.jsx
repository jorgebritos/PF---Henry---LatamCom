import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../../redux/actions';
import { Link } from 'react-router-dom';
import s from './OutOfStock.module.css';

export default function OutOfStock() {
	const dispatch = useDispatch();
	const allProducts = useSelector((state) => state.allProducts);
	const outOfStock =
		allProducts.length > 0 ? allProducts.filter((p) => p.stock === 0) : [];

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

	return (
		<div className={s.conten}>
			<div>
				<h2 className={s.h2}>ITEMS OUT OF STOCK</h2>
				<div className={s.cads}>
					{outOfStock.length > 0 ? (
						outOfStock.map((p) => {
							return (
								<Link className={s.link} to={'/update'} key={p.id}>
									<div className={s.productCard}>
										<div className={s.cimg}>
											<img
												className={s.img}
												src={p.image}
												alt={`${p.name}_image`}
											/>
										</div>
										<div className={s.contenT}>
											<h4 className={s.name}>{p.name}</h4>
											<h3 className={s.text}>OUT OF STOCK</h3>
										</div>
									</div>
								</Link>
							);
						})
					) : outOfStock === 0 ? (
						<h3 className={s.h2}>Currently, All Items have Stock</h3>
					) : (
						<h3 className={s.h2}>Currently, your shop has no items</h3>
					)}
				</div>
			</div>
		</div>
	);
}
