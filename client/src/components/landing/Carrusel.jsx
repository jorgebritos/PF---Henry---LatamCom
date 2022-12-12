import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { filterByRating } from '../../redux/actions';
import { Carousel } from 'react-responsive-carousel';
import s from './Carrusel.module.css';
import colombia from '../../asset/countries/colombia.png';
import argentina from '../../asset/countries/argentina.png';
import uruguay from '../../asset/countries/uruguay.png';
import latamcom from '../../asset/logoS.png';
import { getGeoPosition } from '../../redux/actions';

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
		colombia: colombia,
		argentina: argentina,
		uruguay: uruguay,
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
		dispatch(filterByRating(products));
		country.getCurrentPosition(coordenadas, error);
	}, [products, country, coordenadas, dispatch]);
	//console.log(geoloc.slice(-1)[0].toLowerCase());
	return (
		<div className={s.carrusel}>
			<Carousel
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
				dynamicHeight={true}
				emulateTouch={true}
				autoFocus={true}>
				{result.length ? (
					result.slice(0, 10).map((p) => (
						<div>
							<img className={s.img} src={p.image} alt={p.name} />
						</div>
					))
				) : (
					<></>
				)}
				{geoloc.length ? (
					<div>
						<img
							src={countries[geoloc.slice(-1)[0].toLowerCase()]}
							alt={geoloc.slice(-1)}
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
		</div>
	);
}
