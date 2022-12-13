// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { sendMail } from '../../../redux/actions/index';
// // import s from './Contact.module.css';

// export default function Contact() {
// 	const dispatch = useDispatch();

// 	const [mail, setMail] = useState({
// 		from: '',
// 		subject: '',
// 		to: '',
// 		text: '',
// 	});

// 	function handleMail(e) {
// 		e.preventDefault();
// 		setMail({
// 			...mail,
// 			[e.target.name]: e.target.value,
// 		});
// 		handleButton();
// 	}

// 	function sendMails(e) {
// 		e.preventDefault();

// 		let { from, to, subject, text } = mail;

// 		dispatch(sendMail({ from, to, subject, text }));
// 	}

// 	function handleButton() {
// 		return !mail.subject || !mail.to || !mail.from || !mail.text;
// 	}

// 	//AGREGUEN LOS SUYOS
// 	const ourMails = [
// 		'britosj30@gmail.com',
// 		'matthewgallar2112@outlook.com',
// 		'miguel.angel.i@live.com',
// 	];

// 	return (
// 		<div className={s.conten}>
// 			<h1>CONTACT</h1>

// 			<div className={s.cont_form}>
// 				<form className={s.form}>
// 					<label className={s.label} htmlFor='subject'>
// 						subject Mail: hola
// 					</label>
// 					<br />
// 					<input
// 						className={s.input}
// 						name='subject'
// 						onInput={(e) => handleMail(e)}
// 						value={mail.subject}></input>

// 					<br />
// 					<label className={s.label} htmlFor='from'>
// 						Your Email:
// 					</label>
// 					<input
// 						className={s.input}
// 						name='from'
// 						onInput={(e) => handleMail(e)}
// 						value={mail.from}></input>
// 					<br />
// 					<label className={s.label} htmlFor='to'>
// 						Send To:
// 					</label>
// 					<select
// 						className={s.select}
// 						name='to'
// 						onChange={(e) => handleMail(e)}>
// 						<option value=''>Select Mail</option>
// 						{ourMails.map((m) => {
// 							return (
// 								<option value={m} key={m}>
// 									{m}
// 								</option>
// 							);
// 						})}
// 					</select>
// 					<br />
// 					<textarea
// 						className={s.textarea}
// 						placeholder='Escribe aquí...'
// 						name='text'
// 						rows={10}
// 						cols={50}
// 						value={mail.text}
// 						onInput={(e) => handleMail(e)}
// 					/>
// 					<br />
// 					<button
// 						className={s.btn}
// 						onClick={(e) => sendMails(e)}
// 						disabled={handleButton()}>
// 						Send Mail
// 					</button>
// 				</form>
// 			</div>
// 		</div>
// 	);
// }
