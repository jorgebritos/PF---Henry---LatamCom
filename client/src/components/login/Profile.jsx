import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import {  useEffect } from "react";
import { getAllUsers } from "../../redux/actions";

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const allUser = useSelector((state)=>state.getAllUsers.allUsers);



  const usuario = user && allUser.find(u=>u.email === user.email)

  const dispatch = useDispatch();
  useEffect(() => {
	  if(usuario){
		  dispatch(getAllUsers(usuario.id))
		//   dispatch(userAddressesA(usuario.id))
		//   dispatch(getUserReviews(usuario.id))
	  }
  }, [usuario])


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated && (
      <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
    )
  );
};