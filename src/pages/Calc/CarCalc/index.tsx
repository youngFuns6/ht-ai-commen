import React from 'react';
import styles from '../calc.module.scss';
import { Table, Select, Pagination } from 'antd';
import FormList from '@/components/FormList';
import ToolBtn from '@/components/base/ToolBtn';
import useGetCommenList from '@/hooks/useGetCommenList';
import { reactQueryKey } from '@/config/constance';
import { getDevicesChn } from '@/api/device';
import mergePageList from '@/utils/mergePageList';
import { FormListFace } from '@/types/FormList';
import { DeviceChn } from '@/types/Device';

import commenBtn from '@/assets/images/btn/tools/commen.png';

const columns = [
  {
    title: '通道',
    dataIndex: 'device',
  },
  {
    title: '时间',
    dataIndex: 'age',
  },
  {
    title: '车辆数',
    dataIndex: 'address',
  },
];

export default function CarCalc() {

  const { data: chnInfo, isFetched: chnIsFetched, hasNextPage: chnHasNexPage, fetchNextPage: chnFetchNextPage } = useGetCommenList([reactQueryKey.getDeviceChn], getDevicesChn, {});

  const onPopupScroll = (type: string, e: React.UIEvent<HTMLElement, UIEvent>) => {
    // console.log(e)
    const h = e.target as HTMLElement;
    if (h.scrollTop + h.offsetHeight >= h.scrollHeight) {
      if (chnHasNexPage) {
        chnFetchNextPage();
      }
    }
  }

  const onPageChange = () => {
    
  }

  const formList: FormListFace[] = [
    {
      label: '所属通道',
      name: 'device',
      initValue: '全部',
      defNode: (
        <Select onPopupScroll={(e) => onPopupScroll('chn', e)} options={chnIsFetched ? [{ label: '全部', value: '', key: 'null' }, ...mergePageList<DeviceChn>(chnInfo?.pages).map(item => ({ label: item.id, value: item.id, key: item.id }))] : []} />
      )
    },
  ]

  return (
    <div className={styles.carCalc}>
      <div className={styles.carCalHeader}>
        <span className={styles.carCalctit}>车辆统计</span>
        <div className={styles.formWrap}>

          <div className={styles.carCalcForm}>
            <FormList col={{ span: 24 }} labelSpan={8} wrapperSpan={16} formList={formList} searchForm={false} />
          </div>

          <div className={styles.carCalcBtn}>
            <ToolBtn src={commenBtn} content='搜索' />
          </div>
        </div>
      </div>
      <div className={styles.calcContent}>
        <Table bordered dataSource={[]} columns={columns} />
        <div className={styles.calcPage}>
        <Pagination
        current={1}
        onChange={onPageChange}
        pageSize={8}
        total={100}
        showSizeChanger={false}
        showQuickJumper
        showTotal={() => `共 ${100} 条数据`}
      />
        </div>
      </div>
    </div>
  )
}
