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
              𝓛𝓮𝔁𝓾𝓼 𝓓𝓻𝓸𝓹 𝓣𝓪𝔁𝓲
            </h4>
            <p className="text-light">
              𝓐𝓽 <strong>𝓛𝓮𝔁𝓾𝓼 𝓓𝓡𝓞𝓟 𝓣𝓐𝓧𝓘</strong>, 𝔀𝓮 𝓫𝓮𝓵𝓲𝓮𝓿𝓮 𝓮𝓿𝓮𝓻𝔂 𝓳𝓸𝓾𝓻𝓷𝓮𝔂 𝓼𝓱𝓸𝓾𝓵𝓭 𝓫𝓮 𝓼𝓪𝓯𝓮, 
              𝓬𝓸𝓶𝓯𝓸𝓻𝓽𝓪𝓫𝓵𝓮, 𝓪𝓷𝓭 𝓸𝓷 𝓽𝓲𝓶𝓮. 𝓢𝓲𝓷𝓬𝓮 2023, 𝔀𝓮'𝓿𝓮 𝓫𝓮𝓮𝓷 𝓹𝓻𝓸𝓾𝓭𝓵𝔂 𝓼𝓮𝓻𝓿𝓲𝓷𝓰 𝓣𝓪𝓶𝓲𝓵𝓷𝓪𝓭𝓾, 
              𝓚𝓮𝓻𝓪𝓵𝓪, 𝓐𝓷𝓭𝓱𝓻𝓪 𝓟𝓻𝓪𝓭𝓮𝓼𝓱, 𝓚𝓪𝓻𝓷𝓪𝓽𝓪𝓴𝓪, 𝓪𝓷𝓭 𝓟𝓸𝓷𝓭𝓲𝓬𝓱𝓮𝓻𝓻𝔂.
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
            <h4 className="text-white mb-4">𝓠𝓾𝓲𝓬𝓴 𝓛𝓲𝓷𝓴𝓼</h4>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-light text-decoration-none hover-warning">𝓗𝓸𝓶𝓮</Link>
              </li>
              <li className="mb-2">
                <Link to="/tariff" className="text-light text-decoration-none hover-warning">𝓣𝓪𝓻𝓲𝓯𝓯</Link>
              </li>
              <li className="mb-2">
                <Link to="/popular-routes" className="text-light text-decoration-none hover-warning">𝓟𝓸𝓹𝓾𝓵𝓪𝓻 𝓡𝓸𝓾𝓽𝓮𝓼</Link>
              </li>
              <li className="mb-2">
                <Link to="/customer-info" className="text-light text-decoration-none hover-warning">𝓒𝓾𝓼𝓽𝓸𝓶𝓮𝓻 𝓘𝓷𝓯𝓸</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-light text-decoration-none hover-warning">𝓐𝓫𝓸𝓾𝓽</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-light text-decoration-none hover-warning">𝓒𝓸𝓷𝓽𝓪𝓬𝓽</Link>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h4 className="text-white mb-4">𝓞𝓾𝓻 𝓢𝓮𝓻𝓿𝓲𝓬𝓮𝓼</h4>
            <ul className="list-unstyled">
              <li className="mb-2 text-light">
                <span className="text-warning me-2">🚗</span> 𝓞𝓷𝓮 𝓦𝓪𝔂 𝓣𝓻𝓲𝓹𝓼
              </li>
              <li className="mb-2 text-light">
                <span className="text-warning me-2">🔄</span> 𝓡𝓸𝓾𝓷𝓭 𝓣𝓻𝓲𝓹𝓼
              </li>
              <li className="mb-2 text-light">
                <span className="text-warning me-2">🏔️</span> 𝓗𝓲𝓵𝓵 𝓢𝓽𝓪𝓽𝓲𝓸𝓷 𝓣𝓻𝓲𝓹𝓼
              </li>
              <li className="mb-2 text-light">
                <span className="text-warning me-2">✈️</span> 𝓐𝓲𝓻𝓹𝓸𝓻𝓽 𝓣𝓻𝓪𝓷𝓼𝓯𝓮𝓻𝓼
              </li>
              <li className="mb-2 text-light">
                <span className="text-warning me-2">🚐</span> 𝓒𝓸𝓻𝓹𝓸𝓻𝓪𝓽𝓮 𝓣𝓻𝓪𝓿𝓮𝓵
              </li>
              <li className="mb-2 text-light">
                <span className="text-warning me-2">👨‍👩‍👧</span> 𝓕𝓪𝓶𝓲𝓵𝔂 𝓣𝓸𝓾𝓻𝓼
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h4 className="text-white mb-4">𝓒𝓸𝓷𝓽𝓪𝓬𝓽 𝓘𝓷𝓯𝓸</h4>
            <div className="d-flex mb-3">
              <FaMapMarkerAlt className="text-warning me-3 mt-1" size={20} />
              <span className="text-light">
                𝓝𝓸.71, 18𝓽𝓱 𝓑𝓵𝓸𝓬𝓴 𝓐 𝓣𝔂𝓹𝓮 𝓣𝓱𝓲𝓻𝓾,<br />
                𝓐𝓿𝓪𝓭𝓲, 𝓒𝓱𝓮𝓷𝓷𝓪𝓲-600054
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
                  𝓲𝓷𝓯𝓸@𝓛𝓮𝔁𝓾𝓼𝓭𝓻𝓸𝓹𝓽𝓪𝔁𝓲.𝓬𝓸𝓶
                </a>
                <a href="mailto:support@leodroptaxi.com" className="text-light text-decoration-none hover-warning d-block">
                  𝓼𝓾𝓹𝓹𝓸𝓻𝓽@𝓛𝓮𝔁𝓾𝓼𝓭𝓻𝓸𝓹𝓽𝓪𝔁𝓲.𝓬𝓸𝓶
                </a>
              </span>
            </div>
          </Col>
        </Row>

        <hr className="bg-secondary" />

        <Row>
          <Col className="text-center">
            <p className="text-light mb-0 small">
              &copy; {currentYear} 𝓛𝓮𝔁𝓾𝓼 𝓓𝓻𝓸𝓹 𝓣𝓪𝔁𝓲. 𝓐𝓵𝓵 𝓻𝓲𝓰𝓱𝓽𝓼 𝓻𝓮𝓼𝓮𝓻𝓿𝓮𝓭. | 
              <span className="text-warning ms-2">15000+ 𝓣𝓡𝓘𝓟𝓢 𝓒𝓞𝓜𝓟𝓛𝓔𝓣𝓔𝓓</span>
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