import { createSlice } from "@reduxjs/toolkit";
import { SearchAlarm } from '@/types/Alarm';

interface SettingState {
  chn: {
    search: {
      page: number;
      limit: number;
    };
    selectedRowKeys: string[];
    form: any;
  }
}

export interface State {
  setting: SettingState;
}

export const settingSlice = createSlice({
  name: "setting",
  initialState: {
    chn: {
      search: {
        page: 1,
        limit: 12
      },
      selectedRowKeys: [],
      form: {

      }
    }
  },
  reducers: {
    changeSetting(state: SettingState, action) {
      state = Object.assign(state, { ...action.payload});
    },
  }
});

export const { changeSetting, } = settingSlice.actions;
