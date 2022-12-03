import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react';
import s from './SuccessedPayment.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createPurchase, getPurchaseDetail } from '../../redux/actions';

const purchaseStruct = (purchase)=>{
    let pStruct={
        products: purchase.data.purchase_units.map((p)=> {
            return p.reference_id
        }),
        totalPrice: JSON.parse(localStorage.getItem("total")),
        idUser: '1',
    }

    return pStruct
}



const SuccessedPayment = (req)=>{
    const search= req.location.search
    const dispatch = useDispatch()
    const purchased = useSelector((state) => state.purchase)
    const created = useSelector((state) => state.createdPurchase)
    
    const currentURL= window.location.href
    try {
        useEffect(()=>{
            dispatch(getPurchaseDetail(search))
        },[created])    

        const handleClick= (e)=>{
            e.preventDefault()
            dispatch(createPurchase(purchaseStruct(purchased)))
            console.log(created);
            localStorage.removeItem('cart')
        }

        return(
            <div className={s.container} >
                <div className={s.card}>
                    <div className={s.topcard}>
                        {!purchased?
                        <img src='https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831' alt='loading'/>:
                        <img src='https://assets.stickpng.com/images/5aa78e207603fc558cffbf19.png' alt='success'
                        className={s.img}/>
                        }
                    </div>
                    <div className={s.buttoncard}>
                        {purchased?
                        <span>Your purchase was successfully complete!{created.hasOwnProperty('id')?(window.location.href='http://localhost:3000/home'):''}</span>:
                        <div className={s.messagge}>
                            <span>Verifiying purchase process...
                            </span>
                            <span className={s.secondMessagge}>If the verifiying takes more than {currentURL} seconds, please refresh the page or try purchase again
                            </span>
                        </div> 
                        }
                    </div>
                </div>
                {purchased?
                <button onClick={(e)=> handleClick(e)}>Return to sparta!!</button>:
                <></>}
            </div>
        )
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
    

    
    
   
}
export default SuccessedPayment