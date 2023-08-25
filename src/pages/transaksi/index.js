import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import KBreadcrumb from '../../components/Breadcrumb';
import Table from '../../components/TableWithAction';
import SearchInput from '../../components/SearchInput';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTransaksi,
  setPage,
  setDate,
} from '../../redux/transaksi/actions';
import DateRange from '../../components/InputDate';
import { formatDate } from '../../utils/formatDate';
import Swal from 'sweetalert2';
import { putData } from '../../utils/fetch';
import Button from '../../components/Button';
import { accessTransaksi } from '../../const/access';
import { setNotif } from '../../redux/notif/actions';
import SAlert from '../../components/Alert';

function OrderPage() {
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const transaksi = useSelector((state) => state.transaksi);
  console.log(transaksi);

  let [isShowed, setIsShowed] = React.useState(false);

  const [access, setAccess] = useState({
    detail: false,
    status: false,
  });

  const checkAccess = () => {
    let { role } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {};
    const access = {
      detail: false,
      status: false,
    };
    Object.keys(accessTransaksi).forEach(function (key, index) {
      if (accessTransaksi[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchTransaksi());
  }, [dispatch, transaksi.page, transaksi.date]);

  const displayDate = `${
    transaksi.date?.startDate ? formatDate(transaksi.date?.startDate) : ''
  }${
    transaksi.date?.endDate ? ' - ' + formatDate(transaksi.date.endDate) : ''
  }`;

  const handleChangeStatus = (id, status) => {
    Swal.fire({
      title: 'Apa kamu yakin?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iya, Ubah Status',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          statusTransaksi: status === 'Berhasil' ? 'Ditolak' : 'Berhasil',
        };
        const res = await putData(`/cms/transaksi/${id}/status`, payload);
        dispatch(
          setNotif(
            true,
            'success',
            `Berhasil ubah status transaksi ${res.data.data.personalDetail.firstName} ${res.data.data.personalDetail.lastName}`
          )
        );
        dispatch(fetchTransaksi());
      }
    });
  };

  return (
    <Container className="mt-3">
      <KBreadcrumb textSecound={'Transaksi'} />
      <Row>
        <Col
          sm={4}
          className="cursor-pointer position-relative"
          onMouseDown={() => setIsShowed(true)}
          onFocus={() => setIsShowed(true)} // Tambahkan ini
          tabIndex={0} // Tambahkan ini untuk memungkinkan fokus
        >
          <SearchInput disabled query={displayDate} tabIndex={-1} />{' '}
          {/* tabIndex=-1 untuk menghindari fokus */}
          {isShowed ? (
            <DateRange
              date={transaksi.date}
              setIsShowed={() => setIsShowed(!isShowed)}
              onChangeDate={(ranges) => dispatch(setDate(ranges.selection))}
            />
          ) : (
            ''
          )}
        </Col>
      </Row>

      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}

      <Table
        status={transaksi.status}
        thead={[
          'Nama',
          'Judul',
          'Harga',
          'Penerbit',
          'Tanggal Order',
          'Payment',
          'Status',
          'Aksi',
        ]}
        data={transaksi.data}
        tbody={[
          'nama',
          'judul',
          'price',
          'penerbit',
          'date',
          'payment',
          'status',
        ]}
        pages={transaksi.pages}
        handlePageClick={({ selected }) => dispatch(setPage(selected + 1))}
        detailUrl={access.detail ? `/transaksi/detail` : null}
      />
    </Container>
  );
}

export default OrderPage;
