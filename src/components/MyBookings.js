import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner, Modal } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaCar, 
  FaMapMarkerAlt, 
  FaTrash, 
  FaEye,
  FaHistory,
  FaPlusCircle
} from 'react-icons/fa';

const API_URL = 'https://leo-drop-taxi.onrender.com/api';

const MyBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [backendStatus, setBackendStatus] = useState('checking');

  // Check backend status
  useEffect(() => {
    const checkBackend = async () => {
      try {
        await axios.get(`${API_URL}/health`, { timeout: 3000 });
        setBackendStatus('online');
      } catch (error) {
        console.log('Backend offline, using demo data');
        setBackendStatus('offline');
      }
    };
    checkBackend();
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast.info('Please login to view your bookings');
      navigate('/login');
    }
  }, [user, navigate]);

  // Load local bookings function
  const loadLocalBookings = useCallback(() => {
    try {
      const localBookings = JSON.parse(localStorage.getItem('localBookings') || '[]');
      if (localBookings.length > 0) {
        setBookings(localBookings);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error('Error loading local bookings:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch bookings from API
  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login again');
        navigate('/login');
        return;
      }

      const response = await axios.get(`${API_URL}/bookings/mybookings`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 5000
      });
      
      if (response.data.data && response.data.data.length > 0) {
        setBookings(response.data.data);
      } else {
        loadLocalBookings();
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      loadLocalBookings();
    } finally {
      setLoading(false);
    }
  }, [navigate, loadLocalBookings]);

  // Fetch bookings when conditions are met
  useEffect(() => {
    if (user && backendStatus === 'online') {
      fetchBookings();
    } else if (backendStatus === 'offline') {
      loadLocalBookings();
    }
  }, [user, backendStatus, fetchBookings, loadLocalBookings]);

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    // Check if it's a local/demo booking
    if (bookingId.startsWith('BOOK') || bookingId.includes('BOOK')) {
      // Handle local booking cancellation
      setCancelling(bookingId);
      setTimeout(() => {
        const updatedBookings = bookings.filter(b => b.bookingId !== bookingId && b._id !== bookingId);
        setBookings(updatedBookings);
        localStorage.setItem('localBookings', JSON.stringify(updatedBookings));
        setCancelling(null);
        toast.success('Booking cancelled successfully');
      }, 1000);
      return;
    }

    // Real booking cancellation
    setCancelling(bookingId);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Booking cancelled successfully');
      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    } finally {
      setCancelling(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'warning', text: 'Pending' },
      confirmed: { bg: 'success', text: 'Confirmed' },
      cancelled: { bg: 'danger', text: 'Cancelled' },
      completed: { bg: 'info', text: 'Completed' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <Badge bg={config.bg}>{config.text}</Badge>;
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  const getDaysUntilTest = (dateString) => {
    try {
      const testDate = new Date(dateString);
      const today = new Date();
      const diffTime = testDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
        return `in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
      } else if (diffDays === 0) {
        return 'today';
      } else {
        return `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''} ago`;
      }
    } catch (error) {
      return '';
    }
  };

  // Function to scroll to booking form on home page
  const scrollToBookingForm = () => {
    // Navigate to home page
    navigate('/');
    
    // Small delay to ensure home page is loaded
    setTimeout(() => {
      // Find the booking form card and scroll to it
      const formElement = document.querySelector('.card');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Highlight the form briefly
        formElement.style.transition = 'box-shadow 0.3s ease';
        formElement.style.boxShadow = '0 0 0 3px #ffc107, 0 10px 20px rgba(0,0,0,0.2)';
        setTimeout(() => {
          formElement.style.boxShadow = '';
        }, 1500);
      }
    }, 100);
  };

  if (loading) {
    return (
      <div className="spinner-container" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="warning" />
        <p className="mt-3">Loading your bookings...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="fade-in py-5">
      <Container>
        {/* Header with Book a Cab Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">
            <FaHistory className="text-warning me-2" />
            My Bookings
          </h2>
          <Button 
            variant="warning" 
            onClick={scrollToBookingForm}
            className="d-flex align-items-center gap-2"
          >
            <FaPlusCircle />
            <span>Book a Cab</span>
          </Button>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <Card className="text-center p-5 border-0 shadow">
            <Card.Body>
              <FaCar size={60} className="text-secondary mb-3" />
              <h4>No Bookings Found</h4>
              <p className="text-secondary mb-4">
                You haven't booked any cabs yet.
              </p>
              <Button 
                variant="warning" 
                size="lg"
                onClick={scrollToBookingForm}
                className="rounded-pill px-5"
              >
                Book a Cab Now
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Row>
            {bookings.map((booking) => (
              <Col lg={6} key={booking._id || booking.bookingId} className="mb-4">
                <Card className="border-0 shadow h-100">
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h4 className="mb-1">{booking.carType}</h4>
                        <p className="text-secondary mb-0 small">
                          <FaMapMarkerAlt className="me-1" size={12} />
                          {booking.pickupLocation} → {booking.dropLocation}
                        </p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>

                    <Row className="mb-3">
                      <Col xs={6}>
                        <div className="d-flex align-items-center">
                          <FaCalendarAlt className="text-warning me-2" size={14} />
                          <div>
                            <small className="text-secondary d-block">Date</small>
                            <strong className="small">{formatDate(booking.pickupDate)}</strong>
                            <small className="text-muted d-block">
                              {getDaysUntilTest(booking.pickupDate)}
                            </small>
                          </div>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div className="d-flex align-items-center">
                          <FaClock className="text-warning me-2" size={14} />
                          <div>
                            <small className="text-secondary d-block">Time</small>
                            <strong className="small">{formatTime(booking.pickupTime)}</strong>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <div className="bg-light p-3 rounded mb-3">
                      <small className="text-secondary d-block mb-2">Booking Details:</small>
                      <p className="mb-1 small">
                        <strong>Booking ID:</strong> {booking.bookingId || booking._id?.slice(-8).toUpperCase()}
                      </p>
                      <p className="mb-1 small">
                        <strong>Total Fare:</strong> ₹{booking.totalFare || booking.fareEstimate?.total}
                      </p>
                      <p className="mb-0 small">
                        <strong>Booked on:</strong> {formatDate(booking.bookingDate || booking.createdAt)}
                      </p>
                    </div>

                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-warning"
                        size="sm"
                        className="flex-fill"
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowDetailsModal(true);
                        }}
                      >
                        <FaEye className="me-1" /> Details
                      </Button>
                      {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="flex-fill"
                          onClick={() => handleCancel(booking._id || booking.bookingId)}
                          disabled={cancelling === (booking._id || booking.bookingId)}
                        >
                          {cancelling === (booking._id || booking.bookingId) ? (
                            <>
                              <Spinner size="sm" className="me-1" />
                              Cancelling...
                            </>
                          ) : (
                            <>
                              <FaTrash className="me-1" /> Cancel
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Quick Book Section */}
        <Card className="border-0 shadow-sm mt-4 bg-warning bg-opacity-10">
          <Card.Body className="p-4">
            <Row className="align-items-center">
              <Col md={8}>
                <h5 className="mb-2">Need another ride?</h5>
                <p className="text-secondary mb-md-0">
                  Book your next cab now and get 10% off on your next ride!
                </p>
              </Col>
              <Col md={4} className="text-md-end">
                <Button 
                  variant="warning" 
                  onClick={scrollToBookingForm}
                  className="px-4"
                >
                  Book Now
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      {/* Booking Details Modal */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} centered>
        <Modal.Header closeButton className="bg-primary text-white py-2">
          <Modal.Title className="fs-6">
            <FaEye className="me-2" size={14} />
            Booking Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
          {selectedBooking && (
            <div>
              <div className="text-center mb-3">
                {getStatusBadge(selectedBooking.status)}
                <h6 className="mt-2">{selectedBooking.carType}</h6>
                <small>ID: {selectedBooking.bookingId || selectedBooking._id?.slice(-8).toUpperCase()}</small>
              </div>

              <Row className="g-2 mb-2">
                <Col xs={6}>
                  <div className="bg-light p-2 rounded">
                    <small className="text-secondary d-block">From</small>
                    <strong className="small">{selectedBooking.pickupLocation}</strong>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="bg-light p-2 rounded">
                    <small className="text-secondary d-block">To</small>
                    <strong className="small">{selectedBooking.dropLocation}</strong>
                  </div>
                </Col>
              </Row>

              <Row className="g-2 mb-2">
                <Col xs={6}>
                  <div className="bg-light p-2 rounded">
                    <small className="text-secondary d-block">Date</small>
                    <strong className="small">{formatDate(selectedBooking.pickupDate)}</strong>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="bg-light p-2 rounded">
                    <small className="text-secondary d-block">Time</small>
                    <strong className="small">{selectedBooking.pickupTime}</strong>
                  </div>
                </Col>
              </Row>

              <div className="bg-light p-2 rounded mb-2">
                <small className="text-secondary d-block">Fare Details</small>
                <div className="d-flex justify-content-between small">
                  <span>Base Fare:</span>
                  <span>₹{selectedBooking.fareEstimate?.baseFare || selectedBooking.estimatedFare}</span>
                </div>
                <div className="d-flex justify-content-between small">
                  <span>Driver Bata:</span>
                  <span>₹{selectedBooking.fareEstimate?.driverBata || selectedBooking.driverBata}</span>
                </div>
                <hr className="my-1" />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span className="text-warning">₹{selectedBooking.fareEstimate?.total || selectedBooking.totalFare}</span>
                </div>
              </div>

              {selectedBooking.notes && (
                <div className="bg-light p-2 rounded small">
                  <strong>Notes:</strong> {selectedBooking.notes}
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="py-2">
          <Button size="sm" variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
          <Button 
            size="sm" 
            variant="warning" 
            onClick={scrollToBookingForm}
          >
            Book Another
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyBookings;