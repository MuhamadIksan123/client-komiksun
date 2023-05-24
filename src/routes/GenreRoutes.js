import { Route, Routes } from 'react-router-dom';

import Genre from '../pages/genre';
import Create from '../pages/genre/create';
import Edit from '../pages/genre/edit';

export function GenreRoute() {
  return (
    <Routes>
      <Route path="/" element={<Genre />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:genreId" element={<Edit />} />
    </Routes>
  );
}
