import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import s from './LandingPage.module.css';
import img1 from '../../asset/carruselLanding/1.jpg';
import img2 from '../../asset/carruselLanding/2.jpg';
import img3 from '../../asset/carruselLanding/3.jpg';

export default function Carrusel() {
	return (
		<div className={s.carrusel}>
			<Carousel
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
				autoFocus={false}>
				<div>
					<img src={img1} alt='l1' />
				</div>
				<div>
					<img src={img2} alt='2' />
				</div>
				<div>
					<img src={img3} alt='3' />
				</div>
			</Carousel>
		</div>
	);
}
