import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SBreadCrumb from '../../components/Breadcrumb';
import SAlert from '../../components/Alert';
import Form from './form';
import { useNavigate, useParams } from 'react-router-dom';
import { getData, putData } from '../../utils/fetch';
import { useDispatch } from 'react-redux';
import { setNotif } from '../../redux/notif/actions';

function GenreEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { genreId } = useParams();
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

  const fetchOneGenre = async () => {
    const res = await getData(`/cms/genre/${genreId}`);

    setForm({ ...form, nama: res.data.data.nama });
  };

  useEffect(() => {
    fetchOneGenre();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await putData(`/cms/genre/${genreId}`, form);
    if (res?.data?.data) {
      dispatch(
        setNotif(true, 'success', `Berhasil ubah genre ${res.data.data.nama}`)
      );
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

  return (
    <Container className="mt-3">
      <SBreadCrumb
        textSecound={'Genre'}
        urlSecound={'/genre'}
        textThird="Edit"
      />
      {alert.status && <SAlert type={alert.type} message={alert.message} />}
      <Form
        edit
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}

export default GenreEdit;
