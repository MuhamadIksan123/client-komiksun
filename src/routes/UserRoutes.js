import { Route, Routes } from 'react-router-dom';

import User from '../pages/user';
import Create from '../pages/user/create';
import Edit from '../pages/user/edit';

export function UserRoute() {
  return (
    <Routes>
      <Route path="/" element={<User />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:userId" element={<Edit />} />
    </Routes>
  );
}
