import React from 'react';
import { Col, Figure, Form, Row } from 'react-bootstrap';
import Button from '../../components/Button';
import TextInputWithLabel from '../../components/TextInputWithLabel';
import SelectBox from '../../components/SelectBox';
import { config } from '../../configs';

export default function KomikForm({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
  lists,
  stat,
  jenisKomik
}) {
  return (
    <Form className="mb-2">
      <Row>
        <Col>
          <TextInputWithLabel
            placeholder={'Masukan judul komik'}
            label={'Judul'}
            name="judul"
            value={form.judul}
            type="text"
            onChange={handleChange}
          />
        </Col>
        <Col>
          <TextInputWithLabel
            placeholder={'Masukan penulis komik'}
            label={'Penulis'}
            name="penulis"
            value={form.penulis}
            type="text"
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <TextInputWithLabel
            placeholder={'Masukan sinopsis komik'}
            label={'Sinopsis'}
            name="sinopsis"
            value={form.sinopsis}
            type="text"
            onChange={handleChange}
          />
        </Col>
        <Col>
          <SelectBox
            label={'Genre'}
            placeholder={'Pilih genre komik'}
            name="genre"
            value={form.genre}
            options={lists.genres}
            isClearable={true}
            handleChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <SelectBox
            label={'Status'}
            placeholder={'Pilih status komik'}
            name="status"
            value={form.status}
            options={stat}
            isClearable={true}
            handleChange={(e) => handleChange(e)}
          />
        </Col>
        <Col>
          <TextInputWithLabel
            placeholder={'Masukan harga komik'}
            label={'Harga'}
            name="price"
            value={form.price}
            type="number"
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <SelectBox
            label={'Jenis Komik'}
            placeholder={'Pilih jenis komik'}
            name="jenis"
            value={form.jenis}
            options={jenisKomik}
            isClearable={true}
            handleChange={(e) => handleChange(e)}
          />
        </Col>
        <Col>
          <TextInputWithLabel
            placeholder={'Masukan tanggal rilis'}
            label={'Tanggal Rilis'}
            name="rilis"
            value={form.rilis}
            type="datetime-local"
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <TextInputWithLabel
            placeholder={'Masukan Avatar'}
            label={'Cover'}
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
