import React from 'react';
import { Link } from 'react-router-dom';
import s from './LandingPage.module.css';
import Carrucer from '../Carousel/Carousel';

export default function LandingPage() {
	return (
		<div className={s.back}>
			<div className={s.background}>
				<div className={s.divbtn}></div>
			</div>
			<div className={s.segundoB}>
				<Link className={s.Link} to='/home'>
					<button className={s.btn}>Entrar</button>
				</Link>
			</div>
		</div>
	);
}
