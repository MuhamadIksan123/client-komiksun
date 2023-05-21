import React from 'react';
import { Alert } from 'react-bootstrap';

function KAlert({ type, message }) {
  return <Alert variant={type}>{message}</Alert>;
}

export default KAlert;
