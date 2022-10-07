import React from 'react';
import './index.scss';
import { Select } from 'antd';
import mergePageList from '@/utils/mergePageList';
import useGetCommenList from '@/hooks/useGetCommenList';
import { reactQueryKey } from '@/config/constance';
import { getRegion } from '@/api/region';
import FormList from '@/components/FormList';
import { FormListFace } from '@/types/FormList';
import { Region } from '@/types/Region';

export default function Plan() {

  // 获取区域信息
  const { data: regionInfo, isFetched, hasNextPage, fetchNextPage } = useGetCommenList(reactQueryKey.getRegion, getRegion, {});

  const onPopupScroll = (type: string, e: React.UIEvent<HTMLElement, UIEvent>) => {
    // console.log(e)
    const h = e.target as HTMLElement;
    if (h.scrollTop + h.offsetHeight >= h.scrollHeight) {
      if (hasNextPage) {
        fetchNextPage();
      }
    }
  }

  const formList: FormListFace[] = [
    {
      label: '巡检区域',
      name: 'region',
      initValue: '全部',
      defNode: (
        <Select onPopupScroll={(e) => onPopupScroll('chn', e)} options={isFetched ? [{ label: '全部', value: '', key: 'null' }, ...mergePageList<Region>(regionInfo?.pages).map(item => ({ label: item.id, value: item.id, key: item.id }))] : []} />
      )
    },
  ]

  return (
    <div className='plan'>
      <div className='plan-left'>
        <FormList labelOut='vertical' formList={formList} />
      </div>
      <div className='plan-content'></div>
    </div>
  )
}
