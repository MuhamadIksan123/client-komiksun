import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../components/Breadcrumb';
import { getData } from '../../utils/fetch';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { config } from '../../configs';


function TransaksiDetail() {
  const { transaksiId } = useParams();
  const [form, setForm] = useState({
    date: '',
    statusTransaksi: '',
    image: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    judul: '',
    price: 0,
    nomor: '',
  });

  const fetchOneTransaksi = async () => {
    const res = await getData(`/cms/transaksi/${transaksiId}`);

    setForm({
      ...form,
      date: moment(res.data.data[0].date).format('DD-MM-YYYY, h:mm:ss a'),
      statusTransaksi: res.data.data[0].statusTransaksi,
      image: res.data.data[0].image.nama,
      firstName: res.data.data[0].personalDetail.firstName,
      lastName: res.data.data[0].personalDetail.lastName,
      email: res.data.data[0].personalDetail.email,
      role: res.data.data[0].personalDetail.role,
      judul: res.data.data[0].komik.judul,
      price: res.data.data[0].komik.price,
      methodPayment: res.data.data[0].payment.type,
      nomor: res.data.data[0].payment.nomor,
    });
  };
  
  useEffect(() => {
    fetchOneTransaksi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <BreadCrumb
        textSecound={'Transaksi'}
        urlSecound={'/transaksi'}
        textThird="Detail"
      />
      <div className="row mt-4 mb-3">
        <div className="col-lg-6 col-12 mb-4 justify-content-center align-items-center">
          <img
            src={`${config.api_image}/${form.image}`}
            alt="semina"
            className="img-responsive"
          />
        </div>
        <div className="col-lg-6 col-12">
          <div className="d-flex flex-column">
            <ol class="list-group list-group-none">
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Tanggal Transaksi</div>
                  {form.date}
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Status Transaksi</div>
                  {form.statusTransaksi}
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Nama</div>
                  {form.firstName} {form.lastName}
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Email</div>
                  {form.email}
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Judul Komik</div>
                  {form.judul}
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Harga</div>
                  Rp, {form.price}
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Metode Pembayaran</div>
                  {form.methodPayment}
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Nomor Pembayaran</div>
                  {form.nomor}
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransaksiDetail;
