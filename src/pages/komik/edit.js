import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import BreadCrumb from '../../components/Breadcrumb';
import Alert from '../../components/Alert';
import Form from './form';
import { getData, postData, putData } from '../../utils/fetch';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNotif } from '../../redux/notif/actions';
import { fetchListGenres } from '../../redux/lists/actions';
import moment from 'moment';

function KomikEdit() {
  const { komikId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const [form, setForm] = useState({
    judul: '',
    penulis: '',
    sinopsis: '',
    status: '',
    price: 0,
    jenis: '',
    rilis: '',
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

  let jenisKomik = [
    {
      value: 'Manga',
      label: 'Manga',
      target: { value: 'Manga', name: 'jenis' },
    },
    {
      value: 'Manhwa',
      label: 'Manhwa',
      target: { value: 'Manhwa', name: 'jenis' },
    },
    {
      value: 'Manhua',
      label: 'Manhua',
      target: { value: 'Manhua', name: 'jenis' },
    },
    {
      value: 'Webtoon',
      label: 'Webtoon',
      target: { value: 'Webtoon', name: 'jenis' },
    },
    {
      value: 'Komik Indo',
      label: 'Komik Indo',
      target: { value: 'Komik Indo', name: 'jenis' },
    },
  ];

  const [isLoading, setIsLoading] = useState(false);

  const fetchOneKomik = async () => {
    const res = await getData(`/cms/komik/${komikId}`);

    setForm({
      ...form,
      judul: res.data.data.judul,
      penulis: res.data.data.penulis,
      sinopsis: res.data.data.sinopsis,
      status: {
        label: res?.data?.data?.status,
        target: { name: 'status', value: res?.data?.data?.status },
        value: res?.data?.data?.status,
      },
      price: res.data.data.price,
      jenis: {
        label: res?.data?.data?.jenis,
        target: { name: 'jenis', value: res?.data?.data?.jenis },
        value: res?.data?.data?.jenis,
      },
      rilis: moment(res.data.data.rilis).format('YYYY-MM-DDTHH:SS'),
      genre: {
        label: res?.data?.data?.genre?.nama,
        target: { name: 'genre', value: res?.data?.data?.genre?._id },
        value: res?.data?.data?.genre?._id,
      },
      avatar: res.data.data.image.nama,
      file: res.data.data.image._id,
    });
  };

  useEffect(() => {
    fetchOneKomik();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    } else if (
      e.target.name === 'genre' ||
      e.target.name === 'status' ||
      e.target.name === 'jenis'
    ) {
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
      jenis: form.jenis.value,
      rilis: form.rilis,
      genre: form.genre.value,
      image: form.file,
    };
    const res = await putData(`/cms/komik/${komikId}`, payload);
    if (res?.data?.data) {
      dispatch(
        setNotif(true, 'success', `berhasil ubah komik ${res.data.data.judul}`)
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
        textThird="Edit"
      />
      {alert.status && <Alert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        lists={lists}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        stat={stat}
        jenisKomik={jenisKomik}
        edit
      />
    </Container>
  );
}

export default KomikEdit;
