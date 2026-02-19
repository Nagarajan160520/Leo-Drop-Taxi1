import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { FaInfoCircle, FaRupeeSign, FaClock, FaCar, FaMapMarkerAlt, FaPhone, FaWhatsapp } from 'react-icons/fa';

const CustomerInfo = () => {
  return (
    <div className="fade-in py-5">
      <Container>
        <h1 className="text-center mb-5">
          <span className="text-warning">Customer</span> Information
        </h1>

        <Row>
          <Col lg={8} className="mx-auto">
            <Card className="border-0 shadow mb-4">
              <Card.Body className="p-5">
                <h4 className="text-warning mb-4">
                  <FaInfoCircle className="me-2" />
                  Fare Details Above
                </h4>

                <ListGroup variant="flush">
                  <ListGroup.Item className="px-0">
                    <strong className="text-warning">•</strong> Toll fees, Inter-State Permit charges (if any) are extra.
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0">
                    <strong className="text-warning">•</strong> Drop Trips - Driver Bata For Sedan Rs.400 & SUV Rs.500
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0">
                    <strong className="text-warning">•</strong> Waiting Charges Rs.150 per hour
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0">
                    <strong className="text-warning">•</strong> Drop Trips - Minimum running must be 130kms per day
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0">
                    <strong className="text-warning">•</strong> Round Trips - Driver Bata Sedan Rs.400 & SUV Rs.500/- per day
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0">
                    <strong className="text-warning">•</strong> Round Trips - Minimum running must be 250kms per day. For Bengaluru it is minimum 300kms per day.
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0">
                    <strong className="text-warning">•</strong> Hill station charges - Sedan Rs.400 & SUV Rs.500
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0">
                    <strong className="text-warning">•</strong> 1 day means 1 calendar day (from midnight 12 to Next Midnight 12)
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>

            {/* Stats Card */}
            <Card className="border-0 shadow mb-4 bg-warning">
              <Card.Body className="p-5 text-center">
                <h2 className="fw-bold mb-3">15000+ TRIPS COMPLETED</h2>
                <p className="mb-4">
                  We are proud to announce that we have successfully completed over 15,000 trips! 
                  This milestone reflects the trust our customers place in us and our commitment 
                  to providing safe, reliable, and comfortable rides.
                </p>
                <a href="tel:+917200343435" className="btn btn-dark btn-lg rounded-pill px-5">
                  <FaPhone className="me-2" /> CALL NOW →
                </a>
              </Card.Body>
            </Card>

            {/* 24/7 Support */}
            <Card className="border-0 shadow">
              <Card.Body className="p-5 text-center">
                <h4 className="fw-bold mb-3">24x7 CUSTOMER SUPPORT</h4>
                <p className="text-secondary mb-4">
                  Anytime, Anywhere. We are available 24/7 to assist with bookings, 
                  queries, or emergencies—because your journey matters to us, day or night.
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <a href="tel:+917200343435" className="btn btn-outline-dark rounded-pill px-4">
                    <FaPhone className="me-2" /> Call Us
                  </a>
                  <a href="https://wa.me/917200343435" target="_blank" rel="noopener noreferrer" className="btn btn-success rounded-pill px-4">
                    <FaWhatsapp className="me-2" /> WhatsApp
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CustomerInfo;