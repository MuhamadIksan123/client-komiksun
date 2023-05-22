import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import SigninPage from './pages/signin';
import DashboardPage from './pages/dashboard';
import GenrePage from './pages/genre';
import GenreCreate from './pages/genre/create';
import GenreEdit from './pages/genre/edit';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/genre" element={<GenrePage />} />
        <Route path="/genre/create" element={<GenreCreate />} />
        <Route path="/genre/edit/id" element={<GenreEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
