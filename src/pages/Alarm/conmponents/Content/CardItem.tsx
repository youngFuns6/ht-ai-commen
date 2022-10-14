import React, { useEffect, useState } from 'react';
import styles from '../../alarm.module.scss';
import { useQuery } from 'react-query';
import { useSelector, } from 'react-redux';
import { getAlarmImagesById } from '@/api/alarm';
import { AlarmImage } from '@/types/Alarm';
import { Boxes, Zones } from '@/types/Alarm';
import Config from '@/config/network';
import { State as AuthState } from '@/store/reducer/authSlice';
import { reactQueryKey } from '@/config/constance';
import { drawAlarmImage } from '@/utils/drawLines';


interface Props {
  title?: string;
  time?: string;
  id: number;
  width?: string;
  zones?: string;
  boxes?: string;
  onClick?: (data?: AlarmImage[]) => void;
}

export default function CardItem(props: Props) {
  const { title, time, id, width, onClick, zones, boxes } = props;

  const { token } = useSelector((state: AuthState) => state.auth);

  const [alarmImages, setAlarmImages] = useState<AlarmImage[]>([]);

  const { data }: { data?: AlarmImage[] } = useQuery(reactQueryKey.getAlarmImages + id, () => getAlarmImagesById(id));

  useEffect(() => {
    if(zones && boxes && data){
      data.forEach(item => {
        drawAlarmImage(`http://${Config.BASE_URL_HOST}${item.url}?token=${token}`, JSON.parse(zones), JSON.parse(boxes), 'yellow', 'red', 2).then(src => {
        setAlarmImages([...alarmImages, {...item, url: src}]);
      })
      })
    }
  }, [data])

  return (
    <div onClick={() => {if(onClick) onClick(alarmImages)}} className={styles.cardItem} style={{ width }}>
      <div className={styles.img}>
        <img
          // height="100%"
          src={data?.length ? alarmImages[0]?.url : ''}
        />
      </div>
      <div className={styles.alarmInfo}>
        <h3>{title}</h3>
        <p>报警时间：{time}</p>
      </div>
    </div>
  )
}
