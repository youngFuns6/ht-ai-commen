import React, { useRef } from 'react';
import styles from '../calc.module.scss';
import { Select, DatePicker, Col, Row } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import TextBar from '@/components/base/TextBar';
import FormList from '@/components/FormList';
import ToolBtn from '@/components/base/ToolBtn';
import Chart from './Chart';
import { FormListFace } from '@/types/FormList';
import { DeviceChn } from '@/types/Device';
import { Algo } from '@/types/Algo';
import { Region } from '@/types/Region';
import { CustomAlarmCount } from '@/types/Alarm';
import { ALARM_LEV, HANDLER_STATUS } from '@/pages/Alarm/data';
import useGetCommenList from '@/hooks/useGetCommenList';
import { reactQueryKey } from '@/config/constance';
import { getAlgo } from '@/api/algo';
import { getDevicesChn } from '@/api/device';
import { getRegion } from '@/api/region';
import { getCustomAlarmCount } from '@/api/alarm';
import mergePageList from '@/utils/mergePageList';
import { changeCalc, State as CalcState } from '@/store/reducer/calcSlice';
import { fillterQuery } from '@/utils/commen';

import dataQuery from '@/assets/images/text/data_query.png';
import commenBtn from '@/assets/images/btn/tools/commen.png'
import chartCircleBtn from '@/assets/images/btn/tools/chart_circle.png'
import chartLineBtn from '@/assets/images/btn/tools/chart_line.png'
import calcBar from '@/assets/images/text/calc.png'
import { useQuery } from 'react-query';

export default function AlarmCalc() {
  const formRef = useRef<FormInstance>(null);
  const dispatch = useDispatch();
  const { searchAlarm, chartType, } = useSelector((state: CalcState) => state.calc);

  const { data: chnInfo, isFetched: chnIsFetched, hasNextPage: chnHasNexPage, fetchNextPage: chnFetchNextPage } = useGetCommenList([reactQueryKey.getDeviceChn], getDevicesChn, {});

  const { data: algo, isFetched: algoIsFetched, hasNextPage: algoHasNexPage, fetchNextPage: algoFetchNextPage } = useGetCommenList(reactQueryKey.getAlgo, getAlgo, {});

  // 获取区域信息
  const { data: regionInfo, isFetched: regionIsFetched, hasNextPage: regionHasNextPage, fetchNextPage: regionFetchNextPage } = useGetCommenList(reactQueryKey.getRegion, getRegion, {});

  // 获取分类告警数量
  const { data: countAlarmInfo, isFetched: countAlarmIsfetched, }: any = useQuery([reactQueryKey.getCustomAlarmCount, searchAlarm], () => getCustomAlarmCount(fillterQuery(searchAlarm, '全部')));

  const onPopupScroll = (type: string, e: React.UIEvent<HTMLElement, UIEvent>) => {
    // console.log(e)
    const h = e.target as HTMLElement;
    if (h.scrollTop + h.offsetHeight >= h.scrollHeight) {
      switch (type) {
        case 'chn':
          if (chnHasNexPage) {
            chnFetchNextPage();
          }
          break;
        case 'algo':
          if (algoFetchNextPage) {
            algoFetchNextPage();
          }
          break;
        case 'region':
          if (regionHasNextPage) {
            regionFetchNextPage();
          }
          break;
      }
    }
  }

  // 查询
  const onQuery = () => {
    // console.log(formRef.current?.getFieldsValue());
    if (!formRef.current) return;
    const { getFieldsValue, getFieldValue } = formRef.current;
    const query = getFieldsValue();
    dispatch(changeCalc({ searchAlarm: { ...query, start_time: getFieldValue('start_time').valueOf(), stop_time: getFieldValue('stop_time').valueOf() } }));
  }

  const formList: FormListFace[] = [
    {
      label: '开始时间',
      name: 'start_time',
      defNode: (
        <DatePicker />
      )
    },
    {
      label: '结束时间',
      name: 'stop_time',
      defNode: (
        <DatePicker />
      )
    },
    {
      label: '报警区域',
      name: 'region',
      defNode: (
        <Select onPopupScroll={(e) => onPopupScroll('region', e)} options={regionIsFetched ? [{ label: '全部', value: '', key: 'null' }, ...mergePageList<Region>(regionInfo!.pages).map(item => ({ label: item.name, value: item.id, key: item.id }))] : []} />
      )
    },
    {
      label: '所属通道',
      name: 'device',
      defNode: (
        <Select onPopupScroll={(e) => onPopupScroll('chn', e)} options={chnIsFetched ? [{ label: '全部', value: '', key: 'null' }, ...mergePageList<DeviceChn>(chnInfo!.pages).map(item => ({ label: item.id, value: item.id, key: item.id }))] : []} />
      )
    },
    {
      label: '事件类型',
      name: 'domain',
      defNode: (
        <Select onPopupScroll={(e) => onPopupScroll('algo', e)} options={algoIsFetched ? [{ label: '全部', value: '', key: 'null' }, ...mergePageList<Algo>(algo!.pages).map(item => ({ label: item.event_type, value: item.event_type, key: item.id }))] : []} />
      )
    },
    {
      label: '报警类型',
      name: 'type',
      defNode: (
        <Select options={HANDLER_STATUS} />
      )
    },
    {
      label: '报警等级',
      name: 'priority',
      defNode: (
        <Select options={ALARM_LEV} />
      )
    },
    {
      label: '处理状态',
      name: 'handled',
      defNode: (
        <Select options={HANDLER_STATUS} />
      )
    },
  ]

  return (
    <div className={styles.alarmCalc}>
      <div className={styles.left}>
        <h3>报警分析</h3>
        <TextBar src={dataQuery} width='250px' height='20px' />
        <div className={styles.queryForm}>
          <FormList initialValues={{ ...searchAlarm, start_time: moment(searchAlarm.start_time), stop_time: moment(searchAlarm.stop_time) }} ref={formRef} formList={formList} col={{ span: 24 }} labelSpan={6} wrapperSpan={18} searchForm />
          <div className={styles.btn}>
            <Row>
              <Col offset={7}>
                <ToolBtn content='搜索' src={commenBtn} onClick={onQuery} />
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.rightHeader}>
          <TextBar src={calcBar} />
          <div className={styles.btn}>
            <ToolBtn onClick={() => { dispatch(changeCalc({ chartType: 'line' })) }} src={chartLineBtn} />
            <ToolBtn onClick={() => { dispatch(changeCalc({ chartType: 'column' })) }} src={chartCircleBtn} />
          </div>
        </div>
        {countAlarmIsfetched && <Col span={24}>
          <Chart type={chartType} data={(countAlarmInfo as CustomAlarmCount[]).map(item => ({ Date: `${item.year}-${item.month}-${item.day}`, count: item.count }))} />
        </Col>}
      </div>
    </div>
  )
}
