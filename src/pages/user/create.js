import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import BreadCrumb from '../../components/Breadcrumb';
import Alert from '../../components/Alert';
import Form from './form';
import { postData } from '../../utils/fetch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNotif } from '../../redux/notif/actions';
import { fetchListKomiks } from '../../redux/lists/actions';

function UserCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const [form, setForm] = useState({
    nama: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    lahir: '',
    status: '',
    otp: '',
    nomor: '',
    komik: [''],
    file: '',
    avatar: '',
  });

  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: '',
  });

  let rol = [
    {
      value: 'admin',
      label: 'admin',
      target: { value: 'admin', name: 'role' },
    },
    {
      value: 'vendor',
      label: 'vendor',
      target: { value: 'vendor', name: 'role' },
    },
    {
      value: 'customer',
      label: 'customer',
      target: { value: 'vendor', name: 'role' },
    },
  ];

  let stat = [
    {
      value: 'aktif',
      label: 'aktif',
      target: { value: 'aktif', name: 'status' },
    },
    {
      value: 'tidak aktif',
      label: 'tidak aktif',
      target: { value: 'tidak aktif', name: 'status' },
    },
  ];

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchListKomiks());
  }, [dispatch]);

  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append('avatar', file);
    const res = await postData('/cms/images', formData, true);
    return res;
  };

  const handleChange = async (e) => {
    const _temp = Array.isArray(e) ? e : null;
    console.log(_temp);
    if (Array.isArray(e)) e = e[0];

    if (e?.target?.name === 'avatar') {
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
    } else if (e?.target?.name === 'komik') {
      setForm({ ...form, komik: _temp });
    } else if (e.target.name === 'role' || e.target.name === 'status') {
      setForm({ ...form, [e.target.name]: e });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      nama: form.nama,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      role: form.role.value,
      lahir: form.lahir,
      status: form.status.value,
      otp: form.otp,
      nomor: form.nomor,
      komik: form.komik.map((i) => i),
      // komik: form.komik.map((i) => i.value),
      image: form.file,
    };

    const res = await postData('/cms/user', payload);

    if (res?.data?.data) {
      dispatch(
        setNotif(true, 'success', `berhasil tambah user ${res.data.data.nama}`)
      );
      navigate('/user');
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
        textSecound={'User'}
        urlSecound={'/user'}
        textThird="Create"
      />
      {alert.status && <Alert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        lists={lists}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        rol={rol}
        stat={stat}
      />
    </Container>
  );
}

export default UserCreate;
