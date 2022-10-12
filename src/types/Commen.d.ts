import { DeviceChn } from "./Device";

export interface CommenSearch {
  offset?: number;
  page?: number;
  limit?: number;
}

export interface ChnContext { 
  deviceChnArr: DeviceChn[]; 
  onChnScroll: Function;
}
