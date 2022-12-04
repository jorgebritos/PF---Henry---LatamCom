import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterByRating, getAllProducts } from '../../redux/actions';
import Carrusel from './CarruselLanding';
import s from './LandingPage.module.css';

export default function LandingPage() {
	// const dispatch = useDispatch()
	// const product = useSelector((state)=> state.allProducts)
	// useEffect(()=>{
	// 	dispatch(getAllProducts())
	// },[])


	return (
		<div className={s.background}>
			
			<div className={s.divbtn}>
				<Link className={s.Link} to='/home'>
					<button className={s.btn}>Entrar</button>
				</Link>
			</div>
			<Carrusel/>
		</div>
	);
}
