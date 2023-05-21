import React, { useState } from 'react';
import { Container, Form, Card } from 'react-bootstrap';
import TextInputWithLabel from '../../components/TextInputWithLabel';
import KButton from './../../components/Button';
import axios from 'axios';
import KAlert from '../../components/Alert';

export default function PageSignin() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:9000/api/v1/cms/auth/signin', {
        email: form.email,
        password: form.password,
      });

      console.log(res)
    } catch (err) {
      console.log(err.response.data.msg)
    }
    
  }

  return (
    <Container md={12}>
      <Card style={{ width: '50%' }} className="m-auto mt-5">
        <KAlert type="danger" message="test" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
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
            <KButton variant="secondary" action={handleSubmit}>
              Submit
            </KButton>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
