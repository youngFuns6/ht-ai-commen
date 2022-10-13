import request from "@/utils/http";
import { Algo, searchAlgo } from '@/types/Algo';

export const getAlgo = (search?: searchAlgo) => {
  return request({
    url: '/algo',
    params: search
  })
}

export const addAlgo = (data: Algo) => {
  return request({
    url: '/algo',
    method: 'post',
    data
  })
}

export const editAlgo = (data: Algo) => {
  return request({
    url: `/algo/${data.id}`,
    method: 'put',
    data
  })
}

export const deleteAlgo = (id: number) => {
  return request({
    url: `/algo/${id}`,
    method: 'delete'
  })
}
