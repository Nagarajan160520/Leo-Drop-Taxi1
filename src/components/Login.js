import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaCar } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate(redirect);
    }
    setLoading(false);
  };

  return (
    <div className="fade-in">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="bg-warning text-dark rounded-circle d-inline-flex p-3 mb-3">
                    <FaCar size={30} />
                  </div>
                  <h2 className="text-dark">Welcome Back</h2>
                  <p className="text-secondary">Login to Leo Drop Taxi</p>
                </div>

                {error && (
                  <div className="alert alert-danger mb-4">
                    {error}
                  </div>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      <FaEnvelope className="me-2 text-warning" />
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      size="lg"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">
                      <FaLock className="me-2 text-warning" />
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      size="lg"
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button
                      type="submit"
                      variant="warning"
                      size="lg"
                      disabled={loading}
                      className="rounded-pill py-3 fw-bold"
                    >
                      {loading ? 'Logging in...' : 'Login'}
                    </Button>
                  </div>
                </Form>

                <div className="text-center mt-4">
                  <p className="text-secondary">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-warning fw-bold text-decoration-none">
                      Register here
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;