import React from 'react'
import { Form } from 'react-bootstrap';
import TextInputWithLabel from '../../components/TextInputWithLabel';
import KButton from '../../components/Button';


export default function SForm({form, handleChange, handleSubmit, isLoading}) {
  return (
    <Form>
      <TextInputWithLabel
        label="Email address"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Enter email"
      />
      <TextInputWithLabel
        label="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <KButton
        variant="secondary"
        action={handleSubmit}
        loading={isLoading}
        disabled={isLoading}
      >
        Submit
      </KButton>
    </Form>
  );
}
