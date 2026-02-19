import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCar } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
            <div className="d-flex gap-3 mt-3">
              <a  className="text-white bg-primary p-2 rounded-circle"><FaFacebook /></a>
              <a  className="text-white bg-info p-2 rounded-circle"><FaTwitter /></a>
              <a  className="text-white bg-danger p-2 rounded-circle"><FaInstagram /></a>
              <a  className="text-white bg-danger p-2 rounded-circle"><FaYoutube /></a>
            </div>
          </Col>

          <Col lg={2} md={6}>
            <h4 className="text-white mb-4">Quick Links</h4>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li className="mb-2"><Link to="/tariff" className="text-light text-decoration-none">Tariff</Link></li>
              <li className="mb-2"><Link to="/popular-routes" className="text-light text-decoration-none">Popular Routes</Link></li>
              <li className="mb-2"><Link to="/customer-info" className="text-light text-decoration-none">Customer Info</Link></li>
              <li className="mb-2"><Link to="/about" className="text-light text-decoration-none">About Us</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-light text-decoration-none">Contact</Link></li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h4 className="text-white mb-4">Our Services</h4>
            <ul className="list-unstyled">
              <li className="mb-2 text-light">🚗 One Way Trips</li>
              <li className="mb-2 text-light">🔄 Round Trips</li>
              <li className="mb-2 text-light">🏔️ Hill Station Trips</li>
              <li className="mb-2 text-light">✈️ Airport Transfers</li>
              <li className="mb-2 text-light">🚐 Corporate Travel</li>
              <li className="mb-2 text-light">👨‍👩‍👧 Family Tours</li>
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
                <a href="tel:+916381095854" className="text-light text-decoration-none">+91 63810 95854</a><br />
                <a href="tel:+916381095854" className="text-light text-decoration-none">+91 63810 95854</a>
              </span>
            </div>
            <div className="d-flex mb-3">
              <FaEnvelope className="text-warning me-3 mt-1" size={20} />
              <span className="text-light">
                <a href="nagarajan16052001@gmail.com" className="text-light text-decoration-none">nagarajan16052001.com</a>
              </span>
            </div>
          </Col>
        </Row>

        <hr className="bg-secondary" />

        <Row>
          <Col className="text-center">
            <p className="text-light mb-0">
              &copy; {currentYear} Leo Drop Taxi. All rights reserved. | 
              <span className="text-warning ms-2">15000+ TRIPS COMPLETED</span>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;