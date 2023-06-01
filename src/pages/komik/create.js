import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import BreadCrumb from '../../components/Breadcrumb';
import Alert from '../../components/Alert';
import Form from './form';
import { postData } from '../../utils/fetch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNotif } from '../../redux/notif/actions';
import { fetchListGenres } from '../../redux/lists/actions';

function KomikCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const [form, setForm] = useState({
    judul: '',
    penulis: '',
    sinopsis: '',
    status: '',
    price: 0,
    genre: '',
    file: '',
    avatar: '',
  });

  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: '',
  });
  
  let stat = [
    {
      value: 'Ongoing',
      label: 'Ongoing',
      target: { value: 'Ongoing', name: 'status' },
    },
    {
      value: 'Tamat',
      label: 'Tamat',
      target: { value: 'Tamat', name: 'status' },
    },
  ];

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchListGenres());
  }, [dispatch]);

  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append('avatar', file);
    const res = await postData('/cms/images', formData, true);
    return res;
  };

  const handleChange = async (e) => {
    if (e.target.name === 'avatar') {
      if (
        e?.target?.files[0]?.type === 'image/jpg' ||
        e?.target?.files[0]?.type === 'image/png' ||
        e?.target?.files[0]?.type === 'image/jpeg'
      ) {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 2) {
          setAlert({
            ...alert,
            status: true,
            type: 'danger',
            message: 'Please select image size less than 3 MB',
          });
          setForm({
            ...form,
            file: '',
            [e.target.name]: '',
          });
        } else {
          const res = await uploadImage(e.target.files[0]);

          setForm({
            ...form,
            file: res.data.data._id,
            [e.target.name]: res.data.data.nama,
          });
        }
      } else {
        setAlert({
          ...alert,
          status: true,
          type: 'danger',
          message: 'type image png | jpg | jpeg',
        });
        setForm({
          ...form,
          file: '',
          [e.target.name]: '',
        });
      }
    } else if (e.target.name === 'genre' || e.target.name === 'status') {
      setForm({ ...form, [e.target.name]: e });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      judul: form.judul,
      penulis: form.penulis,
      sinopsis: form.sinopsis,
      status: form.status.value,
      price: form.price,
      genre: form.genre.value,
      image: form.file,
    };

    const res = await postData('/cms/komik', payload);

    if (res?.data?.data) {
      dispatch(
        setNotif(
          true,
          'success',
          `berhasil tambah komik ${res.data.data.judul}`
        )
      );
      navigate('/komik');
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
    <Container>
      <BreadCrumb
        textSecound={'Komik'}
        urlSecound={'/komik'}
        textThird="Create"
      />
      {alert.status && <Alert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        lists={lists}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        stat={stat}

      />
    </Container>
  );
}

export default KomikCreate;
