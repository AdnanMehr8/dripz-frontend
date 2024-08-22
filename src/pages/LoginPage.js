import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    if (status === 'succeeded'){
      navigate('/')
    }
  };
  if (status === 'failed')
   {
    return <p className="text-center text-xl text-red-500">Your Request to login has been rejected: {error}</p>;
  }

  return (
    <Container className='login-Container'>
      <div className='login-title-container'>
      <h2 className='text-center'>Login</h2>
      </div>
      <div className='login-seperator'></div>
      {status === 'failed' && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label className='login-label'>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='login-input'
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label className='login-label'>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='login-input'
          />
        </Form.Group>
        <div className='login-btn-container'>
        <Button variant="primary" type="submit" className='login-btn' disabled={status === 'loading'}>
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </Button>

        </div>
        <p className='register-link'>Don't have an account? Click <a href='/register'> Register</a></p>
      </Form>
    </Container>
  );
};

export default LoginPage;
