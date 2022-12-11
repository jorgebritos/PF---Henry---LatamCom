import { Redirect, Route } from "react-router";
import { useSelector, useDispatch} from 'react-redux';
import {authTokenRouterLog, setUserData, } from '../redux/reducer'
import { useAuth0 } from '@auth0/auth0-react';


//Simular Autenticación
let auth;
// auth = true;
// auth = null;

const PrivateRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();
    const userNow = useSelector((state) => state.user);
    let { logout, isAuthenticated, user } = useAuth0();
    

  return (
    <Route {...rest}>{auth ? <Component /> : <Redirect to="/LoginForm" />}</Route>
  );
};

export default PrivateRoute;