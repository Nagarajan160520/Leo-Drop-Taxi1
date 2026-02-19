import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Card, Badge, Modal, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  FaClock,  
  FaPhone, 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaRupeeSign, 
  FaCheckCircle,
  FaUser,
  FaCalendarAlt,
  FaHistory,
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaQuoteRight
} from 'react-icons/fa';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://leo-drop-taxi.onrender.com/api'
  : 'http://localhost:5000/api';
// Client WhatsApp number

const CLIENT_WHATSAPP_NUMBER = '916381095854';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
 
  const autoPlayRef = useRef(null);
  
  // Form state
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

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [fareEstimate, setFareEstimate] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);

  // Background carousel images
  const carouselImages = [
    {
      url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
      title: 'Luxury Sedans',
      description: 'Comfortable and stylish sedans for your journey'
    },
    {
      url: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=2070&auto=format&fit=crop',
      title: 'Spacious SUVs',
      description: 'Perfect for family trips and group travel'
    },
    {
      url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2064&auto=format&fit=crop',
      title: 'Premium INNOVA',
      description: 'Experience luxury with our premium fleet'
    },
    {
      url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
      title: 'Hill Station Trips',
      description: 'Special packages for mountain getaways'
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, carouselImages.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Navigate to next/previous slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Go to specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Get current time
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Fetch cars
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      pickupTime: getCurrentTime()
    }));

    const fetchCars = async () => {
      try {
        const response = await axios.get(`${API_URL}/cars`);
        if (response.data.data && response.data.data.length > 0) {
          setCars(response.data.data);
        } else {
          setCars([
            { name: 'SEDAN', displayName: 'SEDAN', oneWayRate: 14, roundTripRate: 13, driverBata: 400 },
            { name: 'ETIOS', displayName: 'ETIOS', oneWayRate: 15, roundTripRate: 14, driverBata: 400 },
            { name: 'MUV', displayName: 'MUV', oneWayRate: 19, roundTripRate: 18, driverBata: 500 },
            { name: 'INNOVA', displayName: 'INNOVA', oneWayRate: 20, roundTripRate: 19, driverBata: 500 }
          ]);
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
        setCars([
          { name: 'SEDAN', displayName: 'SEDAN', oneWayRate: 14, roundTripRate: 13, driverBata: 400 },
          { name: 'ETIOS', displayName: 'ETIOS', oneWayRate: 15, roundTripRate: 14, driverBata: 400 },
          { name: 'MUV', displayName: 'MUV', oneWayRate: 19, roundTripRate: 18, driverBata: 500 },
          { name: 'INNOVA', displayName: 'INNOVA', oneWayRate: 20, roundTripRate: 19, driverBata: 500 }
        ]);
      }
    };
    
    fetchCars();
  }, []);

  // Fetch user's recent bookings
  useEffect(() => {
    if (user) {
      fetchRecentBookings();
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        mobile: user.phone || ''
      }));
    }
  }, [user]);

  const fetchRecentBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get(`${API_URL}/bookings/mybookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const recent = response.data.data.slice(0, 3);
      setRecentBookings(recent);
    } catch (error) {
      console.error('Error fetching recent bookings:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const selectCar = (carName) => {
    setFormData(prev => ({
      ...prev,
      carType: carName
    }));

    const selectedCar = cars.find(c => c.name === carName);
    
    if (selectedCar) {
      const minDistance = formData.tripType === 'one-way' ? 130 : 250;
      const rate = formData.tripType === 'one-way' ? selectedCar.oneWayRate : selectedCar.roundTripRate;
      const baseFare = rate * minDistance;
      const driverBata = selectedCar.driverBata || 400;
      
      setFareEstimate({
        carName: selectedCar.name,
        rate: rate,
        minDistance: minDistance,
        baseFare: baseFare,
        driverBata: driverBata,
        total: baseFare + driverBata
      });
      
      toast.success(`${carName} selected - Fare calculated!`);
    } else {
      const defaultRates = {
        'SEDAN': { rate: 14, bata: 400 },
        'ETIOS': { rate: 15, bata: 400 },
        'MUV': { rate: 19, bata: 500 },
        'INNOVA': { rate: 20, bata: 500 }
      };
      
      const carInfo = defaultRates[carName];
      if (carInfo) {
        const minDistance = formData.tripType === 'one-way' ? 130 : 250;
        const rate = formData.tripType === 'one-way' ? carInfo.rate : carInfo.rate - 1;
        const baseFare = rate * minDistance;
        const driverBata = carInfo.bata;
        
        setFareEstimate({
          carName: carName,
          rate: rate,
          minDistance: minDistance,
          baseFare: baseFare,
          driverBata: driverBata,
          total: baseFare + driverBata
        });
        
        toast.success(`${carName} selected - Fare calculated!`);
      }
    }
  };

  const generateWhatsAppMessage = (booking) => {
    const tripTypeText = booking.tripType === 'one-way' ? 'ONE WAY' : 'ROUND TRIP';
    const formattedDate = new Date(booking.pickupDate).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    return encodeURIComponent(
      `🚖 *NEW TAXI BOOKING - LEO DROP TAXI* 🚖\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `✅ *Booking ID:* ${booking.bookingId}\n` +
      `👤 *Customer Name:* ${booking.name}\n` +
      `📱 *Customer Mobile:* ${booking.mobile}\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `🚗 *Car Type:* ${booking.carType}\n` +
      `🔄 *Trip Type:* ${tripTypeText}\n` +
      `📍 *From:* ${booking.pickupLocation}\n` +
      `📍 *To:* ${booking.dropLocation}\n` +
      `📅 *Date:* ${formattedDate}\n` +
      `⏰ *Time:* ${booking.pickupTime}\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `💰 *Fare Details:*\n` +
      `• Base Fare (Min ${booking.fareEstimate.minDistance}km): ₹${booking.fareEstimate.baseFare}\n` +
      `• Driver Bata: ₹${booking.fareEstimate.driverBata}\n` +
      `• *Total Fare: ₹${booking.fareEstimate.total}*\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `⚠️ *Note:* Toll, state permit & hill charges extra if applicable\n\n` +
      `📞 *Contact Customer:* ${booking.mobile}\n` +
      `Please confirm this booking with the customer.`
    );
  };

  const sendWhatsAppToClient = (message) => {
    const whatsappUrl = `https://wa.me/${CLIENT_WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    console.log('WhatsApp sent to client:', CLIENT_WHATSAPP_NUMBER);
  };

  const saveBookingToBackend = async (bookingData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return null;
      }

      const backendBookingData = {
        tripType: bookingData.tripType,
        carType: bookingData.carType,
        pickupLocation: bookingData.pickupLocation,
        dropLocation: bookingData.dropLocation,
        pickupDate: bookingData.pickupDate,
        pickupTime: bookingData.pickupTime,
        distance: bookingData.fareEstimate.minDistance,
        estimatedFare: bookingData.fareEstimate.baseFare,
        driverBata: bookingData.fareEstimate.driverBata,
        totalFare: bookingData.fareEstimate.total,
        notes: `Booking ID: ${bookingData.bookingId}`
      };

      const response = await axios.post(`${API_URL}/bookings`, backendBookingData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('Booking saved to backend:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error saving booking to backend:', error);
      toast.error('Booking saved locally only');
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.pickupLocation || !formData.dropLocation) {
      toast.error('Please enter pickup and drop locations');
      return;
    }

    if (!formData.name) {
      toast.error('Please enter your name');
      return;
    }

    if (!formData.mobile || formData.mobile.length !== 10 || !/^\d+$/.test(formData.mobile)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    if (!formData.carType) {
      toast.error('Please select a car type');
      return;
    }

    if (!fareEstimate) {
      selectCar(formData.carType);
      if (!fareEstimate) {
        toast.error('Could not calculate fare. Please try again.');
        return;
      }
    }

    setLoading(true);

    try {
      const bookingData = {
        ...formData,
        fareEstimate,
        bookingId: 'BOOK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        bookingDate: new Date().toISOString(),
        status: 'confirmed'
      };
      
      if (user) {
        const savedBooking = await saveBookingToBackend(bookingData);
        if (savedBooking) {
          bookingData._id = savedBooking._id;
        }
      }
      
      const localBookings = JSON.parse(localStorage.getItem('localBookings') || '[]');
      localBookings.unshift(bookingData);
      localStorage.setItem('localBookings', JSON.stringify(localBookings.slice(0, 10)));
      
      setBookingDetails(bookingData);
      setRecentBookings(prev => [bookingData, ...prev.slice(0, 2)]);
      
      const clientMessage = generateWhatsAppMessage(bookingData);
      sendWhatsAppToClient(clientMessage);
      
      setShowConfirmation(true);
      
      setFormData({
        tripType: 'one-way',
        pickupLocation: '',
        dropLocation: '',
        name: user?.name || '',
        mobile: user?.phone || '',
        pickupDate: new Date().toISOString().split('T')[0],
        pickupTime: getCurrentTime(),
        carType: ''
      });
      setFareEstimate(null);
      
      toast.success('Booking confirmed! WhatsApp notification sent to admin.');
      
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: '🚗', value: '15000+', label: 'Trips Completed' },
    { icon: '⭐', value: '4.8', label: 'Customer Rating' },
    { icon: '🏆', value: '10+', label: 'Awards' },
    { icon: '👥', value: '5000+', label: 'Happy Customers' }
  ];

  const carTypes = [
    { name: 'SEDAN', model: 'SEDAN', rate: 14, image: '🚗' },
    { name: 'ETIOS', model: 'ETIOS', rate: 15, image: '🚘' },
    { name: 'MUV', model: 'MUV', rate: 19, image: '🚙' },
    { name: 'INNOVA', model: 'INNOVA', rate: 20, image: '🚐' }
  ];

  const testimonials = [
    { name: 'Priya S.', text: 'Driver was on time, car was clean, and the ride was smooth. Will definitely book again!', rating: 5 },
    { name: 'Anita R.', text: "I've used this service they've always been punctual. Highly recommend for airport transfers.", rating: 5 },
    { name: 'Vignesh P.', text: 'Affordable prices compared to others, but still excellent service quality.', rating: 4 },
    { name: 'Rajesh K.', text: 'The driver was polite and knew the best route to avoid traffic.', rating: 5 }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Form styles
  const formStyles = {
    card: {
      borderRadius: '15px',
      maxWidth: '500px',
      margin: '0 auto',
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
    },
    cardBody: {
      padding: '1.5rem'
    },
    title: {
      fontSize: '1.5rem',
      marginBottom: '1rem'
    },
    label: {
      fontSize: '0.9rem',
      marginBottom: '0.25rem'
    },
    input: {
      fontSize: '0.95rem',
      padding: '0.5rem 0.75rem'
    },
    tripTypeBox: {
      padding: '0.5rem',
      fontSize: '0.9rem'
    },
    carSelectBox: {
      padding: '0.5rem 0.75rem',
      fontSize: '0.95rem'
    },
    button: {
      fontSize: '1rem',
      padding: '0.6rem 1rem'
    },
    fareBox: {
      padding: '0.75rem',
      fontSize: '0.9rem'
    },
    // ============================================
    // MOBILE-SPECIFIC LAYOUT: Carousel Top, Form Bottom
    // ============================================
    mobileStyles: `
      /* Desktop and Tablet Default (Carousel and Form side by side) */
      .hero-row {
        display: flex;
        align-items: center;
      }
      
      /* Mobile Breakpoint - Stack carousel on top, form below */
      @media (max-width: 991px) {
        .hero-row {
          flex-direction: column;
        }
        
        .hero-col-text {
          order: 1 !important;
          margin-bottom: 2rem !important;
          text-align: center !important;
        }
        
        .hero-col-carousel {
          order: 2 !important;
          width: 100% !important;
          margin-bottom: 2rem !important;
        }
        
        .hero-col-form {
          order: 3 !important;
          width: 100% !important;
        }
        
        /* Carousel takes full width on mobile */
        .carousel-container {
          width: 100% !important;
          height: 400px !important;
          position: relative !important;
          border-radius: 15px !important;
          overflow: hidden !important;
        }
        
        /* Form card styling on mobile */
        .form-card {
          max-width: 100% !important;
          margin: 0 auto !important;
        }
        
        /* Hide desktop navigation arrows on mobile */
        .carousel-arrow {
          display: none !important;
        }
        
        /* Show mobile swipe hint */
        .carousel-swipe-hint {
          display: block !important;
        }
      }
      
      @media (max-width: 768px) {
        .carousel-container {
          height: 350px !important;
        }
        
        .carousel-caption {
          bottom: 20px !important;
          padding: 10px !important;
        }
        
        .carousel-caption h3 {
          font-size: 1.2rem !important;
        }
        
        .carousel-caption p {
          font-size: 0.9rem !important;
        }
        
        .carousel-indicators {
          bottom: 10px !important;
        }
        
        /* Form styles */
        .form-card-body {
          padding: 1rem !important;
        }
        
        .form-title {
          font-size: 1.3rem !important;
        }
        
        .form-label {
          font-size: 0.85rem !important;
        }
        
        .form-input {
          font-size: 0.9rem !important;
          padding: 0.4rem 0.6rem !important;
        }
        
        .trip-type-box {
          padding: 0.4rem !important;
          font-size: 0.85rem !important;
        }
        
        .car-select-box {
          padding: 0.4rem 0.6rem !important;
          font-size: 0.9rem !important;
        }
        
        .fare-box {
          padding: 0.6rem !important;
          font-size: 0.85rem !important;
        }
        
        .submit-button {
          font-size: 0.95rem !important;
          padding: 0.5rem !important;
        }
        
        .row {
          margin-left: -5px !important;
          margin-right: -5px !important;
        }
        
        .col, [class*="col-"] {
          padding-left: 5px !important;
          padding-right: 5px !important;
        }
      }
      
      @media (max-width: 480px) {
        .carousel-container {
          height: 300px !important;
        }
        
        .carousel-caption h3 {
          font-size: 1rem !important;
        }
        
        .carousel-caption p {
          font-size: 0.8rem !important;
        }
        
        .form-card-body {
          padding: 0.75rem !important;
        }
        
        .form-title {
          font-size: 1.2rem !important;
        }
        
        .d-flex.gap-3 {
          gap: 0.5rem !important;
        }
      }
    `
  };

  return (
    <div className="fade-in">
      {/* Inject mobile styles */}
      <style>{formStyles.mobileStyles}</style>

      {/* Hero Section with Carousel and Form */}
      <section 
        className="position-relative"
        style={{ 
          minHeight: '100vh',
          backgroundColor: '#000',
          padding: '60px 0'
        }}
      >
        <Container>
          {/* Row with custom ordering for mobile */}
          <Row className="hero-row">
            {/* Left Column - Text Content (Order 1 on mobile) */}
            <Col lg={6} className="hero-col-text">
              <h1 
                className="display-3 fw-bold mb-4 text-white" 
                style={{ 
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                Anywhere You Go, <br />
                <span className="text-warning">We're There</span>
              </h1>
              <p 
                className="lead mb-5 text-white-50" 
                style={{ 
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                Safe, comfortable, and on-time taxi service across Tamilnadu, 
                Kerala, Andhra Pradesh, Karnataka, and Pondicherry.
              </p>
            </Col>

            {/* Middle Column - Carousel (Order 2 on mobile) */}
            <Col lg={6} className="hero-col-carousel">
              <div 
                className="carousel-container"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Carousel Images */}
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className="position-absolute w-100 h-100"
                    style={{
                      top: 0,
                      left: 0,
                      opacity: index === currentSlide ? 1 : 0,
                      transition: 'opacity 1s ease-in-out',
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${image.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      borderRadius: '15px'
                    }}
                  >
                    {/* Caption for each slide */}
                    <div 
                      className="position-absolute text-white carousel-caption"
                      style={{
                        bottom: '30px',
                        left: '20px',
                        right: '20px',
                        textAlign: 'left',
                        zIndex: 5,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                      }}
                    >
                      <h3 className="fw-bold mb-2">{image.title}</h3>
                      <p className="mb-0">{image.description}</p>
                    </div>
                  </div>
                ))}

                {/* Navigation Arrows - Hidden on mobile */}
                <button
                  onClick={prevSlide}
                  className="position-absolute top-50 start-0 translate-middle-y btn btn-dark bg-opacity-50 border-0 rounded-end-0 carousel-arrow"
                  style={{ 
                    zIndex: 10,
                    padding: '15px 10px',
                    backdropFilter: 'blur(5px)'
                  }}
                  aria-label="Previous slide"
                >
                  <FaChevronLeft size={20} className="text-white" />
                </button>
                
                <button
                  onClick={nextSlide}
                  className="position-absolute top-50 end-0 translate-middle-y btn btn-dark bg-opacity-50 border-0 rounded-start-0 carousel-arrow"
                  style={{ 
                    zIndex: 10,
                    padding: '15px 10px',
                    backdropFilter: 'blur(5px)'
                  }}
                  aria-label="Next slide"
                >
                  <FaChevronRight size={20} className="text-white" />
                </button>

                {/* Slide Indicators */}
                <div 
                  className="position-absolute bottom-0 start-50 translate-middle-x d-flex gap-2 mb-3 carousel-indicators"
                  style={{ zIndex: 10 }}
                >
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`border-0 rounded-circle p-0 ${index === currentSlide ? 'bg-warning' : 'bg-white bg-opacity-50'}`}
                      style={{
                        width: '10px',
                        height: '10px',
                        transition: 'all 0.3s ease',
                        transform: index === currentSlide ? 'scale(1.2)' : 'scale(1)'
                      }}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Swipe Hint for Mobile */}
                <div className="carousel-swipe-hint d-none position-absolute bottom-0 end-0 m-3 text-white-50 small">
                 .
                </div>
              </div>
            </Col>

            {/* Right Column - Booking Form (Order 3 on mobile) */}
            <Col lg={6} className="hero-col-form">
              {/* Integrated Booking Form */}
              <Card 
                className="border-0 shadow-lg form-card" 
                style={formStyles.card}
              >
                <Card.Body className="form-card-body" style={formStyles.cardBody}>
                  <h3 className="text-center fw-bold mb-4 form-title" style={formStyles.title}>
                    <span style={{ color: '#000' }}>Leo-Drop</span>{' '}
                    <span style={{ color: '#ffc107' }}>Taxi</span>
                  </h3>

                  <form onSubmit={handleSubmit}>
                    {/* Trip Type */}
                    <div className="mb-3">
                      <label className="fw-bold form-label" style={formStyles.label}>Trip Type</label>
                      <div className="d-flex gap-3" style={{ gap: '0.5rem' }}>
                        <div 
                          className={`flex-fill border rounded text-center trip-type-box ${formData.tripType === 'one-way' ? 'border-warning bg-warning bg-opacity-10' : ''}`}
                          style={{ ...formStyles.tripTypeBox, cursor: 'pointer' }}
                          onClick={() => {
                            setFormData({...formData, tripType: 'one-way'});
                            if (formData.carType) selectCar(formData.carType);
                          }}
                        >
                          <strong>ONE WAY</strong>
                          <br />
                          <small className="text-muted">(Min 130KM)</small>
                        </div>
                        <div 
                          className={`flex-fill border rounded text-center trip-type-box ${formData.tripType === 'round-trip' ? 'border-warning bg-warning bg-opacity-10' : ''}`}
                          style={{ ...formStyles.tripTypeBox, cursor: 'pointer' }}
                          onClick={() => {
                            setFormData({...formData, tripType: 'round-trip'});
                            if (formData.carType) selectCar(formData.carType);
                          }}
                        >
                          <strong>ROUND TRIP</strong>
                        </div>
                      </div>
                    </div>

                    {/* Pickup Location */}
                    <div className="mb-2">
                      <label className="fw-bold form-label" style={formStyles.label}>
                        <FaMapMarkerAlt className="me-1 text-warning" size={12} />
                        Pickup Location *
                      </label>
                      <input
                        type="text"
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handleChange}
                        className="form-control form-input"
                        style={formStyles.input}
                        placeholder="Enter Pickup Location"
                        required
                      />
                    </div>

                    {/* Drop Location */}
                    <div className="mb-2">
                      <label className="fw-bold form-label" style={formStyles.label}>
                        <FaMapMarkerAlt className="me-1 text-warning" size={12} />
                        Drop Location *
                      </label>
                      <input
                        type="text"
                        name="dropLocation"
                        value={formData.dropLocation}
                        onChange={handleChange}
                        className="form-control form-input"
                        style={formStyles.input}
                        placeholder="Enter Drop Location"
                        required
                      />
                    </div>

                    {/* Name */}
                    <div className="mb-2">
                      <label className="fw-bold form-label" style={formStyles.label}>
                        <FaUser className="me-1 text-warning" size={12} />
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control form-input"
                        style={formStyles.input}
                        placeholder="Enter Your Name"
                        required
                      />
                    </div>

                    {/* Mobile */}
                    <div className="mb-2">
                      <label className="fw-bold form-label" style={formStyles.label}>
                        <FaPhone className="me-1 text-warning" size={12} />
                        Mobile *
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="form-control form-input"
                        style={formStyles.input}
                        placeholder="Enter Mobile Number"
                        required
                        maxLength="10"
                        pattern="[0-9]{10}"
                      />
                    </div>

                    {/* Pickup Date & Time */}
                    <Row className="mb-2">
                      <Col xs={6}>
                        <label className="fw-bold form-label" style={formStyles.label}>
                          <FaCalendarAlt className="me-1 text-warning" size={12} />
                          Date *
                        </label>
                        <input
                          type="date"
                          name="pickupDate"
                          value={formData.pickupDate}
                          onChange={handleChange}
                          className="form-control form-input"
                          style={formStyles.input}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </Col>
                      <Col xs={6}>
                        <label className="fw-bold form-label" style={formStyles.label}>
                          <FaClock className="me-1 text-warning" size={12} />
                          Time *
                        </label>
                        <input
                          type="time"
                          name="pickupTime"
                          value={formData.pickupTime}
                          onChange={handleChange}
                          className="form-control form-input"
                          style={formStyles.input}
                          required
                        />
                      </Col>
                    </Row>

                    {/* Select Car Type */}
                    <div className="mb-3">
                      <label className="fw-bold form-label" style={formStyles.label}>
                        Select Car Type *
                      </label>
                      
                      <div className="d-flex flex-column gap-1">
                        {/* SEDAN */}
                        <div 
                          className={`border rounded d-flex justify-content-between align-items-center car-select-box ${formData.carType === 'SEDAN' ? 'border-warning bg-warning bg-opacity-10' : ''}`}
                          style={{ ...formStyles.carSelectBox, cursor: 'pointer' }}
                          onClick={() => selectCar('SEDAN')}
                        >
                          <span className="fw-bold">SEDAN</span>
                          <span className="text-warning fw-bold">(₹14/km)</span>
                        </div>

                        {/* ETIOS */}
                        <div 
                          className={`border rounded d-flex justify-content-between align-items-center car-select-box ${formData.carType === 'ETIOS' ? 'border-warning bg-warning bg-opacity-10' : ''}`}
                          style={{ ...formStyles.carSelectBox, cursor: 'pointer' }}
                          onClick={() => selectCar('ETIOS')}
                        >
                          <span className="fw-bold">ETIOS</span>
                          <span className="text-warning fw-bold">(₹15/km)</span>
                        </div>

                        {/* MUV */}
                        <div 
                          className={`border rounded d-flex justify-content-between align-items-center car-select-box ${formData.carType === 'MUV' ? 'border-warning bg-warning bg-opacity-10' : ''}`}
                          style={{ ...formStyles.carSelectBox, cursor: 'pointer' }}
                          onClick={() => selectCar('MUV')}
                        >
                          <span className="fw-bold">MUV</span>
                          <span className="text-warning fw-bold">(₹19/km)</span>
                        </div>

                        {/* INNOVA */}
                        <div 
                          className={`border rounded d-flex justify-content-between align-items-center car-select-box ${formData.carType === 'INNOVA' ? 'border-warning bg-warning bg-opacity-10' : ''}`}
                          style={{ ...formStyles.carSelectBox, cursor: 'pointer' }}
                          onClick={() => selectCar('INNOVA')}
                        >
                          <span className="fw-bold">INNOVA</span>
                          <span className="text-warning fw-bold">(₹20/km)</span>
                        </div>
                      </div>
                    </div>

                    {/* Fare Estimate */}
                    {fareEstimate && (
                      <div className="bg-light rounded mb-3 fare-box" style={formStyles.fareBox}>
                        <div className="d-flex justify-content-between mb-1">
                          <span>Base Fare (Min {fareEstimate.minDistance}km):</span>
                          <span className="fw-bold">₹{fareEstimate.baseFare}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                          <span>Driver Bata:</span>
                          <span className="fw-bold">₹{fareEstimate.driverBata}</span>
                        </div>
                        <hr className="my-1" />
                        <div className="d-flex justify-content-between">
                          <span className="fw-bold">Estimated Total:</span>
                          <span className="fw-bold text-warning">₹{fareEstimate.total}</span>
                        </div>
                        <small className="text-muted d-block mt-1">
                          *Toll, permit & hill charges extra
                        </small>
                      </div>
                    )}

                    {/* Book Your Cab Button */}
                    <Button
                      type="submit"
                      variant="warning"
                      disabled={loading}
                      className="w-100 fw-bold submit-button"
                      style={formStyles.button}
                    >
                      {loading ? 'Booking...' : 'Book Your Cab'}
                    </Button>
                    
                    {/* WhatsApp Info */}
                    <p className="text-center text-muted mt-2 mb-0 small">
                      <FaWhatsapp className="text-success me-1" size={12} />
                      Notification sent to admin
                    </p>
                  </form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <Container className="my-5">
        <Row>
          {stats.map((stat, index) => (
            <Col md={3} sm={6} key={index} className="mb-4">
              <Card className="text-center p-4 border-0 shadow-sm h-100">
                <div className="display-1 mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>{stat.icon}</div>
                <h2 className="text-warning fw-bold" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)' }}>{stat.value}</h2>
                <p className="text-secondary" style={{ fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>{stat.label}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Recent Bookings Section */}
      {user && recentBookings.length > 0 && (
        <Container className="my-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)' }}>
              <FaHistory className="text-warning me-2" size={20} />
              Recent Bookings
            </h2>
            <Button 
              variant="outline-warning" 
              onClick={() => navigate('/my-bookings')}
              size="sm"
            >
              View All
            </Button>
          </div>
          
          <Row>
            {recentBookings.map((booking, index) => (
              <Col lg={4} md={6} key={booking._id || index} className="mb-4">
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="fw-bold mb-0">{booking.carType}</h6>
                      <Badge bg={booking.status === 'confirmed' ? 'success' : 'warning'} style={{ fontSize: '0.7rem' }}>
                        {booking.status || 'confirmed'}
                      </Badge>
                    </div>
                    
                    <p className="mb-1 small">
                      <FaMapMarkerAlt className="text-warning me-1" size={10} />
                      {booking.pickupLocation?.slice(0, 15)}... → {booking.dropLocation?.slice(0, 15)}
                    </p>
                    
                    <p className="mb-1 small">
                      <FaCalendarAlt className="text-warning me-1" size={10} />
                      {formatDate(booking.pickupDate || booking.bookingDate)} {booking.pickupTime}
                    </p>
                    
                    <p className="mb-0 small fw-bold">
                      <FaRupeeSign className="text-warning me-1" size={10} />
                      ₹{booking.totalFare || booking.fareEstimate?.total}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}

      {/* Customer Reviews Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
            Customer <span className="text-warning">Reviews</span>
          </h2>
          <Row>
            {testimonials.map((testimonial, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <Card className="border-0 shadow h-100">
                  <Card.Body className="p-4">
                    <div className="text-warning mb-2">
                      <FaQuoteLeft className="me-1" size={16} />
                      <FaQuoteRight className="ms-1" size={16} />
                    </div>
                    <p className="mb-3 small">"{testimonial.text}"</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <strong className="small">{testimonial.name}</strong>
                      <div className="text-warning">
                        {'★'.repeat(testimonial.rating)}
                        {'☆'.repeat(5 - testimonial.rating)}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Car Types Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
            <span className="text-warning">Select</span> Car Type
          </h2>
          <Row>
            {carTypes.map((car, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <Card className="text-center p-3 border-0 shadow h-100">
                  <div className="mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}>{car.image}</div>
                  <h5 className="fw-bold" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>{car.name}</h5>
                  <h4 className="text-warning fw-bold mt-1" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }}>
                    <FaRupeeSign className="me-1" size={14} />
                    {car.rate}/km
                  </h4>
                  <Button 
                    variant="outline-warning" 
                    className="w-100 mt-2"
                    size="sm"
                    onClick={() => {
                      selectCar(car.name);
                      document.querySelector('.card').scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Select
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
            Why <span className="text-warning">Choose Us</span>
          </h2>
          <Row>
            {[
              { icon: '👨‍✈️', title: 'Trained Drivers', desc: 'Experienced and courteous drivers' },
              { icon: '⏰', title: 'Always On Time', desc: 'Punctual and reliable service' },
              { icon: '💰', title: 'Fair Pricing', desc: 'No hidden charges, ever' },
              { icon: '📍', title: 'GPS Vehicles', desc: 'Real-time tracking for safety' },
              { icon: '📞', title: '24/7 Support', desc: 'Round-the-clock assistance' },
              { icon: '🏔️', title: 'Hill Station Trips', desc: 'Special packages available' }
            ].map((item, index) => (
              <Col md={4} sm={6} key={index} className="mb-4">
                <Card className="border-0 shadow-sm p-4 text-center h-100">
                  <div className="display-3 mb-3">{item.icon}</div>
                  <h5 className="fw-bold mb-2">{item.title}</h5>
                  <p className="text-secondary small mb-0">{item.desc}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-warning">
        <Container className="text-center">
          <h2 className="fw-bold mb-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>Ready to travel?</h2>
          <p className="lead mb-4">Book your cab now and get 10% off on first ride!</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Button 
              variant="dark" 
              size="lg"
              className="rounded-pill px-5"
              onClick={() => document.querySelector('.card').scrollIntoView({ behavior: 'smooth' })}
            >
              Book Now
            </Button>
            <a href="tel:+917200343435">
              <Button variant="outline-dark" size="lg" className="rounded-pill px-5">
                <FaPhone className="me-2" /> Call Us
              </Button>
            </a>
          </div>
        </Container>
      </section>

      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)} size="md" centered>
        <Modal.Header closeButton className="bg-success text-white py-2">
          <Modal.Title className="fs-5">
            <FaCheckCircle className="me-2" size={18} />
            Booking Confirmed!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
          {bookingDetails && (
            <div>
              <div className="text-center mb-3">
                <FaCheckCircle size={40} className="text-success" />
                <h6 className="mt-2">Booking ID: {bookingDetails.bookingId}</h6>
              </div>

              <div className="bg-light p-2 rounded small mb-2">
                <Row>
                  <Col xs={6}>
                    <p className="mb-1"><strong>Name:</strong> {bookingDetails.name}</p>
                    <p className="mb-1"><strong>Car:</strong> {bookingDetails.carType}</p>
                  </Col>
                  <Col xs={6}>
                    <p className="mb-1"><strong>From:</strong> {bookingDetails.pickupLocation}</p>
                    <p className="mb-1"><strong>Total:</strong> ₹{bookingDetails.fareEstimate.total}</p>
                  </Col>
                </Row>
              </div>

              <Alert variant="success" className="py-2 small">
                <FaWhatsapp className="me-1" size={14} />
                Notification sent to admin
              </Alert>
              
              <div className="text-center">
                <Button size="sm" variant="primary" onClick={() => navigate('/my-bookings')}>
                  My Bookings
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;