import React from 'react';
import './index.scss';
import { Table } from 'antd';
import FormList from '@/components/FormList';
import ToolBtn from '@/components/base/ToolBtn';
import { FormListFace } from '@/types/FormList';

import commenBtn from '@/assets/images/btn/tools/commen.png';

const columns = [
  {
    title: '区域编号',
    dataIndex: 'id',
  },
  {
    title: '区域名称',
    dataIndex: 'name',
  },
];

export default function Region() {


  const formList: FormListFace[] = [
    {
      label: '区域名称',
      name: 'name',
      checked: true,
    },
  ]

  return (
    <div className='set-region'>
      <div className='set-region-left'>
        <Table columns={columns} />
      </div>
      <div className="set-region-right">
        <FormList formList={formList} col={{span: 24}} labelSpan={7} wrapperSpan={17} />
        <div className='set-region-right-btn'>
          <ToolBtn src={commenBtn} content='增加' />
          <ToolBtn src={commenBtn} content='修改' />
          <ToolBtn src={commenBtn} content='删除' />
        </div>
      </div>
    </div>
  )
}
