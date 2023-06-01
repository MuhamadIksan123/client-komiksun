import { Route, Routes } from 'react-router-dom';

import Payment from '../pages/payment';
import Create from '../pages/payment/create';
import Edit from '../pages/payment/edit';

export function PaymentRoute() {
  return (
    <Routes>
      <Route path="/" element={<Payment />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:paymentId" element={<Edit />} />
    </Routes>
  );
}
