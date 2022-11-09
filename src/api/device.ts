import request from "@/utils/http";
import { SearchDeviceChn, DeviceChn, Device } from '@/types/Device'

export const getDevicesList = () => {
  return request({
    url: 'config/device/device/list',
  })
}

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
export const editDdeviceChn = (id: number | string, deviceChn: DeviceChn) => {
  return request({
    url: `/catalog/device/${id}`,
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

// 添加设备
export const addDdevice = (device: Device) => {
  return request({
    url: `/config/device`,
    method: 'post',
    data: device
  })
}

// 修改设备
export const editDdevice = (id: number | string, device: Device) => {
  return request({
    url: `/config/device/${id}`,
    method: 'put',
    data: device
  })
}

// 删除设备
export const deleteDdevice = (id: number | string) => {
  return request({
    url: `/config/device/${id}`,
    method: 'delete',
  })
}
