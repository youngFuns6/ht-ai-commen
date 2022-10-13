import request from "@/utils/http";
import { QueryRegion, Region } from '@/types/Region';

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

// 添加区域
export const addRegion = (data: Region) => {
  return request({
    url: `/region`,
    method: 'post',
    data
  })
}

// 编辑区域
export const editRegion = (data: Region) => {
  return request({
    url: `/region/${data.id}`,
    method: 'put',
    data
  })
}

// 删除区域
export const deleteRegion = (id: number) => {
  return request({
    url: `/region/${id}`,
    method: 'delete',
  })
}
