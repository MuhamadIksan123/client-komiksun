import React from 'react';
import { Form } from 'react-bootstrap';

function TextInput({
  type,
  name,
  value,
  onChange,
  placeholder,
  onClick,
  disabled,
}) {
  return (
    <Form.Control
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onClick={onClick}
      disabled={disabled}
    />
  );
}

export default TextInput;
