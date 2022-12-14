import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { filterByRating } from '../../redux/actions';
import { Carousel } from 'react-responsive-carousel';
import s from './Carrusel.module.css';
import colombia from '../../asset/countries/co.png';
import argentina from '../../asset/countries/arg.png';
import uruguay from '../../asset/countries/uru.png';
import latamcom from '../../asset/countries/latcom.png';
import { getGeoPosition } from '../../redux/actions';
import { Link } from 'react-router-dom';

// Para usar este componente procurar asegurarse de enviar
// la lista completa de los productos desde el componente
// que se invoque, si se desea que se muestren la imagenes
// en un tamaño pequeño cambiar showThumbs={true}

export default function Carrusel({ products }) {
	const dispatch = useDispatch();
	const result = useSelector((state) => state.filRating);
	const geoloc = useSelector((state) => state.geoposition);
	const country = navigator.geolocation;

	const countries = {
		CO: colombia,
		AR: argentina,
		UY: uruguay,
		latamcom: latamcom,
	};

	// eslint-disable-next-line
	const coordenadas = async (posicion) => {
		dispatch(getGeoPosition(posicion));
	};

	const error = (error) => {
		return error;
	};

	useEffect(() => {
		let newProducts = [...products]
		dispatch(filterByRating(newProducts));
		country.getCurrentPosition(coordenadas, error)
		// eslint-disable-next-line
	}, [products]);

	return (
		// <div className={s.carrusel}>
		<Carousel key={'RC1'}
			className={s.const}
			showThumbs={false}
			showArrows={false}
			showStatus={false}
			showIndicators={false}
			infiniteLoop={true}
			useKeyboardArrows={true}
			autoPlay={true}
			stopOnHover={true}
			swipeable={true}
			dynamicHeight={false}
			emulateTouch={true}
			autoFocus={true}
			centerMode={true}
			centerSlidePercentage={100}>
			{result.length ? (
				result.slice(0, 10).map((p) => (
					<Link to={`/product/${p.id}`} key={`lcr${p.id}`}>
						<div key={`cr${p.id}`}>

							<img className={s.img} src={p.image} alt={p.name} />
						</div>
					</Link>
				))
			) : (
				<></>
			)}
			{geoloc.hasOwnProperty("ISO_3166-1_alpha-2")&&countries[geoloc["ISO_3166-1_alpha-2"]] ? (
				<div>
					<img
						src={countries[geoloc["ISO_3166-1_alpha-2"]]}
						alt={geoloc["ISO_3166-1_alpha-2"]}
						className={s.imglatm}
					/>
				</div>
			) : (
				<div>
					<img
						className={s.imglatm}
						src={countries.latamcom}
						alt='latamcom'
					/>
				</div>
			)}
		</Carousel>
		//</div>
	);
}
