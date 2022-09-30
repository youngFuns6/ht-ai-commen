import { CommenSearch } from './Commen';

export interface SearchRecord extends CommenSearch {
  start_time?: number;
  stop_time?: number;
  stop_time?: number;
  device?: string;
}

export interface Record {
  id: number;
  device: number;
  filepath: string;
  recorder: string;
  name: string;
  url: string;
  type: number;
  start_time: number;
  stop_time: number;

}
