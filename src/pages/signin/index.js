import React, { useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import axios from 'axios';
import KAlert from '../../components/Alert';
import { Navigate, useNavigate } from 'react-router-dom';
import { config } from '../../configs';
import SForm from './form';

export default function PageSignin() {
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
    try {
      const res = await axios.post(`${config.api_v1_host}/cms/auth/signin`, form);

      setAlert({ status: false });

      localStorage.setItem('token', res.data.data.token);

      setIsLoading(false);
      navigate('/');
      
    } catch (err) {
      setAlert({
        status: true,
        message: err?.response?.data?.msg ?? 'Internal Server Error',
        type: 'danger',
      });

      setIsLoading(false);
    }
  };

  const token = localStorage.getItem('token');
  if (token) return <Navigate to="/" replace="true" />;

  return (
    <Container md={12}>
      <div className="m-auto mt-3" style={{ width: '50%' }}>
        {alert.status && <KAlert type={alert.type} message={alert.message} />}
      </div>
      <Card style={{ width: '50%' }} className="m-auto mt-5">
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <SForm form={form} handleChange={handleChange} handleSubmit={handleSubmit} isLoading={isLoading} />
        </Card.Body>
      </Card>
    </Container>
  );
}
