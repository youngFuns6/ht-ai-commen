import React, { useRef } from 'react';
import { Select, SelectProps } from 'antd';
import styles from './cSelect.module.scss';

interface Props {
  list?: Array<{
    key: number | string;
    label: any;
    value: any;
  }>,
  width?: string;
  value?: number;
  showPoint?: boolean;
  onScrollEnd?: () => void;
  onChange?: (value: number) => void;
}

export default function CSelect(props: Props & SelectProps) {

  const { list, width, showPoint=false, value=null, onScrollEnd, onChange, ...SelectProps } = props;
  const selectRef = useRef<any>(null);
  // console.log((selectRef.current as HTMLElement).childNodes)

  const onPopupScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // console.log(e)
    const h = e.target as HTMLElement;
    if(h.scrollTop + h.offsetHeight >= h.scrollHeight){
      if(onScrollEnd){
        onScrollEnd();
      }
    }
  }

  return (
    <div style={{width}} className={styles.cSelect} >
      {showPoint && <i className={styles.pointer}></i>}
      <Select {...SelectProps} value={value} onChange={onChange} onPopupScroll={onPopupScroll} ref={selectRef} options={list} showArrow={false} />
    </div>
  )
}
