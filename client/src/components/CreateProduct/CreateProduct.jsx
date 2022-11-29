import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	createProduct,
	getAllCategories
} from '../../redux/actions/index';
import s from './CreateProduct.module.css';

// Input Validate /////////////////////////////
const validateInput = (input) => {
	let errors = {};
	let expreg = /[.*+\-?^${}()|[\]\\/]/;
	let regexURL = /((http|ftp|https):)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:~+#-]*[\w@?^=%&amp;~+#-])?/;

	if (!input.name || input.name?.trim() >= 1 ) {
		errors.name = 'Introduce a name!';
	}else if((expreg.test(input.name))){
        errors.name = "Name your product properly!"
	}else if((expreg.test(input.description))) {
			errors.description = 'Introduce a valid description!';
    }else if (!(regexURL.test(input.image))) {
		errors.image = 'Introduce an image';
	}else if (!input.price) {
		errors.price = 'Introduce a price';
	}else if ((expreg.test(input.price))) {
		errors.price = 'Introduce a valid price';
	}else if ((expreg.test(input.brand))) {
		errors.brand = 'Introduce a valid brand';
	}else if (!input.categories.length) {
		errors.categories = 'Category is required!';
	}
	const sendButton = document.getElementById('sendButtom');

	if (Object.entries(errors).length) {
		sendButton.disabled = true;
	} else {
		sendButton.disabled = false;
	}
	//////////////////////////////////////////////////////////

	return errors;
};
///////////////////////////////////////////////

const CreateProduct = () => {

	//Hooks and states ///////////////////////
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories);
	const history = useHistory();

	const [input, setInput] = useState({
		name: '',
		description: '',
		image: '',
		price: '',
		stock: 0,
		brand: '',
		categories: [],
	});

	const [errors, setErrors] = useState({
		name: '',
		description: '',
		image: '',
		price: '',
		stock: '',
		brand: '',
		categories: [],
	});

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		dispatch(getAllCategories());
	}, [dispatch]);
	////////////////////////////////////////

	// Cloudinary ////////////////////////////////////////////////////////

	const uploadImage = async (e) => {
		const files = e.target.files;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'LatamCom');
		setLoading(true);
		const res = await fetch(
			'https://api.cloudinary.com/v1_1/drruxw6zi/image/upload',
			{
				method: 'POST',
				body: data,
			},
		);
		const file = await res.json();
		setInput({ ...input, image: file.secure_url });
		setLoading(false);
		setErrors(validateInput({ ...input, image: file.secure_url }));
	};

	///////////////////////////////////////////////////////////////////////

	// Change Local States //////////////////////
	const introduceData = (event) => {
		event.preventDefault();
		const value = event.target.value;
		const property = event.target.name;

		setInput({ ...input, [property]: value });
		setErrors(validateInput({ ...input, [property]: value }));
	};
	/////////////////////////////////////////////

	// Functions of Categories ///////////////////////////
	const introduceCategories = (event) => {
		event.preventDefault();
		const catSelected = event.target.value;

		if (!input.categories.includes(catSelected) && catSelected !== '') {
			setInput({ ...input, categories: [...input.categories, catSelected] });
			setErrors(validateInput({ ...input, categories: catSelected }));
		}
	};

	const deleteCategories = (event) => {
		event.preventDefault();
		setInput({ ...input, categories: [] });
		setErrors(validateInput({ ...input, categories: event.target.value }));
	};
	///////////////////////////////////////////////////////

	// Post Product /////////////////////////////
	const submitData = async (event) => {
		event.preventDefault();
		try {
			await dispatch(createProduct(input)).then(history.push("/create/productsended"))
			
		} catch (error) {
			alert(
				'Chosen name already belongs to another product, please select again.',
			);
		}
		
	};
	/////////////////////////////////////////////

	return (
		<div className={s.cont}>
			<div className={s.contF}>
				<h1 className={s.h1}>CREATE PRODUCT</h1>
				
				<form onSubmit={(e) => submitData(e)}>
					<div className={s.contsp}>
						<label className={s.label}>*P. Name: </label>
						<input
							className={s.input}
							name='name'
							value={input.name}
							onChange={introduceData}
							autoComplete='off'></input>
						{errors.name && <p>{errors.name}</p>}
					</div>

					<br />

					<div className={s.contsp}>
						<label className={s.label}>P. Description: </label>
						<input
							className={s.input}
							name='description'
							value={input.description}
							onChange={introduceData}
							autoComplete='off'></input>
							{errors.description && <p>{errors.description}</p>}
					</div>

					<br />

					<div className={s.contsp}>
						<label className={s.label}>*P. Image: </label>
						<input
							className={s.input}
							name='file'
							onChange={uploadImage}
							autoComplete='off'
							type='file'></input>
						{errors.image && <p>{errors.image}</p>}
						{loading ? (
							<h4>Uploading image...</h4>
						) : (
							<img src={input.image} style={{ width: '300px' }} alt=''></img>
						)}
					</div>

					<br />

					<div className={s.contsp}>
						<label className={s.label}>*P. Price: </label>
						<input
							className={s.input}
							name='price'
							value={input.price}
							onChange={introduceData}
							autoComplete='off'
							type='number'
							min='0'></input>
						{errors.price && <p>{errors.price}</p>}
					</div>

					<br />

					<div className={s.contsp}>
						<label className={s.label}>P. Stock: </label>
						<input
							className={s.input}
							name='stock'
							value={input.stock}
							onChange={introduceData}
							autoComplete='off'
							type='number'
							min='0'></input>
							{errors.stock && <p>{errors.stock}</p>}
					</div>

					<br />

					<div className={s.contsp}>
						<label className={s.label}>P. Brand: </label>
						<input
							className={s.input}
							name='brand'
							value={input.brand}
							onChange={introduceData}
							autoComplete='off'></input>
							{errors.brand && <p>{errors.brand}</p>}
					</div>

					<br />

					<div className={s.contsp}>
						{categories.length && (
							<div>
								<select
									className={s.select}
									name='categories'
									onChange={introduceCategories}>
									<option value=''>Chose yours categories...</option>
									{categories.map((cat) => {
										return <option key={cat.name}>{cat.name}</option>;
									})}
								</select>
							</div>
						)}
					</div>

					<br />

					<div className={s.contsp}>
						
						<label className={s.label}>*Categories Selected</label>
						<input
							className={s.input}
							value={input.categories}
							disabled>
						</input>
						{errors.categories && <p>{errors.categories}</p>}

					</div>

					<br />

					<div>
						<button className={s.btnd} onClick={deleteCategories}>
							Delete Categories
						</button>
					</div>

					<br />

					<button className={s.btn} id='sendButtom' type='submit' disabled>
						SEND
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateProduct;
