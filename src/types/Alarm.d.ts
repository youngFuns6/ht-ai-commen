import { CommenSearch } from './Commen';
import { Moment } from 'moment';

export interface SearchAlarm extends CommenSearch {
  start_time?: number | Moment;
  stop_time?: number | Moment;
  device?: number | string;
  priority?: number | string;
  region?: number | string;
  type?: number | string;
  handled?: number | string;
  did?: number | string;
  domain?: string | string;
}

export interface AlarmImage {
  alarm: number;
  dev_ts: number;
  device: string;
  filepath: string;
  id: number;
  index: number;
  ts: number;
  url: string;
}

export interface Alarm {
  boxes: string;
  branch: number;
  break_address: string;
  break_category: string;
  break_level: string;
  break_people: string;
  break_unit: string;
  day: number;
  description: string;
  dev_start: number;
  dev_stop: number;
  device: string;
  device_name: string;
  domain: string;
  face_uuid: string;
  handled: number;
  hour: number;
  id: number;
  image: number;
  lines: string;
  month: number;
  params: string;
  people_count: number;
  person: string;
  pid: string;
  priority: number;
  region: number;
  region_name: string | null;
  remark: string;
  start_time: number;
  stop_time: number;
  type: string;
  unit: string;
  wday: number;
  workshift: number;
  year: number;
  zones: string;
}

export interface AlarmHandle {
  remark: string;
  person: string;
  unit: string;
  handled: number;
}

export interface CustomAlarmCount {
  count: number;
  day: number;
  month: number;
  year: number;
}
