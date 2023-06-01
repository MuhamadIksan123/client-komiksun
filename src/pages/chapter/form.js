import React from 'react';
import {
  Col,
  Figure,
  Form,
  Row,
} from 'react-bootstrap';
import Button from '../../components/Button';
import TextInputWithLabel from '../../components/TextInputWithLabel';
import SelectBox from '../../components/SelectBox';
import { config } from '../../configs';

export default function EventsForm({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
  lists,
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
            placeholder={'Masukan komik'}
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
            <div>
              <Figure>
                <Figure.File
                  width={171}
                  height={180}
                  alt="171x180"
                  src={`${config.api_image}/${form.document}`}
                />

                <Figure.Caption>Perview image cover</Figure.Caption>
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
