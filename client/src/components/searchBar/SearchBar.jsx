import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import s from './SearchBar.module.css';

function SearchBar() {
	const [productName, setName] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		setName('');
	}

	function handleOnChange(e) {
		setName(e.target.value);
	}

	return (
		<div className='searchbar'>
			<form onSubmit={(e) => handleSubmit(e)}>
				<input
					className={s.input}
					type='text'
					name='product'
					id='productsearch'
					value={productName}
					onChange={(e) => handleOnChange(e)}
				/>
				<Link to={`/SearchResults/${productName}`}>
					<button type='submit' className={s.btn}>
						SEARCH
					</button>
				</Link>
			</form>
		</div>
	);
}

export default SearchBar;
