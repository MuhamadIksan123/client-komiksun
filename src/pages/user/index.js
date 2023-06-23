import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import KBreadCrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Table from '../../components/TableWithAction';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../../redux/user/actions';
import KAlert from '../../components/Alert';
import Swal from 'sweetalert2';
import { deleteData, putData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';
import { accessUser } from '../../const/access';

function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const user = useSelector((state) => state.user);
  
  const [access, setAccess] = useState({
    tambah: false,
    hapus: false,
    edit: false,
    detail: false,
    status: false,
  });

  const checkAccess = () => {
    let { role } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {};
    const access = { tambah: false, hapus: false, edit: false };
    Object.keys(accessUser).forEach(function (key, index) {
      if (accessUser[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchUser());
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
        const res = await deleteData(`/cms/user/${id}`);
        dispatch(
          setNotif(
            true,
            'success',
            `berhasil hapus user ${res.data.data.nama}`
          )
        );
        dispatch(fetchUser());
      }
    });
  };

  const handleChangeStatus = (id, status) => {
    console.log(status);
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
          status: status === 'aktif' ? 'tidak aktif' : 'aktif',
        };
        const res = await putData(`/cms/user/${id}/status`, payload);

        dispatch(
          setNotif(
            true,
            'success',
            `berhasil ubah status user ${res.data.data.nama}`
          )
        );

        dispatch(fetchUser());
      }
    });
  };

  return (
    <Container className="mt-3">
      <KBreadCrumb textSecound={'User'} />

      {access.tambah && (
        <Button className={'mb-3'} action={() => navigate('/user/create')}>
          Tambah
        </Button>
      )}

      {notif.status && (
        <KAlert type={notif.typeNotif} message={notif.message} />
      )}

      <Table
        status={user.status}
        thead={[
          'Nama',
          'Email',
          'Role',
          'Status',
          'Avatar',
          'Aksi',
        ]}
        data={user.data}
        tbody={['nama', 'email', 'role', 'status', 'avatar']}
        detailUrl={access.detail ? `/user/detail` : null}
        editUrl={access.edit ? `/user/edit` : null}
        deleteAction={access.hapus ? (id) => handleDelete(id) : null}
        customAction={
          access.status
            ? (id, status = '') => {
                return (
                  <Button
                    className={'mx-2'}
                    variant="primary"
                    size={'sm'}
                    action={() => handleChangeStatus(id, status)}
                  >
                    Change Status
                  </Button>
                );
              }
            : null
        }
        withoutPagination
      />
    </Container>
  );
}

export default User;
