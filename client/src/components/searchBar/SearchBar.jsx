import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { searchByName } from '../../redux/actions/index'
import './SearchBar.css'

function SearchBar(){
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products)
    const [productName, setproductName] = useState('');
    let predictionProduct=[]
    useEffect(()=>{
        dispatch(searchByName(productName))
    },[productName])

    if(products.length > 5){
        predictionProduct = [...products.slice(0,5)]
    }else{
        predictionProduct = [...products]
    }
	function handleSubmit(e) {
		e.preventDefault();
		setproductName('');
	}

	function handleOnChange(e) {
		setproductName(e.target.value);
	}
    console.log(products);
    console.log(predictionProduct);

    return(
        <div className='searchbar'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="searchble">
                    <input
                        type='text'
                        name='product'
                        id='productsearch'
                        value={productName}
                        onChange={(e) => handleOnChange(e)}
                    />
                    {productName.length>=4?
                    (<ul>
                        {predictionProduct.map((sp)=> (<li key={sp.id}>{sp.name}</li>))}
                    </ul>):
                    <></>}
                </div>
                <Link to={`/SearchResults/${productName}`}>
                    <button type='submit' className='button'>
                        SEARCH
                    </button>
                </Link>
            </form>
		</div>
    )
}

export default SearchBar