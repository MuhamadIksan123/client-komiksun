import React, { useEffect, useState } from 'react';
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
    komik: [],
    avatar: '',
    nomorRekening: [],
  });

  const fetchOneUser = async () => {
    const resUser = await getData(`/cms/user/${userId}`);
    const resPayments = await getData(`/cms/payment`);

    const foundPayments = resPayments.data.data.filter(
      (item) => item.vendor === resUser.data.data._id
    );

    setForm({
      ...form,
      nama: resUser.data.data.nama,
      email: resUser.data.data.email,
      role: resUser.data.data.role,
      lahir: moment(resUser.data.data.lahir).format('DD-MM-YYYY'),
      statusUser: resUser.data.data.statusUser,
      otp: resUser.data.data.otp,
      nomor: resUser.data.data.nomor,
      biodata: resUser.data.data.biodata,
      komik: resUser.data.data.komik.map((item) => item.label),
      avatar: resUser.data.data.image.nama,
      nomorRekening: foundPayments,
    });
  };

  useEffect(() => {
    fetchOneUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchListKomiks());
  }, [dispatch]);

  console.log(form);

  return (
    <>
      <div className="container mt-3 mb-5">
        <BreadCrumb
          textSecound={'User'}
          urlSecound={'/user'}
          textThird="Detail"
        />
        <div className="card bg-secondary text-white shadow-lg rounded-lg my-4">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-4">
                <img
                  src={`${config.api_image}/${form.avatar}`}
                  alt="Avatar Pengguna"
                  className="img-fluid rounded-circle"
                />
              </div>
              <div className="col-lg-8">
                <h4 className="card-title">{form.nama}</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>Email:</strong> {form.email}
                  </li>
                  <li className="list-group-item">
                    <strong>Peran:</strong> {form.role}
                  </li>
                  <li className="list-group-item">
                    <strong>Tanggal Lahir:</strong> {form.lahir}
                  </li>
                  <li className="list-group-item">
                    <strong>Status:</strong> {form.statusUser}
                  </li>
                  <li className="list-group-item">
                    <strong>OTP:</strong> {form.otp}
                  </li>
                  <li className="list-group-item">
                    <strong>Nomor Telepon:</strong> {form.nomor}
                  </li>
                  <li className="list-group-item">
                    <strong>Komik Dibeli:</strong> {form.komik.join(', ')}
                  </li>
                  <li className="list-group-item">
                    <strong>Biodata:</strong>
                    <div className="text-justify">{form.biodata}</div>{' '}
                  </li>
                  <li className="list-group-item">
                    <strong>Nomor rekening:</strong>
                    <ul className="list-group">
                      {form.nomorRekening.map((item, index) => (
                        <li className="list-group-item" key={index}>
                          <div className="d-flex align-items-center">
                            <img
                              src={`${config.api_image}/${item.image.nama}`}
                              alt="Avatar Pengguna"
                              className="img-fluid mr-2"
                              style={{ maxWidth: '50px', marginRight: 20 }}
                            />
                            <div>
                              <span>{item.type}</span>
                              <br />
                              <span>{item.nomor}</span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetail;
