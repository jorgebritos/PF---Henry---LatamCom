import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllCategories,
	getAllProducts,
	getAllUsers,
} from '../../redux/actions/index.js';
import CardProduct from '../Card/CardProduct';
import Filtros from '../filtros/Filtros.jsx';
import Paginate from '../Paginate/Paginate';
import s from './HomePage.module.css';

export default function HomePage() {
	const dispatch = useDispatch();
	// const allCategories = useSelector((state) => state.categories);
	const totalProducts = useSelector((state) => state.products);

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage] = useState(8);
	const indexOfLastProduct = currentPage * perPage; //8
	const indexOfFirstProduct = indexOfLastProduct - perPage; //0
	const currentProducts = totalProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct,
	);
	const paginado = (pageNumber) => {
		if (typeof pageNumber === 'number') setCurrentPage(pageNumber);
		else if (pageNumber === '-') setCurrentPage(currentPage - 1);
		else setCurrentPage(currentPage + 1);
	};

	const [, setOrder] = useState('');

	useEffect(() => {
		dispatch(getAllCategories());
		dispatch(getAllUsers());
		dispatch(getAllProducts());
	}, [dispatch]);

	return (
		<div>
			<div className={s.cont}>
				<div className={s.filter}>
					<Filtros setCurrentPage={setCurrentPage} setOrder={setOrder} />
				</div>
				<div>
					<div className={s.pag}>
						<Paginate
							producPrePage={perPage}
							totalProducts={totalProducts.length}
							paginado={paginado}
							page={currentPage}
						/>
					</div>
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
							totalProducts={totalProducts.length}
							paginado={paginado}
							page={currentPage}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
