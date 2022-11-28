import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	filterByBrand,
	filterByCategory,
	filterByPrice,
	getAllBrands,
	getAllCategories,
	getAllProducts,
	removeFilters,
} from '../../redux/actions';
import s from './Filtros.module.css';

export default function Filtros() {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories);
	const products = useSelector((state) => state.products);
	const brands = useSelector((state) => state.brands);

	useEffect(async () => {
		await dispatch(getAllCategories());
		await dispatch(getAllProducts());
		dispatch(getAllBrands([]));
	}, []);

	const [priceFilter, setPriceFilter] = useState({
		minPrice: 0,
		maxPrice: 0,
	});

	function handlePriceFilter(e) {
		e.preventDefault();
		setPriceFilter({
			...priceFilter,
			[e.target.name]: e.target.value,
		});
		return priceFilter;
	}

	const filterPrice = function (e) {
		e.preventDefault();
		let min = priceFilter.minPrice;
		let max = priceFilter.maxPrice;

		if (Number(min) > Number(max)) return alert("El minimo no puede ser mayor al maximo")
		dispatch(
			filterByPrice({ min: priceFilter.minPrice, max: priceFilter.maxPrice }),
		);
		dispatch(getAllBrands(products));
	};

	const [categoryFilter, setCategoryFilter] = useState('All');

	function handleCategoryFilter(category) {
		setCategoryFilter(category);
	}

	const filterCategory = function (e) {
		e.preventDefault();
		dispatch(filterByCategory(categoryFilter));
		dispatch(getAllBrands(products));
	};

	const [checkedState, setCheckedState] = useState(new Array(15).fill(false));

	const [isChecked, setIsChecked] = useState([]);

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
	};

	const quitarFiltros = function (e) {
		e.preventDefault();
		dispatch(removeFilters());
	};

	return (
		<div className={s.div}>
			<div className={s.cont}>
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
								onChange={(e) => handlePriceFilter(e)}></input>
						</div>
						<div>
							<label className={s.labelM} htmlFor={'maxPrice'}>
								Max
							</label>
							<input
								className={s.inputM}
								type={'number'}
								name={'maxPrice'}
								value={priceFilter.maxPrice}
								onChange={(e) => handlePriceFilter(e)}></input>
						</div>
						<br />
						<div>
							<button className={s.btn} onClick={(e) => filterPrice(e)}>
								Filtrar
							</button>
						</div>
					</div>

					<div className={s.filtro}>
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
												onInput={(e) => handleCategoryFilter(c.name)}
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
					</div>
					<div className={s.filtro}>
						<h4 className={s.h4}>Filter By Brand</h4>
						<ul>
							{brands.length > 0
								? brands.map((b, index) => {
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
					</div>
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
