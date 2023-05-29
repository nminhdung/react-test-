import { Alert } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoute = (props) => {
  const { user } = useContext(UserContext);

  if (user && !user.auth) {
    return (
      <>
        <Alert variant="danger" className="mt-3">
          <Alert.Heading>Oh Snap! You got an error</Alert.Heading>
          <p>You dont have permission to access this route</p>
        </Alert>
      </>
    );
  }
//C1 return <Outlet/> 

//C2
  return <>{props.children}</>;
};
export default PrivateRoute;
