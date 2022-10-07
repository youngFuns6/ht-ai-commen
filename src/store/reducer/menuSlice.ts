import { createSlice } from "@reduxjs/toolkit";
import { SearchAlarm } from '@/types/Alarm';

import previewBtn from '@/assets/images/btn/preview.png';
import previewBtnActive from '@/assets/images/btn/preview_active.png';
import analysis from '@/assets/images/btn/analysis.png';
import analysisActive from '@/assets/images/btn/analysis_active.png';
import alarm from '@/assets/images/btn/alarm.png';
import alarmActive from '@/assets/images/btn/alarm_active.png';
import calc from '@/assets/images/btn/calc.png';
import calcActive from '@/assets/images/btn/calc_active.png';
import app from '@/assets/images/btn/app.png';
import appActive from '@/assets/images/btn/app_active.png';
import setting from '@/assets/images/btn/setting.png';
import settingActive from '@/assets/images/btn/setting_active.png';

interface menuState {
  menu: Array<{
    key: string;
    btn: string;
    activeBtn: string;
  }>;
}

export interface State {
  menu: menuState;
}

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menu: [
      { key: '/home/preview', btn: previewBtn, activeBtn: previewBtnActive },
      { key: '/home/analysis', btn: analysis, activeBtn: analysisActive },
      { key: '/home/alarm', btn: alarm, activeBtn: alarmActive },
      { key: '/home/calc', btn: calc, activeBtn: calcActive },
      { key: '/home/app', btn: app, activeBtn: appActive },
      { key: '/home/setting', btn: setting, activeBtn: settingActive },
    ],
  },
  reducers: {
    changeMenu(state: menuState, action) {
      state = Object.assign(state, { ...action.payload});
    },
  }
});

export const { changeMenu, } = menuSlice.actions;
