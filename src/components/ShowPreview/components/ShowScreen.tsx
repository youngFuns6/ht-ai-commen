import React, { useState, useEffect } from 'react';
import styles from '../showPreview.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '@/store/reducer/screenSlice';
import { changeScreen } from '@/store/reducer/screenSlice';

import count_1 from '@/assets/images/icon/screen_count_1.png';
import count_1_ac from '@/assets/images/icon/screen_count_1_ac.png';
import count_4 from '@/assets/images/icon/screen_count_4.png';
import count_4_ac from '@/assets/images/icon/screen_count_4_ac.png';
import count_6 from '@/assets/images/icon/screen_count_6.png';
import count_6_ac from '@/assets/images/icon/screen_count_6_ac.png';
import count_8 from '@/assets/images/icon/screen_count_8.png';
import count_8_ac from '@/assets/images/icon/screen_count_8_ac.png';
import count_9 from '@/assets/images/icon/screen_count_9.png';
import count_9_ac from '@/assets/images/icon/screen_count_9_ac.png';
import count_16 from '@/assets/images/icon/screen_count_16.png';
import count_16_ac from '@/assets/images/icon/screen_count_16_ac.png';

const countArr = [
  {
    count: 1,
    src: count_1,
    acSrc: count_1_ac
  },
  {
    count: 4,
    src: count_4,
    acSrc: count_4_ac
  },
  {
    count: 6,
    src: count_6,
    acSrc: count_6_ac
  },
  {
    count: 8,
    src: count_8,
    acSrc: count_8_ac
  },
  {
    count: 9,
    src: count_9,
    acSrc: count_9_ac
  },
  {
    count: 16,
    src: count_16,
    acSrc: count_16_ac
  },
]

export default function ShowScreen() {
  const dispatch = useDispatch();
  const { count, full, currentScreen } = useSelector((state: State) => state.screen);
  const [active, setActive] = useState<number>(count);

  const toggleScreen = (count: number) => {
    dispatch(changeScreen({count, page: 1}));
  }

  return (
    <div className={styles.showScreen}>
      {countArr.map((item) => (
        <div onClick={() => toggleScreen(item.count)} onMouseEnter={() => setActive(item.count)} onMouseLeave={() => setActive(count)} key={item.count} className={styles.box}>
          <img src={active === item.count || count === item.count ? item.acSrc : item.src} alt="" />
        </div>
      ))}
    </div>
  )
}
