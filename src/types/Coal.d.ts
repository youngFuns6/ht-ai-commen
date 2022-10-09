import { CommenSearch } from './Commen';

export interface SearchPatrolPlan extends CommenSearch {
  device?: string;
  type?: string;
}

export interface searchPatrolRecord extends CommenSearch {
  device?: string;
  begin_time?: number;
}

export interface PatrolPlan {
  id?: number;
  device?: string;
  begin_time: number;
  duration: number;
  worker: string;
  type: string;
  name: string;
}

export interface PatrolRecord {
  id: number;
  device: string;
  plan: number;
  worker: string;
  begin_time: number;
  end_time: number;
  start_time: number;
  stop_time: number;
  result: number;
  year: number;
  month: number;
  day: number;
  worker_name: string;
  unit: string;
  phone: string;
  face: string;
  device_name: string;
  device_ip: string;
  type: string;
}

export interface SearchCoalCount {
  id?: string;
  device?: string;
  unit?: number;
  start_time?: number;
  stop_time?: number;
}
