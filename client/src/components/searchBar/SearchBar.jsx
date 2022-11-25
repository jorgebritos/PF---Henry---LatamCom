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
	let [clickSelect, setClickSelect] = useState(false)
	let predictionProduct = [];
	let [currentURL, setCurrentURL]= useState(window.location.href)

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

	if(currentURL !== window.location.href){
		setproductName('')
		setShowList(false)
		setCurrentURL(window.location.href)
	}

	function handleSubmit(e) {
		e.preventDefault();
		setproductName('');
		setShowList(true)
		setClickSelect(false)
		
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
		console.log(e.target);
		if(e.target.name !=='product'){
			setproductName('')
			setShowList(true)
			setClickSelect(false)
		}
		else if(e.target.className === 'li'){
			console.log('ol');
		}
		
		
        
		
	}

	document.addEventListener('click', (e) =>{
		if(e.target.name !== 'product' && e.target !== 'li'){
			setShowList(false)
		}
		else{
			e.target.value.length >=4?
			setShowList(true):
			setShowList(false)
		}
	})
	//console.log(clickSelect);
	
	
	return (
		<div >
			<form onSubmit={(e) => handleSubmit(e)} autoComplete='off'>
				<div className={s.content} >
					<input
						className={s.input}
						type='text'
						name='product'
						id='productsearch'
						value={productName}
						onChange={(e) => handleOnChange(e)}
						onFocus ={(e) => handleOnChange(e)}

					/>
					{showList? (
						<ul className={s.ul} >
							{predictionProduct.map((sp) => (
                                <Link to={`/product/${sp.id}`} className={s.ilink} onClick={(e)=> handleClick(e)} >    
                                    <li className={s.li} key={sp.id} title={sp.name} >
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
