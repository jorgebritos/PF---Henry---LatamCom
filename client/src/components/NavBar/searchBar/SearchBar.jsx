import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import s from './SearchBar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { newSearch, searchByName } from '../../../redux/actions/index';

function SearchBar() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.searchedProducts);
	const [productName, setproductName] = useState('');
	let [showList, setShowList] = useState(false);
	let predictionProduct = [];
	let [currentURL, setCurrentURL] = useState(window.location.href);

	useEffect(() => {
		dispatch(searchByName(productName, "SEARCH_BY_NAME"));
	}, [showList, currentURL, dispatch, productName]);

	function search(e) {
		dispatch(newSearch(productName));
	}

	if (showList) {
		if (products.length > 5) {
			predictionProduct = [...products.slice(0, 5), ...[{id:-2, name:'More results'}]];
		} else if (products.length === 0) {
			predictionProduct = [...[{ id: -1, name: 'Producto no encontrado' }]];
		} else {
			predictionProduct = [...products];
		}
	}

	if (currentURL !== window.location.href) {
		setproductName('');
		setShowList(false);
		setCurrentURL(window.location.href);
	}

	function handleSubmit(e) {
		e.preventDefault();
		setproductName('');
		setShowList(false)

	}

	function handleOnChange(e) {
		setproductName(e.target.value);
		if (e.target.value.length >= 4) {
			setShowList(true);
		} else {
			setShowList(false);
		}
	}

	function handleClick(e) {
		if (e.target.name !== 'product') {
			setproductName('');
			setShowList(true);
		} else if (e.target.className === 'li') {
		}
	}

	document.addEventListener('click', (e) => {
		if (e.target.name !== 'product' && e.target !== 'li') {
			setShowList(false);
		} else {
			e.target.value.length >= 4 ? setShowList(true) : setShowList(false);
		}
	});

	return (
		<div>
			<form onSubmit={(e) => handleSubmit(e)} autoComplete='off'>
				<div className={s.content}>
					<input
						className={s.input}
						type='text'
						name='product'
						id='productsearch'
						value={productName}
						onChange={(e) => handleOnChange(e)}
						onFocus={(e) => handleOnChange(e)}
					/>
					{showList ? (
						<ul className={s.ul}>
							{predictionProduct.map((sp) =>
								sp.id === -1 ?
									<li className={s.li} key={sp.id} title={sp.name} >
										{sp.name.slice(0, 18) + "..."}
									</li>:
									sp.id!== -2?
									<Link to={`/product/${sp.id}`} className={s.ilink} onClick={(e) => handleClick(e)} key={sp.id} >
										<li className={s.li} key={sp.id} title={sp.name} >
											{sp.name.slice(0, 18) + "..."}
										</li>
									</Link> :
									<Link to={`/home?search=${productName}`} onClick={e => search(e)} className={s.ilink}>
										<li className={s.li} key={sp.id} title={sp.name}>
											{sp.name}
										</li>
									</Link>

									


							)}
						</ul>
					) : (
						<></>
					)}
					<Link
						className={s.Link}
						to={
							productName.length > 0 ? `/home?search=${productName}` : `/home`
						}>
						<button type='submit' className={s.btn} onClick={(e) => search(e)}>
							SEARCH
						</button>
					</Link>
				</div>
			</form>
		</div>
	);
}

export default SearchBar;
