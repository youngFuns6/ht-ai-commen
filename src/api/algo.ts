import request from "@/utils/http";
import { searchAlgo } from '@/types/Algo';

export const getAlgo = (search?: searchAlgo) => {
  return request({
    url: '/algo',
    params: search
  })
}
