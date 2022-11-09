import internal from "stream";

export interface SearchDeviceChn {
  offset?: number;
  page?: number;
  limit?: number;
  name?: string;
  region?: number;
  status?: number;
  domain?: string;
  pid?: string;
  alarn?: string;
}

export interface Device {
  id?: string;
  enabled?: int;
  name?: string;
  username: string;
  userpass: string;
  ip: string;
  port: int;
  status?: int;
  memo?: string;
  sw?: string;
  hw?: string;
  algoVer?: string;
  modVer?: string;
  fwVer?: string;
  devType?: string;
  sn?: string;
}
export interface DeviceChn {
  id?: string;
  name: string;
  pid: string;
  region: number;
  domain: string;
  username: string;
  userpass: string;
  ip: string;
  port: number;
  url: string;
  status: string;
  pip: string;
  alarmType: string;
  memo: string;
  devType: string;
  wiperIp: string;
  wiperPort: number;
}
