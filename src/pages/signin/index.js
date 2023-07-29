import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import KAlert from '../../components/Alert';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SForm from './form';
import { postData } from '../../utils/fetch';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/auth/actions';
import store from '../../redux/store';

export default function PageSignin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [alert, setAlert] = useState({
    status: 'false',
    message: '',
    type: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const role = searchParams.get('role');
    const refreshToken = searchParams.get('refreshToken');

    if (token && email && role && refreshToken) {
      // Memanggil fungsi userLogin dengan parameter yang diterima
      dispatch(userLogin(token, role, refreshToken, email));

      let currentAuth;
      let previousAuth = currentAuth;

      currentAuth = store.getState().auth;

      if (currentAuth !== previousAuth) {
        localStorage.setItem('auth', JSON.stringify(currentAuth));
      }
    }
  }, [dispatch, searchParams]);
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await postData('/cms/auth/signin', form);
    if (res?.data?.data) {
      dispatch(
        userLogin(
          res.data.data.token,
          res.data.data.role,
          res.data.data.refreshToken,
          res.data.data.email
        )
      );
      setIsLoading(false);
      navigate('/');
    } else {
      setAlert({
        status: true,
        message: res?.response?.data?.msg ?? 'Internal Server Error',
        type: 'danger',
      });

      setIsLoading(false);
    }
  };

  return (
    <Container md={12}>
      <div className="m-auto mt-3" style={{ width: '50%' }}>
        {alert.status && <KAlert type={alert.type} message={alert.message} />}
      </div>
      <Card style={{ width: '50%' }} className="m-auto mt-5">
        <Card.Body>
          <Card.Title className="text-center">Login</Card.Title>
          <SForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}
