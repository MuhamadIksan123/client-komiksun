import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { listen } from './redux/listener';
import { AppRoutes } from './routes';
import store from './redux/store';


function App() {
  useEffect(() => {
    listen();
  }, []);

  useEffect(() => {
    let currentAuth;
    let previousAuth = currentAuth;

    currentAuth = store.getState().auth;

    if (currentAuth !== previousAuth) {
      localStorage.setItem('auth', JSON.stringify(currentAuth));
    }
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
