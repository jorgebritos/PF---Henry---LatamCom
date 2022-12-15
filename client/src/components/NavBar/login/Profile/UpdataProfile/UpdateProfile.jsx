import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateUser, setUserData } from '../../../../../redux/actions/index';
import s from './UpdateProfile.module.css';
import Loading from '../../../../loading/Loading';
// import { locals } from '../../../../../../../api/src/app';

const Validate = (input) => {
	let errors = {};
	let expreg = /[.*+\-?^${}()|[\]\\/]/;
	// let regexURL =
	// 	/((http|ftp|https):)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:~+#-]*[\w@?^=%&amp;~+#-])?/;
	// let regexPassword = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
	let regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

	if (!input.firstname) {
		errors.firstname = 'Introduce a firstname';
	} else if (expreg.test(input.firstname)) {
		errors.firstname = 'Name yourself properly!';
	} else if(input.firstname.includes(" ")){
		errors.firstname = "It only admit one name"
	} else if (!input.lastname) {
		errors.lastname = 'Introduce a lastname';
	} else if (expreg.test(input.lastname)) {
		errors.lastname = 'Name yourself properly!';
	} else if (!input.email) {
		errors.email = 'Introduce an email';
	} else if (!regexEmail.test(input.email)) {
		errors.email = 'Introduce your email properly!';
	} else if (!input.username) {
		errors.username = 'Introduce an username';
	}

	const sendButton = document.getElementById('sendButtom');

	if (Object.entries(errors).length) {
		sendButton.disabled = true;
	} else {
		sendButton.disabled = false;
	}

	return errors;
};

const UpdateProfile = (props) => {
	const user = useSelector((state) => state.user);
	const userNow = user.id ? user : JSON.parse(localStorage.getItem('userInfo'));
	const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
	const allUsers = useSelector((state) => state.allUsers);
	const dispatch = useDispatch();
	const history = useHistory();
	console.log('USERNOW', userNow);
	const [input, setInput] = useState({
		firstname: userNow.name.split(' ', 1).join(),
		lastname: userNow.name
			.split(' ')
			.slice(1)
			.join(' '),
		password: '',
		confirm_password: '',
		email: userNow.email,
		profile_image: userNow.picture,
		username: userNow.username,
	});
	const [errors, setErrors] = useState({
		firstname: '',
		lastname: '',
		password: '',
		confirm_password: '',
		email: '',
		profile_image: '',
		username: '',
	});
	const [loading, setLoading] = useState(false);

	const dataUser = allUsers.find((e) => e.id === user.id);
	const passwordUser = dataUser.password;

	const introduceData = (event) => {
		event.preventDefault();
		const name = event.target.name;
		const value = event.target.value;

		setInput({ ...input, [name]: value });
		setErrors(Validate({ ...input, [name]: value }));
	};

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
		setInput({ ...input, profile_image: file.secure_url });
		setLoading(false);
	};
	///////////////////////////////////////////////////////////////////////

	//Delete New Image /////////////////////

	const deleteNewImage = (e) => {
		e.preventDefault();
		setInput({ ...input, profile_image: userNow.picture });
		const deleteInfo = document.getElementById('cloudinary');
		deleteInfo.value = '';
	};
	////////////////////////////////////////
	console.log("loggedUser",loggedUser)
	// Uptade User //////////////////////////////
	const submitData = (event) => {
		event.preventDefault();
		try {
			if(loggedUser.email !== loggedUser.password){
				if (input.password === passwordUser) {
					const newDates = {
						firstname: input.firstname,
						lastname: input.lastname,
						password: input.password,
						email: input.email,
						profile_image: input.profile_image,
						username: input.username,
						id: userNow.id,
					};
					const loggedUserJWT = JSON.parse(localStorage.getItem('loggedUserJWT'));
					const userLocal = {
						id: userNow.id,
						username: newDates.username,
						picture: input.profile_image,
						name: newDates.firstname + ' ' + newDates.lastname,
						email: newDates.email,
						admin: userNow.admin,
						jwt: loggedUserJWT,
					};
	
					dispatch(setUserData(userLocal))
						.then(dispatch(updateUser(newDates)))
						.then(localStorage.setItem('userInfo', JSON.stringify(userLocal)))
						.then(history.push('/profile/success'));
				} else {
					alert('Incorrect Password');
				}
			}else{
				const newDates = {
					firstname: input.firstname,
					lastname: input.lastname,
					password: input.password,
					email: input.email,
					profile_image: input.profile_image,
					username: input.username,
					id: userNow.id,
				};
				const loggedUserJWT = JSON.parse(localStorage.getItem('loggedUserJWT'));
				const userLocal = {
					id: userNow.id,
					username: newDates.username,
					picture: input.profile_image,
					name: newDates.firstname + ' ' + newDates.lastname,
					email: newDates.email,
					admin: userNow.admin,
					jwt: loggedUserJWT,
				};

				dispatch(setUserData(userLocal))
					.then(dispatch(updateUser(newDates)))
					.then(localStorage.setItem('userInfo', JSON.stringify(userLocal)))
					.then(history.push('/profile/success'))
			}
			
		} catch (error) {
			alert(error.message);
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

	if (!userNow) {
		return (
			<div>
				<Loading />
			</div>
		);
	} else
		return (
			<div className={s.conten}>
				<h1 className={s.h1}>Update User</h1>

				<div className={s.cont_form}>
					<form className={s.form} onSubmit={submitData}>
						<div className={s.div}>
							<label className={s.label}>Firstname</label>
							<input
								className={s.input}
								name='firstname'
								value={input.firstname}
								autoComplete='off'
								onChange={introduceData}
							/>
							{errors.firstname && <p>{errors.firstname}</p>}
						</div>
						<br />
						<div className={s.div}>
							<label className={s.label}>Lastname</label>
							<input
								className={s.input}
								name='lastname'
								value={input.lastname}
								autoComplete='off'
								onChange={introduceData}
							/>
							{errors.lastname && <p>{errors.lastname}</p>}
						</div>
						<br />
						<div className={s.div}>
							<label className={s.label}>Email</label>
							<input
								className={s.input}
								name='email'
								value={input.email}
								autoComplete='off'
								onChange={introduceData}
							/>
							{errors.email && <p>{errors.email}</p>}
						</div>
						<br />
						<div className={s.div}>
							{userNow.picture ? (
								<div>
									<p>Actual image</p>
									<img
										src={userNow.picture}
										style={{ width: '300px' }}
										alt='img'
									/>
								</div>
							) : (
								<div>
									<p>No current image</p>
								</div>
							)}
						</div>

						<br />
						<div className={s.div}>
							<label className={s.label}>Profile Image</label>
							<p>(this will replace the current image)</p>
							<input
								className={s.input}
								id='cloudinary'
								type='file'
								name='file'
								accept='image/*'
								autoComplete='off'
								onChange={uploadImage}></input>
							{loading ? (
								<h4>Uploading image...</h4>
							) : input.profile_image !== null &&
							  userNow.picture === input.profile_image ? (
								<div>
									<p>You will keep the same picture</p>
								</div>
							) : (
								<img
									src={input.profile_image}
									style={{ width: '300px' }}
									alt=''></img>
							)}
						</div>
						<br />
						<div className={s.div}>
							{document.getElementById('cloudinary') &&
							document.getElementById('cloudinary').value ? (
								<button className={s.btn} onClick={deleteNewImage}>
									Delete new image
								</button>
							) : (
								''
							)}
						</div>
						<br />
						<div className={s.div}>
							<label className={s.label}>Username</label>
							<input
								className={s.input}
								name='username'
								value={input.username}
								autoComplete='off'
								onChange={introduceData}
							/>
							{errors.username && <p>{errors.username}</p>}
						</div>
						<br />
						{loggedUser.email !== loggedUser.password ? (
						<div>
							<div className={s.div}>
								<label className={s.label}>Confirm Password</label>
								<input
									className={s.input}
									name='password'
									id='seePassword'
									type='password'
									value={input.password}
									autoComplete='off'
									onChange={introduceData}
								/>
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
						</div>
						
						):""}
						
						<div className={s.div}>
							<button className={s.btn} type='submit' id='sendButtom'>
								SEND
							</button>
						</div>
					</form>
				</div>
			</div>
		);
};

export default UpdateProfile;
