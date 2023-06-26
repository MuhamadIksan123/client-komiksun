import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from '../../components/Button';
import TextInputWithLabel from '../../components/TextInputWithLabel';
import SelectBox from '../../components/SelectBox';

export default function ChapterForm({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
  lists,
  customAction,
}) {
  return (
    <Form className="mb-2">
      <Row>
        <Col>
          <TextInputWithLabel
            placeholder={'Masukan judul'}
            label={'Judul'}
            name="judul"
            value={form.judul}
            type="text"
            onChange={handleChange}
          />
        </Col>
        <Col>
          <SelectBox
            label={'Komik'}
            placeholder={'Pilih komik'}
            name="komik"
            value={form.komik}
            options={lists.komiks}
            isClearable={true}
            handleChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <TextInputWithLabel
            placeholder={'Masukan Avatar'}
            label={'Cover'}
            name="document"
            // value={form.document}
            type="file"
            onChange={handleChange}
          />
          {form.document !== '' && (
            <>{customAction && customAction(form.file)}</>
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
