import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../../redux/actions";


export const LoginForm = () => {
  const { user, isLoading, loginWithRedirect } = useAuth0();
  const allUser = useSelector((state)=>state.allUsers);
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const usuario = user && allUser.find(u=>u.email === user.email)

    useEffect(() => {
        if(usuario){
            dispatch(getAllUsers(usuario.id))
        }
    }, [usuario])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
    console.log(name)
   }   

  return (
      <div>
        <button onClick={() => loginWithRedirect()}>Google </button>
        <div>
            <div>
                <label>Ingrese su email</label>
            <input 
                    type="text"
                    placeholder="email.."
                  />
                  <label>Ingrese su contraseña</label>
                  <input onChange={(e)=>handleInputChange(e)}
                    type="text"
                    placeholder="password.."
                  />
            </div>
            <button>Let`s get started</button>
        </div>
            
                 
      
    </div>
    )
};