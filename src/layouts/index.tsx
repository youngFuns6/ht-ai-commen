import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './layout.module.scss';
import { useSelector } from 'react-redux';
import { State } from '@/store/reducer/menuSlice';

const { Footer, Content } = Layout;

const Layouts = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { menu } = useSelector((state: State) => state.menu);
  const [active, setActive] = useState<string>('');

  const onMouseEnter = (key: string) => {
    if (!location.pathname.match(key)) {
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
          {menu.map(item => (
            <img onClick={() => navigate(item.key)} onMouseLeave={() => setActive('')} onMouseEnter={() => onMouseEnter(item.key)} key={item.key} src={active === item.key || location.pathname.match(item.key) ? item.activeBtn : item.btn} />
          ))}
        </div>
      </Footer>
    </Layout>
  )
}

export default React.memo(Layouts);
