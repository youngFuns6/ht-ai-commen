export const defaultScreenCount = 8;

export const LIMIT = 10;

/**
 * react-query key
 */
export const reactQueryKey = {
  /**
   * 获取告警
   */
  getAlarm: "get-alarm",

  /**
   * 获取设备通道
   */
  getDeviceChn: "get-deviceChn",

  /**
   * 获取设备列表
   */
  getDevicesList: "get-devices-list",

  /**
   * 获取算法
   */
  getAlgo: "get-algo",

  /**
   * 获取报警图片
   */
  getAlarmImages: "get-alarm-images",

  /**
   * 获取区域
   */
  getRegion: "get-region",

  /**
   * 自定义统计告警
   */
  getCustomAlarmCount: "get-custom-alarm-count",

  /**
   * 获取巡检计划
   */
  getPatrolPlan: "get-patrol-plan",

  /**
   * 获取巡检结果
   */
  getPatrolRecord: "get-patrol-record",

  /**
   * 获取煤量统计
   */
  getCoalCount: "get-coal-count",

  /**
   * 获取煤量区间合计
   */
  getCoalSection: "get-coal-section",

  /**
   * 获取巡检人员
   */
  getPatrolWorkerList: "get-patrol-worker-list",

  /**
   * 获取角色列表
   */
  getRoleList: "get-role-list",

  /**
   * 获取用户
   */
  getUser: "get-user",
};

/**
 * 事件分类
 */
export const EVENT_TYPE = [
  { type: "XJ_000", name: "巡检分析" },
  { type: "PD_000", name: "皮带分析" },
  { type: "ML_000", name: "煤量分析" },
  { type: "RQ_000", name: "区域入侵" },
  { type: "XW_000", name: "行为监管" },
  { type: "ZC_000", name: "钻场分析" },
  { type: "JL_000", name: "距离监测" },
  { type: "CY_000", name: "超员检测" },
  { type: "HJ_000", name: "环境隐患" },
  { type: "SB_000", name: "设备隐患" },
];

/**
 * 设备分类
 */
export const DEVICE_TYPE: { [key: string]: string }[] = [
  { type: "AiCam_H", name: "AI高速分析相机" },
  { type: "AiCam_L", name: "AI中低速分析相机" },
  { type: "Ai_ARM", name: "AI分析装置" },
  { type: "Ai_GPU", name: "GPU服务器" },
  { type: "Ai_FACE", name: "人脸服务器" },
  { type: "Ai_DZFT", name: "电子封条分析装置" },
];
