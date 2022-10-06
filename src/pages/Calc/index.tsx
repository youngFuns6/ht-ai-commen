import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import styles from './calc.module.scss';
import ChildrenNav from '@/components/ChildrenNav';

export default function Calc() {
  const location = useLocation();

  const nav = [
    {
      path: '/home/calc/alarm',
      node: <i className='iconfont icon-baojing' style={{ fontSize: '25px', color: location.pathname === '/home/calc/alarm' ? 'skyblue' : '#eee' }}></i>
    },
    {
      path: '/home/calc/car',
      node: <i className='iconfont icon-cheliangguanli' style={{ fontSize: '25px', color: location.pathname === '/home/calc/car' ? 'skyblue' : '#eee' }}></i>
    }
  ]

  return (
    <>
      {location.pathname === '/home/calc' && <Navigate to='/home/calc/alarm' />}
      <div className={styles.calc}>
        <div className={styles.nav}>
          {nav.map((item, index) => (
            <ChildrenNav path={item.path} key={index}>{item.node}</ChildrenNav>
          ))}
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </>
  )
}
