import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCar, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUser, FaPhone } from 'react-icons/fa';

const API_URL = 'http://localhost:5000/api';

const Booking = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tripType: 'one-way',
    pickupLocation: '',
    dropLocation: '',
    name: user?.name || '',
    mobile: user?.phone || '',
    pickupDate: new Date().toISOString().split('T')[0],
    pickupTime: '',
    carType: ''
  });

  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [fareEstimate, setFareEstimate] = useState(null);

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get current time in HH:MM format
  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Set default time
    setFormData(prev => ({
      ...prev,
      pickupTime: getCurrentTime()
    }));

    // Fetch cars
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${API_URL}/cars`);
        setCars(response.data.data);
      } catch (error) {
        // Fallback car data
        setCars([
          { name: 'SEDAN', displayName: 'SEDAN', oneWayRate: 14 },
          { name: 'ETIOS', displayName: 'ETIOS', oneWayRate: 15 },
          { name: 'SUV', displayName: 'SUV', oneWayRate: 19 },
          { name: 'INNOVA', displayName: 'INNOVA', oneWayRate: 20 }
        ]);
      }
    };
    fetchCars();
  }, []);

  // Update form when user data is available
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        mobile: user.phone || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Calculate fare estimate when car type changes
    if (name === 'carType' && value) {
      const selectedCar = cars.find(c => c.name === value);
      if (selectedCar) {
        // For demo, assume 130km minimum
        const minDistance = formData.tripType === 'one-way' ? 130 : 250;
        const rate = formData.tripType === 'one-way' ? selectedCar.oneWayRate : (selectedCar.oneWayRate - 1);
        const baseFare = rate * minDistance;
        const driverBata = selectedCar.name === 'SUV' || selectedCar.name === 'INNOVA' ? 500 : 400;
        
        setFareEstimate({
          rate,
          minDistance,
          baseFare,
          driverBata,
          total: baseFare + driverBata
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.pickupLocation || !formData.dropLocation || !formData.name || !formData.mobile || !formData.carType) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.mobile.length !== 10 || !/^\d+$/.test(formData.mobile)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);

    try {
      // Store in session storage for confirmation page
      const bookingData = {
        ...formData,
        fareEstimate,
        bookingId: 'BOOK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        bookingDate: new Date().toISOString()
      };
      
      sessionStorage.setItem('currentBooking', JSON.stringify(bookingData));
      
      toast.success('Booking confirmed!');
      navigate('/booking-confirmation');
      
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in py-4">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-4 p-lg-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <h1 className="fw-bold mb-2" style={{ fontSize: '2rem' }}>
                    <span style={{ color: '#000' }}>Lec-Drop</span>{' '}
                    <span style={{ color: '#ffc107' }}>Taxi</span>
                  </h1>
                </div>

                <Form onSubmit={handleSubmit}>
                  {/* Trip Type */}
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold mb-3">Trip Type</Form.Label>
                    <div className="d-flex gap-3">
                      <Form.Check
                        type="radio"
                        id="one-way"
                        name="tripType"
                        value="one-way"
                        checked={formData.tripType === 'one-way'}
                        onChange={handleChange}
                        label={
                          <span>
                            <strong>ONE WAY</strong>
                            <br />
                            <small className="text-muted">(Minimum 130KM)</small>
                          </span>
                        }
                        className="border p-3 rounded flex-fill"
                      />
                      <Form.Check
                        type="radio"
                        id="round-trip"
                        name="tripType"
                        value="round-trip"
                        checked={formData.tripType === 'round-trip'}
                        onChange={handleChange}
                        label={<strong>ROUND TRIP</strong>}
                        className="border p-3 rounded flex-fill"
                      />
                    </div>
                  </Form.Group>

                  {/* Pickup Location */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      <FaMapMarkerAlt className="me-2 text-warning" />
                      Pickup Location *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      placeholder="Enter Pickup Location"
                      required
                      size="lg"
                      className="bg-light"
                    />
                  </Form.Group>

                  {/* Drop Location */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      <FaMapMarkerAlt className="me-2 text-warning" />
                      Drop Location *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="dropLocation"
                      value={formData.dropLocation}
                      onChange={handleChange}
                      placeholder="Enter Drop Location"
                      required
                      size="lg"
                      className="bg-light"
                    />
                  </Form.Group>

                  {/* Name */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      <FaUser className="me-2 text-warning" />
                      Name *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Your Name"
                      required
                      size="lg"
                      className="bg-light"
                    />
                  </Form.Group>

                  {/* Mobile */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      <FaPhone className="me-2 text-warning" />
                      Mobile *
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter Mobile Number"
                      required
                      size="lg"
                      className="bg-light"
                      maxLength="10"
                      pattern="[0-9]{10}"
                    />
                  </Form.Group>

                  {/* Pickup Date & Time */}
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-bold">
                          <FaCalendarAlt className="me-2 text-warning" />
                          Pickup Date *
                        </Form.Label>
                        <Form.Control
                          type="date"
                          name="pickupDate"
                          value={formData.pickupDate}
                          onChange={handleChange}
                          min={getTodayDate()}
                          required
                          size="lg"
                          className="bg-light"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-bold">
                          <FaClock className="me-2 text-warning" />
                          Pickup Time *
                        </Form.Label>
                        <Form.Control
                          type="time"
                          name="pickupTime"
                          value={formData.pickupTime}
                          onChange={handleChange}
                          required
                          size="lg"
                          className="bg-light"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Select Car Type */}
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold mb-3">Select Car Type *</Form.Label>
                    <Row>
                      {cars.map((car) => (
                        <Col xs={6} key={car.name} className="mb-3">
                          <Form.Check
                            type="radio"
                            id={`car-${car.name}`}
                            name="carType"
                            value={car.name}
                            checked={formData.carType === car.name}
                            onChange={handleChange}
                            label={
                              <div className="d-flex justify-content-between align-items-center">
                                <span className="fw-bold">{car.name}</span>
                                <span className="text-warning fw-bold">₹{car.oneWayRate}/km</span>
                              </div>
                            }
                            className="border p-3 rounded"
                          />
                        </Col>
                      ))}
                    </Row>
                  </Form.Group>

                  {/* Fare Estimate */}
                  {fareEstimate && (
                    <Alert variant="info" className="mb-4">
                      <div className="d-flex justify-content-between mb-2">
                        <span>Base Fare (Min {fareEstimate.minDistance}km):</span>
                        <span className="fw-bold">₹{fareEstimate.baseFare}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Driver Bata:</span>
                        <span className="fw-bold">₹{fareEstimate.driverBata}</span>
                      </div>
                      <hr className="my-2" />
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold">Estimated Total:</span>
                        <span className="fw-bold text-warning">₹{fareEstimate.total}</span>
                      </div>
                      <small className="text-muted d-block mt-2">
                        *Toll, state permit & hill charges extra if applicable
                      </small>
                    </Alert>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="warning"
                    size="lg"
                    disabled={loading}
                    className="w-100 fw-bold py-3"
                  >
                    {loading ? 'Booking...' : 'BOOK YOUR OUTSTATION CAB'}
                  </Button>
                  
                  <p className="text-center text-muted mt-3 mb-0 small">
                    ONE WAY OUTSTATION TAXI
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .form-check {
          cursor: pointer;
          transition: all 0.2s;
        }
        .form-check:hover {
          background-color: #fff3cd;
          border-color: #ffc107 !important;
        }
        .form-check-input:checked ~ .form-check-label {
          color: #000;
        }
        .form-check-input:checked {
          background-color: #ffc107;
          border-color: #ffc107;
        }
        .form-check-input:checked + .form-check-label {
          color: #000;
        }
        .bg-light {
          background-color: #f8f9fa !important;
        }
        .form-control:focus {
          border-color: #ffc107;
          box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.25);
        }
      `}</style>
    </div>
  );
};

export default Booking;