import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './index.scss';
import { Select, Radio, Space, DatePicker, Col, Row } from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { RadioChangeEvent } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import moment from 'moment';
import CountUp from 'react-countup';
import { reactQueryKey } from '@/config/constance';
import FormList from '@/components/FormList';
import ToolBtn from '@/components/base/ToolBtn';
import Charts from '@/components/Charts';
import { State as AppState, changeApp } from '@/store/reducer/appSlice';
import { getCoalCount } from '@/api/coal';
import { FormListFace } from '@/types/FormList';
import { DeviceChn } from '@/types/Device';
import { fillterQuery } from '@/utils/commen';

import commenBtn from '@/assets/images/btn/tools/query_btn.png';
import cocalCount from '@/assets/images/text/cocal_count.png';

const CalcCoal = () => {

  const { deviceChnArr, onChnScroll } = useOutletContext<{ deviceChnArr: DeviceChn[]; onChnScroll: Function }>();

  const { searchCoalCount } = useSelector((state: AppState) => state.app);
  const dispatch = useDispatch();

  // 获取煤量统计
  const { data: countCoalInfo, isFetched: countCoalIsfetched, }: any = useQuery([reactQueryKey.getCoalCount, searchCoalCount], () => getCoalCount(fillterQuery(searchCoalCount, '全部')));

  const onTimeTyChange = (e: RadioChangeEvent) => {

  }

  const getTimeTy = (value: number) => {
    switch (value) {
      case 1:
        return 'year';
      case 2:
        return 'month';
      case 3:
        return 'date';
    }
  }

  // 统计表单字段值改变
  const onCountChange = (changedValues: any, allValues: any) => {
    // console.log(changedValues)
    dispatch(changeApp({ searchCoalCount: { ...searchCoalCount, ...changedValues } }))
  }

  const countFormList: FormListFace[] = [
    {
      label: '所属通道',
      name: 'id',
      defNode: (
        <Select onPopupScroll={(e) => onChnScroll('chn', e)} options={deviceChnArr.map(item => ({ label: item.id, value: item.id, key: item.id }))} />
      )
    },
    {
      label: '',
      name: 'unit',
      checked: true,
      defNode: (
        <Radio.Group onChange={onTimeTyChange}>
          <Space direction="vertical">
            <Radio value={1}>按年统计</Radio>
            <Radio value={2}>按月统计</Radio>
            <Radio value={3}>按日统计</Radio>
          </Space>
        </Radio.Group>
      )
    },
    {
      label: '',
      name: 'start_time',
      defNode: (
        <DatePicker picker={getTimeTy(searchCoalCount.unit!)} />
      )
    },
  ]

  return (
    <div className='calc-coal'>
      <div className="calc-coal-left">
        <FormList onValuesChange={onCountChange} initialValues={{ ...searchCoalCount, start_time: moment(searchCoalCount.start_time) }} labelOut='horizontal' labelSpan={24} wrapperSpan={24} col={{ span: 24 }} formList={countFormList} />
        <ToolBtn native src={commenBtn} />
      </div>
      <div className="calc-coal-content">
        <Row>
          <Col span={24}>
            <Charts data={countCoalInfo} xField='' yField='' textBarSrc={cocalCount} onClick={(type) => { dispatch(changeApp({ chartType: type })) }} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="coal-count-all">
              <div className="coal-counter">
                <CountUp end={1000}></CountUp>
              </div>
              <div className="coal-counter">
                <CountUp end={1000}></CountUp>
              </div>
              <div className="coal-counter">
                <CountUp end={1000}></CountUp>
              </div>
              <div className="coal-count-all-search">
                <CountUp end={1000}></CountUp>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default React.memo(CalcCoal);
