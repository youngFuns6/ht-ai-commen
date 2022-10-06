import React from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';

interface Props {
  path: string;
  children: React.ReactNode;
}

export default function ChildrenNav(props: Props) {

  const { path, children } = props;
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(path, { state: { preState: { path } } })} className='children-nav'>
      {children}
    </div>
  )
}
