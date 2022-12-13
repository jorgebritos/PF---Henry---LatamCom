import React from 'react';
import s from './CancelPayment.module.css';
import { Link } from 'react-router-dom';

const CancelPayment = (req) => {
	return (
		<div className={s.container}>
			<div className={s.card}>
				<div className={s.topcard}>
					<img
						src='https://img.icons8.com/office/300/ffffff/cancel-subscription.png'
						alt='aborted'
						className={s.img}
					/>
				</div>
				<div className={s.buttoncard}>
					<span className={s.messagge}>
						<h3>The payment process has been cancelled</h3>
					</span>
				</div>
				<Link to={'/shoppingcart'}>
					<button className={s.homebtn}>Return to Shopping Cart</button>
				</Link>
				{localStorage.removeItem("idUser")}
			</div>
			<div>
				<a
					target='_blank'
					href='https://icons8.com/icon/21068/comprobado'
					rel='noreferrer'>{''}</a>
			</div>
		</div>
	);
};
export default CancelPayment;
