import React from 'react';
import Countdown from 'react-countdown';
import s from './SuccessedPayment.module.css';

const renderer = ({ seconds, completed }) => {
	const handleClick = (e) => {
		//e.preventDefaul()
		window.location.href = `${window.location.origin}/home`;
	};
	if (completed) {
		return (
			<div className={s.btndiv}>
				{' '}
				<button onClick={(e) => handleClick(e)} className={s.homebtn}>
					{' '}
					Take me home
				</button>
			</div>
		);
	} else {
		return (
			<div className={s.cont}>
				<p>
					If the verifiying takes more than
					{seconds === 1 ? ` ${seconds} second` : ` ${seconds} seconds`}, please
					return to
					<a href={`${window.location.origin}/home`} className={s.homelnk}>
						home
					</a>
					page
				</p>
			</div>
		);
	}
};

const Counter = () => {
	return (
		<span className={s.contador}>
			<Countdown date={Date.now() + 15000} renderer={renderer} />
		</span>
	);
};

export default Counter;
