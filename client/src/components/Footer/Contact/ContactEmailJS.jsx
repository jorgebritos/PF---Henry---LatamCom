import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import emailjs from 'emailjs-com';
import s from './Contact.module.css';

// Input Validate /////////////////////////////
const validateInput = (input) => {
	let errors = {};
	let expreg = /[.*+\-?^${}()|[\]\\/]/;

	let regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

	if (!input.name || input.name?.trim() >= 1) {
		errors.name = 'Introduce a name!';
	} else if (!regexEmail.test(input.email)) {
		errors.email = 'Introduce a valid email!';
	} else if (!input.subject) {
		errors.subject = 'Introduce a subject';
	} else if (expreg.test(input.subject)) {
		errors.subject = 'Introduce a valid subject';
	} else if (!input.message.length) {
		errors.message = 'Message is required!';
	}
	const sendButton = document.getElementById('sendButtom');

	if (Object.entries(errors).length) {
		sendButton.disabled = true;
	} else {
		sendButton.disabled = false;
	}

	return errors;
};
///////////////////////////////////////////////

export const ContactUs = () => {
	const form = useRef();
	const history = useHistory();

	const [input, setInput] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});

	const [errors, setErrors] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});

	const introduceData = (event) => {
		const { name, value } = event.target;

		setInput({ ...input, [name]: value });
		setErrors(validateInput({ ...input, [name]: value }));
	};
	console.log(input.email);

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				'service_whuelqj',
				'template_525',
				form.current,
				'9phUVeXmt1vnt_ANR',
			)
			.then(
				(result) => {
					console.log(result.text);
				},
				(error) => {
					console.log(error.text);
				},
			)
			.then(history.push('/contact/messagesended'));
	};

	return (
		<div className={s.conten}>
			<h1 className={s.h1}>Contact Us</h1>
			<div className={s.cont_form}>
				<form ref={form} onSubmit={sendEmail} className={s.form}>
					<div className={s.div}>
						<label className={s.label}>Name</label>
						<input
							className={s.input}
							type='text'
							name='name'
							value={input.name}
							onChange={introduceData}
							autoComplete='off'
							placeholder='Your name...'
						/>
						{errors.name && <p>{errors.name}</p>}
					</div>
					<br />

					<div className={s.div}>
						<label className={s.label}>Email</label>
						<input
							className={s.input}
							type='text'
							name='email'
							value={input.email}
							onChange={introduceData}
							autoComplete='off'
							placeholder='Your email...'
						/>
						{errors.email && <p className={s.label}> {errors.email}</p>}
					</div>
					<br />

					<div className={s.div}>
						<label className={s.label}>Subject</label>
						<input
							className={s.input}
							type='text'
							name='subject'
							value={input.subject}
							onChange={introduceData}
							autoComplete='off'
							placeholder='Your reason...'
						/>
						{errors.subject && <p className={s.label}>{errors.subject}</p>}
					</div>
					<br />

					<div className={s.div}>
						<label className={s.label}>Message</label>
						<textarea
							className={s.textarea}
							name='message'
							value={input.message}
							onChange={introduceData}
							placeholder='Introduce your message...'
						/>
						{errors.message && <p className={s.label}>{errors.message}</p>}
					</div>
					<br />

					<div className={s.div}>
						<input
							className={s.btn}
							type='submit'
							value='SEND'
							id='sendButtom'
							disabled
						/>
					</div>
				</form>
			</div>
		</div>
	);
};
