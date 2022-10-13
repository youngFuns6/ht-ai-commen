import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './setting.module.scss';
import ChildrenNav from '@/components/ChildrenNav';
import ToolBtn from '@/components/base/ToolBtn';

import chnBtn from '@/assets/images/btn/set_chn.png';
import regionBtn from '@/assets/images/btn/set_region.png';
import userBtn from '@/assets/images/btn/set_user.png';
import sysBtn from '@/assets/images/btn/set_sys.png';
import algoBtn from '@/assets/images/btn/set_algo.png';
import transmissionBtn from '@/assets/images/btn/set_transmission.png';

const nav = [
  {
    path: '/home/setting',
    node: <ToolBtn showActive path='/home/setting' width='100%' src={chnBtn} />
  },
  {
    path: '/home/setting/region',
    node: <ToolBtn showActive path='/home/setting/region' width='100%' src={regionBtn} />
  },
  {
    path: '/home/setting/user',
    node: <ToolBtn showActive path='/home/setting/user' width='100%' src={userBtn} />
  },
  {
    path: '/home/setting/sys',
    node: <ToolBtn showActive path='/home/setting/sys' width='100%' src={sysBtn} />
  },
  {
    path: '/home/setting/algo',
    node: <ToolBtn showActive path='/home/setting/algo' width='100%' src={algoBtn} />
  },
  {
    path: '/home/setting/seriaNet',
    node: <ToolBtn showActive path='/home/setting/seriaNet' width='100%' src={transmissionBtn} />
  }
] 

export default function Setting() {

  return (
    <div className={styles.setting}>
      <div className={styles.left}>
        {nav.map(item => (
          <ChildrenNav key={item.path} path={item.path}>{item.node}</ChildrenNav>
        ))}
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
