import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import NavLink from '../NavLink';
import { useNavigate } from 'react-router-dom';

function KNavbar() {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink action={() => navigate('/')}>Home</NavLink>
          <NavLink action={() => navigate('/user')}>User</NavLink>
          <NavLink action={() => navigate('/genre')}>Genre</NavLink>
          <NavLink action={() => navigate('/komik')}>Komik</NavLink>
          <NavLink action={() => navigate('/chapter')}>Chapter</NavLink>
          <NavLink action={() => navigate('/transaksi')}>Transaksi</NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default KNavbar;
