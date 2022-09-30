import React, { useState } from 'react';
import styles from '../../alarm.module.scss';
import { useQuery } from 'react-query';
import { useSelector, } from 'react-redux';
import { getAlarmImagesById } from '@/api/alarm';
import { AlarmImage } from '@/types/Alarm';
import Config from '@/config/network';
import { State as AuthState } from '@/store/reducer/authSlice';


interface Props {
  title?: string;
  time?: string;
  id: number;
  width?: string;
  onClick?: (data?: AlarmImage[]) => void;
}

export default function CardItem(props: Props) {
  const { title, time, id, width, onClick } = props;

  const { token } = useSelector((state: AuthState) => state.auth);

  const { data }: { data?: AlarmImage[] } = useQuery('get-alarm-images' + id, () => getAlarmImagesById(id));

  return (
    <div onClick={() => {if(onClick) onClick(data)}} className={styles.cardItem} style={{ width }}>
      <div className={styles.img}>
        <img
          // height="100%"
          src={data?.length ? `http://${Config.BASE_URL_HOST}${data[0].url}?token=${token}` : ''}
        />
      </div>
      <div className={styles.alarmInfo}>
        <h3>{title}</h3>
        <p>报警时间：{time}</p>
      </div>
    </div>
  )
}
