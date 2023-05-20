import React from 'react'
import PropTypes from 'prop-types';

export default function Input({type, value, name, handleChange}) {
  return <input type={type} value={value} name={name} onChange={handleChange} />
}

Input.defaultProps = {
    name: 'name'
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};


