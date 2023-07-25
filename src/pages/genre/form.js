import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import SButton from '../../components/Button';
import TextInputWithLabel from '../../components/TextInputWithLabel';

export default function CategoriesForm({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
}) {
  return (
    <Form>
      <Row>
        <Col>
          <TextInputWithLabel
            placeholder={'Masukan nama genre'}
            label={'Nama genre'}
            name="nama"
            value={form.nama}
            type="text"
            onChange={handleChange}
          />
        </Col>
        <Col></Col>
      </Row>
      <SButton variant="primary" action={handleSubmit} loading={isLoading}>
        {edit ? 'Ubah' : 'Simpan'}
      </SButton>
    </Form>
  );
}
