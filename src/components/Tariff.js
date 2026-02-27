import React from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import { FaRupeeSign, FaInfoCircle } from 'react-icons/fa';

const Tariff = () => {
  const cars = [
    {
      name: 'SEDAN',
      
      oneWayRate: 14,
      roundTripRate: 13,
      minKmOneWay: 130,
      minKmRoundTrip: 250,
      driverBata: 400,
      hillCharges: 300,
      permitCharge: 14,
      images: [
        { url: 'https://i.pinimg.com/736x/0e/0d/a2/0e0da2818b70f0eed5f478bd4a893b13.jpg', model: 'TATA ZEST' },
        { url: 'https://i.pinimg.com/736x/0e/0d/a2/0e0da2818b70f0eed5f478bd4a893b13.jpg', model: 'SWIFT DZIRE' },
        { url: 'https://i.pinimg.com/736x/b9/2a/2e/b92a2e7f7a93315f337daffcbb0f76d1.jpg', model: 'HYNDAI AURA' }
      ]
    },
    {
      name: 'SEDAN',
      
      oneWayRate: 15,
      roundTripRate: 14,
      minKmOneWay: 130,
      minKmRoundTrip: 250,
      driverBata: 400,
      hillCharges: 300,
      permitCharge: 14,
      images: [
               { url: 'https://i.pinimg.com/736x/b9/2a/2e/b92a2e7f7a93315f337daffcbb0f76d1.jpg', model: 'NISSIAN SUNNY' },
        { url: 'https://i.pinimg.com/736x/b9/2a/2e/b92a2e7f7a93315f337daffcbb0f76d1.jpg', model: 'TOYOTA ETIOS' },
        { url: 'https://i.pinimg.com/1200x/65/c3/63/65c3636ca6b81584e53084c105c7a54d.jpg', model: 'MARUTI CIAZ' }
      ]
    },
    {
      name: 'SUV',
     
      oneWayRate: 19,
      roundTripRate: 18,
      minKmOneWay: 130,
      minKmRoundTrip: 250,
      driverBata: 500,
      hillCharges: 500,
      permitCharge: 14,
      images: [
       { url: 'https://i.pinimg.com/736x/41/22/c1/4122c1500586bffc01010a1b1611e3a1.jpg', model: 'XYLO' },
        { url: 'https://i.pinimg.com/736x/41/22/c1/4122c1500586bffc01010a1b1611e3a1.jpg', model: 'MARUTI ERTIGA' },
        { url: 'https://i.pinimg.com/1200x/e1/d6/29/e1d629e06e9cfa85539a54f7cce5de7b.jpg', model: 'MARAZZO' }
      ]
    },
    {
      name: 'INNOVA',
      
      oneWayRate: 20,
      roundTripRate: 19,
      minKmOneWay: 130,
      minKmRoundTrip: 250,
      driverBata: 500,
      hillCharges: 500,
      permitCharge: 14,
      images: [
        { url: 'https://i.pinimg.com/1200x/e1/d6/29/e1d629e06e9cfa85539a54f7cce5de7b.jpg', model: 'INNOVA ' },
        { url: 'https://i.pinimg.com/1200x/e1/d6/29/e1d629e06e9cfa85539a54f7cce5de7b.jpg', model: 'INNOVA CRYSTA' },
        { url: 'https://i.pinimg.com/736x/41/22/c1/4122c1500586bffc01010a1b1611e3a1.jpg', model: 'INNOVA VEHICLE' }
      ]
    }
  ];

  // Letter styling for consistent fonts
  const letterStyle = {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontWeight: '600',
    letterSpacing: '-0.02em',
    lineHeight: '1.4'
  };

  const headingStyle = {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontWeight: '700',
    letterSpacing: '-0.03em',
    lineHeight: '1.3'
  };

  const boldStyle = {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontWeight: '800',
    letterSpacing: '-0.02em'
  };

  return (
    <div className="fade-in py-5">
      <Container>
        <h1 className="text-center mb-5" style={{ 
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          ...headingStyle
        }}>
          <span className="text-warning" style={headingStyle}>Outstation</span> Tariff
        </h1>

        <Row>
          {cars.map((car, index) => (
            <Col lg={6} md={6} key={index} className="mb-5">
              <Card className="border-0 shadow h-100" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                {/* Carousel Image Section */}
                <Carousel 
                  interval={3000}
                  indicators={true}
                  controls={true}
                  pause="hover"
                  style={{ height: '280px' }}
                  className="carousel-container"
                >
                  {car.images.map((imageObj, imgIndex) => (
                    <Carousel.Item key={imgIndex}>
                      <img
                        className="d-block w-100"
                        src={imageObj.url}
                        alt={`${car.name} - ${car.mainModel} - ${imageObj.model}`}
                        style={{
                          width: '100%',
                          height: '280px',
                          objectFit: 'cover',
                          objectPosition: 'center'
                        }}
                        loading="lazy"
                      />
                      <Carousel.Caption style={{ 
                        bottom: '0', 
                        left: '0', 
                        right: '0', 
                        background: 'linear-gradient(to top, rgba(228, 242, 36, 0.9), transparent)', 
                        textAlign: 'left',
                        padding: '15px'
                      }}>
                        <h5 className="fw-bold mb-1" style={{ 
                          ...headingStyle, 
                          fontSize: '1.1rem',
                          color: '#FFD700'
                        }}>
                          {car.name} {car.mainModel}  {/* DASH REMOVED - NOW JUST A SPACE */}
                        </h5>
                        <p className="mb-0 small" style={{ 
                          ...letterStyle, 
                          color: '#FFFFFF',
                          fontSize: '0.9rem'
                        }}>
                          {imageObj.model}
                        </p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>

                <Card.Body className="p-4">
                  {/* Tariff Section */}
                  <div className="mb-4">
                    <h5 className="fw-bold mb-3" style={{ fontSize: '1.2rem', ...headingStyle }}>TARIFF</h5>
                    
                    <Row className="g-3">
                      <Col xs={6}>
                        <div 
                          className="p-3 rounded text-center" 
                          style={{ 
                            backgroundColor: '#fff3cd',
                            border: '1px solid #ffc107'
                          }}
                        >
                          <h6 className="fw-bold mb-2" style={boldStyle}>ONE WAY</h6>
                          <h2 className="text-warning fw-bold mb-1" style={boldStyle}>
                            <FaRupeeSign className="me-1" size={20} />
                            {car.oneWayRate}<small style={{ fontSize: '0.9rem' }}>/KM</small>
                          </h2>
                          <small className="text-muted" style={letterStyle}>
                            (Min {car.minKmOneWay} KM)
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
                          <h6 className="fw-bold mb-2" style={boldStyle}>ROUND TRIP</h6>
                          <h2 className="text-warning fw-bold mb-1" style={boldStyle}>
                            <FaRupeeSign className="me-1" size={20} />
                            {car.roundTripRate}<small style={{ fontSize: '0.9rem' }}>/KM</small>
                          </h2>
                          <small className="text-muted" style={letterStyle}>
                            (Min {car.minKmRoundTrip} KM)
                          </small>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  {/* Included With Section */}
                  <div>
                    <h6 className="fw-bold mb-3" style={headingStyle}>
                      <FaInfoCircle className="text-warning me-2" />
                      INCLUDE WITH
                    </h6>
                    
                    <Row>
                      <Col xs={6}>
                        <ul className="list-unstyled">
                          <li className="mb-3 d-flex align-items-center" style={letterStyle}>
                            <span className="text-warning me-2 fw-bold">•</span>
                            <span>Driver Bata <strong className="ms-1" style={boldStyle}>₹{car.driverBata}</strong></span>
                          </li>
                          <li className="mb-3 d-flex align-items-center" style={letterStyle}>
                            <span className="text-warning me-2 fw-bold">•</span>
                            <span>Hillstation Charges <strong className="ms-1" style={boldStyle}>₹{car.hillCharges}</strong></span>
                          </li>
                        </ul>
                      </Col>
                      <Col xs={6}>
                        <ul className="list-unstyled">
                          <li className="mb-3 d-flex align-items-center" style={letterStyle}>
                            <span className="text-warning me-2 fw-bold">•</span>
                            <span>Other State Permit <strong className="ms-1" style={boldStyle}>₹{car.permitCharge}/KM</strong></span>
                          </li>
                          <li className="mb-3 d-flex align-items-center" style={letterStyle}>
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

        {/* Additional Information Card */}
        <Card className="border-0 shadow mt-4" style={{ borderRadius: '15px', backgroundColor: '#fff3cd' }}>
          <Card.Body className="p-4">
            <h5 className="fw-bold mb-4" style={{ color: '#856404', ...headingStyle }}>FOR CUSTOMER INFORMATION</h5>
            <Row>
              <Col md={6}>
                <ul className="list-unstyled">
                  <li className="mb-3 d-flex" style={letterStyle}>
                    <span className="text-warning me-2 fw-bold">•</span>
                    <span>Toll fees, Inter-State Permit charges (if any) are extra.</span>
                  </li>
                  <li className="mb-3 d-flex" style={letterStyle}>
                    <span className="text-warning me-2 fw-bold">•</span>
                    <span>Drop Trips - Driver Bata For Sedan Rs.400 & SUV Rs.500</span>
                  </li>
                  <li className="mb-3 d-flex" style={letterStyle}>
                    <span className="text-warning me-2 fw-bold">•</span>
                    <span>Waiting Charges Rs.150 per hour</span>
                  </li>
                  <li className="mb-3 d-flex" style={letterStyle}>
                    <span className="text-warning me-2 fw-bold">•</span>
                    <span>Drop Trips - Minimum running must be 130kms per day</span>
                  </li>
                </ul>
              </Col>
              <Col md={6}>
                <ul className="list-unstyled">
                  <li className="mb-3 d-flex" style={letterStyle}>
                    <span className="text-warning me-2 fw-bold">•</span>
                    <span>Round Trips - Driver Bata Sedan Rs.400 & SUV Rs.500/- per day</span>
                  </li>
                  <li className="mb-3 d-flex" style={letterStyle}>
                    <span className="text-warning me-2 fw-bold">•</span>
                    <span>Round Trips - Minimum running must be 250kms per day</span>
                  </li>
                  <li className="mb-3 d-flex" style={letterStyle}>
                    <span className="text-warning me-2 fw-bold">•</span>
                    <span>For Bengaluru it is minimum 300kms per day</span>
                  </li>
                  <li className="mb-3 d-flex" style={letterStyle}>
                    <span className="text-warning me-2 fw-bold">•</span>
                    <span>Hill station charges - Sedan Rs.400 & SUV Rs.500</span>
                  </li>
                  <li className="mb-3 d-flex" style={letterStyle}>
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
            <p className="text-center text-muted small" style={letterStyle}>
              * Rates are subject to change. Please confirm at the time of booking.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Custom CSS for carousel and responsive */}
      <style>{`
        /* Carousel styles */
        .carousel .carousel-indicators {
          margin-bottom: 0.5rem;
        }
        
        .carousel .carousel-indicators button {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin: 0 4px;
        }
        
        .carousel .carousel-control-prev,
        .carousel .carousel-control-next {
          width: 10%;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .carousel-container:hover .carousel-control-prev,
        .carousel-container:hover .carousel-control-next {
          opacity: 1;
        }
        
        .carousel .carousel-control-prev-icon,
        .carousel .carousel-control-next-icon {
          background-color: rgba(0,0,0,0.5);
          border-radius: 50%;
          padding: 10px;
        }
        
        /* Responsive styles */
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
          
          .carousel .carousel-control-prev,
          .carousel .carousel-control-next {
            opacity: 0.5;
          }
          
          .carousel .carousel-caption h5 {
            font-size: 1rem;
          }
          
          .carousel .carousel-caption p {
            font-size: 0.8rem;
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