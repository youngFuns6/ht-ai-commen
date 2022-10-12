import React from 'react';
import './index.scss';
import { Table } from 'antd';
import { cloneDeep } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import TextBar from '@/components/base/TextBar';
import FormList from '@/components/FormList';
import ToolBtn from '@/components/base/ToolBtn';
import { FormListFace } from '@/types/FormList';
import { DeviceChn } from '@/types/Device';
import useGetCommenList from '@/hooks/useGetCommenList';
import { reactQueryKey } from '@/config/constance';
import { getDevicesChn, addDdeviceChn } from '@/api/device';
import mergePageList from '@/utils/mergePageList';
import { State as SettingState, changeSetting } from '@/store/reducer/settingSlice';

import chnTextBar from '@/assets/images/text/chn_info.png';
import commenBtn from '@/assets/images/btn/tools/commen.png';

const columns = [
  {
    title: '通道名称',
    dataIndex: 'name',
  },
  {
    title: '设备类型',
    dataIndex: 'devType',
  },
  {
    title: '所在区域',
    dataIndex: 'region',
  },
  {
    title: '设备IP',
    dataIndex: 'ip',
  },
  {
    title: 'IPC IP',
    dataIndex: 'pip',
  },
];

export default function Chn() {

  const { chn } = useSelector((state: SettingState) => state.setting);
  const dispatch = useDispatch();

  // 获取设备通道
  const { data: chnInfo, isFetched: chnIsFetched, hasNextPage: chnHasNexPage, fetchNextPage: chnFetchNextPage } = useGetCommenList([reactQueryKey.getDeviceChn], getDevicesChn, {});

  // 分页
  const onPageChange = (page: number, pageSize: number) => {
    dispatch(changeSetting({ chn: { ...chn, search: { page, limit: pageSize } } }));
  }

  const onSelectRow = (record: DeviceChn) => {
    if (chn.selectedRowKeys[0] === record.id) {
      dispatch(changeSetting({ chn: { ...chn, selectedRowKeys: record.id } }));
    } else {
      const obj = cloneDeep(record);
      delete obj.id;
      dispatch(changeSetting({ chn: { ...chn, form: obj, selectedRowKeys: [record.id] } }));
    }
  }

  // 操作（增删改）
  const onOptChn = (type: string) => {
    switch (type) {
      case 'add':
        break;
      case 'edit':
        break;
      case 'delete':
        break;
    }
  }

  const formList: FormListFace[] = [
    {
      label: '通道名称',
      name: 'name',
    },
    {
      label: '所属区域',
      name: 'region',
      checked: true,
    },
    {
      label: '设备IP',
      name: 'ip',
    },
    {
      label: '设备类型',
      name: 'devType',
    },
    {
      label: '算法版本',
      name: 'algoVer',
    },
    {
      label: '软件版本',
      name: 'sw',
    },
    {
      label: '硬件版本',
      name: 'hw',
    },
    {
      label: '通道号',
      name: 'id',
    },
    {
      label: 'IPC IP',
      name: 'pip',
    },
    {
      label: 'IPC 用户名',
      name: 'username',
    },
    {
      label: 'IPC 密码',
      name: 'userpass',
    },
    {
      label: '报警类型',
      name: 'alarmType',
    },
    {
      label: '事件类型',
      name: 'domain',
    },
    {
      label: '雨刷板IP',
      name: 'wiperIp',
    },
    {
      label: '雨刷板端口',
      name: 'wiperPort',
    },
  ]

  return (
    <div className='set-chn'>
      <div className='set-chn-left'>
        <Table pagination={{
          current: chn.search.page,
          onChange: onPageChange,
          pageSize: 12,
          total: chnInfo?.pages[0].total,
          showQuickJumper: true,
          showTotal: total => `共 ${total} 条数据`
        }} rowKey='id' dataSource={mergePageList<DeviceChn>(chnInfo?.pages)} columns={columns} rowClassName={(record) => record.id === chn.selectedRowKeys[0] ? 'active-row' : ''} onRow={(record => ({ onClick: () => onSelectRow(record) }))} />
      </div>
      <div className="set-chn-right">
        <TextBar width='100%' height='50px' src={chnTextBar} />
        <FormList initialValues={chn.form} formList={formList} col={{ span: 24 }} labelSpan={7} wrapperSpan={17} />
        <div className='set-chn-right-btn'>
          <ToolBtn onClick={() => onOptChn('add')} src={commenBtn} content='增加' />
          <ToolBtn src={commenBtn} content='修改' />
          <ToolBtn src={commenBtn} content='删除' />
        </div>
      </div>
    </div>
  )
}
