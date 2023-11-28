import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading || user) {
    return children;
  }
  return <Navigate to="/signin" replace={true} />;

};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
