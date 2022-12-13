import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  function removeItems() {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("loggedUserJWT");
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("cart");
    // localStorage.removeItem("cart");
    logout({ returnTo: window.location.origin }
  }
  return (
    <button onClick={(e) => removeItems()}>
      Logout
    </button>
  );
};