import React, { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import './index.scss';
import { Col, Select, Table, Radio, DatePicker, Row, Pagination } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useSelector, useDispatch } from 'react-redux';
import useGetCommenList from '@/hooks/useGetCommenList';
import { reactQueryKey } from '@/config/constance';
import FormList from '@/components/FormList';
import ToolBtn from '@/components/base/ToolBtn';
import { getRegion } from '@/api/region';
import { getPatrolPlan, addPatrolPlan, editPatrolPlan, deletePatrolPlan } from '@/api/coal';
import { FormListFace } from '@/types/FormList';
import { DeviceChn } from '@/types/Device';
import { SearchPatrolPlan } from '@/types/Coal';
import { State as AppState, changeApp } from '@/store/reducer/appSlice';
import { fillterQuery } from '@/utils/commen';
import mergePageList from '@/utils/mergePageList';

import queryBtn from '@/assets/images/btn/tools/query_btn.png';

const columns = [
  {
    title: '巡检类型',
    dataIndex: 'type',
  },
  {
    title: '计划名称',
    dataIndex: 'name',
  },
  {
    title: '巡检设备',
    dataIndex: 'device',
  },
  {
    title: '计划巡检开始时间',
    dataIndex: 'begin_time',
  },
  {
    title: '计划巡检结束时间',
    dataIndex: 'duration',
  },
  {
    title: '巡检人',
    dataIndex: 'worker',
  },
];

export default function Plan() {
  const { deviceChnArr, onChnScroll } = useOutletContext<{ deviceChnArr: DeviceChn[]; onChnScroll: Function }>();

  const searchFormlistRef = useRef<FormInstance>(null);

  const { searchPatrolPlan, patrolPlan: patrolPlanForm } = useSelector((state: AppState) => state.app);
  const dispatch = useDispatch();

  // 获取巡检计划
  const { data: patrolPlanInfo, isFetched: patrolPlanIsFetched, hasNextPage: patrolPlanHasNextPage, fetchNextPage: patrolPlanFetchNextPage, } = useGetCommenList<SearchPatrolPlan>([reactQueryKey.getPatrolPlan, searchPatrolPlan], getPatrolPlan, { ...fillterQuery(searchPatrolPlan, '全部') });
  
  // 巡检类型
  const onPlanTypeChange = () => {

  }

  // 分页
  const onPageChange = (page: number, pageSize: number) => {
    dispatch(changeApp({ searchPatrolPlan: { page, limit: pageSize } }));
  }

  const searchFormList: FormListFace[] = [
    {
      label: '巡检设备',
      name: 'device',
      defNode: (
        <Select onPopupScroll={(e) => onChnScroll('device', e)} options={deviceChnArr.map(item => ({ label: item.name, value: item.id, key: item.id }))} />
      )
    },
    {
      label: '巡检类型',
      name: 'type',
      defNode: (
        <Select onPopupScroll={(e) => onChnScroll('device', e)} options={[{ label: '轨迹巡检', value: 0, key: 0 }, { label: '人脸巡检', value: 1, key: 1 }]} />
      )
    },
  ]

  const optFormList: FormListFace[] = [
    {
      label: '巡检类型',
      name: 'type',
      checked: true,
      defNode: (
        <Radio.Group onChange={onPlanTypeChange}>
          <Radio value={'XJ_001'}>轨迹巡检</Radio>
          <Radio value={'XJ_002'}>人脸巡检</Radio>
        </Radio.Group>
      )
    },
    {
      label: '计划名称',
      name: 'name',
    },
    {
      label: '计划巡检开始时间',
      name: 'begin_time',
      defNode: (
        <DatePicker picker='time' />
      )
    },
    {
      label: '计划巡检结束时间',
      name: 'region',
      defNode: (
        <DatePicker picker='time' />
      )
    },
    {
      label: '巡检设备',
      name: 'device',
      defNode: (
        <Select onPopupScroll={(e) => onChnScroll('chn', e)} options={deviceChnArr.map(item => ({ label: item.id, value: item.name, key: item.id }))} />
      )
    },
    {
      label: '巡检人',
      name: 'worker',
      defNode: (
        <Select onPopupScroll={(e) => onChnScroll('region', e)} options={deviceChnArr.map(item => ({ label: item.id, value: item.id, key: item.id }))} />
      )
    },
  ]

  return (
    <div className='plan'>
      <div className='plan-content'>
        <Table rowKey='id' dataSource={patrolPlanInfo?.pages[patrolPlanInfo.pages.length - 1].items} columns={columns} />
        <div className='plan-page'>
          <Pagination
            current={searchPatrolPlan.page}
            onChange={onPageChange}
            pageSize={15}
            total={patrolPlanInfo?.pages[0].total}
            showQuickJumper
            showTotal={total => `共 ${total} 条数据`}
          />
        </div>
      </div>
      <div className='plan-right'>
        <div>
          <FormList ref={searchFormlistRef} initialValues={searchPatrolPlan} col={{ span: 24 }} labelSpan={6} wrapperSpan={18} formList={searchFormList} />
          <Col offset={6}>
            <ToolBtn onClick={() => { dispatch(changeApp({ searchPatrolPlan: searchFormlistRef.current?.getFieldsValue() })) }} native src={queryBtn} content='搜索' />
          </Col>
        </div>
        <div className='plan-right-opt'>
          <FormList initialValues={patrolPlanForm} col={{ span: 24 }} labelSpan={6} wrapperSpan={18} formList={optFormList} />
          <Row gutter={20}>
            <Col span={8}>
              <ToolBtn src={queryBtn} native content='增加' />
            </Col>
            <Col span={8}>
              <ToolBtn src={queryBtn} native content='修改' />
            </Col>
            <Col span={8}>
              <ToolBtn src={queryBtn} native content='删除' />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
