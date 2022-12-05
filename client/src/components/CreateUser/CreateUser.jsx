import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	createUser,
	getAllUsers
} from '../../redux/actions/index';
import s from './CreateUser.module.css';

// Input Validate /////////////////////////////
const validateInput = (input) => {
	let errors = {};
	let expreg = /[.*+\-?^${}()|[\]\\/]/;
	let regexURL = /((http|ftp|https):)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:~+#-]*[\w@?^=%&amp;~+#-])?/;

	if (!input.firstname || input.firstname?.trim() <= 3 ) {
		errors.firstname = 'Introduce a name!';
	}else if((expreg.test(input.firstname))){
        errors.firstname = "Use a proper Name!"
	}else if  (!input.lastname || input.lastname?.trim() <= 4 ) {
		errors.lastname = 'Introduce a name!';
	}else if((expreg.test(input.lastname))) {
			errors.lastname = 'Introduce a proper lastname!';
    }else if(!input.email || input.email?.trim() <= 1 ) {
			errors.email = 'Introduce a email!';
		}else if(!(regexURL.test(input.profile_image))) {
		errors.profile_image = 'Introduce an image';
	}else if (!input.username || input.username?.trim() <= 3 ) {
		errors.username = 'Introduce a username!';
	}else if(!input.password || input.password?.trim() <= 8 ) {
		errors.password = 'Demasiado corto!';
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

const CreateUser = () => {

	//Hooks and states ///////////////////////
	const dispatch = useDispatch();

	const history = useHistory();

	const [input, setInput] = useState({
		firstname: '',
		lastname: '',
		email: '',
		profile_image: '',
		username: "",
		password: '',
	});

	const [errors, setErrors] = useState({
		firstname: '',
		lastname: '',
		email: '',
		profile_image: '',
		username: "",
		password: '',
	});

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		dispatch(getAllUsers());
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
		console.log(property);
		setInput({ ...input, [property]: value });
		setErrors(validateInput({ ...input, [property]: value }));
	};
	/////////////////////////////////////////////



	///////////////////////////////////////////////////////

	// Post Product /////////////////////////////
	const submitData = async (event) => {
		event.preventDefault();
		try {
			await dispatch(createUser(input)).then(history.push("/createUser/usersended"))
			
		} catch (error) {
			alert(
				'Chosen name already belongs to another user, please select again.',
			);
		}
		
	};
	/////////////////////////////////////////////

	return (
		<div className={s.cont}>
			<div className={s.contF}>
				<h1 className={s.h1}>CREATE USER</h1>
				
				<form onSubmit={(e) => submitData(e)}>
					<div className={s.contsp}>
						<label className={s.label}>*U. Firstname: </label>
						<input
							className={s.input}
							name='firstname'
							value={input.firstname}
							onChange={introduceData}
							autoComplete='off'></input>
						{errors.firstname && <p>{errors.firstname}</p>}
					</div>

					<br />

					<div className={s.contsp}>
						<label className={s.label}>*U. Lastname: </label>
						<input
							className={s.input}
							name='lastname'
							value={input.lastname}
							onChange={introduceData}
							autoComplete='off'></input>
							{errors.lastname && <p>{errors.lastname}</p>}
					</div>

					<br />
                   

					<div className={s.contsp}>
						<label className={s.label}>*U. Email: </label>
						<input
							className={s.input}
							name='email'
							value={input.email}
							onChange={introduceData}
							autoComplete='off'></input>
							{errors.email && <p>{errors.email}</p>}
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
						{errors.profile_image && <p>{errors.profile_image}</p>}
						{loading ? (
							<h4>Uploading image...</h4>
						) : (
							<img src={input.profile_image} style={{ width: '300px' }} alt=''></img>
						)}
					</div>

					<br />

					<div className={s.contsp}>
						<label className={s.label}>*P. Username: </label>
						<input
							className={s.input}
							name='username'
							value={input.username}
							onChange={introduceData}
							autoComplete='off'
				            ></input>
						{errors.username && <p>{errors.username}</p>}
					</div>

					<br />

					<div className={s.contsp}>
						<label className={s.label}>*P. Password: </label>
						<input
							className={s.input}
							name='password'
							value={input.password}
							onChange={introduceData}
							autoComplete='off'
						></input>
							{errors.password && <p>{errors.password}</p>}
					</div>

					<br />

					<br />


					<br />

					<button className={s.btn} id='sendButtom' type='submit' disabled>
						SEND
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateUser;