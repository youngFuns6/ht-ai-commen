import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './index.scss';
import { Select, DatePicker, Table, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useGetCommenList from '@/hooks/useGetCommenList';
import FormList from '@/components/FormList';
import ToolBtn from '@/components/base/ToolBtn';
import { getPatrolRecord } from '@/api/coal';
import { reactQueryKey } from '@/config/constance';
import { FormListFace } from '@/types/FormList';
import { ChnContext } from '@/types/Commen';
import { State as AppState, changeApp } from '@/store/reducer/appSlice';
import { fillterQuery } from '@/utils/commen';

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
    render: (time: number) => moment(time).format('HH:mm:ss')
  },
  {
    title: '巡检计划结束时间',
    dataIndex: 'end_time',
    render: (time: number) => moment(time).format('HH:mm:ss')
  },
  {
    title: '巡检事件开始时间',
    dataIndex: 'start_time',
    render: (time: number) => moment(time).format('HH:mm:ss')
  },
  {
    title: '巡检事件结束时间',
    dataIndex: 'stop_time',
    render: (time: number) => moment(time).format('HH:mm:ss')
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

  const { deviceChnArr, onChnScroll } = useOutletContext<ChnContext>();

  const { searchPatrolResult } = useSelector((state: AppState) => state.app);
  const dispatch = useDispatch();

  const { data: patrolRecordInfo, isFetched: patrolRecordIsFetched, hasNextPage: patrolRecordHasNexPage, fetchNextPage: patrolRecordFetchNextPage } = useGetCommenList([reactQueryKey.getPatrolRecord, searchPatrolResult], getPatrolRecord, { ...fillterQuery(searchPatrolResult, '全部') });

  // 分页
  const onPageChange = (page: number, pageSize: number) => {
    dispatch(changeApp({ searchPatrolResult: {...searchPatrolResult, page, limit: pageSize } }));
  }

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
        <FormList initialValues={{ ...searchPatrolResult, begin_time: moment(searchPatrolResult.begin_time) }} col={{ span: 24 }} labelSpan={24} wrapperSpan={24} labelOut='vertical' formList={formList} />
        <ToolBtn native src={commenBtn} />
      </div>
      <div className="result-content">
        <Table pagination={{
           current: searchPatrolResult.page,
           onChange: onPageChange,
           pageSize: 12,
           showSizeChanger: false,
           total: patrolRecordInfo?.pages[0].total,
           showQuickJumper: true,
           showTotal: total => `共 ${total} 条数据`
        }} rowKey='id' dataSource={patrolRecordInfo?.pages[patrolRecordInfo.pages.length - 1].items} columns={columns} />
        {/* <div className='result-page'>
          <Pagination
            current={searchPatrolResult.page}
            onChange={onPageChange}
            pageSize={12}
            total={patrolRecordInfo?.pages[0].total}
            showQuickJumper
            showTotal={total => `共 ${total} 条数据`}
          />
        </div> */}
      </div>
    </div>
  )
}
