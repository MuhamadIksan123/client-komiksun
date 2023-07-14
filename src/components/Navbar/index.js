import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import NavLink from '../NavAccess';
import { useNavigate } from 'react-router-dom';
import {
  accessHome,
  accessUser,
  accessGenre,
  accessKomik,
  accessChapter,
  accessPayment,
  accessTransaksi,
  accessContact,
} from '../../const/access';

function KNavbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      let { role } = localStorage.getItem('auth')
        ? JSON.parse(localStorage.getItem('auth'))
        : {};
        
      setRole(role);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    if (process.env.REACT_APP_HOST_DEV === 'http://localhost:9000/api/v1') {
      localStorage.clear();
      window.location.href = 'http://localhost:8080/signin';
    } else {
      localStorage.clear();
      window.location.href = 'https://landingpage-komiksun.vercel.app/signin';
    }
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink
            role={role}
            roles={accessHome.lihat}
            action={() => navigate('/')}
          >
            Home
          </NavLink>
          <NavLink
            role={role}
            roles={accessUser.lihat}
            action={() => navigate('/user')}
          >
            User
          </NavLink>
          <NavLink
            role={role}
            roles={accessGenre.lihat}
            action={() => navigate('/genre')}
          >
            Genre
          </NavLink>
          <NavLink
            role={role}
            roles={accessKomik.lihat}
            action={() => navigate('/komik')}
          >
            Komik
          </NavLink>
          <NavLink
            role={role}
            roles={accessChapter.lihat}
            action={() => navigate('/chapter')}
          >
            Chapter
          </NavLink>
          <NavLink
            role={role}
            roles={accessPayment.lihat}
            action={() => navigate('/payment')}
          >
            Payment
          </NavLink>
          <NavLink
            role={role}
            roles={accessContact.lihat}
            action={() => navigate('/contact')}
          >
            Contact
          </NavLink>
          <NavLink
            role={role}
            roles={accessTransaksi.lihat}
            action={() => navigate('/transaksi')}
          >
            Order
          </NavLink>
        </Nav>
        <Nav className="justify-content-end">
          <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default KNavbar;
