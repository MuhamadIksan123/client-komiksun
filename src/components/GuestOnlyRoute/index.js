import * as React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { userLogin } from '../../redux/auth/actions';


export default function GuestOnlyRoute({ children }) {
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');
    const role = urlParams.get('role');
    const refreshToken = urlParams.get('refreshToken');

    if (token && email && role && refreshToken) {
      // Memanggil fungsi userLogin dengan parameter yang diterima
      userLogin(token, role, refreshToken, email);
    }
  }, []);

  let { token } = useSelector((state) => state.auth);

  if (token) return <Navigate to="/" replace={true} />;
  return children || <Outlet />;
}
