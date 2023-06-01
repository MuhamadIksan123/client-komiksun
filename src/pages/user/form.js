import React from 'react';
import { Col, Figure, Form, Row } from 'react-bootstrap';
import Button from '../../components/Button';
import TextInputWithLabel from '../../components/TextInputWithLabel';
import SelectBoxMulti from '../../components/SelectBoxMulti';
import { config } from '../../configs';
import SelectBox from '../../components/SelectBox';

export default function UserForm({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
  lists,
  rol,
  stat,
  handleChangeKomik,
}) {
  return (
    <Form className="mb-2">
      <Row>
        <Col>
          <TextInputWithLabel
            placeholder={'Masukan nama lengkap'}
            label={'Nama'}
            name="nama"
            value={form.nama}
            type="text"
            onChange={handleChange}
          />
        </Col>
        <Col>
          <TextInputWithLabel
            placeholder={'Masukan email'}
            label={'Email'}
            name="email"
            value={form.email}
            type="text"
            onChange={handleChange}
          />
        </Col>
      </Row>
      {edit ? (
        ''
      ) : (
        <Row>
          <Col>
            <TextInputWithLabel
              placeholder={'Masukan password'}
              label={'Password'}
              name="password"
              value={form.password}
              type="text"
              onChange={handleChange}
            />
          </Col>
          <Col>
            <TextInputWithLabel
              placeholder={'Masukan konfirmasi password'}
              label={'Konfirmasi Password'}
              name="confirmPassword"
              value={form.confirmPassword}
              type="text"
              onChange={handleChange}
            />
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          {/* <TextInputWithLabel
            placeholder={'Masukan role'}
            label={'Role'}
            name="role"
            value={rol.id}
            type="text"
            onChange={handleChange}
          /> */}
          <SelectBox
            label={'Role'}
            placeholder={'Pilih role'}
            name="role"
            value={form.role}
            options={rol}
            isClearable={true}
            handleChange={(e) => handleChange(e)}
          />
        </Col>
        <Col>
          <TextInputWithLabel
            placeholder={'Masukan tanggal lahir'}
            label={'Tanggal Lahir'}
            name="lahir"
            value={form.lahir}
            type="datetime-local"
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          {/* <TextInputWithLabel
            placeholder={'Masukan status'}
            label={'Status'}
            name="status"
            value={form.status}
            type="text"
            onChange={handleChange}
          /> */}
          <SelectBox
            label={'Status'}
            placeholder={'Pilih status'}
            name="role"
            value={form.status}
            options={stat}
            isClearable={true}
            handleChange={(e) => handleChange(e)}
          />
        </Col>
        <Col>
          <TextInputWithLabel
            placeholder={'Masukan kode otp'}
            label={'Kode OTP'}
            name="otp"
            value={form.otp}
            type="text"
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <TextInputWithLabel
            placeholder={'Masukan nomor handphone'}
            label={'Nomor HP'}
            name="nomor"
            value={form.nomor}
            type="text"
            onChange={handleChange}
          />
        </Col>
        <Col>
          <SelectBoxMulti
            label={'Komik'}
            placeholder={'Masukan komik'}
            name="komik"
            value={form.komik}
            options={lists.komiks}
            isClearable={true}
            handleChangeKomik={handleChange}
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
