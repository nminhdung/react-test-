import React, { useState } from "react";
import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email/Password is required");
      return;
    }
    let res = await loginApi("eve.holt@reqres.in", password);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
    }
    console.log(res);
  };

  return (
    <div className="login-container col-12 col-sm-4 m-auto ">
      <div className="title">Log in</div>
      <div className="text">Email or Username</div>
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
        Login
      </button>
      <div className="back">
        <i className="fa-solid fa-angles-left"></i>Go back
      </div>
    </div>
  );
};

export default Login;
