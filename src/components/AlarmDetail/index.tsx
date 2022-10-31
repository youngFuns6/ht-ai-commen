import React, { useEffect, useState, useRef } from 'react';
import { Image, Select, Input, Row, Col } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useSelector, } from 'react-redux';
import moment from 'moment';
import './index.scss';
import ToolBtn from '@/components/base/ToolBtn';
import Player from '@/components/Player';
import FormList from '../FormList';
import { FormListFace } from '@/types/FormList';
import { moving } from '@/utils/scroll';
import { AlarmImage, Alarm, AlarmHandle } from '@/types/Alarm';
import { getAlarmLev } from '@/utils/commen';
import Config from '@/config/network';
import { State as AuthState } from '@/store/reducer/authSlice';
import { Record } from '@/types/Record';
import { reactQueryKey } from '@/config/constance';
import useGetCommenList from '@/hooks/useGetCommenList';
import { getAlgo } from '@/api/algo';

interface Props {
  alarmInfo?: Alarm;
  alarmImgArr?: AlarmImage[];
  isShow?: boolean;
  alarmRecord: Record[];
  onClose?: () => void;
  onSubmit?: (alarmHandle: AlarmHandle) => void;
}

import leftBtn from '@/assets/images/btn/tools/left_btn.png';
import rightBtn from '@/assets/images/btn/tools/right_btn.png';
import commenBtn from '@/assets/images/btn/tools/commen.png';
import commenAcBtn from '@/assets/images/btn/tools/commen_ac.png';

export default function TecAlarm(props: Props) {
  const { alarmInfo, alarmImgArr, isShow, alarmRecord, onClose, onSubmit: formSubmit } = props;
  const { token } = useSelector((state: AuthState) => state.auth);
  const ulRef = useRef<HTMLUListElement>(null);
  const formListRef = useRef<FormInstance>(null);
  const [visible, setVisible] = useState(false);

  // 获取算法
  // const { data: algoInfo, isFetched: algoIsFetched, hasNextPage: algoHasNexPage, fetchNextPage: algoFetchNextPage, refetch } = useGetCommenList([reactQueryKey.getAlgo], getAlgo, {alarm_type: alarmInfo?.type});
  
  const onScroll = (type: string) => {
    scrollAnimation(type);
  }

  // 图片列表滚动
  const scrollAnimation = (type: string) => {
    if (ulRef.current) {
      if (type === 'left') {
        moving(ulRef.current, (ulRef.current.firstChild as HTMLLIElement).offsetWidth, true);
      } else {
        moving(ulRef.current, (ulRef.current.firstChild as HTMLLIElement).offsetWidth, false);
      }
    }
  }

  const formList: FormListFace[] = [
    {
      label: '处理意见',
      name: 'handled',
      initValue: alarmInfo?.handled,
      rules: [{required: true, message: '必填项'}],
      defNode: (
        <Select>
          <Select.Option value={0}>未处理</Select.Option>
          <Select.Option value={1}>已处理</Select.Option>
        </Select>
      )
    },
    {
      label: '责任单位',
      name: 'unit',
      initValue: alarmInfo?.unit,
      rules: [{required: true, message: '必填项'}],
    },
    {
      label: '责任人',
      name: 'person',
      initValue: alarmInfo?.person,
      rules: [{required: true, message: '必填项'}],
    },
    {
      label: '处理说明',
      name: 'remark',
      initValue: alarmInfo?.remark,
      rules: [{required: true, message: '必填项'}],
      defNode: (
        <Input.TextArea />
      )
    },
  ]

// 提交
  const onSubmit = async () => {
    if(!formListRef.current) return;
    const { getFieldsValue, validateFields } = formListRef.current;
    await validateFields();
    if(formSubmit){
      const alarmHandle = getFieldsValue();
      formSubmit(alarmHandle);
    }
  }

  return (
    <>
      {isShow && <div className="tec-alarm-mask">
        <div className='tec-alarm'>
          <h3>告警详情 <i onClick={onClose}>X</i></h3>
          <div className="tec-alarm-wrop">
            <div className='tec-alarm-left'>
              <div className="tec-alarm-lt">
                {/* {alarmRecord.length > 0 && <Player flvUrl={`http://${Config.BASE_URL_HOST}${alarmRecord[0].url}?token=${token}` || ''} />} */}
                {alarmImgArr && alarmImgArr.length > 0 && <Image  src={alarmImgArr![0].url}></Image>}
              </div>
              {/* <div className="tec-alarm-lb">
                <ToolBtn onClick={() => onScroll('left')} native width='30px' height='80px' src={leftBtn} />
                <ul ref={ulRef}>
                  {alarmImgArr?.map(item => (
                    <li key={item.id}>
                      <Image preview={{ visible: false }} onClick={() => setVisible(true)} src={item.url} />
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'none' }}>
                  <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
                    {alarmImgArr?.map(item => (
                      <Image key={item.id} src={item.url} />
                    ))}
                  </Image.PreviewGroup>
                </div>
                <ToolBtn onClick={() => onScroll('right')} native width='30px' height='80px' src={rightBtn} />
              </div> */}
            </div>
            <div className="tec-alarm-right">
              <div className='tec-alarm-rt'>
                <div className='title'>
                  <h4>报警时间：</h4>
                  <p>{moment(alarmInfo?.start_time).format('YYYY-MM-DD HH:mm:ss')}</p>
                </div>
                <div className="content">
                  <p>
                    <span>报警区域：</span>
                    <span>{alarmInfo?.region_name}</span>
                  </p>
                  <p>
                    <span>报警类型：</span>
                    <span>{alarmInfo?.type}</span>
                  </p>
                  <p>
                    <span>报警等级：</span>
                    <span>{getAlarmLev(alarmInfo?.priority)}</span>
                  </p>
                </div>
              </div>
              <div className='tec-alarm-rb'>
                <FormList ref={formListRef} labelSpan={9} wrapperSpan={15} formList={formList} searchForm={false} />
                <Row>
                  <Col offset={9}>
                    <ToolBtn onClick={onSubmit} src={commenBtn} acSrc={commenAcBtn} content='提交' width='80px' height='30px' />
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}
