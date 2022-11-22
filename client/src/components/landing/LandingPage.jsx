import React from 'react';
import { Link } from 'react-router-dom';
import s from './LandingPage.module.css';

export default function LandingPage() {
	return (
		<div className={s.backgraun}>
			<Link to='/home'>
				<div className={s.btn}>
					<button>Entrar</button>
				</div>
			</Link>
		</div>
	);
}
