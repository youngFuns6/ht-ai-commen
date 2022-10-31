import request from "@/utils/http";
import {
  SearchPatrolPlan,
  PatrolPlan,
  searchPatrolRecord,
  SearchCoalCount,
} from "@/types/Coal";
import moment from "moment";

// 获取巡检计划
export const getPatrolPlan = (search: SearchPatrolPlan) => {
  return request({
    url: "/patrol/plan",
    params: search,
  });
};

// 新增巡检计划
export const addPatrolPlan = (data: PatrolPlan) => {
  return request({
    url: "/patrol/plan",
    method: "post",
    data,
  });
};

// 修改巡检计划
export const editPatrolPlan = (data: PatrolPlan) => {
  return request({
    url: `/patrol/plan/${data.id}`,
    method: "put",
    data,
  });
};

// 删除巡检计划
export const deletePatrolPlan = (id: number) => {
  return request({
    url: `/patrol/plan/${id}`,
    method: "delete",
  });
};

// 获取设备巡检结果
export const getPatrolRecord = (search: searchPatrolRecord) => {
  return request({
    url: "/device/patrol/record",
    params: search,
  });
};

// 获取巡检人员列表
export const getPatrolWorkerList = () => {
  return request({
    url: "/patrol/worker/worker/list",
  });
};

// 煤量统计
export const getCoalCount = (search: SearchCoalCount) => {
  let stop_time;
  // switch (search.unit) {
  //   case 1:
  //     stop_time = new Date(+moment(Date.now()).format('YYYY'), +moment(Date.now()).format('MM')-1).valueOf();
  //     break;
  //   case 2:
  //     stop_time = new Date(
  //       +moment(search.start_time).format("YYYY"),
  //       +moment(search.start_time).format("MM")
  //     ).valueOf();
  //     break;
  //   case 3:
  //     stop_time = search.start_time! + 60 * 60 * 24 * 1000;
  // }
  switch (search.unit) {
    case 1:
      stop_time = Date.now();
      break;
    case 2:
      stop_time = Date.now();
      break;
    case 3:
      stop_time = search.start_time! + 60 * 60 * 24 * 1000;
  }
  return request({
    url: search.id ? `/stat/coal/${search.id}` : "/stat/coal",
    params: {
      unit: search.unit,
      start_time: moment(search.start_time).format("X"),
      stop_time: moment(stop_time).format("X"),
    },
  });
};

// 煤量合计
export const getCoalSection = (search: SearchCoalCount) => {
  return request({
    url: "/count/coal",
    params: search,
  });
};
