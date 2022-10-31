import React, { useState, useImperativeHandle, useRef, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import styles from '../../alarm.module.scss';
import { message as antMessage, Pagination, Modal, InputNumber, Input, Spin, } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import ReactToPrint from 'react-to-print';
import useGetCommenList from '@/hooks/useGetCommenList';
import { getAlarm, handlerAlarmById } from '@/api/alarm';
import { SearchAlarm, Alarm, AlarmHandle, AlarmImage } from '@/types/Alarm';
import CardItem from './CardItem';
import { State, } from '@/store/reducer/alarmSlice';
import AlarmDetail from '@/components/AlarmDetail';
import { changeAlarm } from '@/store/reducer/alarmSlice';
import ToolBtn from '@/components/base/ToolBtn';
import outputExcel from '@/utils/outputExcel';
import { getRecord } from '@/api/record';
import { Record } from '@/types/Record';
import { Algo } from '@/types/Algo';
import { reactQueryKey } from '@/config/constance';
import { fillterQuery } from '@/utils/commen';

interface Props {
  queryChn?: boolean;
}

import outputBtn from '@/assets/images/btn/tools/output.png';
import printBtn from '@/assets/images/btn/tools/print.png';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Content = React.forwardRef((props: Props & PropsWithChildren, ref: any) => {

  useImperativeHandle(ref, () => ({

  }))

  const { queryChn = false, } = props;
  const printRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [excelPage, setExcelPage] = useState<any[]>([1, 1, '报警信息']);
  const [excelHandle, setExcelHandle] = useState<boolean>(false);

  const { searchAlarm } = useSelector((state: State) => state.alarm);

  const [currentAlarmDetail, setCurrentAlarmDetail] = useState<{ isShow: boolean; alarmInfo: Alarm | undefined; alarmImgArr: AlarmImage[], alarmRecord: Record[] }>({
    isShow: false,
    alarmInfo: undefined,
    alarmImgArr: [],
    alarmRecord: []
  })


  const { data: alarmInfo, isFetched: alarmIsfetched, hasNextPage: alarmHasNextPage, fetchNextPage: alarmFetchNextPage, refetch: alarmRefetch } = useGetCommenList<SearchAlarm>([reactQueryKey.getAlarm, searchAlarm], getAlarm, {...fillterQuery(searchAlarm, '全部'), limit: 8}, queryChn);

  // 获取详情(包含录像查询)
  const onDetail = async (alarmImage?: AlarmImage[], alarm?: Alarm) => {
    if(!alarm) return;
    const {items}: any = await getRecord({start_time: +moment(alarm.start_time).format('X'), stop_time: +moment(alarm.stop_time).format('X'), device: alarm.device});
    setCurrentAlarmDetail({ ...currentAlarmDetail, isShow: true, alarmImgArr: alarmImage || [], alarmInfo: alarm, alarmRecord: items });
  }

  // 报警处理提交
  const onSubmit = async (alarmHandle: AlarmHandle) => {
    if (!currentAlarmDetail.alarmInfo) return;
    const { message } = await handlerAlarmById(currentAlarmDetail.alarmInfo.id, alarmHandle);
    antMessage.success(message);
  }

  // 详情关闭
  const onDetailClosed = () => {
    setCurrentAlarmDetail({ ...currentAlarmDetail, isShow: false, });
  }

  // 分页
  const onPageChange = (page: number, pageSize: number) => {
    dispatch(changeAlarm({ searchAlarm: {...searchAlarm, page, limit: pageSize } }));
  }

  // 导出表格
  const handleOutput = () => {
    setExcelHandle(true);
    getAlarm({ page: 1, limit: excelPage[1] }).then((res: any) => {
      outputExcel<Alarm>(res.items.map((item: Alarm) => ({
        type: item.type,
        start_time: moment(item.start_time).format('YYYY-MM-DD HH:mm:ss'),
        stop_time: moment(item.stop_time).format('YYYY-MM-DD HH:mm:ss'),
        description: item.description,
        unit: item.unit,
        person: item.person,
        break_address: item.break_address,
        break_unit: item.break_unit,
        break_people: item.break_people,
        break_category: item.break_category,
      })), {
        type: '报警类型',
        start_time: '开始时间',
        stop_time: '结束时间',
        description: '描述',
        unit: '责任单位',
        person: '责任人',
        break_address: '违章地址',
        break_unit: '违章单位',
        break_people: '违章人员',
        break_category: '违章分类',
      }, excelPage[2]).then(() => {
        setExcelHandle(false);
        setIsModalOpen(false);
      });
    }).catch(err => {
      setExcelHandle(false);
      antMessage.error('导出失败，请重试！');
    })
  }

  return (
    <>
      {alarmIsfetched && <div className={styles.content} ref={printRef}>
        {alarmInfo && alarmInfo.pages[alarmInfo.pages.length - 1].items.map((item: Alarm) => (
          <CardItem boxes={item.boxes as string} zones={item.zones as string} onClick={(alarmImage) => onDetail(alarmImage, item)} id={item.id} title={item.description} time={moment(item.start_time).format('YYYY-MM-DD HH:mm:ss')} width='100%' key={item.id}></CardItem>
        ))}
      </div>}
      <div className={styles.tools}>
        <div className={styles.toolBtn}>
          <ToolBtn onClick={() => setIsModalOpen(true)} native width='80px' src={outputBtn} />
          {/* <ReactToPrint trigger={() => <ToolBtn native width='80px' src={printBtn} />} content={() => printRef.current} /> */}
        </div>
        <Pagination
          current={searchAlarm.page}
          onChange={onPageChange}
          pageSize={8}
          showSizeChanger={false}
          total={alarmInfo?.pages[0].total}
          showQuickJumper
          showTotal={total => `共 ${total} 条数据`}
        />
      </div>
      {createPortal(<AlarmDetail onSubmit={onSubmit} onClose={onDetailClosed} {...currentAlarmDetail} />, document.querySelector('body')!)}
      <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={handleOutput}>
        <div className={styles.output}>
          <div className={styles.excelName}>
          <Input prefix='名称：' value={excelPage[3]} onChange={(e) => setExcelPage([excelPage[0],excelPage[1] , e.target.value])} />
          </div>
          第&nbsp;<InputNumber onChange={(value) => setExcelPage([value!, excelPage[1]])} min={1} max={excelPage[1]} value={excelPage[0]} />&nbsp;至&nbsp;<InputNumber onChange={(value) => setExcelPage([excelPage[0], value!])} value={excelPage[1]} min={1} max={alarmInfo?.pages[0].total} />&nbsp;条数据
          <p>当前最大可导出<i>{alarmInfo?.pages[0].total}</i>条数据</p>
        </div>
      </Modal>
      {excelHandle && <div className={styles.spin}>
        <Spin className={styles.spingLoading} tip={'导出中, 请稍等...'} spinning={excelHandle} indicator={antIcon} />
      </div>}
    </>
  )
})

export default Content;
