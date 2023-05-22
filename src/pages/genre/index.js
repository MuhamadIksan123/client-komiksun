import React, { useEffect, useState } from 'react';
import { Container, Table, Spinner } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import KButton from '../../components/Button';
import KBreadcrumb from '../../components/Breadcrumb';
import KNavbar from '../../components/Navbar';
import { config } from '../../configs';
import axios from 'axios';

export default function PageGenre() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getGenreAPI = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${config.api_v1_host}/cms/genre`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTimeout(() => {
          setIsLoading(false);
          setData(res.data.data);
        }, 4000);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };
    getGenreAPI();
  }, []);

  if (!token) return <Navigate to="/signin" replace="true" />;
  return (
    <>
      <KNavbar />
      <Container className="mt-3">
        <KBreadcrumb textSecound="Genre" />
        <KButton variant="primary" action={() => navigate('/genre/create')}>Tambah Data</KButton>

        <Table striped bordered hover variant="dark" className="mt-3">
          <thead>
            <tr>
              <th>Nomor</th>
              <th>Nama</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={data.length + 1} style={{ textAlign: 'center' }}>
                  <div className="flex items-center justify-center">
                    <Spinner animation="border" variant='primary' />
                  </div>
                </td>
              </tr>
            ) : (
              data.map((data, index) => (
                <tr key={index}>
                  <td>{(index += 1)}</td>
                  <td>{data.nama}</td>
                  <td>Action</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
