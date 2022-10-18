import React from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styles from './panControl.module.scss';
import TextBar from '../base/TextBar';
import { State, changeScreen } from '@/store/reducer/screenSlice';
import ToolBtn from '../base/ToolBtn';
import CSelect from '../base/CSelect';

import panControlBar from '@/assets/images/text/pan_control.png';
import upArrow from '@/assets/images/btn/tools/up.png';
import upArrowAc from '@/assets/images/btn/tools/up_ac.png';
import downArrow from '@/assets/images/btn/tools/down.png';
import downArrowAc from '@/assets/images/btn/tools/down_ac.png';
import leftArrow from '@/assets/images/btn/tools/left.png';
import leftArrowAc from '@/assets/images/btn/tools/left_ac.png';
import rightArrow from '@/assets/images/btn/tools/right.png';
import rightArrowAc from '@/assets/images/btn/tools/right_ac.png';
import yuan from '@/assets/images/btn/tools/yuan.png';
import yuanAc from '@/assets/images/btn/tools/yuan_ac.png';
import jin from '@/assets/images/btn/tools/jin.png';
import jinAc from '@/assets/images/btn/tools/jin_ac.png';
import jia from '@/assets/images/btn/tools/jia.png';
import jiaAc from '@/assets/images/btn/tools/jia_ac.png';
import jian from '@/assets/images/btn/tools/jian.png';
import jianAc from '@/assets/images/btn/tools/jian_ac.png';
import commenBtn from '@/assets/images/btn/tools/commen.png';
import commenAcBtn from '@/assets/images/btn/tools/commen_ac.png';

export default function PanControl() {

  const { panControlSelect, } = useSelector((state: State) => state.screen);
  const dispatch = useDispatch();

  const onChange = (e: RadioChangeEvent) => {
    dispatch(changeScreen({ panControlSelect: e.target.value }));
  };

  return (
    <div className={styles.panControl}>
      <TextBar src={panControlBar} />
      <Radio.Group onChange={onChange} value={panControlSelect}>
        <Radio value={0}>网络</Radio>
        <Radio value={1}>透传</Radio>
      </Radio.Group>
      <div className={styles.options}>
        <div className={styles.left}>
          <div>
            <ToolBtn width='30px' height='30px' src={upArrow} acSrc={upArrowAc} />
          </div>
          <div className={styles.center}>
            <ToolBtn width='30px' height='30px' src={leftArrow} acSrc={leftArrowAc} />
            <i style={{ margin: '10px' }}>云台</i>
            <ToolBtn width='30px' height='30px' src={rightArrow} acSrc={rightArrowAc} />
          </div>
          <div>
            <ToolBtn width='30px' height='30px' src={downArrow} acSrc={downArrowAc} />
          </div>
          <div className={styles.center}>
            <ToolBtn width='30px' height='30px' src={yuan} acSrc={yuanAc} />
            <i style={{ margin: '10px' }}>聚焦</i>
            <ToolBtn width='30px' height='30px' src={jin} acSrc={jinAc} />
          </div>
          <div className={styles.center}>
            <ToolBtn width='30px' height='30px' src={jia} acSrc={jiaAc} />
            <i style={{ margin: '10px' }}>焦点</i>
            <ToolBtn width='30px' height='30px' src={jian} acSrc={jianAc} />
          </div>
        </div>
        <div className={styles.right}>
          <h3 className={styles.text}>
            预置点
          </h3>
          <CSelect width='100px' size='small' value={0} list={Array.from({ length: 99 }).map((_, index) => ({ label: index + 1, value: index, key: index }))} />
          <div className={styles.commenBtn}>
            <ToolBtn width='80px' src={commenBtn} acSrc={commenAcBtn} content='设置' />
          </div>
          <div className={styles.commenBtn}>
            <ToolBtn width='80px' src={commenBtn} acSrc={commenAcBtn} content='调用' />
          </div>
          <div className={styles.commenBtn}>
            <ToolBtn width='80px' src={commenBtn} acSrc={commenAcBtn} content='删除' />
          </div>
        </div>
      </div>
      {panControlSelect === 1 && <div>
      <h3 className={styles.text}>
        雨刷控制
      </h3>
      <div className={styles.flex}>
        <div className={styles.commenBtn}>
          <ToolBtn src={commenBtn} acSrc={commenAcBtn} content='镜头雨刷开' />
        </div>
        <div className={styles.commenBtn}>
          <ToolBtn src={commenBtn} acSrc={commenAcBtn} content='镜头雨刷关' />
        </div>
      </div>
      <div className={styles.flex}>
        <div className={styles.commenBtn}>
          <ToolBtn src={commenBtn} acSrc={commenAcBtn} content='激光雨刷开' />
        </div>
        <div className={styles.commenBtn}>
          <ToolBtn src={commenBtn} acSrc={commenAcBtn} content='激光雨刷关' />
        </div>
      </div>
      <h3 className={styles.text}>
        灯光控制
      </h3>
      <div className={styles.flex}>
        <div className={styles.commenBtn}>
          <ToolBtn src={commenBtn} acSrc={commenAcBtn} content='灯光开' />
        </div>
        <div className={styles.commenBtn}>
          <ToolBtn src={commenBtn} acSrc={commenAcBtn} content='灯光关' />
        </div>
      </div>
      </div>}
    </div>
  )
}
