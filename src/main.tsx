import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/css/reset.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/store';
import { AliveScope } from 'react-activation';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AliveScope>
          <App />
        </AliveScope>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
