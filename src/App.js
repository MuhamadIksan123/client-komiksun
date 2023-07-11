import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, useSearchParams } from 'react-router-dom';
import { listen } from './redux/listener';
import { AppRoutes } from './routes';

function App() {
  // const [searchParams] = useSearchParams();
  useEffect(() => {
    // const paramValue = searchParams.get('nama');
    // console.log(paramValue);
    // console.log('test app.js');
    listen();
  }, []);
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
