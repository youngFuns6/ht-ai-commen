import request from "@/utils/http";
import { SearchDeviceChn } from '@/types/Device'

export const getDevicesChn = (searchDeviceChn?: SearchDeviceChn) => {
  return request({
    url: '/catalog/device',
    params: searchDeviceChn
  })
}
