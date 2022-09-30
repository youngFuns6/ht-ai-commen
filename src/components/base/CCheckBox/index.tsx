import React, { useState } from 'react';
import styles from './cCheckBox.module.scss';

import checkBox from '@/assets/images/icon/check_box.png';
import checkBoxActive from '@/assets/images/icon/check_box_active.png';

interface Props {
  content: React.ReactNode | string;
  color?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function CcheckBox(props: Props) {
  const { content, color='#00EAFF', defaultChecked, onChange } = props;
  const [checked, setChecked] = useState<boolean>(defaultChecked || false);

  const onClick = () => {
    setChecked(!checked);
    if(onChange){
      onChange(!checked);
    }
  }

  return (
    <div className={styles.check}>
      <span>
        <img onClick={onClick} src={checked ? checkBoxActive : checkBox} alt="" />
      </span>
      <span style={{ color }}>{content}</span>
    </div>
  )
}
