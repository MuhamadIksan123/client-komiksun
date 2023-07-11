import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import GuardRoute from '../components/GuardRoute';
import GuestOnlyRoute from '../components/GuestOnlyRoute';
import { userLogin } from '../redux/auth/actions';


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
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');
    const role = urlParams.get('role');
    const refreshToken = urlParams.get('refreshToken');

    console.log(token, role, refreshToken, email);

    if (token && email && role && refreshToken) {
      // Memanggil fungsi userLogin dengan parameter yang diterima
      userLogin(token, role, refreshToken, email);
    }
  }, []);
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
