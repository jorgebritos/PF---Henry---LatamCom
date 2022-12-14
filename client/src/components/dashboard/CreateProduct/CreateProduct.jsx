import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createProduct, getAllCategories } from '../../../redux/actions/index';
import s from './CreateProduct.module.css';

// Input Validate /////////////////////////////
const validateInput = (input) => {
	let errors = {};
	let expreg = /[,*+\-?^${}()|[\]\\/]/;
	let regexURL = /((http|ftp|https):)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:~+#-]*[\w@?^=%&amp;~+#-])?/;

	if (!input.name || input.name?.trim() >= 1) {
		errors.name = 'Introduce a name!';
	} else if (expreg.test(input.name)) {
		errors.name = 'Name your product properly!';
	} else if (expreg.test(input.description)) {
		errors.description = 'Introduce a valid description!';
	} else if (!regexURL.test(input.image)) {
		errors.image = 'Introduce an image';
	} else if (!input.price) {
		errors.price = 'Introduce a price';
	} else if (input.price / 2 < 0) {
		errors.price = 'Introduce a valid price';
	}else if(!input.stock){
		errors.stock = "Introduce a stock"
	} else if(input.stock / 2 < 0 || input.stock % 1 !== 0){
		errors.stock = "Introduce a valid stock"
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
		price: '0.00',
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
		// si el event.target.type no es checkbox que haga esto, sino que modifique otra cosa
		const { name, value } = event.target;

		setInput({ ...input, [name]: value });
		setErrors(validateInput({ ...input, [name]: value }));
	};
	/////////////////////////////////////////////

	// Functions of Categories ///////////////////////////
	const introduceCategories = (event) => {
		const { value, checked } = event.target;

		if (!input.categories.includes(value) && checked === true) {
			setInput({ ...input, categories: [...input.categories, value] });
			setErrors(validateInput({ ...input, categories: value }));
		} else if (checked === false) {
			let filtrado = input.categories.filter((e) => e !== value);
			setInput({ ...input, categories: filtrado });
			setErrors(validateInput({ ...input, categories: filtrado }));
		}
	};
	///////////////////////////////////////////////////////

	// Post Product /////////////////////////////
	const submitData = async (event) => {
		event.preventDefault();
		try {
			await dispatch(createProduct(input)).then(
				history.push('/create/productsended'),
			);
		} catch (error) {
			alert(
				'Chosen name already belongs to another product, please select again.',
			);
		}
	};
	/////////////////////////////////////////////

	return (
		<div className={s.cont}>
			<h1 className={s.h1}>CREATE PRODUCT</h1>
			<div className={s.contF}>
				<form className={s.form} onSubmit={(e) => submitData(e)}>
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
							accept='image/*'
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
							step={0.01}
							autoComplete='off'
							type='number'
							min='0'></input>
						{errors.price && <p>{errors.price}</p>}
					</div>

					<br />

					<div className={s.contsp}>
						<label className={s.label}>*P. Stock: </label>
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
								<label className={s.label}>*P. Categories: </label>
								<ul>
									{categories.map((cat, index) => {
										return (
											<li key={cat.name} className={s.li}>
												<label className={s.labelC}>
													<input
														className={s.inputC}
														type={'checkbox'}
														name='categories'
														value={cat.name}
														onChange={(e) => introduceCategories(e)}
													/>
													<span className={s.spanC}>{cat.name}</span>
												</label>
											</li>
										);
									})}
								</ul>
							</div>
						)}
					</div>

					<button className={s.btn} id='sendButtom' type='submit' disabled>
						SEND
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateProduct;
