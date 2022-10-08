import { createSlice } from "@reduxjs/toolkit";
import { SearchPatrolPlan, PatrolPlan, SearchPatrolResult } from '@/types/Coal';

interface planState {
  searchPatrolPlan: SearchPatrolPlan;
  patrolPlan: PatrolPlan;
  searchPatrolResult: SearchPatrolResult;
}

export interface State {
  app: planState;
}

export const appSlice = createSlice({
  name: "app",
  initialState: {
    searchPatrolPlan: {
      device: '全部',
      type: '全部'
    },
    patrolPlan: {
      type: 'XJ_001',
      name: '',
      begin_time: 0,
      duration: 0,
      device: '',
      worker: ''
    },
    searchPatrolResult: {
      device: '全部',
      begin_time: Date.now()
    }
  },
  reducers: {
    changePatrolPlan(state: planState, action) {
      state = Object.assign(state, { ...action.payload});
    },
  }
});

export const { changePatrolPlan, } = appSlice.actions;
