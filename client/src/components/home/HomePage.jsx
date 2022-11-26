import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, getAllProducts } from '../../redux/actions/index.js';
import CardProduct from '../Card/CardProduct';
import Paginate from '../Paginate/Paginate';
import s from './HomePage.module.css';

export default function HomePage() {
	const dispatch = useDispatch();
	// const allCategories = useSelector((state) => state.categories);
	const totalProducts = useSelector((state) => state.allProducts);

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setperPage] = useState(8);
	const indexOfLastProduct = currentPage * perPage; //8
	const indexOfFirstProduct = indexOfLastProduct - perPage; //0
	const currentProducts = totalProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct,
	);
	const paginado = (pageNumber) => setCurrentPage(pageNumber);

	// const [order, setOrder]= useState('');

	useEffect(async () => {
		await dispatch(getAllCategories());
		setTimeout(() => {
			dispatch(getAllProducts());
		}, 1);
	}, []);

	return (
		<div>
			<div className={s.pag}>
				<Paginate
					producPrePage={perPage}
					totalProducts={totalProducts.length}
					paginado={paginado}
				// value={currentPage}
				/>
			</div>
			<div className={s.cont}>
				<div className={s.filter}>filtro</div>

				<div className={s.cads}>
					{currentProducts?.map((p) => {
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
		</div>
	);
}
