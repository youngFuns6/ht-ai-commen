import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.scss';
import { Button, Form, } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { useSelector, useDispatch } from 'react-redux';
import CInput from '@/components/base/CInput';
import CCheckBox from '@/components/base/CCheckBox';
import { State, loginRdc } from '@/store/reducer/authSlice';
import { login } from '@/api/user';

import manIcon from '@/assets/images/icon/man.png';
import lockIcon from '@/assets/images/icon/lock.png';

export default function Login() {
  const { remember, username, password } = useSelector((state: State) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef<FormInstance>(null);
  const [checked, setChecked] = useState<boolean>(remember);
  const [errMessage, setErrMessage] = useState<string>('');

  useEffect(() => {
    if (remember) {
      formRef.current?.setFieldsValue({ username, password, remember });
    }
  }, [])

  const onFinish = async (values: any) => {
    try {
      const { token, username }: any = await login(values);
      dispatch(loginRdc({ ...values, remember: checked, token, username }))
      setErrMessage('');
      navigate('/home/preview')
    } catch (error: any) {
      setErrMessage(error.response.data?.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <div className={styles.left}>
          <Form
            name="normal_login"
            className={styles.loginForm}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete='off'
            ref={formRef}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入你的账号' }]}
            >
              <CInput style={{ height: '56px' }} prefix={<img style={{ marginRight: '10px' }} src={manIcon}></img>} />
            </Form.Item>
            <Form.Item
              style={{ margin: 0 }}
              name="password"
              rules={[{ required: true, message: '请输入你的密码' }]}
            >
              <CInput
                style={{ height: '56px' }}
                prefix={<img style={{ marginRight: '10px' }} src={lockIcon}></img>}
                type="password"
              />
            </Form.Item>
            <Form.Item style={{ marginTop: '10px' }}>
              <CCheckBox defaultChecked={checked} content='记住密码' onChange={(checked) => setChecked(checked)}  />
            </Form.Item>
            {errMessage && <Form.Item style={{ margin: 0 }}>
              <span style={{ color: '#ff4d4f' }}>{errMessage}</span>
            </Form.Item>}
            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles.loginFormButton}> </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
