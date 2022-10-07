import React from 'react';
import './index.scss';
import { useNavigate, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeMenu } from '@/store/reducer/menuSlice';
import { State } from '@/store/reducer/menuSlice';
import { clone } from 'lodash';

interface Props {
  path: string;
  children: React.ReactNode;
}

export default function ChildrenNav(props: Props) {

  const { path, children } = props;
  const dispatch = useDispatch();
  const { menu } = useSelector((state: State) => state.menu);
  const navigate = useNavigate();

  const toggleNav = () => {
    navigate(path);
    const cloneMenu = clone(menu);
    const reg = /(\/[a-zA-Z]+\/[a-zA-Z]+)|(\/[a-zA-Z]+\/[a-zA-Z]+\/[a-zA-Z]*)/;
    cloneMenu.forEach((item, index) => {
      if(item.key.match(reg.exec(path)![0])){
        cloneMenu.splice(index, 1, {...item ,key: path});
      }
    });
    dispatch(changeMenu({menu: [...cloneMenu]}));
  }

  return (
    <div onClick={toggleNav} className='children-nav'>
      {children}
    </div>
  )
}
