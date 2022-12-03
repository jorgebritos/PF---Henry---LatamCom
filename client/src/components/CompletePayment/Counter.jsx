import React from "react";
import Countdown from "react-countdown"
import s from './SuccessedPayment.module.css'



const renderer=({seconds, completed})=>{
    const handleClick=(e)=>{
        //e.preventDefaul()
        window.location.href = "http://localhost:3000/home"
    }
    if(completed){
        return (
            <div className={s.btndiv}> <button onClick={(e)=> handleClick(e)}className={s.homebtn}> Take me home</button></div>
        )
    }else{
        return(
            <span> If the verifiying takes more than 
                {seconds===1?` ${seconds} second`:` ${seconds} seconds`}, please return to <a href="http://localhost:3000/home" className={s.homelnk}>home</a> page
            </span>
        )
    }
}

const Counter = ()=>{
    
    

    return(
        <span className={s.secondMessagge}>
            <Countdown date={Date.now()+15000} renderer={renderer}/>
        </span>
    )
}

export default Counter