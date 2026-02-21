import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaRupeeSign, FaInfoCircle } from 'react-icons/fa';

const Tariff = () => {
  const cars = [
    {
      name: 'SEDAN',
      model: 'TATA ZEST',
      oneWayRate: 14,
      roundTripRate: 13,
      minKmOneWay: 130,
      minKmRoundTrip: 250,
      driverBata: 400,
      hillCharges: 300,
      permitCharge: 14,
      image: 'https://i.pinimg.com/1200x/65/c3/63/65c3636ca6b81584e53084c105c7a54d.jpg',
      bgColor: '#f8f9fa'
    },
    {
      name: 'SEDAN',
      model: 'MARUTI CIAZ',
      oneWayRate: 15,
      roundTripRate: 14,
      minKmOneWay: 130,
      minKmRoundTrip: 250,
      driverBata: 400,
      hillCharges: 300,
      permitCharge: 14,
      image: 'https://i.pinimg.com/736x/b9/2a/2e/b92a2e7f7a93315f337daffcbb0f76d1.jpg',
      bgColor: '#f8f9fa'
    },
    {
      name: 'SUV',
      model: 'MARUTI ERTIGA',
      oneWayRate: 19,
      roundTripRate: 18,
      minKmOneWay: 130,
      minKmRoundTrip: 250,
      driverBata: 500,
      hillCharges: 500,
      permitCharge: 14,
      image: 'https://i.pinimg.com/736x/41/22/c1/4122c1500586bffc01010a1b1611e3a1.jpg',
      bgColor: '#f8f9fa'
    },
    {
      name: 'INNOVA',
      model: 'INNOVA',
      oneWayRate: 20,
      roundTripRate: 19,
      minKmOneWay: 130,
      minKmRoundTrip: 250,
      driverBata: 500,
      hillCharges: 500,
      permitCharge: 14,
      image: 'https://i.pinimg.com/1200x/e1/d6/29/e1d629e06e9cfa85539a54f7cce5de7b.jpg',
      bgColor: '#f8f9fa'
    }
  ];

  return (
    <div className="fade-in py-5">
      <Container>
        <h1 className="text-center mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
          <span className="text-warning">Outstation</span> Tariff
        </h1>

        <Row>
          {cars.map((car, index) => (
            <Col lg={6} md={6} key={index} className="mb-5">
              <Card className="border-0 shadow h-100" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                {/* Car Image Section */}
                <div 
                  className="position-relative" 
                  style={{ 
                    height: '280px', 
                    background: `linear-gradient(145deg, ${car.bgColor} 0%, #ffffff 100%)`,
                    borderBottom: '1px solid #eee'
                  }}
                >
                  <img 
                    src={car.image} 
                    alt={`${car.name} - ${car.model}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                  {/* Car Name Overlay */}
                  <div 
                    className="position-absolute bottom-0 start-0 w-100 p-3"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                      color: 'white'
                    }}
                  >
                    <h3 className="fw-bold mb-0">{car.name}</h3>
                    <p className="mb-0">{car.model}</p>
                  </div>
                </div>

                <Card.Body className="p-4">
                  {/* Tariff Section - Exactly like screenshot */}
                  <div className="mb-4">
                    <h5 className="fw-bold mb-3" style={{ fontSize: '1.2rem' }}>TARIFF</h5>
                    
                    <Row className="g-3">
                      <Col xs={6}>
                        <div 
                          className="p-3 rounded text-center" 
                          style={{ 
                            backgroundColor: '#fff3cd',
                            border: '1px solid #ffc107'
                          }}
                        >
                          <h6 className="fw-bold mb-2">ONE WAY</h6>
                          <h2 className="text-warning fw-bold mb-1">
                            <FaRupeeSign className="me-1" size={20} />
                            {car.oneWayRate}<small style={{ fontSize: '0.9rem' }}>/KM</small>
                          </h2>
                          <small className="text-muted">
                            (Minimum coverage {car.minKmOneWay} KM)
                          </small>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div 
                          className="p-3 rounded text-center" 
                          style={{ 
                            backgroundColor: '#fff3cd',
                            border: '1px solid #ffc107'
                          }}
                        >
                          <h6 className="fw-bold mb-2">ROUND TRIP</h6>
                          <h2 className="text-warning fw-bold mb-1">
                            <FaRupeeSign className="me-1" size={20} />
                            {car.roundTripRate}<small style={{ fontSize: '0.9rem' }}>/KM</small>
                          </h2>
                          <small className="text-muted">
                            (Minimum coverage {car.minKmRoundTrip} KM)
                          </small>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  {/* Included With Section - Exactly like screenshot */}
                  <div>
                    <h6 className="fw-bold mb-3">
                      <FaInfoCircle className="text-warning me-2" />
                      INCLUDE WITH
                    </h6>
                    
                    <Row>
                      <Col xs={6}>
                        <ul className="list-unstyled">
                          <li className="mb-3 d-flex align-items-center">
                            <span className="text-warning me-2 fw-bold">•</span>
                            <span>Driver Bata <strong className="ms-1">₹{car.driverBata}</strong></span>
                          </li>
                          <li className="mb-3 d-flex align-items-center">
                            <span className="text-warning me-2 fw-bold">•</span>
                            <span>Hillstation Charges <strong className="ms-1">₹{car.hillCharges}</strong></span>
                          </li>
                        </ul>
                      </Col>
                      <Col xs={6}>
                        <ul className="list-unstyled">
                          <li className="mb-3 d-flex align-items-center">
                            <span className="text-warning me-2 fw-bold">•</span>
                            <span>Other State Permit <strong className="ms-1">₹{car.permitCharge}/KM</strong></span>
                          </li>
                          <li className="mb-3 d-flex align-items-center">
                            <span className="text-warning me-2 fw-bold">•</span>
                            <span>Parking</span>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Additional Information Card - Exactly like screenshot */}
        <Card className="border-0 shadow mt-4" style={{ borderRadius: '15px', backgroundColor: '#fff3cd' }}>
          <Card.Body className="p-4">
            <h5 className="fw-bold mb-4" style={{ color: '#856404' }}>FOR CUSTOMER INFORMATION</h5>
            <Row>
              <Col md={6}>
                <ul className="list-unstyled">
                  <li className="mb-3 d-flex">
                    <span className="text-warning me-2 fw-bold">•</span>
                    <span>Toll fees, Inter-State Permit charges (if any) are extra.</span>
                  </li>
                  <li className="mb-3 d-flex">
                    <span className="text-warning me-2 fw-bold">•</span>
                    <span>Drop Trips - Driver Bata For Sedan Rs.400 & SUV Rs.500</span>
                  </li>
                  <li className="mb-3 d-flex">
                    <span className="text-warning me-2 fw-bold">•</span>
                    <span>Waiting Charges Rs.150 per hour</span>
                  </li>
                  <li className="mb-3 d-flex">
                    <span className="text-warning me-2 fw-bold">•</span>
                    <span>Drop Trips - Minimum running must be 130kms per day</span>
                  </li>
                </ul>
              </Col>
              <Col md={6}>
                <ul className="list-unstyled">
                  <li className="mb-3 d-flex">
                    <span className="text-warning me-2 fw-bold">•</span>
                    <span>Round Trips - Driver Bata Sedan Rs.400 & SUV Rs.500/- per day</span>
                  </li>
                  <li className="mb-3 d-flex">
                    <span className="text-warning me-2 fw-bold">•</span>
                    <span>Round Trips - Minimum running must be 250kms per day</span>
                  </li>
                  <li className="mb-3 d-flex">
                    <span className="text-warning me-2 fw-bold">•</span>
                    <span>For Bengaluru it is minimum 300kms per day</span>
                  </li>
                  <li className="mb-3 d-flex">
                    <span className="text-warning me-2 fw-bold">•</span>
                    <span>Hill station charges - Sedan Rs.400 & SUV Rs.500</span>
                  </li>
                  <li className="mb-3 d-flex">
                    <span className="text-warning me-2 fw-bold">•</span>
                    <span>1 day means 1 calendar day (midnight to midnight)</span>
                  </li>
                </ul>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Note Section */}
        <Row className="mt-5">
          <Col lg={6} className="mx-auto">
            <p className="text-center text-muted small">
              * Rates are subject to change. Please confirm at the time of booking.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Custom CSS for exact match */}
      <style>{`
        @media (max-width: 768px) {
          h1 {
            font-size: 1.8rem !important;
          }
          .p-4 {
            padding: 1.2rem !important;
          }
          .mb-5 {
            margin-bottom: 2rem !important;
          }
          .d-flex.align-items-center span {
            font-size: 0.9rem;
          }
          .col-lg-6, .col-md-6 {
            padding-left: 10px;
            padding-right: 10px;
          }
        }
        @media (max-width: 576px) {
          .p-4 {
            padding: 1rem !important;
          }
          h2 {
            font-size: 1.5rem !important;
          }
          .col-xs-6 {
            flex: 0 0 50%;
            max-width: 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default Tariff;