import request from "@/utils/http";
import { SearchDeviceChn, DeviceChn } from '@/types/Device'

// 获取设备通道
export const getDevicesChn = (searchDeviceChn?: SearchDeviceChn) => {
  return request({
    url: '/catalog/device',
    params: searchDeviceChn
  })
}

// 根据id获取通道
export const getDeviceChnById = (id: string) => {
  return request({
    url: `/catalog/device/${id}`,
  })
}

// 修改通道设备
export const editDdeviceChn = (deviceChn: DeviceChn) => {
  return request({
    url: `/catalog/device/${deviceChn.id}`,
    method: 'put',
    data: deviceChn
  })
}

// 删除通道设备
export const deleteDdeviceChn = (id: string) => {
  return request({
    url: `/config/device/${id}`,
    method: 'delete',
  })
}

// 添加通道设备
export const addDdeviceChn = (deviceChn: DeviceChn) => {
  return request({
    url: `/config/device`,
    method: 'post',
    data: deviceChn
  })
}
