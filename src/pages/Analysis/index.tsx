import React from 'react';
import { useSelector } from 'react-redux';
import ShowPreview from '@/components/ShowPreview';
import ShowDevices from '@/components/ShowDevices';
import { State } from '@/store/reducer/screenSlice';
import styles from './analysis.module.scss';
import AlarmInfo from '@/components/AlarmInfo';

export default function Analysis() {

  const { hiddenLeftBar } = useSelector((state: State) => state.screen);

  return (
    <div className={styles.analysis}>
      <div className={hiddenLeftBar ? styles.hiddenLeft : styles.left}>
        <ShowDevices showPanControl />
      </div>
      <div className={styles.center}>
        <ShowPreview />
      </div>
      <div className={styles.right}>
        <AlarmInfo />
      </div>
    </div>
  )
}
