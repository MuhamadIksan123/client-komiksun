import { Route, Routes } from 'react-router-dom';

import Chapter from '../pages/chapter';
import Create from '../pages/chapter/create';
import Edit from '../pages/chapter/edit';

export function ChapterRoute() {
  return (
    <Routes>
      <Route path="/" element={<Chapter />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:chapterId" element={<Edit />} />
    </Routes>
  );
}
