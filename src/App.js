import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import PageSignin from './pages/signin';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>home</>} />
        <Route path="/signin" element={<PageSignin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
