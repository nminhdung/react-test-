import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import LogoApp from "../assets/images/logo.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { logout } from "../redux/auth/AuthSlice";

import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hideHeader, setHideHeader] = useState(false);
  const user = useSelector((state) => state.auth.user);
  // console.log(user);
  // const { logout, user } = useContext(UserContext);
  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Log out success");
  };
  // useEffect(() => {
  //   if (window.location.pathname === "/login") {
  //     setHideHeader(true);
  //   }
  // }, [user.auth]);
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center gap-1">
          <img
            src={LogoApp}
            width="30"
            height="30"
            className="rounded d-inline-block"
            alt="logo app"
          />
          <span>Manage App</span>{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {((user && user.auth) || window.location.pathname === "/") && (
            <>
              <Nav className="me-auto">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>

                <NavLink to="/users" className="nav-link">
                  Manage Users
                </NavLink>
              </Nav>
              <Nav>
                {user && user.email && (
                  <span className="nav-link">Welcome {user.email}</span>
                )}
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  {user && user.auth === true ? (
                    <NavDropdown.Item onClick={() => handleLogOut()}>
                      Logout
                    </NavDropdown.Item>
                  ) : (
                    <NavLink to="/login" className="dropdown-item">
                      Log in
                    </NavLink>
                  )}
                </NavDropdown>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
