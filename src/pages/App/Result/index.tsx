import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './index.scss';
import { Select, DatePicker, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useGetCommenList from '@/hooks/useGetCommenList';
import FormList from '@/components/FormList';
import { getPatrolRecord } from '@/api/coal';
import ToolBtn from '@/components/base/ToolBtn';
import { FormListFace } from '@/types/FormList';
import { DeviceChn } from '@/types/Device';
import { State as AppState, changePatrolPlan } from '@/store/reducer/appSlice';

import commenBtn from '@/assets/images/btn/tools/query_btn.png';
import moment from 'moment';

const columns = [
  {
    title: '巡检设备',
    dataIndex: 'device',
  },
  {
    title: '巡检计划开始时间',
    dataIndex: 'begin_time',
  },
  {
    title: '巡检计划结束时间',
    dataIndex: 'end_time',
  },
  {
    title: '实际巡检开始时间',
    dataIndex: 'start_time',
  },
  {
    title: '实际巡检结束时间',
    dataIndex: 'stop_time',
  },
  {
    title: '巡检状态',
    dataIndex: 'result',
    render: (result: number) => result ? '巡检已完成' : '巡检未完成'
  },
  {
    title: '巡检人',
    dataIndex: 'worker',
  },
];

export default function Result() {

  const { deviceChnArr, onChnScroll } = useOutletContext<{ deviceChnArr: DeviceChn[]; onChnScroll: Function }>();

  const { searchPatrolResult } = useSelector((state: AppState) => state.app);

  const formList: FormListFace[] = [
    {
      label: '巡检设备',
      name: 'device',
      defNode: (
        <Select onPopupScroll={(e) => onChnScroll('chn', e)} options={deviceChnArr.map(item => ({ label: item.id, value: item.id, key: item.id }))} />
      )
    },
    {
      label: '巡检日期',
      name: 'begin_time',
      defNode: (
        <DatePicker />
      )
    },
  ]

  return (
    <div className='result'>
      <div className="result-left">
        <FormList initialValues={{...searchPatrolResult, begin_time: moment(searchPatrolResult.begin_time)}} col={{ span: 24 }} labelSpan={24} wrapperSpan={24} labelOut='vertical' formList={formList} />
        <ToolBtn native src={commenBtn} />
      </div>
      <div className="result-content">
        <Table columns={columns} />
      </div>
    </div>
  )
}
