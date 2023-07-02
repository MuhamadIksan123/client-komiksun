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

function ChapterCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const [form, setForm] = useState({
    judul: '',
    rilis: new Date(),
    komik: '',
    file: '',
    document: '',
  });

  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchListKomiks());
  }, [dispatch]);

  const uploadFile = async (file) => {
    let formData = new FormData();
    formData.append('berkas', file);
    const res = await postData('/cms/files', formData, true);
    return res;
  };

  const handleChange = async (e) => {
    if (e?.target?.name === 'document') {
      if (e?.target?.files[0]?.type === 'application/pdf') {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 30) {
          setAlert({
            ...alert,
            status: true,
            type: 'danger',
            message: 'Please select image size less than 30 MB',
          });
          setForm({
            ...form,
            file: '',
            [e.target.name]: '',
          });
        } else {
          const res = await uploadFile(e.target.files[0]);
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
          message: 'type file pdf',
        });
        setForm({
          ...form,
          file: '',
          [e.target.name]: '',
        });
      }
    } else if (e.target.name === 'komik') {
      setForm({ ...form, [e.target.name]: e });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      judul: form.judul,
      rilis: form.rilis,
      komik: form.komik.value,
      file: form.file,
    };

    const res = await postData('/cms/chapter', payload);

    if (res?.data?.data) {
      dispatch(
        setNotif(
          true,
          'success',
          `Berhasil tambah chapter ${res.data.data.judul}`
        )
      );
      navigate('/chapter');
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
        textSecound={'Chapter'}
        urlSecound={'/chapter'}
        textThird="Create"
      />
      {alert.status && <Alert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        lists={lists}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}

export default ChapterCreate;
