import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SBreadCrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Table from '../../components/TableWithAction';
import SearchInput from '../../components/SearchInput';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchKomik,
  setKeyword,
  setGenre,
  setStatus,
} from '../../redux/komik/actions';
import SAlert from '../../components/Alert';
import Swal from 'sweetalert2';
import { deleteData, putData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';
import SelectBox from '../../components/SelectBox';
import { fetchListGenres } from '../../redux/lists/actions';
import { accessKomik } from '../../const/access';

function KomikPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const komik = useSelector((state) => state.komik);
  const lists = useSelector((state) => state.lists);

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
    const access = {
      tambah: false,
      hapus: false,
      edit: false,
      detail: false,
      status: false,
    };
    Object.keys(accessKomik).forEach(function (key, index) {
      if (accessKomik[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchKomik());
  }, [dispatch, komik.keyword, komik.genre, komik.statusKomik]);

  useEffect(() => {
    dispatch(fetchListGenres());
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
        const res = await deleteData(`/cms/komik/${id}`);

        dispatch(
          setNotif(
            true,
            'success',
            `Berhasil hapus komik ${res.data.data.judul}`
          )
        );

        dispatch(fetchKomik());
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
          statusKomik: status === 'Publikasi' ? 'Tolak Publikasi' : 'Publikasi',
        };
        const res = await putData(`/cms/komik/${id}/status`, payload);

        dispatch(
          setNotif(
            true,
            'success',
            `Berhasil ubah status komik ${res.data.data.judul}`
          )
        );

        dispatch(fetchKomik());
      }
    });
  };

  let stat = [
    {
      value: 'Publikasi',
      label: 'Publikasi',
      target: { value: 'Publikasi', name: 'statusKomik' },
    },
    {
      value: 'Tolak Publikasi',
      label: 'Tolak Publikasi',
      target: { value: 'Tolak Publikasi', name: 'statusKomik' },
    },
    {
      value: 'Menunggu Konfirmasi',
      label: 'Menunggu Konfirmasi',
      target: { value: 'Menunggu Konfirmasi', name: 'statusKomik' },
    },
  ];

  return (
    <Container className="mt-3">
      <SBreadCrumb textSecound={'Komik'} />
      {access.tambah && (
        <Button className={'mb-3'} action={() => navigate('/komik/create')}>
          Tambah
        </Button>
      )}
      <Row>
        <Col>
          <SearchInput
            name="keyword"
            query={komik.keyword}
            handleChange={(e) => dispatch(setKeyword(e.target.value))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={'Masukan pencarian genre'}
            name="genre"
            value={komik.genre}
            options={lists.genres}
            isClearable={true}
            handleChange={(e) => dispatch(setGenre(e))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={'Masukan pencarian status'}
            name="statusKomik"
            value={komik.statusKomik}
            options={stat}
            isClearable={true}
            handleChange={(e) => dispatch(setStatus(e))}
          />
        </Col>
      </Row>

      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={komik.status}
        thead={['Judul', 'Status', 'Genre', 'Harga', 'Rilis', 'Avatar', 'Aksi']}
        data={komik.data}
        tbody={['judul', 'statusKomik', 'genreName', 'harga', 'date', 'avatar']}
        detailUrl={access.detail ? `/komik/detail` : null}
        editUrl={access.edit ? `/komik/edit` : null}
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

export default KomikPage;
