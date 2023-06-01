import { Route, Routes } from 'react-router-dom';

import Komik from '../pages/komik';
import Create from '../pages/komik/create';
import Edit from '../pages/komik/edit';

export function KomikRoute() {
  return (
    <Routes>
      <Route path="/" element={<Komik />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:komikId" element={<Edit />} />
    </Routes>
  );
}
