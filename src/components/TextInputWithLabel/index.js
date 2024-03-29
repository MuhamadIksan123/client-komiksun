import React from 'react';
import { Form } from 'react-bootstrap';
import TextInput from '../TextInput';

function TextInputWithLabel({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  onClick,
  disabled
}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <TextInput
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onClick={onClick}
        disabled={disabled}
      />
    </Form.Group>
  );
}

export default TextInputWithLabel;
