import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllCategories,
	getAllProducts,
	getAllUsers,
	resetDetail,
	searchByName,
} from '../../../redux/actions/index.js';
import CardProduct from '../Card/CardProduct';
import Filtros from '../filtros/Filtros.jsx';
import Paginate from '../Paginate/Paginate';
import s from './HomePage.module.css';
import Carrusel from '../../landing/Carrusel.jsx';

export default function HomePage() {
	const dispatch = useDispatch();
	// const allCategories = useSelector((state) => state.categories);
	const totalProducts = useSelector((state) => state.products);
	const searchProducts = useSelector((state) => state.searchedProducts2);
	const search = window.location.search;
	const search1 = search.split('=')[1];
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage] = useState(8);
	const indexOfLastProduct = currentPage * perPage; //8
	const indexOfFirstProduct = indexOfLastProduct - perPage; //0
	const currentProducts = !search.split('=')[1]
		? totalProducts.slice(indexOfFirstProduct, indexOfLastProduct)
		: searchProducts.slice(indexOfFirstProduct, indexOfLastProduct);

	let paginado = (pageNumber) => {
		if (typeof pageNumber === 'number') setCurrentPage(pageNumber);
		else if (pageNumber === '-') setCurrentPage(currentPage - 1);
		else setCurrentPage(currentPage + 1);
		window.scrollTo(0, 0);
	};

	const [, setOrder] = useState('');

	useEffect(() => {
		dispatch(resetDetail());
		dispatch(getAllCategories());
		dispatch(getAllUsers());
		dispatch(getAllProducts());
		dispatch(searchByName(search1, 'SEARCH_BY_NAME2'));
	}, [search1, dispatch, search]);

	return (
		<div>
			<div className={s.carr}>
				<Carrusel products={totalProducts} />
			</div>
			<div className={s.cont}>
				<div className={s.filter}>
					{window.location.search === "" ? <Filtros setCurrentPage={setCurrentPage} setOrder={setOrder} /> : ""}
				</div>
				<div className={s.conthome}>
					<div className={s.pag}>
						<Paginate
							producPrePage={perPage}
							totalProducts={
								search ? currentProducts.length : totalProducts.length
							}
							paginado={paginado}
							page={currentPage}
						/>
					</div>
					<div className={s.cads}>
						{currentProducts.length > 0
							? currentProducts.map((p) => {
								return (
									<CardProduct
										key={p.id}
										id={p.id}
										name={p.name}
										image={p.image}
										categories={p.categories}
										price={p.price.toFixed(2)}
										rating={p.rating}
										stock={p.stock}
									/>
								);
							})
							: ''}
						{!currentProducts.length ? (
							<h1>No se han encontrado productos</h1>
						) : (
							''
						)}
					</div>
					<br />
					<div className={s.pag}>
						<Paginate
							producPrePage={perPage}
							totalProducts={
								search ? currentProducts.length : totalProducts.length
							}
							paginado={paginado}
							page={currentPage}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
