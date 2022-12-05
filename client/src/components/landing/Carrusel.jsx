import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { filterByRating } from '../../redux/actions';
import { Carousel } from 'react-responsive-carousel'
import s from './LandingPage.module.css'

// Para usar este componente procurar asegurarse de enviar
// la lista completa de los productos desde el componente
// que se invoque, si se desea que se muestren la imagenes  
// en un tamaño pequeño cambiar showThumbs={true}

export default function Carrusel({products}){
    const dispatch= useDispatch()
    const result = useSelector((state => state.filRating))

    useEffect(()=>{
        dispatch(filterByRating(products))
    },[])
    console.log(result);
    return(
        <div className={s.carrusel}>
            <Carousel showThumbs={false} showArrows={true} showStatus={true} showIndicators={true} infiniteLoop={true} useKeyboardArrows={true} autoPlay={true} stopOnHover={true} swipeable={true} dynamicHeight={true} emulateTouch={true} autoFocus={false}>
                {result.length?result.slice(0,10).map((p)=>(
                    <div>
                        <img src={p.image} alt={p.name} />
                        <p className='legend'>{p.name}</p>
                    </div>
                )):<></>}
            </Carousel>
        </div>
    )
}