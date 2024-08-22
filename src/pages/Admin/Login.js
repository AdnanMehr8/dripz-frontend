import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/authSlice';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/login.css'
const LoginPage = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
    navigate('/admin')
  };

  return (
    <Container className='login-Container'>
      <div className='login-title-container'>
      <h2 className='text-center'>Login</h2>
      </div>
      <div className='login-seperator'></div>
      {status === 'failed' && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label className='login-label'>username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
      </Form>
    </Container>
  );
};

export default LoginPage;
