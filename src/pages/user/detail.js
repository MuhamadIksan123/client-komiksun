import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import BreadCrumb from '../../components/Breadcrumb';
import { getData } from '../../utils/fetch';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchListKomiks } from '../../redux/lists/actions';
import moment from 'moment';
import { config } from '../../configs';

function UserDetail() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    nama: '',
    email: '',
    role: '',
    lahir: '',
    statusUser: '',
    otp: '',
    nomor: '',
    biodata: '',
    komik: '',
    avatar: '',
  });

  const fetchOneUser = async () => {
    const res = await getData(`/cms/user/${userId}`);

    setForm({
      ...form,
      nama: res.data.data.nama,
      email: res.data.data.email,
      role: res.data.data.role,
      lahir: moment(res.data.data.lahir).format('DD-MM-YYYY'),
      statusUser: res.data.data.statusUser,
      otp: res.data.data.otp,
      nomor: res.data.data.nomor,
      biodata: res.data.data.biodata,
      komik: res.data.data.komik.map((item) => item.label),
      avatar: res.data.data.image.nama,
    });
  };

  useEffect(() => {
    fetchOneUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchListKomiks());
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <BreadCrumb
          textSecound={'User'}
          urlSecound={'/user'}
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
                  <b>Nama:</b> <span className="text-muted">{form.nama}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Email:</b>{' '}
                  <span className="text-muted">{form.email}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Role: </b> <span className="text-muted">{form.role}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Status: </b>{' '}
                  <span className="text-muted">{form.statusUser}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>OTP: </b> <span className="text-muted">{form.otp}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Tanggal Lahir:</b>{' '}
                  <span className="text-muted">{form.lahir}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>No Telp:</b>{' '}
                  <span className="text-muted">
                    {form.nomor === '-' ? 'Belum Diisi' : form.nomor}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Komik: </b>
                  <span className="text-muted">{form.komik === '' ? '' : form.komik.join(',')}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>About:</b>{' '}
                  <span className="text-muted">{form.biodata}</span>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetail;
