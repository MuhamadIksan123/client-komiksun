import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import BreadCrumb from '../../components/Breadcrumb';
import { getData } from '../../utils/fetch';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { config } from '../../configs';


function KomikDetail() {
  const { komikId } = useParams();
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

  return (
    <div className="container mt-3 mb-5">
      <BreadCrumb
        textSecound={'Komik'}
        urlSecound={'/komik'}
        textThird="Detail"
      />
      <div className="row mt-4">
        <div className="col-lg-6 col-12 mb-4">
          <img
            src={`${config.api_image}/${form.avatar}`}
            alt="semina"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-lg-6 col-12">
          <div className="d-flex flex-column">
            <h2 className="fw-bold">{form.judul}</h2>
            <p className="text-muted">Oleh {form.penulis}</p>
            <ListGroup variant="flush" className="mt-4">
              <ListGroup.Item>
                <h5 className="fw-bold">Status:</h5>
                <p>{form.status}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5 className="fw-bold">Jenis:</h5>
                <p>{form.jenis}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5 className="fw-bold">Rilis:</h5>
                <p>{form.rilis}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5 className="fw-bold">Harga:</h5>
                <p>{form.price === 0 ? 'Free' : `Rp. ${form.price}`}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5 className="fw-bold">Genre:</h5>
                <p>{form.genre}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5 className="fw-bold">Sinopsis:</h5>
                <p>{form.sinopsis}</p>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KomikDetail;
