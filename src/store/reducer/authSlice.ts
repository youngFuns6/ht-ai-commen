import { createSlice } from "@reduxjs/toolkit";
import { setLocationAuth, getLocationAuth, removeLocationAuth } from "@/utils/locationAuth";

interface AuthState {
  username: string;
  password: string;
  token: string | number | null;
  isLogged: boolean;
  remember: false;
}

export interface State {
  auth: AuthState;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: getLocationAuth() ? getLocationAuth() : {
    isLogged: false,
    token: null,
    username: '',
    password: '',
    remember: false
  },
  reducers: {
    loginRdc(state: AuthState, action) {
      state.isLogged = true;
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.remember = action.payload.remember;
      setLocationAuth(state);
    },
    logoutRdc(state: AuthState) {
      state.isLogged = false;
      state.token = null;
      state.username = '';
      state.password = '';
      state.remember = false;
      removeLocationAuth();
    }
  }
});

export const {
  loginRdc,
  logoutRdc } = authSlice.actions;
