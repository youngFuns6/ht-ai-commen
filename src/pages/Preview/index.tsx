import React, {useEffect} from 'react';
import styles from './preview.module.scss';
import ShowDevices from '@/components/ShowDevices';
import ShowPreview from '@/components/ShowPreview';
import { useSelector } from 'react-redux';
import { State } from '@/store/reducer/screenSlice';

export default function Home() {
  
  const { hiddenLeftBar } = useSelector((state: State) => state.screen);

  return (
    <div className={styles.preview}>
      <div className={hiddenLeftBar ? styles.hiddenLeft : styles.left}>
        <ShowDevices />
      </div>
      <div className={styles.right}>
        <ShowPreview />
      </div>
    </div>
  )
}
