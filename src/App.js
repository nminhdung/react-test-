import { Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "./App.scss";
import Header from "./components/Header";
import Home from "./components/Home";
import TableUsers from "./components/TableUsers";
import Login from "./components/Login";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import AppRoutes from "./routers/AppRoutes";
import { loginContext } from "./redux/auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  // console.log(user);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(
        loginContext({
          email: localStorage.getItem("email"),
          token: localStorage.getItem("token"),
        })
      );
      // loginContext(
      //   localStorage.getItem("email"),
      //   localStorage.getItem("token")
      // );
    }
  }, []);
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoutes />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
