import React from 'react';
import './index.scss';
import { Transfer, Slider, Checkbox, Input, Row, Col } from 'antd';
import type { TransferDirection } from 'antd/es/transfer';
import { useSelector, useDispatch } from 'react-redux';
import { reactQueryKey } from '@/config/constance';
import { State as SettingState, changeSetting } from '@/store/reducer/settingSlice';
import { DeviceChn } from '@/types/Device';
import { getDevicesChn } from '@/api/device';
import useGetCommenList from '@/hooks/useGetCommenList';
import mergePageList from '@/utils/mergePageList';
import ToolBtn from '@/components/base/ToolBtn';

import commenBtn from '@/assets/images/btn/tools/commen.png';

interface RecordType {
  key: string;
  title: string;
  description: string;
}

const listStyle = {
  width: '100%'
}

export default function Sys() {

  const { sys } = useSelector((state: SettingState) => state.setting);
  const dispatch = useDispatch();

  // 获取设备通道
  const { data: chnInfo, isFetched: chnIsFetched, hasNextPage: chnHasNexPage, fetchNextPage: chnFetchNextPage } = useGetCommenList([reactQueryKey.getDeviceChn], getDevicesChn, {});

  const onChange = (nextTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
    // console.log('targetKeys:', nextTargetKeys);
    // console.log('direction:', direction);
    // console.log('moveKeys:', moveKeys);
    dispatch(changeSetting({ sys: { ...sys, targetKeys: nextTargetKeys } }));
  };

  const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    // console.log('sourceSelectedKeys:', sourceSelectedKeys);
    // console.log('targetSelectedKeys:', targetSelectedKeys);
    dispatch(changeSetting({ sys: { ...sys, selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] } }));
  };

  const onScroll = (direction: TransferDirection, e: React.SyntheticEvent<HTMLUListElement>) => {
    // console.log('direction:', direction);
    // console.log('target:', e.target);
    if (direction === 'left') {
      const h = e.target as HTMLElement;
      if (h.scrollTop + h.offsetHeight >= h.scrollHeight) {
        if (chnHasNexPage) {
          chnFetchNextPage();
        }
      }
    }
  };

  return (
    <div className='set-sys'>
      <div className="set-sys-sample">
        <Row className='set-sys-sample-check'>
          <Col span={24}><Checkbox>样本收集</Checkbox></Col>
        </Row>
        <Row className="set-sys-sample-time">
          <Col span={20}>
            <Row gutter={30}>
              <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>样本抓取时间间隔（单位：秒）：</Col>
              <Col span={8}><Input /></Col>
              <Col span={8}><ToolBtn src={commenBtn} content='保存' /></Col>
            </Row>
          </Col>
        </Row>
        <Row className="set-sys-sample-path">
          <Col span={20}>
            <Row gutter={30}>
              <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>样本存储路径：</Col>
              <Col span={8}><Input /></Col>
              <Col span={8}><ToolBtn src={commenBtn} content='保存' /></Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Row>
        <Col span={24}>
          <Transfer
            dataSource={mergePageList<DeviceChn>(chnInfo?.pages).map(item => ({ key: item.id, title: item.name }))}
            titles={['通道列表', '采集样本通道列表']}
            targetKeys={sys.targetKeys}
            selectedKeys={sys.selectedKeys}
            onChange={onChange}
            onSelectChange={onSelectChange}
            onScroll={onScroll}
            render={item => item.title}
            listStyle={listStyle}
          />
        </Col>
      </Row>
      <Row className="set-sys-vol">
        <Col span={24}>
          <Checkbox>语音报警</Checkbox>
          <div className='set-sys-vol-tool'>
            <span>音量：</span>
            <span className='set-sys-vol-slider'>
              <Slider max={200} defaultValue={30} tooltip={{ open: true }} />
            </span>
          </div>
        </Col>
      </Row>
    </div>
  )
}
