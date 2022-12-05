import s from './CreateUser.module.css';

const UserSended = ()=>{

    return(
        <div className={s.container}>
            <h2 className={s.message}>
                The user was successfully created
            </h2>
        </div>
    )
}

export default UserSended