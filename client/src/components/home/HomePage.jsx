import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, getAllProducts } from '../../redux/actions/index.js';
import CardProduct from './CardProduct.jsx';
// import Paginate from '../Paginate/Paginate';

export default function HomePage() {
	const dispatch = useDispatch()
	const products = useSelector((state) => state.products)

	useEffect(async () => {
		await dispatch(getAllCategories())
		await dispatch(getAllProducts())
	}, [])

	return (
		<div>
			<h1>Home Page</h1>
			{
				products?.map((p) => {
					return (
						<CardProduct key={p.id} id={p.id} name={p.name} image={p.image} categories={p.categories} price={p.price} />
					)
				})
			}
		</div>
	);
}
