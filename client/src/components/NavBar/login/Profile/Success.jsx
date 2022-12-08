import s from "./Profile.module.css"

const Success = ()=>{

    return(
        <div className={s.container}>
            <h2 className={s.message}>
                The user was successfully created
            </h2>
        </div>
    )
}
export default Success