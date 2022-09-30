import React from 'react';
import './index.scss';

interface Props {
  src: string;
}

export default function TextBar(props: Props) {

  const { src } = props;

  return (
    <div className='text_bar'>
      <img src={src} alt="" />
    </div>
  )
}
