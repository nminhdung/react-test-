import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: { email: "", auth: false },
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginContext: (state, action) => {
      const { email, token } = action.payload;
      state.user.email = email;
      state.user.auth = true;
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
    },
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      state.user.email = "";
      state.user.auth = false;
    },
  },
});

export const { loginContext,logout } = AuthSlice.actions;

export default AuthSlice.reducer;
