import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './index.scss';
import { debounce } from 'lodash';
import path from 'path';

interface Props {
  src: string;
  acSrc?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
  disable?: boolean;
  content?: React.ReactNode;
  native?: boolean;
  showActive?: boolean;
  path?: string;
}

export default function ToolBtn(props: Props) {

  const { src, acSrc, width, height, onClick, disable=false, content, native=false, showActive=false, path } = props;

  const location = useLocation();

  const [active, setActive] = useState<boolean>(false);

  const onMouseEnter = () => {
    setActive(true);
  }

  const onMouseLeave = () => {
    setActive(false);
  }

  return (
    <div onClick={onClick && debounce(onClick, 500)} style={{ width, height, pointerEvents: disable ? 'none' : 'auto', cursor: disable ? 'not-allowed' : 'pointer' }} className='tool-btn' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <img src={(active && !native) || (showActive && location.pathname === path) ? acSrc: src} alt="" />
      {content && <i>{content}</i>}
    </div>
  )
}
