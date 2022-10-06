import { createSlice } from "@reduxjs/toolkit";
import { SearchAlarm } from '@/types/Alarm';

interface CalcState {
  searchAlarm: SearchAlarm;
  chartType: string;
}

export interface State {
  calc: CalcState;
}

export const calcSlice = createSlice({
  name: "calc",
  initialState: {
    searchAlarm: {
      start_time: Date.now() - 60 * 60 * 24 * 1000 * 30,
      stop_time: Date.now(),
      region: '全部',
      device: '全部',
      domain: '全部',
      type: '全部',
      priority: '全部',
      handled: '全部',
    },
    chartType: 'line',
  },
  reducers: {
    changeCalc(state: CalcState, action) {
      state = Object.assign(state, { ...action.payload});
    },
  }
});

export const { changeCalc, } = calcSlice.actions;
