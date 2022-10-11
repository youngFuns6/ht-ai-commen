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
export const editDdeviceChn = (id: string, deviceChn: DeviceChn) => {
  return request({
    url: `catalog/device/${id}`,
    data: deviceChn
  })
}
