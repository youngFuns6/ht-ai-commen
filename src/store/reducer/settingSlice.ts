import { createSlice } from "@reduxjs/toolkit";
import { SearchAlarm } from "@/types/Alarm";

export interface Commen {
  search?: {
    page: number;
    limit: number;
  };
  selectedRowKeys: number[] & string[];
  form: any;
}

interface SettingState {
  activeTabKey: string;
  device: Commen;
  chn: Commen;
  region: Commen;
  user: Commen;
  sys: {
    targetKeys: string[];
    selectedKeys: string[];
    vol: number;
    enableVol: boolean;
  };
  algo: Commen;
}

export interface State {
  setting: SettingState;
}

export const settingSlice = createSlice({
  name: "setting",
  initialState: {
    activeTabKey: "0",
    device: {
      selectedRowKeys: [],
      form: {},
    },
    chn: {
      search: {
        page: 1,
        limit: 12,
      },
      selectedRowKeys: [],
      form: {},
    },
    region: {
      search: {
        page: 1,
        limit: 12,
      },
      selectedRowKeys: [],
      form: {},
    },
    user: {
      search: {
        page: 1,
        limit: 12,
      },
      selectedRowKeys: [],
      form: {},
    },
    sys: {
      targetKeys: [],
      selectedKeys: [],
      vol: 0,
      enableVol: true,
    },
    algo: {
      search: {
        page: 1,
        limit: 12,
      },
      selectedRowKeys: [],
      form: {},
    },
  },
  reducers: {
    changeSetting(state: SettingState, action) {
      state = Object.assign(state, { ...action.payload });
    },
  },
});

export const { changeSetting } = settingSlice.actions;
