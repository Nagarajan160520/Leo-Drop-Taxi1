import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar as BSNavbar, Nav, Container, Button } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaPhone, FaInfoCircle } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <BSNavbar bg="black" variant="dark" expand="lg" className="shadow-lg" sticky="top" style={{ minHeight: '70px' }}>
      <Container>
        <BSNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
          {/* Logo Image - Correct Size & Alignment */}
          <img 
            src="https://i.pinimg.com/1200x/e9/4c/89/e94c89799198b1ecc9721e5f42814f59.jpg" 
            alt="Leo Drop Taxi" 
            style={{ 
              height: '40px', 
              width: '40px', 
              marginRight: '10px',
              objectFit: 'cover',
              borderRadius: '5px'
            }} 
          />
          <span style={{ fontSize: '22px', fontWeight: 'bold', lineHeight: '40px' }}>
            Leo Drop <span className="text-warning">Taxi</span>
          </span>
        </BSNavbar.Brand>

        <BSNavbar.Toggle aria-controls="basic-navbar-nav" className="border-0" style={{ backgroundColor: 'transparent' }}>
          <span className="navbar-toggler-icon"></span>
        </BSNavbar.Toggle>

        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto" style={{ alignItems: 'center' }}>
            <Nav.Link as={Link} to="/" className="text-white mx-2 px-3 py-2">Home</Nav.Link>
            <Nav.Link as={Link} to="/tariff" className="text-white mx-2 px-3 py-2">
               Tariff
            </Nav.Link>
            <Nav.Link as={Link} to="/popular-routes" className="text-white mx-2 px-3 py-2">
              Popular Routes
            </Nav.Link>
            <Nav.Link as={Link} to="/customer-info" className="text-white mx-2 px-3 py-2">
              <FaInfoCircle className="me-1" /> Customer Info
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-white mx-2 px-3 py-2">About</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="text-white mx-2 px-3 py-2">Contact</Nav.Link>
          </Nav>

          <Nav className="align-items-center">
            <a href="tel:+916381095854" className="text-warning me-3 text-decoration-none d-flex align-items-center">
              <FaPhone className="me-1" size={14} /> 
              <span>+91 63810 95854</span>
            </a>
            
            {user ? (
              <div className="d-flex align-items-center">
                <Nav.Link as={Link} to="/my-bookings" className="text-white d-flex align-items-center me-2">
                  <FaUser className="me-1" /> {user.name}
                </Nav.Link>
                <Button variant="outline-warning" onClick={handleLogout} className="rounded-pill px-3 py-1" size="sm">
                  <FaSignOutAlt className="me-1" size={12} /> Logout
                </Button>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <Nav.Link as={Link} to="/login" className="me-2">
                  <Button variant="outline-light" className="rounded-pill px-3 py-1" size="sm">
                    <FaSignInAlt className="me-1" size={12} /> Login
                  </Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <Button variant="warning" className="rounded-pill px-3 py-1" size="sm">
                    <FaUserPlus className="me-1" size={12} /> Register
                  </Button>
                </Nav.Link>
              </div>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;