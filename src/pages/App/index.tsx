import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './app.module.scss';
import ChildrenNav from '@/components/ChildrenNav';

export default function AppCom() {

  const location = useLocation();

  const nav = [
    {
      path: '/home/app',
      node: <i className='iconfont icon-jihua' style={{ fontSize: '25px', color: location.pathname === '/home/app' ? 'skyblue' : '#eee' }}></i>
    },
    {
      path: '/home/app/result',
      node: <i className='iconfont icon-jianchajieguo' style={{ fontSize: '25px', color: location.pathname === '/home/app/result' ? 'skyblue' : '#eee' }}></i>
    },
    {
      path: '/home/app/calcCoal',
      node: <i className='iconfont icon-meikuang' style={{ fontSize: '25px', color: location.pathname === '/home/app/calcCoal' ? 'skyblue' : '#eee' }}></i>
    }
  ]
  

  return (
    <div className={styles.appCom}>
      <div className={styles.nav}>
      {
        nav.map(item => (
          <ChildrenNav path={item.path} children={item.node} key={item.path} />
        ))
      }
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
