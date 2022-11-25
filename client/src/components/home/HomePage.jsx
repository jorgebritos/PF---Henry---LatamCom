import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, getAllProducts } from '../../redux/actions/index.js';
import CardProduct from '../Card/CardProduct';
// import Paginate from '../Paginate/Paginate';
import s from './HomePage.module.css';

export default function HomePage() {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories);
	const products = useSelector((state) => state.products);

	useEffect(async () => {
		await dispatch(getAllCategories());
		setTimeout(() => {
			dispatch(getAllProducts());
		}, 1);
	}, []);
	return (
		<div className={s.cont}>
			<div className={s.filter}>filtro</div>
			<div className={s.cads}>
				{products?.map((p) => {
					return (
						<CardProduct
							key={p.id}
							id={p.id}
							name={p.name}
							image={p.image}
							categories={p.categories}
							price={p.price}
						/>
					);
				})}
			</div>
		</div>
	);
}
