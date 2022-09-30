import React, { useState, } from 'react';
import styles from './pagination.module.scss';
import ToolBtn from '../base/ToolBtn';
import { useSelector } from 'react-redux';
import { State } from '@/store/reducer/screenSlice';

import leftBtn from '@/assets/images/btn/tools/left.png';
import rightBtn from '@/assets/images/btn/tools/right.png';

interface Props {
  total?: number;
  page?: number;
  onChange?: (page: number) => void;
}

export default function Pageination(props: Props) {

  const { total = 0, onChange, page=1 } = props;
  const { count } = useSelector((state: State) => state.screen)

  const togglePage = (type: string) => {
    switch (type) {
      case 'prev':
        if (page <= 1) {
          if (onChange) {
            onChange(1);
          }
        } else {
          if (onChange) {
            onChange(page - 1);
          }
        }
        break;
      case 'next':
        if (1 >= Math.ceil(total / count)) {
          if (onChange) {
            onChange(Math.ceil(total / count));
          }
        } else {
          if (onChange) {
            onChange(page + 1);
          }
        }
        break;
    }
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.left}>
        <ToolBtn disable={page === 1 ? true : false} onClick={() => togglePage('prev')} src={leftBtn} width="32px" height='32px' />
      </div>
      <div className={styles.center}>
        {page}&nbsp;/&nbsp;{Math.ceil(total / count) <= 1 ? 1 : Math.ceil(total / count)}
      </div>
      <div className={styles.right}>
        <ToolBtn disable={page === Math.ceil(total / count) ? true : false} onClick={() => togglePage('next')} src={rightBtn} width="32px" height='32px' />
      </div>
    </div>
  )
}
