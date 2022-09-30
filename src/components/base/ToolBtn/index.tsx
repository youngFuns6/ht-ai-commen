import React, { useState } from 'react';
import './index.scss';
import { debounce } from 'lodash';

interface Props {
  src: string;
  width?: string;
  height?: string;
  onClick?: () => void;
  disable?: boolean;
  content?: React.ReactNode;
  native?: boolean;
}

export default function ToolBtn(props: Props) {

  const { src, width, height, onClick, disable=false, content, native=false } = props;
  const [active, setActive] = useState<boolean>(false);

  const onMouseEnter = () => {
    setActive(true);
  }

  const onMouseLeave = () => {
    setActive(false);
  }

  return (
    <div onClick={onClick && debounce(onClick, 500)} style={{ width, height, pointerEvents: disable ? 'none' : 'auto', cursor: disable ? 'not-allowed' : 'pointer' }} className='tool-btn' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <img src={active && !native ? `${src.replace('.png', '_ac.png')}` : src} alt="" />
      {content && <i>{content}</i>}
    </div>
  )
}
