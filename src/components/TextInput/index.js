import React from 'react';
import { Form } from 'react-bootstrap';

function TextInput({
  type,
  name,
  value,
  onChange,
  placeholder
}) {
  return (
    <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
    />
  );
}

export default TextInput;