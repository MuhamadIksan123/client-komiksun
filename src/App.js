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
     if (event.origin !== 'https://landingpage-komiksun.vercel.app') {
       return; // Jika pesan bukan dari halaman yang diizinkan, abaikan
     }

     if (event.data.type === 'authData') {
       const authData = event.data.data;
       localStorage.setItem('auth', JSON.stringify(authData));
     }
   };

   // Tambahkan event listener untuk pesan yang dikirim
   window.addEventListener('message', handleMessage);

   return () => {
     // Bersihkan event listener saat komponen dilepas
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
