import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './app.module.scss';
import ChildrenNav from '@/components/ChildrenNav';
import useGetCommenList from '@/hooks/useGetCommenList';
import { reactQueryKey } from '@/config/constance';
import { getDevicesChn } from '@/api/device';
import mergePageList from '@/utils/mergePageList';
import { DeviceChn } from '@/types/Device';

export default function AppCom() {

  const location = useLocation();

  // 获取设备通道
  const { data: chnInfo, isFetched: chnIsFetched, hasNextPage: chnHasNexPage, fetchNextPage: chnFetchNextPage } = useGetCommenList([reactQueryKey.getDeviceChn], getDevicesChn, {});

  const onPopupScroll = (type: string, e: React.UIEvent<HTMLElement, UIEvent>) => {
    // console.log(e)
    const h = e.target as HTMLElement;
    if (h.scrollTop + h.offsetHeight >= h.scrollHeight) {
      if (chnHasNexPage) {
        chnFetchNextPage();
      }
    }
  }

  const nav = [
    {
      title: '巡检计划',
      path: '/home/app',
      node: <i className='iconfont icon-jihua' style={{ fontSize: '25px', color: location.pathname === '/home/app' ? 'skyblue' : '#eee' }}></i>
    },
    {
      title: '巡检结果',
      path: '/home/app/result',
      node: <i className='iconfont icon-jianchajieguo' style={{ fontSize: '25px', color: location.pathname === '/home/app/result' ? 'skyblue' : '#eee' }}></i>
    },
    {
      title: '煤量检测',
      path: '/home/app/calcCoal',
      node: <i className='iconfont icon-meikuang' style={{ fontSize: '25px', color: location.pathname === '/home/app/calcCoal' ? 'skyblue' : '#eee' }}></i>
    }
  ] 

  return (
    <div className={styles.appCom}>
      <div className={styles.nav}>
      {
        nav.map(item => (
          <ChildrenNav title={item.title} path={item.path} children={item.node} key={item.path} />
        ))
      }
      </div>
      <div className={styles.content}>
        <Outlet context={{deviceChnArr: mergePageList<DeviceChn>(chnInfo?.pages), onChnScroll: onPopupScroll}} />
      </div>
    </div>
  )
}
