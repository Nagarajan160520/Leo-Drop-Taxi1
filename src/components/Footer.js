import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCar } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Social media links with valid URLs
  const socialLinks = [
    { 
      icon: <FaFacebook />, 
      url: 'https://facebook.com/leodroptaxi', 
      label: 'Facebook',
      color: '#1877f2'
    },
    { 
      icon: <FaTwitter />, 
      url: 'https://twitter.com/leodroptaxi', 
      label: 'Twitter',
      color: '#1da1f2'
    },
    { 
      icon: <FaInstagram />, 
      url: 'https://instagram.com/leodroptaxi', 
      label: 'Instagram',
      color: '#e4405f'
    },
    { 
      icon: <FaYoutube />, 
      url: 'https://youtube.com/@leodroptaxi', 
      label: 'YouTube',
      color: '#ff0000'
    }
  ];

  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <Container>
        <Row className="gy-4">
          <Col lg={4} md={6}>
            <h4 className="text-white mb-4">
              <FaCar className="text-warning me-2" />
              Leo Drop Taxi
            </h4>
            <p className="text-light">
              At <strong>LEO DROP TAXI</strong>, we believe every journey should be safe, 
              comfortable, and on time. Since 2023, we've been proudly serving Tamilnadu, 
              Kerala, Andhra Pradesh, Karnataka, and Pondicherry.
            </p>
            
            {/* Social Links with valid href */}
            <div className="d-flex gap-3 mt-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: social.color,
                    color: 'white',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none'
                  }}
                  aria-label={social.label}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 5px 10px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </Col>

          <Col lg={2} md={6}>
            <h4 className="text-white mb-4">Quick Links</h4>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-light text-decoration-none hover-warning">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/tariff" className="text-light text-decoration-none hover-warning">Tariff</Link>
              </li>
              <li className="mb-2">
                <Link to="/popular-routes" className="text-light text-decoration-none hover-warning">Popular Routes</Link>
              </li>
              <li className="mb-2">
                <Link to="/customer-info" className="text-light text-decoration-none hover-warning">Customer Info</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-light text-decoration-none hover-warning">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-light text-decoration-none hover-warning">Contact</Link>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h4 className="text-white mb-4">Our Services</h4>
            <ul className="list-unstyled">
              <li className="mb-2 text-light">
                <span className="text-warning me-2">🚗</span> One Way Trips
              </li>
              <li className="mb-2 text-light">
                <span className="text-warning me-2">🔄</span> Round Trips
              </li>
              <li className="mb-2 text-light">
                <span className="text-warning me-2">🏔️</span> Hill Station Trips
              </li>
              <li className="mb-2 text-light">
                <span className="text-warning me-2">✈️</span> Airport Transfers
              </li>
              <li className="mb-2 text-light">
                <span className="text-warning me-2">🚐</span> Corporate Travel
              </li>
              <li className="mb-2 text-light">
                <span className="text-warning me-2">👨‍👩‍👧</span> Family Tours
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h4 className="text-white mb-4">Contact Info</h4>
            <div className="d-flex mb-3">
              <FaMapMarkerAlt className="text-warning me-3 mt-1" size={20} />
              <span className="text-light">
                No.71, 18th Block A Type Thiru,<br />
                Avadi, Chennai-600054
              </span>
            </div>
            <div className="d-flex mb-3">
              <FaPhone className="text-warning me-3 mt-1" size={20} />
              <span className="text-light">
                <a href="tel:+916381095854" className="text-light text-decoration-none hover-warning d-block">
                  +91 63810 95854
                </a>
                <a href="tel:+917200343435" className="text-light text-decoration-none hover-warning d-block">
                  +91 72003 43435
                </a>
              </span>
            </div>
            <div className="d-flex mb-3">
              <FaEnvelope className="text-warning me-3 mt-1" size={20} />
              <span className="text-light">
                <a href="mailto:info@leodroptaxi.com" className="text-light text-decoration-none hover-warning d-block">
                  info@leodroptaxi.com
                </a>
                <a href="mailto:support@leodroptaxi.com" className="text-light text-decoration-none hover-warning d-block">
                  support@leodroptaxi.com
                </a>
              </span>
            </div>
          </Col>
        </Row>

        <hr className="bg-secondary" />

        <Row>
          <Col className="text-center">
            <p className="text-light mb-0 small">
              &copy; {currentYear} Leo Drop Taxi. All rights reserved. | 
              <span className="text-warning ms-2">15000+ TRIPS COMPLETED</span>
            </p>
          </Col>
        </Row>
      </Container>

      {/* Custom CSS for hover effects */}
      <style>{`
        .hover-warning:hover {
          color: #ffc107 !important;
          transition: color 0.3s ease;
        }
      `}</style>
    </footer>
  );
};

export default Footer;