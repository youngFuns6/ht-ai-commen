import React from 'react';
import './index.scss';
import { Table } from 'antd';
import TextBar from '@/components/base/TextBar';
import FormList from '@/components/FormList';
import ToolBtn from '@/components/base/ToolBtn';
import { FormListFace } from '@/types/FormList';

import chnInfo from '@/assets/images/text/chn_info.png';
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
        <Table columns={columns} />
      </div>
      <div className="set-chn-right">
        <TextBar width='100%' height='50px' src={chnInfo} />
        <FormList formList={formList} col={{span: 24}} labelSpan={7} wrapperSpan={17} />
        <div className='set-chn-right-btn'>
          <ToolBtn src={commenBtn} content='增加' />
          <ToolBtn src={commenBtn} content='修改' />
          <ToolBtn src={commenBtn} content='删除' />
        </div>
      </div>
    </div>
  )
}
