import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { listen } from './redux/listener';
import { AppRoutes } from './routes';

function App() {
  useEffect(() => {
    listen();
  }, []);
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin === 'https://landingpage-komiksun.vercel.app/signin') {
        const authData = JSON.parse(event.data);
        localStorage.setItem('auth', JSON.stringify(authData));
        // Lakukan langkah selanjutnya di halaman ini
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
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
