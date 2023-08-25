import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import KBreadCrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Table from '../../components/TableWithAction';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUser,
  setKeyword,
  setRole,
  setStatus,
} from '../../redux/user/actions';
import KAlert from '../../components/Alert';
import Swal from 'sweetalert2';
import { deleteData, putData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';
import { accessUser } from '../../const/access';
import SearchInput from '../../components/SearchInput';
import SelectBox from '../../components/SelectBox';

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
  }, [dispatch, user.keyword, user.role, user.statusUser]);

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
          setNotif(true, 'success', `Berhasil hapus user ${res.data.data.nama}`)
        );
        dispatch(fetchUser());
      }
    });
  };

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
          statusUser: status === 'aktif' ? 'tidak aktif' : 'aktif',
        };
        const res = await putData(`/cms/user/${id}/status`, payload);

        dispatch(
          setNotif(
            true,
            'success',
            `Berhasil ubah status user ${res.data.data.nama}`
          )
        );

        dispatch(fetchUser());
      }
    });
  };

  let stat = [
    {
      value: 'aktif',
      label: 'aktif',
      target: { value: 'aktif', name: 'statusUser' },
    },
    {
      value: 'tidak aktif',
      label: 'tidak aktif',
      target: { value: 'tidak aktif', name: 'statusUser' },
    },
  ];

  let rol = [
    {
      value: 'customer',
      label: 'customer',
      target: { value: 'customer', name: 'role' },
    },
    {
      value: 'vendor',
      label: 'vendor',
      target: { value: 'vendor', name: 'role' },
    },
    {
      value: 'admin',
      label: 'admin',
      target: { value: 'admin', name: 'role' },
    },
  ];

  return (
    <Container className="mt-3">
      <KBreadCrumb textSecound={'User'} />

      {access.tambah && (
        <Button className={'mb-3'} action={() => navigate('/user/create')}>
          Tambah
        </Button>
      )}

      <Row>
        <Col>
          <SearchInput
            name="keyword"
            query={user.keyword}
            handleChange={(e) => dispatch(setKeyword(e.target.value))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={'Masukan pencarian status'}
            name="statusUser"
            value={user.statusUser}
            options={stat}
            isClearable={true}
            handleChange={(e) => dispatch(setStatus(e))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={'Masukan pencarian role'}
            name="role"
            value={user.role}
            options={rol}
            isClearable={true}
            handleChange={(e) => dispatch(setRole(e))}
          />
        </Col>
      </Row>

      {notif.status && (
        <KAlert type={notif.typeNotif} message={notif.message} />
      )}

      <Table
        status={user.status}
        thead={['Nama', 'Email', 'Peran', 'Status', 'Avatar', 'Aksi']}
        data={user.data}
        tbody={['nama', 'email', 'role', 'statusUser', 'avatar']}
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
                    Ubah Status
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
