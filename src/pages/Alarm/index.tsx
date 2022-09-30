import React, { useRef, useEffect, useState } from 'react';
import type { FormInstance } from 'antd/es/form';
import { DatePicker, Select, Layout, } from 'antd';
import styles from './alarm.module.scss';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import FormList from '@/components/FormList';
import { FormListFace } from '@/types/FormList';
import { Algo } from '@/types/Algo';
import { ALARM_LEV, HANDLER_STATUS } from './data';
import ToolBtn from '@/components/base/ToolBtn';
import { getDevicesChn } from '@/api/device';
import useGetCommenList from '@/hooks/useGetCommenList';
import { DeviceChn } from '@/types/Device';
import mergePageList from '@/utils/mergePageList';
import Content from './conmponents/Content';
import { getAlgo } from '@/api/algo';
import { changeAlarm } from '@/store/reducer/alarmSlice'

const { Header, Content: AntContent, } = Layout;

import queryBtn from '@/assets/images/btn/tools/query_btn.png';

export default function Alarm() {
  const dispatch = useDispatch();
  const formRef = useRef<FormInstance>();
  const printRef = useRef<HTMLDivElement>(null);
  const [queryChn, setQueryChn] = useState<boolean>(false);

  const { data: chnInfo, isFetched: chnIsFetched, hasNextPage: chnHasNexPage, fetchNextPage: chnFetchNextPage } = useGetCommenList(['get-deviceChn'], getDevicesChn, {});

  const { data: algo, isFetched: algoIsFetched, hasNextPage: algoHasNexPage, fetchNextPage: algoFetchNextPage } = useGetCommenList('get-algo', getAlgo, {});

  useEffect(() => {
    setQueryChn(true);
  }, [formRef.current])

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
      }
    }
  }

  // 查询
  const onQuery = () => {
    // console.log(formRef.current?.getFieldsValue());
    if (!formRef.current) return;
    const { getFieldsValue, getFieldValue } = formRef.current;
    const query = getFieldsValue();
    Object.keys(query).forEach(item => {
      if (query[item] === '全部') {
        delete query[item];
      }
    });
    dispatch(changeAlarm({ searchAlarm: { ...query, start_time: getFieldValue('start_time').valueOf(), stop_time: getFieldValue('stop_time').valueOf() } }));
  }

  const formList: FormListFace[] = [
    {
      label: '开始时间',
      name: 'start_time',
      initValue: moment(Date.now() - 60 * 60 * 24 * 1000 * 30),
      defNode: (
        <DatePicker />
      )
    },
    {
      label: '报警等级',
      name: 'priority',
      initValue: '全部',
      defNode: (
        <Select options={ALARM_LEV} />
      )
    },
    {
      label: '所属通道',
      name: 'device',
      initValue: '全部',
      defNode: (
        <Select onPopupScroll={(e) => onPopupScroll('chn', e)} options={chnIsFetched ? [{ label: '全部', value: '', key: 'null' }, ...mergePageList<DeviceChn>(chnInfo!.pages).map(item => ({ label: item.id, value: item.id, key: item.id }))] : []} />
      )
    },
    {
      label: '结束时间',
      name: 'stop_time',
      initValue: moment(Date.now()),
      defNode: (
        <DatePicker />
      )
    },
    {
      label: '处理状态',
      name: 'handled',
      initValue: '全部',
      defNode: (
        <Select options={HANDLER_STATUS} />
      )
    },
    {
      label: '报警类型',
      name: 'type',
      initValue: '全部',
      defNode: (
        <Select onPopupScroll={(e) => onPopupScroll('algo', e)} options={chnIsFetched ? [{ label: '全部', value: '', key: 'null' }, ...mergePageList<Algo>(algo!.pages).map(item => ({ label: item.alarm_type, value: item.alarm_type_code, key: item.id }))] : []} />
      )
    }
  ]

  return (
    <Layout className={styles.alarm}>
      <Header className={styles.search}>
        <FormList col={{ span: 8 }} labelSpan={6} wrapperSpan={16} ref={formRef} formList={formList} searchForm />
        <div className={styles.btn}>
          <ToolBtn native src={queryBtn} onClick={onQuery} />
        </div>
      </Header>
      <AntContent>
        <Content queryChn={queryChn} />
      </AntContent>
    </Layout>
  )
}
