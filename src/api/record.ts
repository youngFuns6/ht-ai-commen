import request from "@/utils/http";
import { SearchRecord } from '@/types/Record';

export const getRecord = (searchRecord?: SearchRecord) => {
  return request({
    url: '/record',
    params: searchRecord
  })
}
