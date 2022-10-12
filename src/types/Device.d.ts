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
