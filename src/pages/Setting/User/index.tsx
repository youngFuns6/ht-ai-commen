import React from 'react';
import './index.scss';
import { Table } from 'antd';
import FormList from '@/components/FormList';
import ToolBtn from '@/components/base/ToolBtn';
import { FormListFace } from '@/types/FormList';

import commenBtn from '@/assets/images/btn/tools/commen.png';

const columns = [
  {
    title: '用户名称',
    dataIndex: 'name',
  },
  {
    title: '用户类型',
    dataIndex: 'id',
  },
];

export default function User() {


  const formList: FormListFace[] = [
    {
      label: '用户名',
      name: 'name',
    },
    {
      label: '密码',
      name: 'password',
    },
    {
      label: '用户类型',
      name: 'name',
    },
  ]

  return (
    <div className='set-user'>
      <div className='set-user-left'>
        <Table columns={columns} />
      </div>
      <div className="set-user-right">
        <FormList formList={formList} col={{span: 24}} labelSpan={7} wrapperSpan={17} />
        <div className='set-user-right-btn'>
          <ToolBtn src={commenBtn} content='增加' />
          <ToolBtn src={commenBtn} content='修改' />
          <ToolBtn src={commenBtn} content='删除' />
        </div>
      </div>
    </div>
  )
}
