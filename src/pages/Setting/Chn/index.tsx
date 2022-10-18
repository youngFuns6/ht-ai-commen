import React, { useRef, useEffect } from 'react';
import './index.scss';
import { message, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { cloneDeep } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import TextBar from '@/components/base/TextBar';
import FormList from '@/components/FormList';
import ToolBtn from '@/components/base/ToolBtn';
import Confirm from '@/components/Confirm';
import { FormListFace } from '@/types/FormList';
import { DeviceChn } from '@/types/Device';
import useGetCommenList from '@/hooks/useGetCommenList';
import { reactQueryKey } from '@/config/constance';
import { getDevicesChn, addDdeviceChn, editDdeviceChn, deleteDdeviceChn } from '@/api/device';
import { State as SettingState, changeSetting } from '@/store/reducer/settingSlice';

import chnTextBar from '@/assets/images/text/chn_info.png';
import commenBtn from '@/assets/images/btn/tools/commen.png';
import commenAcBtn from '@/assets/images/btn/tools/commen_ac.png';

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

  const formListRef = useRef<FormInstance>(null);
  const { chn } = useSelector((state: SettingState) => state.setting);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!chn.selectedRowKeys.length) return;
    formListRef.current?.setFieldsValue(chn.form);
  }, [chn.form])

  // 获取设备通道
  const { data: chnInfo, isFetched: chnIsFetched, hasNextPage: chnHasNexPage, fetchNextPage: chnFetchNextPage } = useGetCommenList([reactQueryKey.getDeviceChn], getDevicesChn, {});

  // 分页
  const onPageChange = (page: number, pageSize: number) => {
    dispatch(changeSetting({ chn: { ...chn, search: { page, limit: pageSize } } }));
  }

  const onSelectRow = (record: DeviceChn) => {
    if (chn.selectedRowKeys[0] === record.id) {
      dispatch(changeSetting({ chn: { ...chn, selectedRowKeys: [] } }));
    } else {
      const obj = cloneDeep(record);
      delete obj.id;
      dispatch(changeSetting({ chn: { ...chn, form: obj, selectedRowKeys: [record.id] } }));
    }
  }

  // 增加通道
  const addMutation = useMutation((form: DeviceChn) => addDdeviceChn(form));

  // 修改通道
  const editMutation = useMutation((form: DeviceChn) => editDdeviceChn(form));

  // 删除通道
  const deleteMutation = useMutation((id: string) => deleteDdeviceChn(id));

  // 操作（增删改）
  const onOptChn = async (type: string) => {
    if(type !== 'delete'){
      await formListRef.current?.validateFields();
    }
    switch (type) {
      case 'add':
          addMutation.mutate(chn.form);
        break;
      case 'edit':
        if (!chn.selectedRowKeys.length) return message.error('请先选择所需修改的通道');
        editMutation.mutate({ ...chn.form, id: chn.selectedRowKeys[0] });
        break;
      case 'delete':
        if (!chn.selectedRowKeys.length) return message.error('请先选择所需删除的通道');
        deleteMutation.mutate(chn.selectedRowKeys[0]);
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
      rules: [{ required: true, message: '必填项' }]
    },
    {
      label: '设备端口',
      name: 'port',
      rules: [{ required: true, message: '必填项' }]
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
      rules: [{ required: true, message: '必填项' }]
    },
    {
      label: 'IPC 密码',
      name: 'userpass',
      rules: [{ required: true, message: '必填项' }]
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
        }} rowKey='id' dataSource={chnInfo?.pages[chnInfo.pages.length - 1].items} columns={columns} rowClassName={(record) => record.id === chn.selectedRowKeys[0] ? 'active-row' : ''} onRow={(record => ({ onClick: () => onSelectRow(record) }))} />
      </div>
      <div className="set-chn-right">
        <TextBar width='100%' height='50px' src={chnTextBar} />
        <FormList onValuesChange={(changeValues) => dispatch(changeSetting({ chn: { ...chn, form: { ...chn.form, ...changeValues } } }))} ref={formListRef} initialValues={chn.form} formList={formList} col={{ span: 24 }} labelSpan={8} wrapperSpan={16} />
        <div className='set-chn-right-btn'>
          <ToolBtn onClick={() => onOptChn('add')} src={commenBtn} acSrc={commenAcBtn} content='增加' />
          <ToolBtn onClick={() => onOptChn('edit')} src={commenBtn} acSrc={commenAcBtn} content='修改' />
          <Confirm title='确认删除？' onConfirm={() => onOptChn('delete')}>
            <ToolBtn src={commenBtn} acSrc={commenAcBtn} content='删除' />
          </Confirm>
        </div>
      </div>
    </div>
  )
}
