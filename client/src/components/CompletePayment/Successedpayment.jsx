import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react';
import s from './SuccessedPayment.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createPurchase, getPurchaseDetail } from '../../redux/actions';



const SuccessedPayment = (req)=>{
    const search= req.location.search
    const dispatch = useDispatch()
    const purchased = useSelector((state) => state.purchase)
    const [purchaseInfo, setPurchaseInfo] = useState({
        products:[],
        totalPrice:0,
        idUser:0,
    })
    try {
        useEffect(()=>{
            dispatch(getPurchaseDetail(search))
        },[])    
    } catch (error) {
        return(
            <div className={s.container} >
                <div className={s.card}>
                    <div className={s.topcard}>
                    <img src='https://cdn-icons-png.flaticon.com/512/42/42901.png' alt='error'/>
                    </div>
                    <div className={s.buttoncard}>An error interrupted the transaction, please try later.</div>
                </div>
            </div>
        )
    }
    

    
    
    return(
        <div className={s.container} >
            <div className={s.card}>
                <div className={s.topcard}>
                {!purchased?
                <img src='https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831' alt='loading'/>:
                <img src='https://assets.stickpng.com/images/5aa78e207603fc558cffbf19.png' alt='success'
                className={s.img}/>}
                </div>
                <div className={s.buttoncard}>{purchased?
                <span>Your purchase was successfully complete!</span>:
                <span>Verifiying purchase process...</span> }</div>
            </div>
        </div>
    )
}
export default SuccessedPayment