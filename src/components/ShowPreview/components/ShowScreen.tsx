import React, { useState, useEffect } from 'react';
import styles from '../showPreview.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '@/store/reducer/screenSlice';
import { changeScreen } from '@/store/reducer/screenSlice';

import count_1 from '@/assets/images/icon/screen_count_1.png';
import count_4 from '@/assets/images/icon/screen_count_4.png';
import count_6 from '@/assets/images/icon/screen_count_6.png';
import count_8 from '@/assets/images/icon/screen_count_8.png';
import count_9 from '@/assets/images/icon/screen_count_9.png';
import count_16 from '@/assets/images/icon/screen_count_16.png';

const countArr = [
  {
    count: 1,
    src: count_1
  },
  {
    count: 4,
    src: count_4
  },
  {
    count: 6,
    src: count_6
  },
  {
    count: 8,
    src: count_8
  },
  {
    count: 9,
    src: count_9
  },
  {
    count: 16,
    src: count_16
  },
]

export default function ShowScreen() {
  const dispatch = useDispatch();
  const { count, full, currentScreen } = useSelector((state: State) => state.screen);
  const [active, setActive] = useState<number>(count);

  const toggleScreen = (count: number) => {
    dispatch(changeScreen({count}));
  }

  return (
    <div className={styles.showScreen}>
      {countArr.map((item) => (
        <div onClick={() => toggleScreen(item.count)} onMouseEnter={() => setActive(item.count)} onMouseLeave={() => setActive(count)} key={item.count} className={styles.box}>
          <img src={active === item.count || count === item.count ? `${item.src.replace('.png', '_ac.png')}` : item.src} alt="" />
        </div>
      ))}
    </div>
  )
}
