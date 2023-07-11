import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { listen } from './redux/listener';
import { AppRoutes } from './routes';

function App() {
  useEffect(() => {
    console.log(listen);
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
