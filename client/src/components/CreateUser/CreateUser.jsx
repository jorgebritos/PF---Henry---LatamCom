import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	createUser,
	getAllUsers
} from '../../redux/actions/index';
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
		/* setErrors(validateInput({ ...input, image: file.secure_url })); */
	};

	///////////////////////////////////////////////////////////////////////

	//------------------------------Controllers Form---------------------------------
<<<<<<< HEAD
	function controllerFormFirstname(event){
		if(event.target.value.length < 4){
      return "Solo se admite un min. de 3 caracteres"
    } 
    if (event.target.value.length > 30) {
      return "Solo se permite un max. de 30 caracteres";
    }
    if(!/^[A-Z ÁÉÍÓÚÑ]*$/i.test(event.target.value)){
      return "Solo se permiten letras"
    }
    return "";
  }

	function controllerFormLastname(event){
		if(event.target.value.length < 5){
      return "Solo se admite un min. de 4 caracteres"
    } 
    if (event.target.value.length > 30) {
      return "Solo se permite un max. de 30 caracteres";
    }
		if(!/^[A-Z ÁÉÍÓÚÑ]*$/i.test(event.target.value)){
      return "Solo se permiten letras"
    }
    return "";
  }


	function controllerFormEmail(event) {
		if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(event.target.value)) {
			return "Esto no es un email";
		}
		return "";
	}

	function controllerFormUsername(event){
		if(event.target.value.length < 3){
      return "Solo se admite un min. de 3 caracteres"
    } 
    if (event.target.value.length > 30) {
      return "Solo se permite un max. de 30 caracteres";
    }
    if(!/^([A-Z\(\)_ÁÉÍÓÚÑ0-9\-]* [A-Z\(\)_ÁÉÍÓÚÑ 0-9\-]*)$/i.test(event.target.value)){
      return "Solo se admiten letras, uso de tilde y caracteres como: \" (, ), -, _ \" "
    }
    return "";
  }

	function controllerFormPassword(event){
		if(event.target.value.length < 8){
      return "Solo se admite un min. de 4 caracteres"
    } 
    if (event.target.value.length > 20) {
      return "Solo se permite un max. de 20 caracteres";
    }
    if(!/^[A-Z \( \) \- _ÁÉÍÓÚÑ]*$/i.test(event.target.value)){
      return "Solo se admiten letras, uso de tilde y caracteres como: \" (, ), -, _ \" "
    }
    return "";
  }
=======
	function controllerFormFirstname(event) {
		if (event.target.value.length < 4) {
			return "Solo se admite un min. de 3 caracteres"
		}
		if (event.target.value.length > 120) {
			return "Solo se permite un max. de 120 caracteres";
		}
		if (!/^[A-Z  \- _ÁÉÍÓÚÑ]*$/i.test(event.target.value)) {
			return "Solo se admiten letras, uso de tilde y caracteres como: \" (, ), -, _ \" "
		}
		return "";
	}

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

>>>>>>> b2b1e3fd5627f81db17004e5ed6031210160a004


	//-------------------------------------------------------------------------------

	//---------------------------------- Change Local States -------------------------
	const introduceData = (event) => {
		event.preventDefault()

		switch (event.target.name) {
			case "firstname":
				console.log("err ", event.target.value);
				setErrors({
					...errors,
					[event.target.name]: ""
				})

				setInput({
					...input,
					firstname: event.target.value
				})

				console.log("erm", controllerFormFirstname(event));
				if (controllerFormFirstname(event).length > 0) {
					setErrors({
						...errors,
						firstname: controllerFormFirstname(event)
					})
				}

				break;

			case "lastname":
				console.log("err ", event.target.value);
				setErrors({
					...errors,
					[event.target.name]:""
				})

				setInput({
					...input,
					lastname: event.target.value
				})

				console.log("erm",controllerFormLastname(event));
				if(controllerFormLastname(event).length>0){
					setErrors({
						...errors,
						lastname: controllerFormLastname(event)
					})
				}

				break;
			case "email":
				console.log("err ", event.target.value);
				setErrors({
					...errors,
					[event.target.name]:""
				})

				setInput({
					...input,
					email: event.target.value
				})

				console.log("erm",controllerFormEmail(event));
				if(controllerFormEmail(event).length>0){
					setErrors({
						...errors,
						email: controllerFormEmail(event)
					})
				}



				break;
			case "file":
				
				break;
			case "username":
				setErrors({
					...errors,
					[event.target.name]:""
				})

				setInput({
					...input,
					username: event.target.value
				})

				console.log("erm",controllerFormUsername(event));
				if(controllerFormUsername(event).length>0){
					setErrors({
						...errors,
						username: controllerFormUsername(event)
					})
				}

				break;
			case "password":
				break;


			default:
				break;
		}


		event.preventDefault();
		const value = event.target.value;
		const property = event.target.name;
		console.log(property);
		setInput({ ...input, [property]: value });
		/* setErrors(validateInput({ ...input, [property]: value })) */;
	};
	//-----------------------------------------------------------------------------------



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
	//---------------------------Render--------------------------------
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
							onChange={(event) => introduceData(event)}
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
