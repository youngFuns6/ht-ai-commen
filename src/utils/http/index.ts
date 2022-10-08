import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import qs from 'qs';
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { message } from 'antd';
import Config from '@/config/network';
import { getLocationAuth } from "@/utils/locationAuth";

const request = axios.create({
  timeout: 30000,
  baseURL: process.env.NODE_ENV === 'development' ?  `http://${Config.BASE_URL_HOST}/api` : window.location.origin + '/api',
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
})

request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    Nprogress.start();
    if (config.method === 'get') {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    }
    if(getLocationAuth()){
      config.headers!.Authorization = getLocationAuth()!.token as string
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
)

request.interceptors.response.use(
  (config: AxiosResponse) => {
    Nprogress.done();
    // if( config.status >= 200 && config.status <= 300){
    //   if(config.data && config.config.method !== 'get'){
    //     message.success(config.data.message || '操作成功');
    //   }
    // }
    return config.data;
  },
  (error: AxiosError) => {
    Nprogress.done();
    if(error.response?.status === 401){
      window.location.href = window.location.origin + '/login';
      message.error('登陆已失效，请重新登录');
    }else {
      if(error.response?.config && error.response?.config?.method !== 'get'){
        message.error((error.response?.data as any)?.message || '未知错误');
      }
    }
    return Promise.reject(error);
  }
)

export default request;
