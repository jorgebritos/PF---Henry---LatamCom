import React from 'react';
import Countdown from 'react-countdown';
import s from './SuccessedPayment.module.css';

const renderer1 = ({seconds,completed}, flag) => {
	const handleClick = (e) => {
		//e.preventDefaul()
		window.location.href = `${window.location.origin}/home`;
	};
	if (completed) {
		return (
			<div><span className={s.vMessage}>Time is up! </span>
			<p className={s.description}>It looks like the payment process didn't work. Please return to home page.</p>
			<div className={s.btndiv}>
				
				<button onClick={(e) => handleClick(e)} className={s.homebtn}>
					
					Take me home
				</button>
			</div>
			</div>
		);
	} else if (flag){
		return(
			<div><span className={s.vMessage}>Error! </span>
		<p className={s.description}>An error aborted the payment process, please try later.</p>
		<div className={s.btndiv}>
			
			<button onClick={(e) => handleClick(e)} className={s.homebtn}>
				
				Take me home
			</button>
		</div>
		</div>
		)
	}else {
		return (
			<div className={s.messagge}>
			<span className={s.vMessage}>Verifiying purchase process...</span>
			<div className={s.cont}>
				<p className={s.description}>
					If the verifiying takes more than
					{seconds === 1 ? ` ${seconds} second` : ` ${seconds} seconds`}, please
					return to <a href={`${window.location.origin}/home`} className={s.homelnk}>
						home
					</a> page
				</p>
			</div>
			</div>
		);
	}
};

const Counter = (failed) => {
	const flag = failed.flag
	console.log(flag);
	return (
		<span className={s.contador}>
			<Countdown date={Date.now() + 30000} renderer={props => renderer1(props,flag)} />
		</span>
	);
};

export default Counter;


{/* <div className={s.buttoncard}>
								<p>An error interrupted the transaction, please try later.</p>
							</div> */}