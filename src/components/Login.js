import React, { useContext, useEffect, useState } from "react";
import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { loginContext } from "../redux/auth/AuthSlice";
import { useDispatch } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { loginContext } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email/Password is required");
      return;
    }
    setLoadingData(true);
    //"eve.holt@reqres.in"
    let res = await loginApi(email.trim(), password);
    console.log(res);
    if (res && res.token) {
      dispatch(loginContext({ email, token: res.token }));
      navigate("/");
    } else {
      //error
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoadingData(false);
  };
  const handlePressEnter = (e) => {
    console.log("Pressed Enter");
    if (e && e.key === "Enter") {
      handleLogin();
    }
  };
  // useEffect(() => {
  //   let token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/");
  //   }
  // }, []);
  return (
    <div className="login-container col-12 col-sm-4 m-auto ">
      <div className="title">Log in</div>
      <div className="text">Email or Username (eve.holt@reqres.in)</div>
      <input
        type="text"
        placeholder="Email or Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="input-hide">
        <input
          type={isShowPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => handlePressEnter(e)}
        />
        <i
          className={
            isShowPassword
              ? "fa-regular fa-eye-slash eye"
              : "fa-regular fa-eye eye"
          }
          onClick={() => setIsShowPassword(!isShowPassword)}
        ></i>
      </div>

      <button
        className={email && password ? "active" : ""}
        disabled={email && password ? false : true}
        onClick={() => handleLogin()}
      >
        {loadingData && <i className="fa-solid fa-sync fa-spin me-1"></i>} Login
      </button>
      <div className="back">
        <i className="fa-solid fa-angles-left"></i>
        <span onClick={() => navigate("/")}>&nbsp;Go back</span>
      </div>
    </div>
  );
};

export default Login;
