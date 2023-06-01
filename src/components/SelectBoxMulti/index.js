import React from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function SelectBoxMulti({
  name,
  options,
  isClearable,
  value,
  placeholder,
  handleChangeKomik,
  label,
}) {
  return (
    <Form.Group className="mb-2">
      {label && <Form.Label>{label}</Form.Label>}
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        name={name}
        isClearable={isClearable}
        placeholder={placeholder}
        options={options}
        onChange={handleChangeKomik}
        value={value}
      />
    </Form.Group>
  );
}
