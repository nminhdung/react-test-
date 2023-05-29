import { Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../components/Home";
import TableUsers from "../components/TableUsers";
import Login from "../components/Login";
import PrivateRoute from "./PrivateRoute";
import { NotFound } from "../components/NotFound";

const AppRoutes = () => {
  return (
    <>
      {" "}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/*C1  <Route path='/users' exact element={<PrivateRoute/>}>
            <Route exact path="/users" element={<TableUsers/>}/>
        </Route> */}
       
        {/* //C2 */}
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <TableUsers />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
};

export default AppRoutes;
