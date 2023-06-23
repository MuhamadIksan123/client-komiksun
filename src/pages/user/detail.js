import React, { useEffect, useState } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import BreadCrumb from '../../components/Breadcrumb';
import Alert from '../../components/Alert';
import Form from './form';
import { getData, postData, putData } from '../../utils/fetch';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNotif } from '../../redux/notif/actions';
import { fetchListGenres } from '../../redux/lists/actions';
import moment from 'moment';
import { config } from '../../configs';


function KomikDetail() {
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
      status: res.data.data.status,
      price: res.data.data.price,
      jenis: res.data.data.jenis,
      rilis: moment(res.data.data.rilis).format('DD-MM-YYYY, h:mm:ss a'),
      genre: res.data.data.genre.nama,
      avatar: res.data.data.image.nama,
    });
  };

  useEffect(() => {
    fetchOneKomik();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchListGenres());
  }, [dispatch]);

  return (
    <div className='container'>
      <BreadCrumb
        textSecound={'Komik'}
        urlSecound={'/komik'}
        textThird="Detail"
      />
      <div className="row mt-4 mb-3">
        <div className="col-lg-6 col-12 mb-4 justify-content-center align-items-center">
          <img
            src={`${config.api_image}/${form.avatar}`}
            alt="semina"
            className="img-responsive"
          />
        </div>
        <div className="col-lg-6 col-12">
          <div className="d-flex flex-column">
            <ListGroup variant="flush" className="mt-2">
              <ListGroup.Item>
                <b>Judul:</b> <span className="text-muted">{form.judul}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Penulis:</b>{' '}
                <span className="text-muted">{form.penulis}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Status: </b>{' '}
                <span className="text-muted">{form.status}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Jenis:</b> <span className="text-muted">{form.jenis}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Rilis:</b> <span className="text-muted">{form.rilis}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Price:</b> <span className="text-muted">{form.price === 0 ? 'Free' : `Rp. ${form.price}`}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Genre: </b>
                <span className="text-muted">{form.genre}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Sinopsis:</b>{' '}
                <span className="text-muted">{form.sinopsis}</span>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KomikDetail;
