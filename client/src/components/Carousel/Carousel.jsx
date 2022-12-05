import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { filterByRating } from '../../redux/actions';
import { Carousel } from 'react-responsive-carousel';
import s from './Carousel.module.css';
import img1 from '../../asset/carruselLanding/1.jpg';
import img2 from '../../asset/carruselLanding/2.jpg';
import img3 from '../../asset/carruselLanding/3.jpg';

export default function Carrusel() {
	return (
		<div className={s.carrusel}>
			<Carousel
				showThumbs={false}
				showArrows={true}
				showStatus={true}
				showIndicators={true}
				infiniteLoop={true}
				useKeyboardArrows={true}
				autoPlay={true}
				stopOnHover={true}
				swipeable={true}
				dynamicHeight={true}
				emulateTouch={true}
				autoFocus={false}>
				<div>
					<img src={img1} alt='logo' />
				</div>
				<div>
					<img src={img2} alt='logoS' />
				</div>
				<div>
					<img src={img3} alt='logoS' />
				</div>
			</Carousel>
		</div>
	);
}
