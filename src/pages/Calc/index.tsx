import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './calc.module.scss';
import ChildrenNav from '@/components/ChildrenNav';

export default function Calc() {
  const location = useLocation();

  const nav = [
    {
      title: '报警分析',
      path: '/home/calc',
      node: <i className='iconfont icon-baojing' style={{ fontSize: '25px', color: location.pathname === '/home/calc' ? 'skyblue' : '#eee' }}></i>
    },
    {
      title: '车辆统计',
      path: '/home/calc/car',
      node: <i className='iconfont icon-cheliangguanli' style={{ fontSize: '25px', color: location.pathname === '/home/calc/car' ? 'skyblue' : '#eee' }}></i>
    }
  ]

  return (
    <>
      <div className={styles.calc}>
        <div className={styles.nav}>
          {nav.map((item, index) => (
            <ChildrenNav title={item.title} path={item.path} key={index}>{item.node}</ChildrenNav>
          ))}
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </>
  )
}
