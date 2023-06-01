import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SBreadCrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Table from '../../components/TableWithAction';
import SearchInput from '../../components/SearchInput';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchChapter,
  setKeyword,
  setKomik,
} from '../../redux/chapter/actions';
import SAlert from '../../components/Alert';
import Swal from 'sweetalert2';
import { deleteData, putData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';
import SelectBox from '../../components/SelectBox';
import { fetchListKomiks } from '../../redux/lists/actions';
import { accessChapter } from '../../const/access';
import { formatDate } from '../../utils/formatDate';

function ChapterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const chapter = useSelector((state) => state.chapter);
  const lists = useSelector((state) => state.lists);

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
    Object.keys(accessChapter).forEach(function (key, index) {
      if (accessChapter[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchChapter());
  }, [dispatch, chapter.keyword, chapter.komik]);

  useEffect(() => {
    dispatch(fetchListKomiks());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      judul: 'Apa kamu yakin?',
      text: 'Anda tidak akan dapat mengembalikan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iya, Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`/cms/chapter/${id}`);

        dispatch(
          setNotif(
            true,
            'success',
            `berhasil hapus speaker ${res.data.data.judul}`
          )
        );

        dispatch(fetchChapter());
      }
    });
  };

  const handleChangeStatus = (id, status) => {
    Swal.fire({
      judul: 'Apa kamu yakin?',
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
          statusChapter: status === 'Published' ? 'Draft' : 'Published',
        };
        const res = await putData(`/cms/chapter/${id}/status`, payload);

        dispatch(
          setNotif(
            true,
            'success',
            `berhasil ubah status chapter ${res.data.data.judul}`
          )
        );
        dispatch(fetchChapter());
      }
    });
  };

  const displayDate = `${
    chapter.rilis?.startDate ? formatDate(chapter.rilis?.startDate) : ''
  }${chapter.rilis?.endDate ? ' - ' + formatDate(chapter.rilis.endDate) : ''}`;

  return (
    <Container className="mt-3">
      <SBreadCrumb textSecound={'Chapter'} />
      {access.tambah && (
        <Button className={'mb-3'} action={() => navigate('/chapter/create')}>
          Tambah
        </Button>
      )}
      <Row>
        <Col>
          <SearchInput
            name="keyword"
            query={chapter.keyword}
            handleChange={(e) => dispatch(setKeyword(e.target.value))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={'Masukan pencarian kategori'}
            name="komik"
            value={chapter.komik}
            options={lists.komiks}
            isClearable={true}
            handleChange={(e) => dispatch(setKomik(e))}
          />
        </Col>
      </Row>

      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={chapter.status}
        thead={[
          'Judul',
          'Tanggal Rilis',
          'File',
          'Komik',
          'Aksi',
        ]}
        data={chapter.data}
        tbody={[
          'judul',
          'rilis',
          'document',
          'komikName',
        ]}
        editUrl={access.edit ? `/chapter/edit` : null}
        deleteAction={access.hapus ? (id) => handleDelete(id) : null}
        customAction={(id, status = '') => {
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
        }}
        withoutPagination
      />
    </Container>
  );
}

export default ChapterPage;
