import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createUser, getAllUsers } from '../../redux/actions/index';
import s from './CreateUser.module.css';


// Input Validate /////////////////////////////
/* const validateInput = (input) => {
	//let errors = {};
	let expreg = /[.*+\-?^${}()|[\]\\/]/;
	let regexURL = /((http|ftp|https):)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:~+#-]*[\w@?^=%&amp;~+#-])?/;

<<<<<<< HEAD
	  if (!input.firstname || input.firstname?.trim() <= 3 ) {
=======
<<<<<<< HEAD
	if (!input.firstname || input.firstname?.trim() >= 1 ) {
		errors.firstname = 'Introduce a name!';
	}else if((expreg.test(input.firstname))){
		errors.firstname = "Name your product properly!"
	}else if((expreg.test(input.lastname))) {
			errors.lastname = 'Introduce a valid description!';
	}else if (!(regexURL.test(input.profile_image))) {
=======
	if (!input.firstname || input.firstname?.trim() <= 3 ) {
>>>>>>> c686b44aea14045a89210373325b1acd0b51e212
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
>>>>>>> 3d23e29c950becf23eacf495b1a470368b2104f4
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
}; */
///////////////////////////////////////////////

const CreateUser = () => {
	//Hooks and states ///////////////////////
	const dispatch = useDispatch();
	const allUsers = useSelector((state)=>state.allUsers)
	const history = useHistory();
	console.log(allUsers);
	const [input, setInput] = useState({
		firstname: '',
		lastname: '',
		email: '',
		profile_image: '',
		username: '',
		password: '',
	});

	const [errors, setErrors] = useState({
		firstname: '',
		lastname: '',
		email: '',
		profile_image: '',
		username: '',
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
		setErrors({
			...errors,
			[e.target.name]: '',
		});
		if (!/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(files[0].name)) {
			setErrors({
				...errors,
				[e.target.name]: 'It must be a valid format',
			});
		} else {
			setErrors({
				...errors,
				[e.target.name]: '',
			});
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
			setInput({ ...input, profile_image: file.secure_url });
			setLoading(false);
		}

		/* setErrors(validateInput({ ...input, image: file.secure_url })); */
	};

	///////////////////////////////////////////////////////////////////////

	//------------------------------Controllers Form---------------------------------

	function controllerFormFirstname(event) {
		if (event.target.value.length < 1) {
			return 'It must contain at least 1 character';
		}
		if (event.target.value.length > 30) {
			return 'It can not exceed 30 characters';
		}
		if (event.target.value.includes(' ')) {
			return 'It only admit one name';
		}
		if (!/^[A-Z ÁÉÍÓÚÑ]*$/i.test(event.target.value)) {
			return 'It only admit letters';
		}
		return '';
	}

	function controllerFormLastname(event) {
		if (event.target.value.length < 1) {
			return 'It must contain at least 1 character';
		}
		if (event.target.value.length > 30) {
			return 'It can not exceed 30 characters';
		}
		if (!/^[A-Z ÁÉÍÓÚÑ]*$/i.test(event.target.value)) {
			return 'It only admit letters';
		}
		return '';
	}

	function controllerFormEmail(event) {
		if (
			!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
				event.target.value,
			)
		) {
			return 'Please, enter a valid email';
		}
		return '';
	}

	function controllerFormUsername(event) {
		if (event.target.value.length < 1) {
			return 'It can not be empty';
		}

		if (event.target.value.length > 30) {
			return 'It can not exceed 30 characters';
		}

		return '';
	}

	function controllerFormPassword(event) {
		if (event.target.value.length < 4) {
			return 'It must have at least 4 characters';
		}
		const email = document.getElementById("emailTest")
		if(event.target.value === email.value){
			return 'Your password can not be the same as your email'
		}
		return '';
	}

	// function controllerFormUsername(event) {
	// 	if (event.target.value.length < 3) {
	// 		return 'Solo se admite un min. de 3 caracteres';
	// 	}
	// 	if (event.target.value.length > 30) {
	// 		return 'Solo se permite un max. de 30 caracteres';
	// 	}
	// 	if (
	// 		!/^([A-Z\(\)_ÁÉÍÓÚÑ0-9\-]* [A-Z\(\)_ÁÉÍÓÚÑ 0-9\-]*)$/i.test(
	// 			event.target.value,
	// 		)
	// 	) {
	// 		return 'Solo se admiten letras, uso de tilde y caracteres como: " (, ), -, _ " ';
	// 	}
	// 	return '';
	// }

	// function controllerFormPassword(event) {
	// 	if (event.target.value.length < 8) {
	// 		return 'Solo se admite un min. de 4 caracteres';
	// 	}
	// 	if (event.target.value.length > 20) {
	// 		return 'Solo se permite un max. de 20 caracteres';
	// 	}
	// 	if (!/^[A-Z \( \) \- _ÁÉÍÓÚÑ]*$/i.test(event.target.value)) {
	// 		return 'Solo se admiten letras, uso de tilde y caracteres como: " (, ), -, _ " ';
	// 	}
	// 	return '';
	// }

	/* 	function controllerFormFirstname(event) {
		if (event.target.value.length < 4) {
			return 'Solo se admite un min. de 3 caracteres';
		}
		if (event.target.value.length > 120) {
			return 'Solo se permite un max. de 120 caracteres';
		}
		if (!/^[A-Z  \- _ÁÉÍÓÚÑ]*$/i.test(event.target.value)) {
			return 'Solo se admiten letras, uso de tilde y caracteres como: " (, ), -, _ " ';
		}
		return '';
	} */

	// function controllerFormLastname(event) {
	// 	if (event.target.value.length < 5) {
	// 		return "Solo se admite un min. de 4 caracteres"
	// 	}
	// 	if (event.target.value.length > 120) {
	// 		return "Solo se permite un max. de 120 caracteres";
	// 	}
	// 	if (!/^[A-Z \- _ÁÉÍÓÚÑ]*$/i.test(event.target.value)) {
	// 		return "Solo se admiten letras, uso de tilde y caracteres como: \" (, ), -, _ \" "
	// 	}
	// 	return "";
	// }

	/* 	function controllerFormEmail(event) {
			if (condition) {
				
			}
		} */

	//-------------------------------------------------------------------------------

	//---------------------------------- Change Local States -------------------------
	const introduceData = (event) => {
		event.preventDefault();

		switch (event.target.name) {
			case 'firstname':
				setErrors({
					...errors,
					[event.target.name]: '',
				});

				setInput({
					...input,
					firstname: event.target.value,
				});

				if (controllerFormFirstname(event).length > 0) {
					setErrors({
						...errors,
						firstname: controllerFormFirstname(event),
					});
				}

				break;

			case 'lastname':
				setErrors({
					...errors,
					[event.target.name]: '',
				});

				setInput({
					...input,
					lastname: event.target.value,
				});

				if (controllerFormLastname(event).length > 0) {
					setErrors({
						...errors,
						lastname: controllerFormLastname(event),
					});
				}

				break;
			case 'email':
				setErrors({
					...errors,
					[event.target.name]: '',
				});

				setInput({
					...input,
					email: event.target.value,
				});

				if (controllerFormEmail(event).length > 0) {
					setErrors({
						...errors,
						email: controllerFormEmail(event),
					});
				}

				break;
			case 'file':
				break;
			case 'username':
				setErrors({
					...errors,
					[event.target.name]: '',
				});

				setInput({
					...input,
					username: event.target.value,
				});

				if (controllerFormUsername(event).length > 0) {
					setErrors({
						...errors,
						username: controllerFormUsername(event),
					});
				}

				break;
			case 'password':
				setErrors({
					...errors,
					[event.target.name]: '',
				});

				setInput({
					...input,
					password: event.target.value,
				});
				if (controllerFormPassword(event).length > 0) {
					setErrors({
						...errors,
						password: controllerFormPassword(event),
					});
				}
				break;

			default:
				break;
		}

		event.preventDefault();
		const value = event.target.value;
		const property = event.target.name;
		setInput({ ...input, [property]: value });
		/* setErrors(validateInput({ ...input, [property]: value })) */
	};
	//-----------------------------------------------------------------------------------

	///////////////////////////////////////////////////////
	
	
	// Create user /////////////////////////////
	const submitData = async (event) => {
		event.preventDefault();
		
		try {
			let checkErrors = [];
			for (let key in errors) {
				if (errors[key].length === 0) {
					checkErrors.push(key);
				}
			}
			
			const match = allUsers.find((e)=>e.email === input.email)

			if (Object.keys(errors).length === 6 && checkErrors.length === 6 && !match ) {
				await dispatch(createUser(input)).then(history.push('/home'));
				alert('User created');
			} else if (Object.keys(errors).length < 6) {
				
				alert('The form in incomplete');
			} else if(match){
				alert('The email entered is currently in use')
			}else {
				alert('There are errors in the form');
			}
		} catch (error) {
			alert(
				'Chosen name already belongs to another user, please select again.',
			);
		}
	};
	/////////////////////////////////////////////

	// Visibility of password ///////////////////
	const visibility = (e) => {
		const { checked } = e.target;
		const contraseña = document.getElementById('seePassword');
		checked === true ? (contraseña.type = '') : (contraseña.type = 'password');
	};
	/////////////////////////////////////////////

	//---------------------------Render--------------------------------
	return (
		<div className={s.cont}>
			<h1 className={s.h1}>CREATE USER</h1>
			<div className={s.contF}>
				<form className={s.contsp} onSubmit={(e) => submitData(e)}>
					<div className={s.contl}>
						<label className={s.label}>*U. Firstname: </label>
						<input
							className={s.input}
							name='firstname'
							value={input.firstname}
							onChange={(event) => introduceData(event)}
							autoComplete='off'></input>
						{errors.firstname && <p>{errors.firstname}</p>}
					</div>

					<br />

					<div className={s.contl}>
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

					<div className={s.contl}>
						<label className={s.label}>*U. Email: </label>
						<input
							className={s.input}
							name='email'
							id="emailTest"
							value={input.email}
							onChange={introduceData}
							autoComplete='off'></input>
						{errors.email && <p>{errors.email}</p>}
					</div>
					<br />

					<div className={s.contl}>
						<label className={s.label}>P. Image: </label>
						<input
							className={s.input}
							name='profile_image'
							onChange={uploadImage}
							autoComplete='off'
							accept='image/*'
							type='file'></input>
						{errors.profile_image && <p>{errors.profile_image}</p>}
						{loading ? (
							<h4>Uploading image...</h4>
						) : (
							<img
								src={input.profile_image}
								style={{ width: '300px' }}
								alt=''></img>
						)}
					</div>

					<br />

					<div className={s.contl}>
						<label className={s.label}>*P. Username: </label>
						<input
							className={s.input}
							name='username'
							value={input.username}
							onChange={introduceData}
							autoComplete='off'></input>
						{errors.username && <p>{errors.username}</p>}
					</div>

					<br />

					<div className={s.contl}>
						<label className={s.label}>*P. Password: </label>
						<input
							className={s.input}
							name='password'
							id='seePassword'
							value={input.password}
							type='password'
							onChange={introduceData}
							autoComplete='off'></input>
						{errors.password && <p>{errors.password}</p>}
					</div>
					<br />
					<div>
						<label className={s.labelC}>
							<input
								className={s.inputC}
								type={'checkbox'}
								name='seePassword'
								onChange={(e) => visibility(e)}
							/>
							<span className={s.spanC}>See password</span>
						</label>
					</div>

					<br />

					<br />

					<button className={s.btn} id='sendButtom' type='submit'>
						SEND
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateUser;
