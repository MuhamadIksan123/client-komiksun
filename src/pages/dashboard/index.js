import React from 'react';
import { Container } from 'react-bootstrap';
import KBreadcrumb from '../../components/Breadcrumb';

export default function PageDashboard() {
  return (
    <>
      <Container className="mt-3">
        <KBreadcrumb />
        <h1>Dashboard</h1>          
      </Container>
    </>
  );
}
