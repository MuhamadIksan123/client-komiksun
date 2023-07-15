import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import BreadCrumb from '../../components/Breadcrumb';
import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Form from './form';
import { getData, postData, putData, getBlob } from '../../utils/fetch';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNotif } from '../../redux/notif/actions';
import { fetchListKomiks } from '../../redux/lists/actions';

function ChaptersCreate() {
  const navigate = useNavigate();
  const { chapterId } = useParams();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const [form, setForm] = useState({
    judul: '',
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
  const [loading, setLoading] = useState(false);

  const fetchOneChapter = async () => {
    const res = await getData(`/cms/chapter/${chapterId}`);

    setForm({
      ...form,
      judul: res.data.data.judul,
      komik: {
        label: res?.data?.data?.komik?.judul,
        target: { name: 'komik', value: res?.data?.data?.komik?._id },
        value: res?.data?.data?.komik?._id,
      },
      file: res.data.data.file._id,
      document: res.data.data.file.nama,
    });
  };

  useEffect(() => {
    fetchOneChapter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (e.target.name === 'document') {
      if (e?.target?.files[0]?.type === 'application/pdf') {
        let size = parseFloat(e.target.files[0].size);

        if (size > 9999999) {
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
          setIsLoading(true); // Mengaktifkan loader
          const res = await uploadFile(e.target.files[0]);
          setForm({
            ...form,
            file: res?.data?.data?._id,
            [e.target.name]: res?.data?.data?.nama,
          });
          setIsLoading(false); // Menonaktifkan loader
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
      komik: form.komik.value,
      file: form.file,
    };

    const res = await putData(`/cms/chapter/${chapterId}`, payload);
    if (res?.data?.data) {
      dispatch(
        setNotif(true, 'success', `Berhasil ubah judul ${res.data.data.judul}`)
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

  const handleDownload = (id) => {
    try {
      setLoading(true);
      getBlob(`/cms/files/${id}`, setLoading);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <BreadCrumb
        textSecound={'Chapters'}
        urlSecound={'/chapter'}
        textThird="Edit"
      />
      {alert.status && <Alert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        lists={lists}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        edit
        customAction={(id) => {
          return (
            <div className="d-grid gap-2">
              <Button
                className={'mb-2'}
                variant="secondary"
                size={'md'}
                action={() => handleDownload(id)}
              >
                {loading ? `Loading...` : `Check File PDF`}
              </Button>
            </div>
          );
        }}
      />
    </Container>
  );
}

export default ChaptersCreate;
