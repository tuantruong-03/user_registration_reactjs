// src/components/Login.tsx
import React, { useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import axiosInstance from '../api/axios-instance';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  });

  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = formValues;
    try {
      const response = await axiosInstance.post("/user/login", { email, password });
      if (response.status === 200) {
        setError(null);
        setSuccess(true);
        const { accessToken } = response.data; 
        const cookies = new Cookies(null, {path : '/'})
        cookies.set('accessToken', accessToken)
        navigate("/")
        
      }
    } catch (e: any) {
      if (e.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Internal server error, please try again");
      }
    }

    // Hide success or error message after 3 seconds
    setTimeout(() => {
      setError(null);
      setSuccess(false);
    }, 3000);
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <Card style={{ width: '24rem', boxShadow: '0px 5px 15px rgba(0,0,0,0.2)' }}>
        <Card.Body>
          <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#007bff' }}>Login</h2>
          {error && <Alert variant="danger" className="text-center">{error}</Alert>}
          {success && <Alert variant="success" className="text-center">Login successfully!</Alert>}
  
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '600' }}>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                required
                style={{ borderRadius: '10px' }}
              />
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '600' }}>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                required
                style={{ borderRadius: '10px' }}
              />
            </Form.Group>
  
            <Button variant="primary" type="submit" className="w-100" style={{ fontWeight: 'bold', borderRadius: '8px' }}>
              Login
            </Button>
  
            <div className="text-center mt-3">
              <Link to="/register" className="text-decoration-none">
                Don't have an account? <span style={{ fontWeight: 'bold' }}>REGISTER</span>
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
  
};

export default Login;
