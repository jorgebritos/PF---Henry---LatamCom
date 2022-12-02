import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../../redux/actions";
import { useHistory } from "react-router-dom";


export const LoginForm = () => {
  const { user, isLoading, loginWithRedirect } = useAuth0();
  const allUser = useSelector((state)=>state.allUsers);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const history = useHistory();

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
      <h1>LOG IN WITH</h1>
      <div>
        <button onClick={() => loginWithRedirect()}>Google </button>
        <div>
          <h5>Or...</h5>
            <div>
                <label>Enter your email</label>
            <input 
                    type="text"
                    placeholder="email.."
                  />
                  <label>Enter your password</label>
                  <input onChange={(e)=>handleInputChange(e)}
                    type="text"
                    placeholder="password.."
                  />
            </div>
            <button>Let`s get started</button>
            <button onClick={() => history.push("/CreateUser")}>Register</button>
        </div>
    </div>
    </div>
    )
};