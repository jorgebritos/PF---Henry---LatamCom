import React from 'react';
import { Link } from 'react-router-dom';
import s from './LandingPage.module.css';

export default function LandingPage() {
	return (
		<div className={s.background}>
			<Link className={s.Link} to='/home'>
				<div className={s.divbtn}>
					<button className={s.btn}>Entrar</button>
				</div>
			</Link>
		</div>
	);
}
