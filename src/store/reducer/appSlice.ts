import { createSlice } from "@reduxjs/toolkit";
import { SearchPatrolPlan, PatrolPlan, searchPatrolRecord, SearchCoalCount, SearchSectionCount } from '@/types/Coal';
import moment from 'moment';

interface planState {
  searchPatrolPlan: SearchPatrolPlan;
  patrolPlan: PatrolPlan;
  selectedRowKeys: number[];
  searchPatrolResult: searchPatrolRecord;
  searchCoalCount: SearchCoalCount;
  chartType: string;
  searchSectionCount: SearchSectionCount;
}

export interface State {
  app: planState;
}

export const appSlice = createSlice({
  name: "app",
  initialState: {
    searchPatrolPlan: {
      device: '全部',
      type: '全部',
      page: 1,
      limit: 12
    },
    patrolPlan: {
      type: 'XJ_001',
      name: '',
      begin_time: null,
      duration: null,
      device: '',
      worker: ''
    },
    selectedRowKeys: [],
    searchPatrolResult: {
      device: '全部',
      start_time: Date.now() -  60 * 60 * 24 * 1000 * 30,
      page: 1,
      limit: 12
    },
    searchCoalCount: {
      id: '全部',
      unit: 2,
      start_time: new Date(+moment(Date.now()).format('YYYY'), +moment(Date.now()).format('MM')-1).valueOf()
    },
    chartType: 'line',
    searchSectionCount: {
      start_time: Date.now() - 60 * 60 * 24 * 1000,
      stop_time: Date.now(),
      device: '全部'
    }
  },
  reducers: {
    changeApp(state: planState, action) {
      state = Object.assign(state, { ...action.payload});
    },
  }
});

export const { changeApp, } = appSlice.actions;
