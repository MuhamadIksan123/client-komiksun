import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import GuardRoute from '../components/GuardRoute';
import GuestOnlyRoute from '../components/GuestOnlyRoute';
import { userLogin } from '../redux/auth/actions';
import { useDispatch } from 'react-redux';

import Login from '../pages/signin';
import { HomeRoute } from './HomeRoutes';
import { UserRoute } from './UserRoutes';
import { GenreRoute } from './GenreRoutes';
import { KomikRoute } from './KomikRoutes';
import { ChapterRoute } from './ChapterRoutes';
import { PaymentRoute } from './PaymentRoutes';
import { ContactRoute } from './ContactRoutes';
import KNavbar from '../components/Navbar';
import { TransaksiRoute } from './TransaksiRoutes';

export function AppRoutes() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const role = searchParams.get('role');
    const refreshToken = searchParams.get('refreshToken');

    console.log(token, role, refreshToken, email);

    if (token && email && role && refreshToken) {
      // Memanggil fungsi userLogin dengan parameter yang diterima
      dispatch(userLogin(token, role, refreshToken, email));

      localStorage.setItem(
        'auth',
        JSON.stringify({ token, email, role, refreshToken })
      );
    }
  }, [dispatch, searchParams]);
  return (
    <Routes>
      <Route
        path="login"
        element={
          <GuestOnlyRoute>
            <Login />
          </GuestOnlyRoute>
        }
      />
      <Route
        path="/"
        element={
          <>
            <KNavbar />
            <GuardRoute />
          </>
        }
      >
        <Route path="dashboard/*" element={<HomeRoute />} />
        <Route path="genre/*" element={<GenreRoute />} />
        <Route path="user/*" element={<UserRoute />} />
        <Route path="komik/*" element={<KomikRoute />} />
        <Route path="chapter/*" element={<ChapterRoute />} />
        <Route path="payment/*" element={<PaymentRoute />} />
        <Route path="transaksi/*" element={<TransaksiRoute />} />
        <Route path="contact/*" element={<ContactRoute />} />

        <Route path="" element={<Navigate to="/dashboard" replace={true} />} />
      </Route>
    </Routes>
  );
}
