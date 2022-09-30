interface ChnInfo {
  alarmType: string;
  chnId: string;
  enable: number;
  eventType: string;
  ipcIp: string;
  ipcPassword: string;
  ipcUser: string;
  online: number;
  preview: number;
  streamUrl: string;
  wiperIp: string;
  wiperPort: number;
}

export enum MessgeType {
  REQUEST = 'request',
  RESPONSE = 'response',
  NOTICE = 'notice'
}

export interface DevicesInfo {
  body?: {
    algoVer: string;
    chnInfo: ChnInfo[];
    devId: string;
    devType: string;
    fwVer: string;
    hw: string;
    modVer: string;
    sn: string;
    sw: string;
  };

  code?: number;
  method: string;
  seq: number;
  type: MessgeType;
}

export interface Boxes {
  name: string;
  Score: number;
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
}
export interface Zones {
  x: number;
  y: number;
}

export interface drawInfo {
  src?: string;
  alarmGrade: number;
  alarmImageId?: string;
  alarmType?: string;
  boxes?: Boxes[];
  cardId?: number;
  chnId?: string;
  desc?: string;
  osd?: string;
  peopleCount?: number;
  startTime?: string;
  steps?: number;
  stopTime?: string;
  zones?: Array<Zones[]>
}

export enum METHOD {
  /** 获取设备信息 */
  GetDeviceInfo = 'GetDeviceInfo',
  /** 获取外部控制参数 */
  GetExternalParam = 'GetExternalParam',
  SetExternalParam = 'SetExternalParam',
  /** 获取报警输出动作 */
  GetAlarmOut = 'GetAlarmOut',
  SetAlarmOut = 'SetAlarmOut',
  /** 获取报警区域/警戒线 */
  GetZoneParam = 'GetZoneParam',
  SetZoneParam = 'SetZoneParam',
  /**获取报警信息 */
  GetAlarmInfo = 'GetAlarmInfo',
  SetAlarmInfo = 'SetAlarmInfo',
}

