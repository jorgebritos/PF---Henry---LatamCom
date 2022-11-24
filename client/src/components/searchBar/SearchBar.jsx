import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import s from './SearchBar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { searchByName } from '../../redux/actions/index';

function SearchBar() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products);
	const [productName, setproductName] = useState('');
    let [showList, setShowList] = useState(false)
	let predictionProduct = [];
	useEffect(() => {
		dispatch(searchByName(productName));
	}, [productName]);

	if(showList){
		if (products.length > 5) {
			predictionProduct = [...products.slice(0, 5)];
		} else {
			predictionProduct = [...products];
		}
	}

	function handleSubmit(e) {
		e.preventDefault();
		setproductName('');
		setShowList(false)
		console.log(productName);
	}
	

	function handleOnChange(e) {
		setproductName(e.target.value);

		if(e.target.value.length >= 4){
    	    setShowList(true)
		}
		else{
			setShowList(false)
		}
	}

    function handleClick(e) {
        setShowList(false)
		setproductName('')
	}

	console.log(products);
	console.log(predictionProduct);

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
						onFocus ={(e) => handleOnChange(e)}
						onBlur={(e) => setShowList(false)}

					/>
					{showList? (
						<ul className={s.ul}>
							{predictionProduct.map((sp) => (
                                <Link to={`/product/${sp.id}`} className={s.ilink} onClick={(e)=> handleClick(e)}>    
                                    <li className={s.li} key={sp.id} title={sp.name}>
                                        {sp.name.slice(0,18)+"..."}
                                    </li>
                                </Link>
							))}
						</ul>
					) : (
						<></>
					)}
					<Link className={s.Link} to={`/SearchResults/${productName}`}>
						<button type='submit' className={s.btn}>
							SEARCH
						</button>
					</Link>
				</div>
			</form>
		</div>
	);
}

export default SearchBar;
