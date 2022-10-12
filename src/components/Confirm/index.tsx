import React, { useState } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface Props {
  title: string;
  onConfirm: () => void;
  children: React.ReactElement<any, any>;
}

export default function Confirm(props: Props) {

  const { children, title, onConfirm } = props;

  const handlerPop = () => {
    Modal.confirm({
      title,
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk: () => {
        return new Promise(async (resolve) => {
          resolve(onConfirm())
        });
      },
      onCancel() {

      },
    });
  }

  return (
    <span onClick={() => handlerPop()}>
      {children}
    </span>
  )
}
