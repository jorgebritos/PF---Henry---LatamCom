import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { filterByRating } from '../../redux/actions';
import { Carousel } from 'react-responsive-carousel'
import s from './LandingPage.module.css'
import img1 from '../../asset/Logo.png'
import img2 from '../../asset/logoS.png'

export default function Carrusel(){
   
    
    return(
        <div className={s.carrusel}>
            <Carousel showThumbs={false} showArrows={true} showStatus={true} showIndicators={true} infiniteLoop={true} useKeyboardArrows={true} autoPlay={true} stopOnHover={true} swipeable={true} dynamicHeight={true} emulateTouch={true} autoFocus={false}>
                <div>
                    <img src={img1} alt="logo" />
                </div>
                <div>
                    <img src={img2} alt="logoS" />
                </div>
            </Carousel>
        </div>
    )
}