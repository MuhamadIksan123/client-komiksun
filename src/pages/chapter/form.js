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
            disabled={isLoading} // Menonaktifkan input file saat sedang loading
          />
        </Col>
        <Col>
          <SelectBox
            label={'Komik'}
            placeholder={'Pilih komik'}
            name="komik"
            value={form.komik}
            options={lists.komiks}
            isClearable={false}
            disabled={isLoading} // Menonaktifkan input file saat sedang loading
            handleChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <TextInputWithLabel
            placeholder={'Masukan Avatar'}
            label={'File Komik *PDF'}
            name="document"
            // value={form.document}
            type="file"
            onChange={handleChange}
            disabled={isLoading} // Menonaktifkan input file saat sedang loading
          />
          {form.document !== '' && (
            <>{customAction && customAction(form.file)}</>
          )}
        </Col>
        <Col></Col>
      </Row>

      <Button
        variant="primary"
        action={handleSubmit}
        loading={isLoading}
        disabled={isLoading}
      >
        {edit ? 'Ubah' : 'Simpan'}
      </Button>
    </Form>
  );
}
