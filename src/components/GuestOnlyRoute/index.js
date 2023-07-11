import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { userLogin } from '../redux/auth/actions';

export default function GuestOnlyRoute({ children }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');
    const role = urlParams.get('role');
    const refreshToken = urlParams.get('refreshToken');

    console.log(token, role, refreshToken, email);

    if (token && email && role && refreshToken) {
      // Membuat pemanggilan aksi userLogin dengan parameter yang diterima
      dispatch(userLogin(token, role, refreshToken, email));
    }
  }, [dispatch]);

  if (token) {
    return <Navigate to="/" replace={true} />;
  }
  return children || <Outlet />;
}
