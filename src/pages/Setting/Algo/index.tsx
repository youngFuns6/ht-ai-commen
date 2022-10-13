import React, { useRef, useEffect } from 'react';
import './index.scss';
import { Table, Select, message, Upload } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { cloneDeep } from 'lodash';
import { useMutation } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import FormList from '@/components/FormList';
import ToolBtn from '@/components/base/ToolBtn';
import Confirm from '@/components/Confirm';
import { getAlgo, addAlgo, editAlgo, deleteAlgo } from '@/api/algo';
import { FormListFace } from '@/types/FormList';
import { Algo } from '@/types/Algo';
import { reactQueryKey } from '@/config/constance';
import useGetCommenList from '@/hooks/useGetCommenList';
import { State as SettingState, changeSetting } from '@/store/reducer/settingSlice';
import inputExcel from '@/utils/inputExcel';
import outputExcel from '@/utils/outputExcel';

import commenBtn from '@/assets/images/btn/tools/commen.png';
import mergePageList from '@/utils/mergePageList';

const columns = [
  {
    title: '事件分类',
    dataIndex: 'event_type',
  },
  {
    title: '报警类型编号',
    dataIndex: 'alarm_type_code',
  },
  {
    title: '报警类型',
    dataIndex: 'alarm_type',
  },
  {
    title: '说明',
    dataIndex: 'desc',
  },
  {
    title: '备注',
    dataIndex: 'memo',
  },
];

export default function AlgoCom() {
  const formListRef = useRef<FormInstance>(null);
  const { algo } = useSelector((state: SettingState) => state.setting);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!algo.selectedRowKeys.length) return;
    formListRef.current?.setFieldsValue(algo.form);
  }, [algo.form])

  // 获取算法
  const { data: algoInfo, isFetched: algoIsFetched, hasNextPage: algoHasNexPage, fetchNextPage: algoFetchNextPage } = useGetCommenList([reactQueryKey.getAlgo], getAlgo, {});

  // 分页
  const onPageChange = (page: number, pageSize: number) => {
    dispatch(changeSetting({ chn: { ...algo, search: { page, limit: pageSize } } }));
  }

  const onSelectRow = (record: Algo) => {
    if (algo.selectedRowKeys[0] === record.id) {
      dispatch(changeSetting({ algo: { ...algo, selectedRowKeys: [] } }));
    } else {
      const obj = cloneDeep(record);
      delete obj.id;
      dispatch(changeSetting({ algo: { ...algo, form: obj, selectedRowKeys: [record.id] } }));
    }
  }

  // 增加算法
  const addMutation = useMutation((form: Algo) => addAlgo(form));

  // 修改算法
  const editMutation = useMutation((form: Algo) => editAlgo(form));

  // 删除算法
  const deleteMutation = useMutation((id: number) => deleteAlgo(id));

  // 操作（增删改）
  const onOptAlgo = async (type: string) => {
    if (type !== 'delete') {
      await formListRef.current?.validateFields();
    }
    switch (type) {
      case 'add':
        addMutation.mutate(algo.form);
        break;
      case 'edit':
        if (!algo.selectedRowKeys.length) return message.error('请先选择所需修改的算法');
        editMutation.mutate({ ...algo.form, id: algo.selectedRowKeys[0] });
        break;
      case 'delete':
        if (!algo.selectedRowKeys.length) return message.error('请先选择所需删除的算法');
        deleteMutation.mutate(algo.selectedRowKeys[0]);
        break;
    }
  }

  const onIo = (type: string) => {
    switch (type) {
      case 'input':
        break;
      case 'output':
        // outputExcel()
        outputExcel(mergePageList(algoInfo?.pages).map((item: any) => ({
          event_type: item.event_type,
          alarm_type_code: item.alarm_type_code,
          alarm_type: item.alarm_type,
          desc: item.desc,
          memo: item.memo,
          alarm_voice_text: item.alarm_voice_text
        })), {
          event_type: '事件分类',
          alarm_type_code: '报警类型编号',
          alarm_type: '报警类型',
          alarm_voice_text: '语音报警信息',
          desc: '说明',
          memo: '备注',
        }, 'algo')
        break;
    }
  }

  const formList: FormListFace[] = [
    {
      label: '事件分类',
      name: 'event_type',
      rules: [{ required: true, message: '必填' }],
      defNode: (
        <Select />
      )
    },
    {
      label: '报警类型编号',
      name: 'alarm_type_code',
      rules: [{ required: true, message: '必填' }]
    },
    {
      label: '报警类型',
      name: 'alarm_type',
      rules: [{ required: true, message: '必填' }]
    },
    {
      label: '说明',
      name: 'desc',
    },
    {
      label: '备注',
      name: 'memo',
    },
    {
      label: '报警语音文本',
      name: 'alarm_voice_text',
    },
  ]

  return (
    <div className='set-algo'>
      <div className="set-algo-content">
        <Table pagination={{
          current: algo.search.page,
          onChange: onPageChange,
          pageSize: 12,
          total: algoInfo?.pages[0].total,
          showQuickJumper: true,
          showTotal: total => `共 ${total} 条数据`
        }} rowKey='id' dataSource={algoInfo?.pages[algoInfo.pages.length - 1].items} columns={columns} rowClassName={(record) => record.id === algo.selectedRowKeys[0] ? 'active-row' : ''} onRow={(record => ({ onClick: () => onSelectRow(record) }))} />
      </div>
      <div className="set-algo-right">
        <div>
          <FormList ref={formListRef} formList={formList} col={{ span: 24 }} labelSpan={10} wrapperSpan={14} onValuesChange={(changeValues) => dispatch(changeSetting({ algo: { ...algo, form: { ...algo.form, ...changeValues } } }))} />
          <div className='set-algo-right-btn'>
            <ToolBtn onClick={() => onOptAlgo('add')} src={commenBtn} content='增加' />
            <ToolBtn onClick={() => onOptAlgo('edit')} src={commenBtn} content='修改' />
            <Confirm title='确认删除？' onConfirm={() => onOptAlgo('delete')}>
              <ToolBtn src={commenBtn} content='删除' />
            </Confirm>
          </div>
        </div>
        <div className="set-algo-right-tools">
          <ToolBtn onClick={() => onIo('output')} src={commenBtn} content='导出' />
          <Upload customRequest={() => { }} showUploadList={false} name="excel" listType="text" accept="file" beforeUpload={inputExcel}>
            <ToolBtn src={commenBtn} content='导入' />
          </Upload>
        </div>
      </div>
    </div>
  )
}
