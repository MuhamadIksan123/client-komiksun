import { Route, Routes } from 'react-router-dom';

import Transaksi from '../pages/transaksi';
import Detail from '../pages/transaksi/detail';


export function TransaksiRoute() {
  return (
    <Routes>
      <Route path="/" element={<Transaksi />} />
      <Route path="/detail/:transaksiId" element={<Detail />} />
    </Routes>
  );
}
