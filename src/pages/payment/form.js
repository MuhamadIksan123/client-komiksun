import React from 'react';
import { Figure, Form, Row, Col } from 'react-bootstrap';
import Button from '../../components/Button';
import TextInputWithLabel from '../../components/TextInputWithLabel';
import { config } from '../../configs';

export default function SpeakersForm({
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
            placeholder={'Masukan tipe'}
            label={'Tipe'}
            name="type"
            value={form.type}
            type="text"
            onChange={handleChange}
          />
        </Col>
        <Col>
          <TextInputWithLabel
            placeholder={'Masukan nomor transaksi'}
            label={'Nomer Transaksi'}
            name="nomor"
            value={form.nomor}
            type="text"
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <TextInputWithLabel
            placeholder={'Masukan Avatar'}
            label={'Avatar'}
            name="avatar"
            // value={form.avatar}
            type="file"
            onChange={handleChange}
          />
          {form.avatar !== '' && (
            <div>
              <Figure>
                <Figure.Image
                  width={171}
                  height={180}
                  alt="171x180"
                  src={`${config.api_image}/${form.avatar}`}
                />

                <Figure.Caption>Perview image avatar</Figure.Caption>
              </Figure>
            </div>
          )}
        </Col>
        <Col></Col>
      </Row>

      <Button variant="primary" action={handleSubmit} loading={isLoading}>
        {edit ? 'Ubah' : 'Simpan'}
      </Button>
    </Form>
  );
}
