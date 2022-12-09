import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	filterByBrand,
	filterByCategory,
	filterByPrice,
	getAllBrands,
	orderBy,
	removeFilters,
} from '../../../redux/actions';
import s from './Filtros.module.css';
import FiltroCategory from './FiltroCategory';
import FiltroBrand from './FiltroBrand';

export default function Filtros({ setCurrentPage, setOrder }) {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories);
	const brands = useSelector((state) => state.filBrands);

	const [checkedState, setCheckedState] = useState(new Array(15).fill(false));
	const [isChecked, setIsChecked] = useState([]);
	const [categoryFilter, setCategoryFilter] = useState('All');
	const [priceFilter, setPriceFilter] = useState({
		minPrice: 0,
		maxPrice: 0,
	});

	useEffect(() => {
		dispatch(getAllBrands([]));
	}, [dispatch]);



	function handlePriceFilter(e) {
		if (e.target.checkValidity()) {
			e.preventDefault();
			setPriceFilter({
				...priceFilter,
				[e.target.name]: e.target.value,
			});
		}
		return priceFilter;
	}


	const filterPrice = function (e) {
		e.preventDefault();
		let min = priceFilter.minPrice;
		let max = priceFilter.maxPrice;

		setCheckedState(new Array(15).fill(false));
		dispatch(filterByPrice({ min: min, max: max }));
		setIsChecked([]);
		if (!min && !max) setPriceFilter({ minPrice: 0, maxPrice: 0 })
		if (!min && max) setPriceFilter({ ...priceFilter, minPrice: 0 })
		if (!max && min) setPriceFilter({ ...priceFilter, maxPrice: 0 })
		// dispatch(getAllBrands(products));
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
		filterPrice(e)
		setCurrentPage(1);
		// setPriceFilter({ minPrice: 0, maxPrice: 0 });
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
		filterPrice(e)
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
								onClick={e => e.target.select()}
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
								onClick={e => e.target.select()}
								onInput={(e) => handlePriceFilter(e)}></input>
						</div>
						<br />
						<div>
							<button className={s.btn} onClick={(e) => filterPrice(e)}>
								Filtrar
							</button>
						</div>
					</div>

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
