import s from "./MessageSended.module.css"

const messageSended = ()=>{
    
    return(
        <div className={s.container}>
            <h2 className={s.message}>
                Your message has been sended 
            </h2>
        </div>
    )
}

export default messageSended