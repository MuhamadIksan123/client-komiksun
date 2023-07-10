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
     if (event.origin !== 'https://landingpage-komiksun.vercel.app') return; // Memastikan hanya menerima pesan dari URL yang diharapkan

     if (event.data.type === 'AUTH_DATA') {
       const authData = event.data.data;
       localStorage.setItem('auth', JSON.stringify(authData));
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
