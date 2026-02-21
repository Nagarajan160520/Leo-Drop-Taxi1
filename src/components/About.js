import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaCar, FaUsers, FaAward, FaHeart, FaHandshake, FaClock, FaMapMarkerAlt, FaPhone,FaRupeeSign  } from 'react-icons/fa';

const About = () => {
  const stats = [
    { icon: <FaCar />, value: '15000+', label: 'Trips Completed' },
    { icon: <FaUsers />, value: '5000+', label: 'Happy Customers' },
    { icon: <FaAward />, value: '10+', label: 'Awards' },
    { icon: <FaHeart />, value: '100+', label: 'Fleet Size' }
  ];

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="bg-warning py-5">
        <Container className="text-center">
          <h1 className="display-4 fw-bold mb-3">About Leo Drop Taxi</h1>
          <p className="lead">
            Your trusted travel partner since 2023
          </p>
        </Container>
      </section>

      <Container className="py-5">
        {/* Stats */}
        <Row className="mb-5">
          {stats.map((stat, index) => (
            <Col lg={3} md={6} key={index} className="mb-4">
              <Card className="text-center p-4 border-0 shadow-sm h-100">
                <div className="text-warning display-1 mb-3">{stat.icon}</div>
                <h2 className="fw-bold mb-2">{stat.value}</h2>
                <p className="text-secondary">{stat.label}</p>
              </Card>
            </Col>
          ))}
        </Row>

        {/* About Content */}
        <Row className="mb-5 align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <img 
              src="https://i.pinimg.com/1200x/65/c3/63/65c3636ca6b81584e53084c105c7a54d.jpg"
              alt="Our Fleet"
              className="img-fluid rounded-3 shadow"
            />
          </Col>
          <Col lg={6}>
            <h2 className="text-warning mb-4">OUR COMPANY</h2>
            <p className="lead mb-4">
              At <strong>Lexus DROP TAXI</strong>, we believe every journey should be safe, 
              comfortable, and on time.
            </p>
            <p className="mb-4">
              Since 2023, we've been proudly serving <strong>Tamilnadu, Kerala, Andra Pradesh, 
              Karnataka, and Pondicherry</strong> with reliable taxi services for locals, travelers, 
              and businesses. From quick city trips to long-distance rides, our professional drivers, 
              well-maintained vehicles, and 24/7 availability ensure you reach your destination 
              without stress or delays.
            </p>
            <div className="d-flex align-items-center">
              <FaHandshake className="text-warning me-3" size={40} />
              <div>
                <h5 className="mb-1">Our Promise</h5>
                <p className="text-secondary mb-0">
                  Safe, comfortable, and on-time service every time
                </p>
              </div>
            </div>
          </Col>
        </Row>

        {/* Mission & Values */}
        <Row className="mb-5">
          <Col md={6} className="mb-4">
            <Card className="border-0 shadow h-100">
              <Card.Body className="p-5">
                <h3 className="text-warning mb-4">Our Mission</h3>
                <p className="lead">
                  To provide fast, friendly, and affordable transportation while keeping 
                  safety and customer satisfaction at the heart of everything we do.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="border-0 shadow h-100">
              <Card.Body className="p-5">
                <h3 className="text-warning mb-4">Why Choose Us</h3>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <FaCar className="text-warning me-3" />
                    Trained & Courteous Drivers - Polite, experienced, and customer-focused.
                  </li>
                  <li className="mb-3">
                    <FaClock className="text-warning me-3" />
                    Always On Time - We value your time as much as you do.
                  </li>
                  <li className="mb-3">
                    <FaRupeeSign className="text-warning me-3" />
                    Fair & Transparent Pricing - No hidden charges.
                  </li>
                  <li className="mb-3">
                    <FaMapMarkerAlt className="text-warning me-3" />
                    GPS-Enabled Vehicles - For real-time tracking and safety.
                  </li>
                  <li className="mb-3">
                    <FaPhone className="text-warning me-3" />
                    24/7 Booking Support - We're always here when you need a ride.
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;