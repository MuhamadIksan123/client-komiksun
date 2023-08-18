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
    firstName: '',
    lastName: '',
    email: '',
    judul: '',
    price: 0,
    bank: '',
    va_number: '',
    status: '',
  });

  const fetchOneTransaksi = async () => {
    const res = await getData(`/cms/transaksi/${transaksiId}`);
    console.log(res);

    setForm({
      ...form,
      date: moment(res.data.data[0].date).format('DD-MM-YYYY, h:mm:ss a'),
      firstName: res.data.data[0].personalDetail.firstName,
      lastName: res.data.data[0].personalDetail.lastName,
      email: res.data.data[0].personalDetail.email,
      judul: res.data.data[0].komik.judul,
      price: res.data.data[0].komik.price,
      bank: res.data.data[0].response_midtrans.va_numbers[0].bank,
      va_number: res.data.data[0].response_midtrans.va_numbers[0].va_number,
      status: res.data.data[0].response_midtrans.transaction_status,
    });
  };
  
  useEffect(() => {
    fetchOneTransaksi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStatusBadgeClass = (status) => {
    if (status === 'settlement') {
      return 'bg-success';
    } else if (status === 'pending') {
      return 'bg-warning text-dark';
    } else {
      return 'bg-danger';
    }
  };

  const getStatusText = (status) => {
    if (status === 'settlement') {
      return 'Sukses';
    } else if (status === 'pending') {
      return 'Menunggu';
    } else {
      return 'Gagal';
    }
  };

  return (
    <div className="container mt-3">
      <BreadCrumb
        textSecound={'Transaksi'}
        urlSecound={'/transaksi'}
        textThird="Detail"
      />
      <div className="card bg-light border-0 rounded shadow">
        <div className="card-header bg-primary text-white py-3">
          <h3 className="mb-0">Laporan Detail Transaksi</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <h4 className="mb-4">Informasi Pelanggan</h4>
              <p className="mb-2">
                <strong>Tanggal:</strong> {form.date}
              </p>
              <p className="mb-2">
                <strong>Nama:</strong> {form.firstName} {form.lastName}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {form.email}
              </p>
            </div>
            <div className="col-md-6">
              <h4 className="mb-4">Informasi Transaksi</h4>
              <p className="mb-2">
                <strong>Judul:</strong> {form.judul}
              </p>
              <p className="mb-2">
                <strong>Harga:</strong> Rp {form.price}
              </p>
              <p className="mb-2">
                <strong>Bank:</strong> {form.bank}
              </p>
              <p className="mb-2">
                <strong>Nomor VA:</strong> {form.va_number}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={`badge ${getStatusBadgeClass(form.status)}`}>
                  {getStatusText(form.status)}
                </span>{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransaksiDetail;
