import request from "@/utils/http";
import { SearchAlarm, AlarmHandle } from '@/types/Alarm'

export const getAlarm = (query: SearchAlarm) => {
  return request({
    url: '/alarm',
    params: query
  })
}

export const getAlarmImagesById = (alarmId: number) => {
  return request({
    url: `/alarm/images/${alarmId}`
  })
}

export const handlerAlarmById = (alarmId: number, handle: AlarmHandle): Promise<any> => {
  return request({
    url: `/alarm/handle/${alarmId}`,
    method: 'put',
    data: handle
  })
}

// 自定义获取告警统计
export const getCustomAlarmCount = (search?: SearchAlarm) => {
  return request({
    url: '/alarm/alarm/count/custom',
    params: search
  })
}
