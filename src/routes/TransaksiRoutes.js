import { Route, Routes } from 'react-router-dom';

import Transaksi from '../pages/transaksi';

export function TransaksiRoute() {
  return (
    <Routes>
      <Route path="/" element={<Transaksi />} />
    </Routes>
  );
}
