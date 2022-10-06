import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducer/authSlice";
import { screenSlice } from "./reducer/screenSlice";
import { alarmSlice } from "./reducer/alarmSlice";
import { calcSlice } from "./reducer/calcSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    screen: screenSlice.reducer,
    alarm: alarmSlice.reducer,
    calc: calcSlice.reducer,
  }
})

export default store;
