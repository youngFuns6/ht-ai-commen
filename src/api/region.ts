import request from "@/utils/http";
import { QueryRegion } from '@/types/Region';

// 搜索区域对象
export const getRegion = (query?: QueryRegion) => {
  return request({
    url: '/region',
    params: query
  })
}

// 获取区域对象
export const getRegionById = (id: string | number) => {
  return request({
    url: `/region/${id}`,
  })
}
