import React from 'react';
import Countdown from 'react-countdown';
import s from './SuccessedPayment.module.css';

const renderer = (renderer) => {
	const handleClick = (e) => {
		//e.preventDefaul()
		window.location.href = `${window.location.origin}/home`;
	};
	if (renderer.completed) {
		
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
			<div className={s.messagge}>
			<span className={s.vMessage}>Verifiying purchase process...</span>
			<div className={s.cont}>
				<p className={s.description}>
					If the verifiying takes more than
					{renderer.seconds === 1 ? ` ${renderer.seconds} second` : ` ${renderer.seconds} seconds`}, please
					return to <a href={`${window.location.origin}/home`} className={s.homelnk}>
						home
					</a> page
				</p>
			</div>
			</div>
		);
	}
};

const IconCounter = () => {
	return (
		<span className={s.contador}>
			<Countdown date={Date.now() + 30000} renderer={renderer} />
		</span>
	);
};

export default IconCounter;
