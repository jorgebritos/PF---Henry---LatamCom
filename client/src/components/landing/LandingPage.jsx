import React from 'react';
import { Link } from 'react-router-dom';
import Carrusel from './CarruselLanding';
import s from './LandingPage.module.css';
export default function LandingPage() {
	// const dispatch = useDispatch()
	// const product = useSelector((state)=> state.allProducts)
	// useEffect(()=>{
	// 	dispatch(getAllProducts())
	// },[])


	return (
		<div className={s.back}>
			<div className={s.background}>
				<div></div>
			</div>
			<div className={s.segundoB}>
				<Carrusel />
				<Link className={s.Link} to='/home'>
					<button className={s.btn}>Entrar</button>
				</Link>
			</div>
			{/* <Carrusel/> */}
		</div>
	);
}
