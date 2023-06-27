import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import KBreadcrumb from '../../components/Breadcrumb';
import Table from '../../components/TableWithAction';
import SearchInput from '../../components/SearchInput';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchContact,
  setPage,
  setDate,
} from '../../redux/contact/actions';
import DateRange from '../../components/InputDate';
import { formatDate } from '../../utils/formatDate';

import Button from '../../components/Button';
import KAlert from '../../components/Alert';
import Swal from 'sweetalert2';
import { deleteData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';
import { accessContact } from '../../const/access';

function OrderPage() {
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const contact = useSelector((state) => state.contact);

  let [isShowed, setIsShowed] = React.useState(false);

  const [access, setAccess] = useState({
    hapus: false,
    detail: false
  });

  const checkAccess = () => {
    let { role } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {};
    const access = { hapus: false, detail: false };
    Object.keys(accessContact).forEach(function (key, index) {
      if (accessContact[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch, contact.page, contact.date]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apa kamu yakin?',
      text: 'Anda tidak akan dapat mengembalikan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iya, Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`/cms/contact/${id}`);
        dispatch(
          setNotif(
            true,
            'success',
            `berhasil hapus contact ${res.data.data.nama}`
          )
        );
        dispatch(fetchContact());
      }
    });
  };

  const displayDate = `${
    contact.date?.startDate ? formatDate(contact.date?.startDate) : ''
  }${
    contact.date?.endDate ? ' - ' + formatDate(contact.date.endDate) : ''
  }`;

  return (
    <Container className="mt-3">
      <KBreadcrumb textSecound={'contact'} />
      <Row>
        <Col
          sm={4}
          className="cursor-pointer position-relative"
          onClick={() => setIsShowed(true)}
        >
          <SearchInput disabled query={displayDate} />
          {isShowed ? (
            <DateRange
              date={contact.date}
              setIsShowed={() => setIsShowed(!isShowed)}
              onChangeDate={(ranges) => dispatch(setDate(ranges.selection))}
            />
          ) : (
            ''
          )}
        </Col>
      </Row>

      {notif.status && (
        <KAlert type={notif.typeNotif} message={notif.message} />
      )}

      <Table
        status={contact.status}
        thead={['Nama', 'Email', 'Tanggal', 'Aksi']}
        data={contact.data}
        tbody={['nama', 'email', 'date']}
        pages={contact.pages}
        handlePageClick={({ selected }) => dispatch(setPage(selected + 1))}
        deleteAction={access.hapus ? (id) => handleDelete(id) : null}
        detailUrl={access.detail ? `/contact/detail` : null}
      />
    </Container>
  );
}

export default OrderPage;
