import { createSlice } from "@reduxjs/toolkit";
import { defaultScreenCount } from '@/config/constance';
import { DeviceChn } from '@/types/Device';

interface screenState {
  count: number;
  currentScreen: number;
  full: boolean;
  page: number;
  selectRegionId: number | null;
  chnListByRegion: DeviceChn[] | undefined[];
  hiddenLeftBar: boolean;
  hiddenPreviewList: boolean;
  panControlSelect: number;
  // screenPlayer: {channelId: number | undefined, name: string | undefined}[];
}

export interface State {
  screen: screenState;
}

export const screenSlice = createSlice({
  name: "screen",
  initialState: {
    count: defaultScreenCount,
    full: false,
    currentScreen: 0,
    page: 1,
    selectRegionId: null,
    chnListByRegion: [],
    hiddenLeftBar: false,
    hiddenPreviewList: false,
    panControlSelect: 0,
    // screenPlayer: Array.from({ length: 16 })
  },
  reducers: {
    changeScreen(state: screenState, action) {
      state = Object.assign(state, { ...action.payload})
      // state.count = action.payload.count;
      // state.currentScreen = action.payload.currentScreen;
      // state.full = action.payload.full;
      // state.page = action.payload.page;
      // state.selectRegion = action.payload.selectRegion;
    },
  }
});

export const { changeScreen, } = screenSlice.actions;
