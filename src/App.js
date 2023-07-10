import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { listen } from './redux/listener';
import { AppRoutes } from './routes';

function App() {
  useEffect(() => {
    listen();
  }, []);

  window.addEventListener('message', (event) => {
    if (event.origin === 'https://landingpage-komiksun.vercel.app') {
      const authData = JSON.parse(event.data);
      localStorage.setItem('auth', JSON.stringify(authData));
      // Lakukan langkah selanjutnya di halaman ini
    }
  });

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
