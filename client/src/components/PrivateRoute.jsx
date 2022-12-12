import { Redirect, Route } from "react-router";

const PrivateRoute = ({ component: Component, isAllowed, ...rest }) => {
  return (
    <Route {...rest}>{isAllowed ? <Component /> : <Redirect to="/LoginForm" />}</Route>
  );
};

export default PrivateRoute;