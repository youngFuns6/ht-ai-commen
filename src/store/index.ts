import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducer/authSlice";
import { screenSlice } from "./reducer/screenSlice";
import { alarmSlice } from "./reducer/alarmSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    screen: screenSlice.reducer,
    alarm: alarmSlice.reducer,
  }
})

export default store;
