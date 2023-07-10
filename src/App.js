import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { listen } from './redux/listener';
import { AppRoutes } from './routes';

function App() {
  // useEffect(() => {
  //   listen();
  // }, []);

 useEffect(() => {
   const urlParams = new URLSearchParams(window.location.search);
   const token = urlParams.get('token');
   const email = urlParams.get('email');
   const role = urlParams.get('role');
   const refreshToken = urlParams.get('refreshToken');

   if (token && email && role && refreshToken) {
     const authData = {
       token,
       email,
       role,
       refreshToken,
     };

     localStorage.setItem('auth', JSON.stringify(authData));
   } else {
     window.location.href = 'https://landingpage-komiksun.vercel.app/signin';
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
