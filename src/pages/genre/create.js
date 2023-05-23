import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import SBreadCrumb from '../../components/Breadcrumb';
import SAlert from '../../components/Alert';
import Form from './form';
// import { postData } from '../../utils/fetch';
import { Navigate, useNavigate } from 'react-router-dom';
import { config } from '../../configs';
import axios from 'axios';

function GenreCreate() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama: '',
  });

  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await axios.post(`${config.api_v1_host}/cms/genre`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    if (res?.data?.data) {
      navigate('/genre');
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: 'danger',
        message: res.response.data.msg,
      });
    }
  };
   if (!token) return <Navigate to="/signin" replace="true" />;

  return (
    <Container>
      <SBreadCrumb
        textSecound={'Genre'}
        urlSecound={'/genre'}
        textThird="Create"
      />
      {alert.status && <SAlert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}

export default GenreCreate;
