import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import KAlert from '../../components/Alert';
import { useNavigate } from 'react-router-dom';
import SForm from './form';
import { postData } from '../../utils/fetch';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/auth/actions';

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
