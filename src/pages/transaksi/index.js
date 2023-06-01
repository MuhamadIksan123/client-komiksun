import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import KBreadcrumb from '../../components/Breadcrumb';
import Table from '../../components/TableWithAction';
import SearchInput from '../../components/SearchInput';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransaksi, setPage, setDate } from '../../redux/transaksi/actions';
import { fetchListKomiks } from '../../redux/lists/actions';
import DateRange from '../../components/InputDate';
import { formatDate } from '../../utils/formatDate';

function OrderPage() {
  const dispatch = useDispatch();

  const transaksi = useSelector((state) => state.transaksi);

  let [isShowed, setIsShowed] = React.useState(false);

  useEffect(() => {
    dispatch(fetchTransaksi());
  }, [dispatch, transaksi.page, transaksi.date]);

  useEffect(() => {
    dispatch(fetchListKomiks());
  }, [dispatch]);

  const displayDate = `${
    transaksi.date?.startDate ? formatDate(transaksi.date?.startDate) : ''
  }${transaksi.date?.endDate ? ' - ' + formatDate(transaksi.date.endDate) : ''}`;

  return (
    <Container className="mt-3">
      <KBreadcrumb textSecound={'transaksi'} />
      <Row>
        <Col
          sm={4}
          className="cursor-pointer position-relative"
          onClick={() => setIsShowed(true)}
        >
          <SearchInput disabled query={displayDate} />
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

      <Table
        status={transaksi.status}
        thead={[
          'Nama',
          'Email',
          'Judul',
          'Tanggal Event',
          'Tanggal Order',
          'Tempat',
        ]}
        data={transaksi.data}
        tbody={['name', 'email', 'title', 'date', 'orderDate', 'venueName']}
        pages={transaksi.pages}
        actionNotDisplay
        handlePageClick={({ selected }) => dispatch(setPage(selected + 1))}
      />
    </Container>
  );
}

export default OrderPage;
