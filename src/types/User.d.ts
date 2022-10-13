import { CommenSearch } from './Commen';

export interface User {
  username: string;
  password?: string;
  token?: string | number;
}

export interface UserInfo {
  id?: number;
  created?: string;
  email?: string;
  enabled?: number;
  logged?: string;
  memo?: string;
  mobile?: string;
  name?: string;
  org?: number;
  role?: string;
  sex?: number;
  updated?: string;
  username?: string;
  password?: string;
}

export interface SearchUser extends CommenSearch {
  name?: string;
}

export interface Role {
  id: string;
  memo: string;
  name: string;
}
