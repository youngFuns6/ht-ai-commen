import { CommenSearch } from './Commen';

export interface searchAlgo extends CommenSearch {
  event_type?: string;
  alarm_type?: string;
}

export interface Algo {
  alarm_type: string;
  alarm_type_code: string;
  alarm_voice_text: string;
  desc: string;
  event_type: string;
  id: number;
  memo: string;
}
