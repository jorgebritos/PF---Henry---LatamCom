import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	filterByBrand,
	filterByCategory,
	filterByPrice,
	getAllBrands,
	getAllCategories,
	getAllProducts,
	orderBy,
	removeFilters,
} from '../../redux/actions';
import s from './Filtros.module.css';
import FiltroCategory from './FiltroCategory';
import FiltroBrand from './FiltroBrand';

export default function Filtros({ setCurrentPage, setOrder }) {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories);
	const products = useSelector((state) => state.products);
	const brands = useSelector((state) => state.filBrands);

	const [checkedState, setCheckedState] = useState(new Array(15).fill(false));
	const [isChecked, setIsChecked] = useState([]);
	const [categoryFilter, setCategoryFilter] = useState('All');
	const [priceFilter, setPriceFilter] = useState({
			minPrice: 0,
			maxPrice: 0,
		});

	useEffect(() => {
		dispatch(getAllCategories());
		dispatch(getAllProducts());
		dispatch(getAllBrands([]));
	}, [dispatch]);

	

	function handlePriceFilter(e) {
		if (e.target.checkValidity()) {
			e.preventDefault();
			setPriceFilter({
				...priceFilter,
				[e.target.name]: e.target.value,
			});
			return priceFilter;
		} else {
			e.preventDefault();
			setPriceFilter({
				...setPriceFilter,
				[e.target.name]: e.target.min,
			});
			return priceFilter;
		}
	}

	const filterPrice = function (e) {
		e.preventDefault();
		let min = priceFilter.minPrice;
		let max = priceFilter.maxPrice;

		if (Number(min) > Number(max))
			return alert('El minimo no puede ser mayor al maximo');
		dispatch(
			filterByPrice({ min: priceFilter.minPrice, max: priceFilter.maxPrice }),
		);
		dispatch(getAllBrands(products));
		setCurrentPage(1);
	};

	

	function handleCategoryFilter(category) {
		setCategoryFilter(category);
	}

	const filterCategory = async function (e) {
		e.preventDefault();
		setCheckedState(new Array(15).fill(false));
		dispatch(filterByCategory(categoryFilter));
		setIsChecked([]);		
		setCurrentPage(1);
	};
	// const distBrands =  function (products){
	// 	console.log(`Es productos: ${products}`);
	// 	dispatch(getAllBrands(products));
	// }



	const handleOnChange = (position, e) => {
		//SETEAR CAMPOS QUE ESTAN CHECKED
		const updatedCheckedState = checkedState.map((item, index) =>
			index === position ? !item : item,
		);

		//GUARDAR LOS VALORES O QUITARLOS DE LA LISTA DE DIETAS DEPENDIENDO DEL VALOR
		if (e.target.checked) {
			setIsChecked([...isChecked, e.target.value]);
		} else {
			let newArray = isChecked.filter((i) => i !== e.target.value);
			setIsChecked(newArray);
		}

		setCheckedState(updatedCheckedState);
	};

	const filterBrands = function (e) {
		e.preventDefault();
		dispatch(filterByBrand([...isChecked]));
		setCurrentPage(1);
	};

	const sort = (e) => {
		e.preventDefault();
		dispatch(orderBy(e.target.value));
		setCurrentPage(1);
		setOrder(e.target.value);
	};

	const quitarFiltros = function (e) {
		e.preventDefault();
		dispatch(removeFilters());
		let radios = document.getElementsByName('category');
		for (const r of radios) {
			r.checked = false;
		}

		setPriceFilter({ minPrice: 0, maxPrice: 0 });
		setCheckedState(new Array(15).fill(false));
		setIsChecked([]);
		setCategoryFilter('All');
		dispatch(filterByCategory('All'));
	};

	return (
		<div className={s.div}>
			<div className={s.cont}>
				<div className={s.filtro}>
					<h3 className={s.h4}>Order by:</h3>
					<select className={s.select} onChange={(e) => sort(e)}>
						<option>Select Order</option>
						<optgroup label='Alphabetically'>
							<option value={'asc'}>A-Z</option>
							<option value={'desc'}>Z-A</option>
						</optgroup>
						<optgroup label='Price'>
							<option value={'ascP'}>Max to Min</option>
							<option value={'descP'}>Min to Max</option>
						</optgroup>
					</select>
				</div>
				<form className={s.from}>
					<div className={s.filtro}>
						<h3 className={s.h4}>Filter By Price</h3>
						<div>
							<label className={s.labelM} htmlFor={'minPrice'}>
								Min
							</label>
							<input
								className={s.inputM}
								type={'number'}
								name={'minPrice'}
								value={priceFilter.minPrice}
								min={0}
								minLength={1}
								onInput={(e) => handlePriceFilter(e)}></input>
						</div>
						<br />
						<div>
							<label className={s.labelM} htmlFor={'maxPrice'}>
								Max
							</label>
							<input
								className={s.inputM}
								type={'number'}
								name={'maxPrice'}
								value={priceFilter.maxPrice}
								min={0}
								minLength={1}
								onInput={(e) => handlePriceFilter(e)}></input>
						</div>
						<br />
						<div>
							<button className={s.btn} onClick={(e) => filterPrice(e)}>
								Filtrar
							</button>
						</div>
					</div>

					{/* <div className={s.filtro}>
						<h4 className={s.h4}>Filter By Category</h4>
						<ul>
							{categories?.map((c) => {
								return (
									<li className={s.li} key={c.name}>
										<label className={s.label}>
											<input
												className={s.input}
												type={'radio'}
												value={c.name}
												name={'category'}
												id='categoria'
												onClick={(e) => handleCategoryFilter(c.name)}
											/>
											<span className={s.span}>{c.name}</span>
										</label>
									</li>
								);
							})}
						</ul>
						<button className={s.btn} onClick={(e) => filterCategory(e)}>
							Filter
						</button>
					</div> */}
{/* Ejemplar de como se modulariza en front React usen el código comentado de arriba *solo* para comparar
	  Una vez resueltas las dudas borren el código comentado de arriba*/}
					<FiltroCategory s={s} categories={categories} handleCategoryFilter={handleCategoryFilter} filterCategory={filterCategory} />

{/* 					<div className={s.filtro}>
						<h4 className={s.h4}>Filter By Brand</h4>
						<ul>
							{filBrands.length > 0
								? filBrands.map((b, index) => {
										return (
											<li className={s.li} key={b}>
												<label className={s.label}>
													<input
														className={s.input}
														type={'checkbox'}
														checked={checkedState[index]}
														value={b}
														onChange={(e) => handleOnChange(index, e)}
													/>
													<span className={s.spanC}>{b}</span>
												</label>
											</li>
										);
								  })
								: null}
						</ul>
						<button className={s.btn} onClick={(e) => filterBrands(e)}>
							Filter
						</button>
					</div> */}
{/* Ejemplar de como se modulariza en front React usen el código comentado de arriba *solo* para comparar
	  Una vez resueltas las dudas borren el código comentado de arriba*/}
					<FiltroBrand s={s} brands={brands} filterBrands={filterBrands} handleOnChange={handleOnChange} checkedState={checkedState} />

					<br />
					<div className={s.contBtn}>
						<button className={s.btnC} onClick={(e) => quitarFiltros(e)}>
							Clear Filters
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
