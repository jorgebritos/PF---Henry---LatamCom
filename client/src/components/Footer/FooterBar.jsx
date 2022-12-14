import React from 'react';
import s from './FooterBar.module.css';
import logoS from '../../asset/logoS.png';
import { Link } from 'react-router-dom';

export default function FooterBar() {
	return (
		<div className={s.container}>
			<footer className={s.footer}>
				<div>
					<img src={logoS} alt='' height={'55px'} />
				</div>
				<Link className={s.a} to={'/contact'}>Contact</Link>
				<div>
					<p>&copy; 2022 LatamCom, Inc</p>
				</div>
			</footer>
		</div>
	);
}
