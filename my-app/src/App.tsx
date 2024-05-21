import React, { useState } from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DefaultLayout from './Layout/defaultLayout/DefaultLayout';
import Login from './pages/auth/Login';
import { ConfigProvider } from 'antd';
import { store, useAppSelector } from './store';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import viMessages from './language/vi.json'
import enMessages from './language/en.json'

function App() {

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <DefaultLayout />
      },
      {
        path: '/index',
        element: <div>abc</div>
      },
      {
        path: '/login',
        element: <Login/>
      }
  
    ]
  )

  const defaultData = {
    colorPrimary: '#ee4d2d',
    
  }
  
  // const language = store.getState().translate.lang
  // console.log("🚀 ~ App ~ language:", language)
  const language = useAppSelector(state => state.translate.lang)
  const currentLang = language === 'vi' ? viMessages : enMessages
  
  
  return (
    
      <IntlProvider locale={language} messages={currentLang}>
            <ConfigProvider theme={{
              token: {
                colorPrimary: defaultData.colorPrimary,
                fontFamily: 'Helvetica, Arial,'
              }
            }} >
              <RouterProvider router={router} />
            </ConfigProvider>
          
      </IntlProvider>
  );
}

export default App;
