import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import KBreadCrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Table from '../../components/TableWithAction';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGenre } from '../../redux/genre/actions';
import KAlert from '../../components/Alert';
import Swal from 'sweetalert2';
import { deleteData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';
import { accessGenre } from '../../const/access';

function Genre() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const genre = useSelector((state) => state.genre);
  const [access, setAccess] = useState({
    tambah: false,
    hapus: false,
    edit: false,
  });

  const checkAccess = () => {
    let { role } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {};
    const access = { tambah: false, hapus: false, edit: false };
    Object.keys(accessGenre).forEach(function (key, index) {
      if (accessGenre[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchGenre());
  }, [dispatch]);

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
        const res = await deleteData(`/cms/genre/${id}`);
        dispatch(
          setNotif(
            true,
            'success',
            `berhasil hapus genre ${res.data.data.nama}`
          )
        );
        dispatch(fetchGenre());
      }
    });
  };

  return (
    <Container className="mt-3">
      <KBreadCrumb textSecound={'Genre'} />

      {access.tambah && (
        <Button
          className={'mb-3'}
          action={() => navigate('/genre/create')}
        >
          Tambah
        </Button>
      )}

      {notif.status && (
        <KAlert type={notif.typeNotif} message={notif.message} />
      )}

      <Table
        status={genre.status}
        thead={['Nama', 'Aksi']}
        data={genre.data}
        tbody={['nama']}
        editUrl={access.edit ? `/genre/edit` : null}
        deleteAction={access.hapus ? (id) => handleDelete(id) : null}
        withoutPagination
      />
    </Container>
  );
}

export default Genre;
