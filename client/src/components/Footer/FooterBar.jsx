import React from 'react';
import s from './FooterBar.module.css';
import logoS from '../../asset/logoS.png';

export default function FooterBar() {
	return (
		<div className={s.container}>
			<footer className={s.footer}>
				<div>
					<img src={logoS} alt='' height={'55px'} />
				</div>
				<div>
					<p>&copy; 2022 LatamCom, Inc</p>
				</div>
			</footer>
		</div>
	);
}
