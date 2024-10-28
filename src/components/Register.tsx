// src/components/Register.tsx
import React, { useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import axiosInstance from '../api/axios-instance';
import { Link } from 'react-router-dom';

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [formValues, setFormValues] = useState<RegisterFormValues>({
    email: '',
    password: '',
    confirmPassword: '',
  });


  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (formValues.password !== formValues.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formValues.password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }
    const { email, password } = formValues;
    try {
      console.log(axiosInstance)
      const response = await axiosInstance.post("/user/register", { email, password })
      if (response.status == 201) {
        // Created status
        setError(null);
        setSuccess(true);
      }
    } catch (e: any) {
      if (e.status == 409) {
        setError("Email already exists")
      } else {
        setError("Internal server error, please retry again")
      }
    }
    setTimeout(() => {
      setError("")
      setSuccess(false)}
    , 3000); // Hide success message after 3 seconds

  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <Card className="shadow-lg border-0 rounded-4" style={{ width: '24rem'}}>
        <Card.Body className="p-4">
          <h2 className="text-center mb-4 text-primary fw-bold">Register</h2>
          {error && <Alert variant="danger" className="text-center">{error}</Alert>}
          {success && <Alert variant="success" className="text-center">Register successfully!</Alert>}
  
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                required
                className="rounded-3"
              />
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                required
                className="rounded-3"
              />
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleChange}
                required
                className="rounded-3"
              />
            </Form.Group>
  
            <Button variant="primary" type="submit" className="w-100 fw-bold rounded-3">
              Register
            </Button>
            <div className="text-center mt-3">
              <Link to="/login" className="text-decoration-none">
                Have an account? <span className='fw-bold'>LOGIN</span>
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
  
};

export default Register;
