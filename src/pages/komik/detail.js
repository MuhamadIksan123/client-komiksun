import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SBreadCrumb from '../../components/Breadcrumb';
import { useSelector, useDispatch } from 'react-redux';
import { fetchKomik, setKeyword, setGenre } from '../../redux/komik/actions';
import { deleteData, putData } from '../../utils/fetch';
import { fetchListGenres } from '../../redux/lists/actions';
import { accessKomik } from '../../const/access';
import { config } from '../../configs';

function KomikDetail() {
  const { komikId } = useParams();
  const navigate = useNavigate();

  const komik = useSelector((state) => state.komik);

  const [filteredKomikData, setFilteredKomikData] = useState(komik.data);

  useEffect(() => {
        setFilteredKomikData(
          komik.data.filter((item) => item._id === komikId)
        )
    }, []);

 console.log(filteredKomikData);

//   useEffect(() => {
//     dispatch(fetchKomik());
//   }, [dispatch, komik.keyword, komik.genre, komik.vendor]);

//   useEffect(() => {
//     dispatch(fetchListGenres());
//   }, [dispatch]);

  return (
    <Container className="mt-3">
      <SBreadCrumb textSecound={'Komik'} />
      <Row>
        <Col>
          {/* <img
            src={`${config.api_image}/${data[key]}`}
            class="img-fluid"
            alt="Sampul Komik"
          /> */}
        </Col>
        <Col>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"></li>
            <li class="list-group-item">A second item</li>
            <li class="list-group-item">A third item</li>
            <li class="list-group-item">A fourth item</li>
            <li class="list-group-item">And a fifth one</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default KomikDetail;
