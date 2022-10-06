import React from 'react';
import './index.scss';

interface Props {
  src: string;
  width?: string;
  height?: string;
}

export default function TextBar(props: Props) {

  const { src, width, height } = props;

  return (
    <div className='text_bar' style={{width, height}}>
      <img src={src} alt="" />
    </div>
  )
}
