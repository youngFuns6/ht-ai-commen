import { configureStore } from "@reduxjs/toolkit";
import { menuSlice } from "./reducer/menuSlice";
import { authSlice } from "./reducer/authSlice";
import { screenSlice } from "./reducer/screenSlice";
import { alarmSlice } from "./reducer/alarmSlice";
import { calcSlice } from "./reducer/calcSlice";
import { appSlice } from "./reducer/appSlice";
import { settingSlice } from "./reducer/settingSlice";

const store = configureStore({
  reducer: {
    menu: menuSlice.reducer,
    auth: authSlice.reducer,
    screen: screenSlice.reducer,
    alarm: alarmSlice.reducer,
    calc: calcSlice.reducer,
    app: appSlice.reducer,
    setting: settingSlice.reducer,
  },
  // middleware: (getDefaultMiddlware) => getDefaultMiddlware({serializableCheck: false})
})

export default store;
