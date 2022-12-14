import { createSlice } from "@reduxjs/toolkit";
import { SearchAlarm } from '@/types/Alarm';

interface alarmState {
  searchAlarm: SearchAlarm;
}

export interface State {
  alarm: alarmState;
}

export const alarmSlice = createSlice({
  name: "alarm",
  initialState: {
    searchAlarm: {
      start_time: Date.now() - 60 * 60 * 24 * 1000 * 30,
      stop_time: Date.now(),
      priority: '全部',
      device: '全部',
      type: '全部',
      handled: '全部',
      page: 1,
      limit: 8,
    },
  },
  reducers: {
    changeAlarm(state: alarmState, action) {
      state = Object.assign(state, { ...action.payload});
    },
  }
});

export const { changeAlarm, } = alarmSlice.actions;
