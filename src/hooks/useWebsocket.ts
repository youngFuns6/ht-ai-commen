import React, { useState, useEffect, } from 'react';
import Config from '@/config/network';

// 创建websocket
export default (params: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  useEffect(() => {
    setSocket(() => {
      // const socket = new WebSocket(`ws://${Config.BASE_URL_HOST}/?user=` + params);
      const socket = new WebSocket(`ws://${Config.BASE_URL_HOST.replace(/:\d+/, ':8208')}?user=` + params);

      socket.onopen = () => {
        console.log('连接成功');
      }

      socket.onclose = () => {
        console.log('连接关闭');
      }

      socket.onerror = () => {
        console.log('连接失败');
      }

      return socket;
    })
  }, [])

  return socket;
}
