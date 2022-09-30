import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './layout.module.scss';

import previewBtn from '@/assets/images/btn/preview.png';
import previewBtnActive from '@/assets/images/btn/preview_active.png';
import analysis from '@/assets/images/btn/analysis.png';
import analysisActive from '@/assets/images/btn/analysis_active.png';
import alarm from '@/assets/images/btn/alarm.png';
import alarmActive from '@/assets/images/btn/alarm_active.png';
import calc from '@/assets/images/btn/calc.png';
import calcActive from '@/assets/images/btn/calc_active.png';
import app from '@/assets/images/btn/app.png';
import appActive from '@/assets/images/btn/app_active.png';
import setting from '@/assets/images/btn/setting.png';
import settingActive from '@/assets/images/btn/setting_active.png';

const { Header, Footer, Sider, Content } = Layout;

const optionArr = [
  { key: '/home/preview', btn: previewBtn, activeBtn: previewBtnActive },
  { key: '/home/analysis', btn: analysis, activeBtn: analysisActive },
  { key: '/home/alarm', btn: alarm, activeBtn: alarmActive },
  { key: '/home/calc', btn: calc, activeBtn: calcActive },
  { key: '/home/app', btn: app, activeBtn: appActive },
  { key: '/home/setting', btn: setting, activeBtn: settingActive },
]

const Layouts = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState<string>('');

  const onMouseEnter = (key: string) => {
    if (key !== location.pathname) {
      setActive(key);
    }
  }

  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>
        <div>
          {optionArr.map(item => (
            <img onClick={() => navigate(item.key)} onMouseLeave={() => setActive('')} onMouseEnter={() => onMouseEnter(item.key)} key={item.key} src={active === item.key || location.pathname === item.key ? item.activeBtn : item.btn} />
          ))}
        </div>
      </Footer>
    </Layout>
  )
}

export default React.memo(Layouts);
