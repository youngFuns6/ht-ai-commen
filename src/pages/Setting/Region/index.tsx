import React, { useRef, useEffect } from 'react';
import './index.scss';
import { Table, message, Upload } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useMutation } from 'react-query';
import { cloneDeep } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import useGetCommenList from '@/hooks/useGetCommenList';
import { reactQueryKey } from '@/config/constance';
import FormList from '@/components/FormList';
import ToolBtn from '@/components/base/ToolBtn';
import { FormListFace } from '@/types/FormList';
import { Region } from '@/types/Region';
import { getRegion, addRegion, editRegion, deleteRegion } from '@/api/region';
import { State as SettingState, changeSetting } from '@/store/reducer/settingSlice';
import Confirm from '@/components/Confirm';

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

export default function RegionCom() {

  const formListRef = useRef<FormInstance>(null);
  const { region } = useSelector((state: SettingState) => state.setting);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!region.selectedRowKeys.length) return;
    formListRef.current?.setFieldsValue(region.form);
  }, [region.form])

  // 获取区域信息
  const { data: regionInfo, isFetched: regionIsFetched, hasNextPage: regionHasNextPage, fetchNextPage: regionFetchNextPage, refetch } = useGetCommenList([reactQueryKey.getRegion, region.search], getRegion, region.search);

  // 分页
  const onPageChange = (page: number, pageSize: number) => {
    dispatch(changeSetting({ region: { ...region, search: { page, limit: pageSize } } }));
  }

  const onSelectRow = (record: Region) => {
    if (region.selectedRowKeys[0] === record.id) {
      dispatch(changeSetting({ region: { ...region, selectedRowKeys: [] } }));
    } else {
      const obj = cloneDeep(record);
      delete obj.id;
      dispatch(changeSetting({ region: { ...region, form: obj, selectedRowKeys: [record.id] } }));
    }
  }

  // 增加通道
  const addMutation = useMutation((form: Region) => addRegion(form));

  // 修改通道
  const editMutation = useMutation((form: Region) => editRegion(form));

  // 删除通道
  const deleteMutation = useMutation((id: number) => deleteRegion(id));

  // 操作（增删改）
  const onOptRegion = async (type: string) => {
    if(type !== 'delete'){
      await formListRef.current?.validateFields();
    }
    switch (type) {
      case 'add':
        addMutation.mutate(region.form);
        break;
      case 'edit':
        if (!region.selectedRowKeys.length) return message.error('请先选择所需修改的通道');
        editMutation.mutate({ ...region.form, id: region.selectedRowKeys[0] });
        break;
      case 'delete':
        if (!region.selectedRowKeys.length) return message.error('请先选择所需删除的通道');
        deleteMutation.mutate(region.selectedRowKeys[0]);
        break;
    }
    refetch();
  }

  const formList: FormListFace[] = [
    {
      label: '区域名称',
      name: 'name',
      rules: [{required: true, message: '必填'}]
    },
  ]

  return (
    <div className='set-region'>
      <div className='set-region-left'>
        <Table pagination={{
          current: region.search.page,
          onChange: onPageChange,
          pageSize: 12,
          total: regionInfo?.pages[0].total,
          showQuickJumper: true,
          showTotal: total => `共 ${total} 条数据`
        }} rowKey='id' rowClassName={(record) => record.id === region.selectedRowKeys[0] ? 'active-row' : ''} dataSource={regionInfo?.pages[regionInfo.pages.length - 1].items} columns={columns} onRow={(record => ({ onClick: () => onSelectRow(record) }))} />
      </div>
      <div className="set-region-right">
        <FormList onValuesChange={(changeValues) => dispatch(changeSetting({ region: { ...region, form: { ...region.form, ...changeValues } } }))} initialValues={region.form} ref={formListRef} formList={formList} col={{ span: 24 }} labelSpan={7} wrapperSpan={17} />
        <div className='set-region-right-btn'>
          <ToolBtn onClick={() => onOptRegion('add')} src={commenBtn} content='增加' />
          <ToolBtn onClick={() => onOptRegion('edit')} src={commenBtn} content='修改' />
          <Confirm title='确认删除？' onConfirm={() => onOptRegion('delete')}>
            <ToolBtn src={commenBtn} content='删除' />
          </Confirm>
        </div>
      </div>
    </div>
  )
}
