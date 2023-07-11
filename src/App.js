import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { listen } from './redux/listener';
import { AppRoutes } from './routes';
import { userLogin } from './redux/auth/actions';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  useEffect(() => {
    listen();
  }, []);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');
    const role = urlParams.get('role');
    const refreshToken = urlParams.get('refreshToken');

    console.log(token, role, refreshToken, email);

    if (token && email && role && refreshToken) {
      // Memanggil fungsi userLogin dengan parameter yang diterima
      userLogin(token, role, refreshToken, email);
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
