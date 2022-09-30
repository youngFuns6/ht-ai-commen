import React from 'react';
import { Input, InputProps } from 'antd';
import styles from './cInput.module.scss';

export default function CInput(props: InputProps) {

  return (
    <Input className={styles.cInput} {...props} />
  )
}
