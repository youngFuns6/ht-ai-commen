import request from "@/utils/http";
import { SearchPatrolPlan, PatrolPlan, searchPatrolRecord, SearchCoalCount } from "@/types/Coal";

// 获取巡检计划
export const getPatrolPlan = (search: SearchPatrolPlan) => {
  return request({
    url: '/patrol/plan',
    params: search
  })
}

// 新增巡检计划
export const addPatrolPlan = (data: PatrolPlan) => {
  return request({
    url: '/patrol/plan',
    method: 'post',
    data
  })
} 

// 修改巡检计划
export const editPatrolPlan = (id: number, data: PatrolPlan) => {
  return request({
    url: `/patrol/plan/${id}`,
    method: 'put',
    data
  })
} 

// 删除巡检计划
export const deletePatrolPlan = (id: number) => {
  return request({
    url: `/patrol/plan/${id}`,
    method: 'delete',
  })
} 

// 获取设备巡检结果
export const getPatrolRecord = (search: searchPatrolRecord) => {
  return request({
    url: '/device/patrol/record',
    params: search
  })
}

// 获取巡检人员列表
export const getPatrolWorkerList = () => {
  return request({
    url: '/patrol/worker/worker/list'
  })
}

// 煤量统计
export const getCoalCount = (search: SearchCoalCount) => {
  return request({
    url: search.id ? `/stat/coal/:${search.id}` : '/stat/coal',
    params: {
      unit: search.unit
    }
  })
}

// 煤量合计
export const getCoalAll = (search: SearchCoalCount) => {
  return request({
    url: '/count/coal',
    params: search
  })
}
