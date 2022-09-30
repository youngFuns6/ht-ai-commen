import React from 'react';
import './index.scss';

interface Props {
  arrow?: string;
  width?: string;
  height?: string;
  onChange?: () => void;
}

export default function HiddenBtn(props: Props) {
  const { arrow='bottom', width='100px', height='15px', onChange } = props;

  const onClick = () => {
    if(onChange){
      onChange();
    }
  }

  return (
    <div onClick={onClick} className={'hidden-btn'} style={{width, height}}>
      <div className={`arrow-${arrow}`}></div>
    </div>
  )
}
