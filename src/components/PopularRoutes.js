import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { FaRupeeSign, FaMountain, FaWater, FaTree, FaSun, FaCloudSun, FaRoad } from 'react-icons/fa';

const PopularRoutes = () => {
  const routes = [
    {
      from: 'Chennai',
      to: 'Kodaikanal',
      icon: <FaMountain />,
      image: 'https://i.pinimg.com/736x/88/70/b3/8870b3ccb1791acc57c6a5771dc9fab8.jpg',
      description: 'Princess of Hill Stations - Scenic beauty & pleasant climate',
      cars: [
        { type: 'SEDAN', oneWay: 14, roundTrip: 13 },
        { type: 'ETIOS', oneWay: 15, roundTrip: 14 },
        { type: 'SUV', oneWay: 19, roundTrip: 18 },
        { type: 'INNOVA', oneWay: 20, roundTrip: 18 }
      ]
    },
    {
      from: 'Chennai',
      to: 'Coutralam',
      icon: <FaWater />,
      image: 'https://i.pinimg.com/736x/39/4d/db/394ddb010d843e99f28b76b01ad7e88a.jpg',
      description: 'Famous waterfalls & natural spa - The Spa of South India',
      cars: [
        { type: 'SEDAN', oneWay: 14, roundTrip: 13 },
        { type: 'ETIOS', oneWay: 15, roundTrip: 14 },
        { type: 'SUV', oneWay: 19, roundTrip: 18 },
        { type: 'INNOVA', oneWay: 20, roundTrip: 18 }
      ]
    },
    {
      from: 'Chennai',
      to: 'Kanniyakumari',
      icon: <FaSun />,
      image: 'https://i.pinimg.com/736x/6e/ad/4c/6ead4caddfb2d3c18ae1bc89ce303e95.jpg',
      description: 'Southernmost tip of India - Sunrise & sunset view',
      cars: [
        { type: 'SEDAN', oneWay: 14, roundTrip: 13 },
        { type: 'ETIOS', oneWay: 15, roundTrip: 14 },
        { type: 'SUV', oneWay: 19, roundTrip: 18 },
        { type: 'INNOVA', oneWay: 20, roundTrip: 18 }
      ]
    },
    {
      from: 'Tenkasi',
      to: 'Chennai',
      icon: <FaRoad />,
      image: 'https://i.pinimg.com/1200x/7a/76/1d/7a761d0c69df3858fceff11ef8708f48.jpg',
      description: 'Temple town to Metropolitan city - Comfortable journey',
      cars: [
        { type: 'SEDAN', oneWay: 14, roundTrip: 13 },
        { type: 'ETIOS', oneWay: 15, roundTrip: 14 },
        { type: 'SUV', oneWay: 19, roundTrip: 18 },
        { type: 'INNOVA', oneWay: 20, roundTrip: 18 }
      ]
    },
    {
      from: 'Chennai',
      to: 'Karnataka',
      icon: <FaTree />,
      image: 'https://i.pinimg.com/736x/fb/62/06/fb62061fdbe9104bb309b580f12542f5.jpg',
      description: 'Explore the beauty of Karnataka - Mysore, Coorg & more',
      cars: [
        { type: 'SEDAN', oneWay: 14, roundTrip: 13 },
        { type: 'ETIOS', oneWay: 15, roundTrip: 14 },
        { type: 'SUV', oneWay: 19, roundTrip: 18 },
        { type: 'INNOVA', oneWay: 20, roundTrip: 18 }
      ]
    },
    {
      from: 'Chennai',
      to: 'Ooty',
      icon: <FaCloudSun />,
      image: 'https://i.pinimg.com/1200x/c1/91/b0/c191b01fe2db4038835c96af3f4cc988.jpg',
      description: 'Queen of Hill Stations - Tea gardens & misty mountains',
      cars: [
        { type: 'SEDAN', oneWay: 14, roundTrip: 13 },
        { type: 'ETIOS', oneWay: 15, roundTrip: 14 },
        { type: 'SUV', oneWay: 19, roundTrip: 18 },
        { type: 'INNOVA', oneWay: 20, roundTrip: 18 }
      ]
    }
  ];

  return (
    <div className="fade-in py-5">
      <Container>
        <h1 className="text-center mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
          <span className="text-warning">Popular</span> Routes
        </h1>

        <Row>
          {routes.map((route, index) => (
            <Col lg={6} key={index} className="mb-4">
              <Card className="border-0 shadow h-100" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                {/* Route Image */}
                <div className="position-relative" style={{ height: '200px', overflow: 'hidden' }}>
                  <img 
                    src={route.image} 
                    alt={`${route.from} to ${route.to}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    className="route-image"
                  />
                  <div 
                    className="position-absolute bottom-0 start-0 w-100 p-3"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                      color: 'white'
                    }}
                  >
                    <h4 className="fw-bold mb-1">
                      {route.from} to {route.to}
                    </h4>
                    <p className="mb-0 small">{route.description}</p>
                  </div>
                </div>

                <Card.Body className="p-4">
                  {/* Route Header with Icon */}
                  <div className="d-flex align-items-center mb-4">
                    <div className="bg-warning text-dark rounded-circle p-3 me-3" style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="fs-3">{route.icon}</span>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">
                        {route.from} → {route.to}
                      </h5>
                      <p className="text-secondary mb-0 small">
                        Distance: Approx {index === 0 ? '520' : index === 1 ? '650' : index === 2 ? '720' : index === 3 ? '580' : index === 4 ? '680' : '570'} km
                      </p>
                    </div>
                  </div>

                  {/* Tariff Table - Exactly like screenshot */}
                  <Table striped bordered hover responsive className="mb-4">
                    <thead className="bg-warning">
                      <tr>
                        <th className="fw-bold">VEHICLE TYPE</th>
                        <th className="fw-bold">ONE WAY TRIP</th>
                        <th className="fw-bold">ROUND TRIP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {route.cars.map((car, idx) => (
                        <tr key={idx}>
                          <td className="fw-bold">{car.type}</td>
                          <td>
                            <FaRupeeSign className="me-1 text-warning" />
                            {car.oneWay} / km
                          </td>
                          <td>
                            <FaRupeeSign className="me-1 text-warning" />
                            {car.roundTrip} / km
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  {/* Included With Section - Exactly like screenshot */}
                  <div className="mt-3">
                    <h6 className="fw-bold mb-3" style={{ color: '#333' }}>INCLUDED WITH</h6>
                    <Row>
                      <Col xs={6}>
                        <ul className="list-unstyled">
                          <li className="mb-2 d-flex align-items-center">
                            <span className="text-warning me-2 fw-bold">•</span>
                            <span>DRIVER BATA <strong>₹400</strong></span>
                          </li>
                          <li className="mb-2 d-flex align-items-center">
                            <span className="text-warning me-2 fw-bold">•</span>
                            <span>HILLSTATION CHARGES <strong>₹300</strong></span>
                          </li>
                        </ul>
                      </Col>
                      <Col xs={6}>
                        <ul className="list-unstyled">
                          <li className="mb-2 d-flex align-items-center">
                            <span className="text-warning me-2 fw-bold">•</span>
                            <span>OTHER STATE PERMIT</span>
                          </li>
                          <li className="mb-2 d-flex align-items-center">
                            <span className="text-warning me-2 fw-bold">•</span>
                            <span>TOLL & PARKING</span>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </div>

                  {/* Book Now Button */}
                  <div className="mt-4">
                    <a href="/booking" className="text-decoration-none">
                      <button className="btn btn-warning w-100 fw-bold py-2" style={{ borderRadius: '10px' }}>
                        Book This Route
                      </button>
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Additional Information */}
        <Card className="border-0 shadow mt-4" style={{ borderRadius: '15px', backgroundColor: '#fff3cd' }}>
          <Card.Body className="p-4">
            <h5 className="fw-bold mb-4" style={{ color: '#856404' }}>ROUTE INFORMATION</h5>
            <Row>
              <Col md={6}>
                <ul className="list-unstyled">
                  <li className="mb-3 d-flex">
                    <span className="text-warning me-2 fw-bold">•</span>
                    <span>All rates are per kilometer and include driver charges</span>
                  </li>
                  <li className="mb-3 d-flex">
                    <span className="text-warning me-2 fw-bold">•</span>
                    <span>Minimum 130 KM applicable for one-way trips</span>
                  </li>
                  <li className="mb-3 d-flex">
                    <span className="text-warning me-2 fw-bold">•</span>
                    <span>Round trip minimum 250 KM per day</span>
                  </li>
                </ul>
              </Col>
              <Col md={6}>
                <ul className="list-unstyled">
                  <li className="mb-3 d-flex">
                    <span className="text-warning me-2 fw-bold">•</span>
                    <span>Driver bata: Sedan ₹400, SUV/INNOVA ₹500 per day</span>
                  </li>
                  <li className="mb-3 d-flex">
                    <span className="text-warning me-2 fw-bold">•</span>
                    <span>Toll, parking, and state permit charges extra</span>
                  </li>
                  <li className="mb-3 d-flex">
                    <span className="text-warning me-2 fw-bold">•</span>
                    <span>24/7 customer support for all routes</span>
                  </li>
                </ul>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      {/* Custom CSS */}
      <style>{`
        .route-image {
          transition: transform 0.5s ease;
        }
        .route-image:hover {
          transform: scale(1.1);
        }
        .table thead th {
          background-color: #ffc107 !important;
          color: #000;
          font-weight: 600;
          border: none;
        }
        .table td {
          vertical-align: middle;
        }
        .badge {
          font-size: 0.8rem;
          padding: 0.5rem 1rem;
        }
        @media (max-width: 768px) {
          h1 {
            font-size: 1.8rem !important;
          }
          .p-4 {
            padding: 1.2rem !important;
          }
          .fs-3 {
            font-size: 1.5rem !important;
          }
          .rounded-circle {
            width: 50px !important;
            height: 50px !important;
          }
          .table td, .table th {
            font-size: 0.85rem;
            padding: 0.5rem;
          }
        }
        @media (max-width: 576px) {
          .col-6 {
            flex: 0 0 100%;
            max-width: 100%;
          }
          .list-unstyled li {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PopularRoutes;