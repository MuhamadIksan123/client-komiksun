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
