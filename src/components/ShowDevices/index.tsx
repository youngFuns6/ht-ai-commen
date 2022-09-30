import React, { useEffect, useLayoutEffect, useState, } from 'react';
import styles from './ShowDevices.module.scss';
import VirtualList from 'rc-virtual-list';
import { List } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import TextBar from '../base/TextBar';
import CSelect from '../base/CSelect';
import { getDevicesChn } from '@/api/device';
import { getRegion } from '@/api/region';
import { Region } from '@/types/Region';
import { SearchDeviceChn, DeviceChn } from '@/types/Device';
import useGetCommenList from '@/hooks/useGetCommenList';
import mergePageList from '@/utils/mergePageList';
import { State, changeScreen } from '@/store/reducer/screenSlice';
import PanControl from '@/components/PanControl';
import HiddenBtn from '../base/HiddenBtn';


import previewBar from '@/assets/images/text/preview_bar.png';

interface Props {
  showPanControl?: boolean;
}

const ShowDevices = (props: Props) => {
  const { showPanControl = false } = props;
  const { selectRegionId, hiddenPreviewList, panControlSelect} = useSelector((state: State) => state.screen);
  const dispatch = useDispatch();
  const [containerHeight, setContainerHeight] = useState<number>(0);

  useLayoutEffect(() => {
    if (hiddenPreviewList) {
      if(panControlSelect){
        setContainerHeight(131);
      }else {
        setContainerHeight(282);
      }
    }else{
      setContainerHeight(600);
    }
  }, [panControlSelect, hiddenPreviewList])

  // 获取区域信息
  const { data: regionInfo, isFetched, hasNextPage, fetchNextPage } = useGetCommenList('get-region', getRegion, {});

  // 根据区域获取通道信息
  const { data: chnInfo, isFetched: chnIsFetched, fetchNextPage: chnFetchNextPage } = useGetCommenList<SearchDeviceChn>(['get-deviceChn', selectRegionId], getDevicesChn, { region: selectRegionId as number }, isFetched);

  useEffect(() => {
    if (isFetched && !selectRegionId) {
      dispatch(changeScreen({ selectRegionId: regionInfo?.pages[0].items[0]?.id }));
    }
    if (chnIsFetched) {
      // 创建至少为显示最大数的数组存储通道列表
      const arr = Array.from({ length: 16 });
      arr.splice(0, 16, ...mergePageList<DeviceChn>(chnInfo!.pages));
      dispatch(changeScreen({ chnListByRegion: arr || [], }));
    }
  }, [isFetched, chnInfo])

  const onScrollEnd = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  const onRegionChange = (value: number) => {
    // console.log(value)
    dispatch(changeScreen({ selectRegionId: value, page: 1 }));
  }

  const onScrollChn = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === containerHeight) {
      chnFetchNextPage();
    }
  }

  const onDragStart = async (e: any, chnInfo: DeviceChn) => {
    e.stopPropagation();
    e.dataTransfer.setData('channel', JSON.stringify({
      id: chnInfo.id,
      name: chnInfo.name,
      alarmType: chnInfo.alarmType,
      devType: chnInfo.devType,
      domain: chnInfo.domain
    }))
  }

  return (
    <div className={styles.left}>
      <div className={styles.showDevices}>
        {showPanControl && <div className={styles.hiddenArrow}><HiddenBtn onChange={() => dispatch(changeScreen({ hiddenPreviewList: !hiddenPreviewList }))} width='100px' height='15px' arrow={hiddenPreviewList ? 'bottom' : 'top'} /></div>}
        <TextBar src={previewBar} />
        <div className={styles.selectRegion}>
          {regionInfo && <CSelect showPoint value={selectRegionId as number} onChange={onRegionChange} onScrollEnd={onScrollEnd} list={mergePageList<Region>(regionInfo.pages).map(item => ({ key: item.id, label: item.name, value: item.id }))} />}
        </div>
        {chnInfo && <List split={false}>
          <VirtualList
            data={mergePageList<DeviceChn>(chnInfo.pages)}
            height={containerHeight}
            itemHeight={47}
            itemKey="id"
            onScroll={onScrollChn}
          >
            {(item: DeviceChn) => (
              <div draggable onDragStart={(e) => onDragStart(e, item)} className={styles.listItem}>
                <List.Item key={item.id}>
                  <div>{item.name}-{item.id}</div>
                </List.Item>
              </div>
            )}
          </VirtualList>
        </List>}
      </div>
      {(showPanControl && hiddenPreviewList) && <div className={styles.panControl}>
        <PanControl />
      </div>}
    </div>
  )
}

export default ShowDevices;
