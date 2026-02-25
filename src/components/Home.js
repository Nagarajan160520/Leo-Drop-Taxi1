import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Container, Row, Col, Button, Card, Modal, Carousel } from 'react-bootstrap';
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
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaQuoteRight,
  FaCar,
  FaUsers,
  FaAward,
  FaHeart,
  FaInfoCircle,
  FaRoad,
  FaMountain,
  FaWater,
  FaSun,
  FaEnvelope
} from 'react-icons/fa';

const API_URL = 'https://leo-drop-taxi.onrender.com/api';

// Client WhatsApp number
const CLIENT_WHATSAPP_NUMBER = '916381095854';
const CLIENT_PHONE_NUMBER = '916381095854';

// ============================================
// LETTER STYLING - Exactly matching the photo
// Bold, clean, professional font with proper spacing
// ============================================
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

// Pre-compute number styles with clean professional look
const numberStyles = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontWeight: '700',
  fontSize: 'inherit',
  display: 'inline-block',
  letterSpacing: '-0.02em',
  color: 'inherit'
};

// Optimized number renderer - memoized to prevent recalculation
const OptimizedNumber = React.memo(({ num }) => {
  return <span style={numberStyles}>{num}</span>;
});

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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [fareEstimate, setFareEstimate] = useState(null);

  // Counter animation states
  const [counters, setCounters] = useState({
    trips: 0,
    rating: 0,
    awards: 0,
    customers: 0
  });

  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  // ============================================
  // BACKGROUND CAROUSEL IMAGES - HD QUALITY, NO OPACITY, CLEAR DISPLAY
  // ============================================
  const carouselImages = useMemo(() => [
    {
      url: '/images/image1.jpg', // First HD image from public/images folder
      title: 'Luxury Sedans',
      description: 'Comfortable and stylish sedans for your journey'
    },
    {
      url: '/images/image2.jpg', // Second HD image from public/images folder
      title: 'Spacious SUVs',
      description: 'Perfect for family trips and group travel'
    },
    {
      url: '/images/image3.jpg', // Third HD image from public/images folder
      title: 'Premium INNOVA',
      description: 'Experience luxury with our premium fleet'
    },
    {
      url: '/images/image4.jpg', // Fourth HD image from public/images folder
      title: 'Hill Station Trips',
      description: 'Special packages for mountain getaways'
    }
  ], []);

  // Auto-play carousel with cleanup
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

  // Intersection Observer for stats animation - optimized
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsVisible(true);
          observer.disconnect(); // Stop observing after animation starts
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = statsRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Counter animation when stats become visible - optimized
  useEffect(() => {
    if (statsVisible) {
      const targets = {
        trips: 15000,
        rating: 48,
        awards: 10,
        customers: 5000
      };

      const duration = 1500; // Reduced from 2000ms for faster animation
      const steps = 30; // Reduced steps for better performance
      const interval = duration / steps;

      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        
        if (currentStep <= steps) {
          const progress = currentStep / steps;
          
          setCounters({
            trips: Math.min(Math.round(targets.trips * progress), targets.trips),
            rating: Math.min((targets.rating * progress) / 10, targets.rating / 10),
            awards: Math.min(Math.round(targets.awards * progress), targets.awards),
            customers: Math.min(Math.round(targets.customers * progress), targets.customers)
          });
        } else {
          setCounters({
            trips: targets.trips,
            rating: targets.rating / 10,
            awards: targets.awards,
            customers: targets.customers
          });
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [statsVisible]);

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

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

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
  const fetchRecentBookings = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get(`${API_URL}/bookings/mybookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const recent = response.data.data.slice(0, 3);
      console.log('Recent bookings:', recent);
    } catch (error) {
      console.error('Error fetching recent bookings:', error);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchRecentBookings();
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        mobile: user.phone || ''
      }));
    }
  }, [user, fetchRecentBookings]);

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
      `🚖 *NEW TAXI BOOKING - Lexus DROP TAXI* 🚖\n\n` +
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
      
      const clientMessage = generateWhatsAppMessage(bookingData);
      sendWhatsAppToClient(clientMessage);
      
      // Show success popup
      setShowSuccessPopup(true);
      
      // Reset form
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

  // Function to handle popup close and redirect to home
  const handlePopupClose = () => {
    setShowSuccessPopup(false);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stats = [
    { icon: '🚗', value: counters.trips, label: 'Trips Completed', suffix: '+' },
    { icon: '⭐', value: counters.rating, label: 'Customer Rating', suffix: '', isDecimal: true },
    { icon: '🏆', value: counters.awards, label: 'Awards', suffix: '+' },
    { icon: '👥', value: counters.customers, label: 'Happy Customers', suffix: '+' }
  ];

  const testimonials = [
    { name: 'Priya S.', text: 'Driver was on time, car was clean, and the ride was smooth. Will definitely book again!', rating: 5 },
    { name: 'Anita R.', text: "I've used this service they've always been punctual. Highly recommend for airport transfers.", rating: 5 },
    { name: 'Vignesh P.', text: 'Affordable prices compared to others, but still excellent service quality.', rating: 4 },
    { name: 'Rajesh K.', text: 'The driver was polite and knew the best route to avoid traffic.', rating: 5 }
  ];

  // Tariff Data
  const tariffCars = useMemo(() => [
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
      image2: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2064&auto=format&fit=crop',
      image3: 'https://i.pinimg.com/736x/b9/2a/2e/b92a2e7f7a93315f337daffcbb0f76d1.jpg',
      image4: 'https://i.pinimg.com/1200x/e1/d6/29/e1d629e06e9cfa85539a54f7cce5de7b.jpg'
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
      image2: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
      image3: 'https://i.pinimg.com/1200x/65/c3/63/65c3636ca6b81584e53084c105c7a54d.jpg',
      image4: 'https://i.pinimg.com/736x/41/22/c1/4122c1500586bffc01010a1b1611e3a1.jpg'
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
      image2: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=2070&auto=format&fit=crop',
      image3: 'https://i.pinimg.com/1200x/e1/d6/29/e1d629e06e9cfa85539a54f7cce5de7b.jpg',
      image4: 'https://i.pinimg.com/736x/b9/2a/2e/b92a2e7f7a93315f337daffcbb0f76d1.jpg'
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
      image2: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=2070&auto=format&fit=crop',
      image3: 'https://i.pinimg.com/736x/41/22/c1/4122c1500586bffc01010a1b1611e3a1.jpg',
      image4: 'https://i.pinimg.com/1200x/65/c3/63/65c3636ca6b81584e53084c105c7a54d.jpg'
    }
  ], []);

  // Popular Routes Data
  const popularRoutes = useMemo(() => [
    {
      from: 'Chennai',
      to: 'Kodaikanal',
      icon: <FaMountain />,
      image: 'https://i.pinimg.com/736x/88/70/b3/8870b3ccb1791acc57c6a5771dc9fab8.jpg',
      description: 'Princess of Hill Stations - Scenic beauty & pleasant climate',
      distance: '520 km',
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
      distance: '650 km',
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
      distance: '720 km',
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
      distance: '580 km',
      cars: [
        { type: 'SEDAN', oneWay: 14, roundTrip: 13 },
        { type: 'ETIOS', oneWay: 15, roundTrip: 14 },
        { type: 'SUV', oneWay: 19, roundTrip: 18 },
        { type: 'INNOVA', oneWay: 20, roundTrip: 18 }
      ]
    }
  ], []);

  // About Stats
  const aboutStats = useMemo(() => [
    { icon: <FaCar />, value: '15000+', label: 'Trips Completed' },
    { icon: <FaUsers />, value: '5000+', label: 'Happy Customers' },
    { icon: <FaAward />, value: '10+', label: 'Awards' },
    { icon: <FaHeart />, value: '100+', label: 'Fleet Size' }
  ], []);

  // Optimized sparkles - reduced count and simplified
  const generateSparkles = useCallback(() => {
    // Reduced from 50 to 15 sparkles for better performance
    const sparkles = [];
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 3 + 1;
      const style = {
        position: 'absolute',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: `rgba(255, 255, 255, ${Math.random() * 0.7 + 0.3})`,
        borderRadius: '50%',
        boxShadow: `0 0 ${Math.random() * 8 + 2}px rgba(255, 215, 0, 0.6)`,
        animation: `sparkle ${Math.random() * 4 + 3}s infinite ease-in-out`,
        animationDelay: `${Math.random() * 3}s`,
        zIndex: 10,
        pointerEvents: 'none',
        willChange: 'transform, opacity' // Hint browser for optimization
      };
      sparkles.push(<div key={`sparkle-${i}`} className="sparkle" style={style}></div>);
    }
    return sparkles;
  }, []);

  // ============================================
  // FORM STYLES - Optimized for performance
  // ============================================
  
  const formStyles = {
    card: {
      borderRadius: '20px',
      maxWidth: '500px',
      margin: '0 auto',
      width: '100%',
      backgroundColor: '#0c7a24e6',
      backgroundImage: `
        radial-gradient(circle at 20% 30%, rgba(207, 236, 42, 0.93) 0%, transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(176, 212, 29, 0.86) 0%, transparent 40%),
        linear-gradient(145deg, #cad527ff 0%, #cad527ff 30%, #cad527ff 50%, #cad527ff 70%, #d6dee6e6 100%)
      `,
      boxShadow: `
        0 30px 60px rgba(139, 0, 0, 0.6),
        0 0 0 2px rgba(255, 215, 0, 0.3) inset,
        0 0 30px rgba(255, 215, 0, 0.2) inset
      `,
      border: '1px solid rgba(255, 215, 0, 0.4)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.5s ease',
      willChange: 'transform, box-shadow' // Performance optimization
    },
    cardBody: {
      padding: '1.8rem',
      position: 'relative',
      zIndex: 20
    },
    title: {
      fontSize: '1.6rem',
      marginBottom: '1.2rem',
      color: '#FFFFFF',
      textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
      ...headingStyle
    },
    label: {
      fontSize: '0.95rem',
      marginBottom: '0.3rem',
      color: '#FFFFFF',
      fontWeight: '600',
      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
      ...letterStyle,
      textTransform: 'uppercase'
    },
    input: {
      fontSize: '0.95rem',
      padding: '0.6rem 0.8rem',
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      border: '1px solid rgba(255, 215, 0, 0.5)',
      color: '#333333',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      transition: 'all 0.3s ease',
      ...letterStyle
    },
    tripTypeBox: {
      padding: '0.6rem',
      fontSize: '0.95rem',
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      border: '1px solid rgba(255, 215, 0, 0.5)',
      color: '#333333',
      borderRadius: '10px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
      ...boldStyle,
      textTransform: 'uppercase'
    },
    button: {
      fontSize: '1.1rem',
      padding: '0.8rem 1rem',
      backgroundColor: '#b0062bff',
      border: 'none',
      color: '#FFFFFF',
      fontWeight: '700',
      borderRadius: '10px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.6) inset',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      ...boldStyle
    },
    fareBox: {
      padding: '0.8rem',
      fontSize: '0.95rem',
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      border: '1px solid rgba(255, 215, 0, 0.5)',
      borderRadius: '10px',
      color: '#333333',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      ...letterStyle
    },
    mobileStyles: `
      /* Desktop and Tablet Default */
      .hero-row {
        display: flex;
        align-items: center;
      }
      
      /* Mobile Breakpoint */
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
        
        .carousel-container {
          width: 100% !important;
          height: 400px !important;
          position: relative !important;
          border-radius: 15px !important;
          overflow: hidden !important;
        }
        
        .form-card {
          max-width: 100% !important;
          margin: 0 auto !important;
        }
        
        .carousel-arrow {
          display: none !important;
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
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
          font-weight: 700 !important;
        }
        
        .carousel-caption p {
          font-size: 0.9rem !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
        }
        
        .carousel-indicators {
          bottom: 10px !important;
        }
        
        .form-card-body {
          padding: 1.2rem !important;
        }
        
        .form-title {
          font-size: 1.4rem !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
          font-weight: 700 !important;
        }
        
        .form-label {
          font-size: 0.9rem !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
        }
        
        .form-input {
          font-size: 0.95rem !important;
          padding: 0.5rem 0.7rem !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
        }
        
        .trip-type-box {
          padding: 0.5rem !important;
          font-size: 0.9rem !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
          font-weight: 700 !important;
        }
        
        .fare-box {
          padding: 0.7rem !important;
          font-size: 0.9rem !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
        }
        
        .submit-button {
          font-size: 1rem !important;
          padding: 0.6rem !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
          font-weight: 700 !important;
        }
        
        .row {
          margin-left: -5px !important;
          margin-right: -5px !important;
        }
        
        .col, [class*="col-"] {
          padding-left: 5px !important;
          padding-right: 5px !important;
        }
        
        h2 {
          font-size: 1.8rem !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
          font-weight: 700 !important;
        }
        
        h3 {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
          font-weight: 700 !important;
        }
        
        h4, h5, h6 {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
          font-weight: 700 !important;
        }
        
        p, span, div, small, strong {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
        }
        
        .p-5 {
          padding: 1.5rem !important;
        }
        
        .floating-icon {
          width: 65px !important;
          height: 65px !important;
          font-size: 35px !important;
        }
        
        .floating-icon.whatsapp-icon {
          left: 15px !important;
        }
        
        .floating-icon.phone-icon {
          right: 15px !important;
        }
        
        .floating-icon .whatsapp-tooltip,
        .floating-icon .phone-tooltip {
          display: none !important;
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
          padding: 1rem !important;
        }
        
        .form-title {
          font-size: 1.3rem !important;
        }
        
        .d-flex.gap-3 {
          gap: 0.5rem !important;
        }
        
        .col-6 {
          flex: 0 0 50%;
          max-width: 50%;
        }
        
        .floating-icon {
          width: 65px !important;
          height: 65px !important;
          font-size: 32px !important;
        }
      }
      
      /* Apply consistent font to all elements */
      * {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
      }
      
      h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
        font-weight: 700 !important;
        letter-spacing: -0.03em !important;
      }
      
      p, span, div, small, strong, li {
        font-weight: 500 !important;
        letter-spacing: -0.02em !important;
        line-height: 1.5 !important;
      }
      
      .text-warning, .text-white, .text-dark, .text-secondary {
        font-weight: inherit !important;
      }
      
      /* Sparkle animation - only for form, not carousel */
      @keyframes sparkle {
        0%, 100% { 
          opacity: 0.2; 
          transform: scale(1); 
        }
        50% { 
          opacity: 0.8; 
          transform: scale(1.5); 
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
        }
      }
      
      @keyframes shineMove {
        0% {
          transform: translateX(-100%) rotate(25deg);
        }
        20% {
          transform: translateX(100%) rotate(25deg);
        }
        100% {
          transform: translateX(200%) rotate(25deg);
        }
      }
      
      /* Simplified pulse animation - less intense */
      @keyframes softPulse {
        0%, 100% {
          box-shadow: 0 30px 60px rgba(139, 0, 0, 0.6), 0 0 0 2px rgba(255, 215, 0, 0.3) inset;
        }
        50% {
          box-shadow: 0 35px 70px rgba(139, 0, 0, 0.7), 0 0 0 3px rgba(255, 215, 0, 0.4) inset;
        }
      }
      
      .form-card {
        animation: softPulse 4s infinite ease-in-out;
        will-change: box-shadow;
      }
      
      .form-card::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(
          115deg,
          transparent 30%,
          rgba(255, 255, 255, 0.15) 35%,
          rgba(255, 215, 0, 0.2) 40%,
          rgba(255, 215, 0, 0.3) 45%,
          rgba(255, 215, 0, 0.4) 50%,
          rgba(255, 215, 0, 0.3) 55%,
          rgba(255, 215, 0, 0.2) 60%,
          rgba(255, 255, 255, 0.15) 65%,
          transparent 70%
        );
        transform: rotate(25deg);
        animation: shineMove 8s infinite;
        pointer-events: none;
        z-index: 5;
        opacity: 0.4;
        will-change: transform;
      }
      
      /* Reduce animation intensity on hover */
      .form-card:hover {
        animation: none;
        box-shadow: 0 35px 70px rgba(139, 0, 0, 0.8), 0 0 0 4px rgba(255, 215, 0, 0.5) inset !important;
        transition: box-shadow 0.3s ease;
      }
      
      .form-input:focus {
        border-color: #FFD700 !important;
        box-shadow: 0 0 0 0.2rem rgba(255, 215, 0, 0.3) !important;
        transform: translateY(-1px);
        transition: all 0.2s ease;
      }
      
      .submit-button {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
      }
      
      .submit-button::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(
          45deg,
          transparent 35%,
          rgba(255, 255, 255, 0.3) 40%,
          rgba(255, 255, 255, 0.5) 45%,
          rgba(255, 255, 255, 0.7) 50%,
          rgba(255, 255, 255, 0.5) 55%,
          rgba(255, 255, 255, 0.3) 60%,
          transparent 65%
        );
        transform: rotate(45deg);
        animation: buttonShine 4s infinite;
        pointer-events: none;
        will-change: transform;
      }
      
      @keyframes buttonShine {
        0% {
          transform: rotate(45deg) translateX(-100%);
        }
        100% {
          transform: rotate(45deg) translateX(100%);
        }
      }
      
      .trip-type-box:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 15px rgba(0,0,0,0.2), 0 0 0 1px #FFD700 inset !important;
        border-color: #FFD700 !important;
        transition: all 0.2s ease;
      }
      
      .route-image {
        transition: transform 0.4s ease;
      }
      
      .route-image:hover {
        transform: scale(1.05);
      }
      
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
        transition: opacity 0.2s ease;
      }
      
      .carousel-container:hover .carousel-control-prev,
      .carousel-container:hover .carousel-control-next {
        opacity: 1;
      }
      
      .carousel .carousel-caption {
        padding: 10px;
        background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        left: 0;
        right: 0;
        bottom: 0;
        text-align: left;
      }
      
      @media (max-width: 768px) {
        .row > .col-6 {
          flex: 0 0 50%;
          max-width: 50%;
        }
      }
      
      @media (max-width: 480px) {
        .row > .col-6 {
          flex: 0 0 50%;
          max-width: 50%;
        }
      }
      
      .g-3 {
        --bs-gutter-x: 1rem;
        --bs-gutter-y: 1rem;
      }
      
      /* Mobile-specific optimizations */
      @keyframes mobile-pulse {
        0%, 100% {
          transform: translateY(-50%) scale(1);
        }
        50% {
          transform: translateY(-50%) scale(1.05);
        }
      }
      
      .floating-icon {
        will-change: transform;
      }
    `
  };

  return (
    <div className="fade-in">
      {/* Inject mobile styles */}
      <style>{formStyles.mobileStyles}</style>

      {/* FLOATING WHATSAPP AND PHONE ICONS - MOBILE OPTIMIZED */}
      
      {/* Left Side - WhatsApp Icon */}
      <a 
        href={`https://wa.me/${CLIENT_WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-icon whatsapp-icon"
        style={{
          position: 'fixed',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#25d366',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '30px',
          boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          textDecoration: 'none',
          animation: 'mobile-pulse 3s infinite',
          willChange: 'transform'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.4)';
        }}
      >
        <FaWhatsapp />
        
        {/* Tooltip */}
        <span style={{
          position: 'absolute',
          left: '70px',
          backgroundColor: '#25d366',
          color: 'white',
          padding: '5px 15px',
          borderRadius: '20px',
          fontSize: '14px',
          whiteSpace: 'nowrap',
          opacity: 0,
          visibility: 'hidden',
          transition: 'opacity 0.2s ease',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          ...letterStyle
        }} className="whatsapp-tooltip">
          WhatsApp Us
        </span>
      </a>

      {/* Right Side - Phone Icon */}
      <a 
        href={`tel:+${CLIENT_PHONE_NUMBER}`}
        className="floating-icon phone-icon"
        style={{
          position: 'fixed',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#ffc107',
          color: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '30px',
          boxShadow: '0 4px 15px rgba(255, 193, 7, 0.4)',
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          textDecoration: 'none',
          animation: 'mobile-pulse 3s infinite 0.5s',
          willChange: 'transform'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 193, 7, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 193, 7, 0.4)';
        }}
      >
        <FaPhone />
        
        {/* Tooltip */}
        <span style={{
          position: 'absolute',
          right: '70px',
          backgroundColor: '#ffc107',
          color: 'black',
          padding: '5px 15px',
          borderRadius: '20px',
          fontSize: '14px',
          whiteSpace: 'nowrap',
          opacity: 0,
          visibility: 'hidden',
          transition: 'opacity 0.2s ease',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          ...letterStyle
        }} className="phone-tooltip">
          Call Us Now
        </span>
      </a>

      {/* Hero Section */}
      <section 
        className="position-relative"
        style={{ 
          minHeight: '100vh',
          backgroundColor: '#000',
          padding: '60px 0'
        }}
      >
        <Container>
          <Row className="hero-row">
            {/* Left Column - Text Content */}
            <Col lg={6} className="hero-col-text">
              <h1 
                className="display-3 fw-bold mb-4 text-white" 
                style={{ 
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  ...headingStyle,
                  letterSpacing: '-0.03em'
                }}
              >
                Anywhere You Go, <br />
                <span className="text-warning" style={headingStyle}>We're There</span>
              </h1>
              <p 
                className="lead mb-5 text-white-50" 
                style={{ 
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  ...letterStyle,
                  lineHeight: '1.6'
                }}
              >
                Safe, comfortable, and on-time taxi service across Tamilnadu, 
                Kerala, Andhra Pradesh, Karnataka, and Pondicherry.
              </p>
            </Col>

            {/* Middle Column - HD Carousel with Clear Images (No Opacity, No Background Color) */}
            <Col lg={6} className="hero-col-carousel">
              <div 
                className="carousel-container"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className="position-absolute w-100 h-100"
                    style={{
                      top: 0,
                      left: 0,
                      opacity: index === currentSlide ? 1 : 0,
                      transition: 'opacity 0.8s ease-in-out',
                      backgroundImage: `url(${image.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      borderRadius: '15px',
                      willChange: 'opacity',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                    }}
                  >
                    <div 
                      className="position-absolute text-white carousel-caption"
                      style={{
                        bottom: '30px',
                        left: '20px',
                        right: '20px',
                        textAlign: 'left',
                        zIndex: 5,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                      }}
                    >
                      <h3 className="fw-bold mb-2" style={headingStyle}>{image.title}</h3>
                      <p className="mb-0" style={letterStyle}>{image.description}</p>
                    </div>
                  </div>
                ))}

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="position-absolute top-50 start-0 translate-middle-y btn btn-dark bg-opacity-50 border-0 rounded-end-0 carousel-arrow"
                  style={{ 
                    zIndex: 10,
                    padding: '15px 10px',
                    backdropFilter: 'blur(5px)'
                  }}
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
                        transition: 'all 0.2s ease',
                        transform: index === currentSlide ? 'scale(1.2)' : 'scale(1)'
                      }}
                    />
                  ))}
                </div>
              </div>
            </Col>

            {/* Right Column - Form */}
            <Col lg={6} className="hero-col-form">
              <Card 
                className="border-0 shadow-lg form-card" 
                style={{
                  ...formStyles.card,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Optimized sparkles - fewer for better performance */}
                {generateSparkles()}
                
                <Card.Body className="form-card-body" style={formStyles.cardBody}>
                  <h3 className="text-center fw-bold mb-4 form-title" style={formStyles.title}>
                    <span style={{ color: '#FFFFFF', ...headingStyle }}>Lexus-Drop</span>{' '}
                    <span style={{ color: '#FFD700', ...headingStyle }}>Taxi</span>
                  </h3>

                  <form onSubmit={handleSubmit}>
                    {/* Trip Type */}
                    <div className="mb-3">
                      <label className="fw-bold form-label" style={formStyles.label}>Trip Type</label>
                      <div className="d-flex gap-3">
                        <div 
                          className={`flex-fill border rounded text-center trip-type-box ${formData.tripType === 'one-way' ? 'border-warning bg-warning bg-opacity-10' : ''}`}
                          style={{ 
                            ...formStyles.tripTypeBox, 
                            cursor: 'pointer',
                            backgroundColor: formData.tripType === 'one-way' ? '#ffe69b' : 'rgba(255, 255, 255, 0.98)',
                            borderColor: formData.tripType === 'one-way' ? '#FFD700' : 'rgba(255, 215, 0, 0.5)',
                            boxShadow: formData.tripType === 'one-way' ? '0 0 15px rgba(255,215,0,0.3)' : '0 4px 10px rgba(0,0,0,0.2)',
                          }}
                          onClick={() => {
                            setFormData({...formData, tripType: 'one-way'});
                            if (formData.carType) selectCar(formData.carType);
                          }}
                        >
                          <strong style={{ fontSize: '1.1rem', letterSpacing: '0px', ...boldStyle }}>ONE WAY</strong>
                          <br />
                          <small className="text-muted" style={letterStyle}>(Min 130KM)</small>
                        </div>
                        <div 
                          className={`flex-fill border rounded text-center trip-type-box ${formData.tripType === 'round-trip' ? 'border-warning bg-warning bg-opacity-10' : ''}`}
                          style={{ 
                            ...formStyles.tripTypeBox, 
                            cursor: 'pointer',
                            backgroundColor: formData.tripType === 'round-trip' ? '#ffe69b' : 'rgba(255, 255, 255, 0.98)',
                            borderColor: formData.tripType === 'round-trip' ? '#FFD700' : 'rgba(255, 215, 0, 0.5)',
                            boxShadow: formData.tripType === 'round-trip' ? '0 0 15px rgba(255,215,0,0.3)' : '0 4px 10px rgba(0,0,0,0.2)',
                          }}
                          onClick={() => {
                            setFormData({...formData, tripType: 'round-trip'});
                            if (formData.carType) selectCar(formData.carType);
                          }}
                        >
                          <strong style={{ fontSize: '1.1rem', letterSpacing: '0px', ...boldStyle }}>ROUND TRIP</strong>
                        </div>
                      </div>
                    </div>

                    {/* Pickup Location */}
                    <div className="mb-2">
                      <label className="fw-bold form-label" style={formStyles.label}>
                        <FaMapMarkerAlt className="me-1" style={{ color: '#FFD700' }} size={12} />
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
                        <FaMapMarkerAlt className="me-1" style={{ color: '#FFD700' }} size={12} />
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
                        <FaUser className="me-1" style={{ color: '#FFD700' }} size={12} />
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
                        <FaPhone className="me-1" style={{ color: '#FFD700' }} size={12} />
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
                          <FaCalendarAlt className="me-1" style={{ color: '#FFD700' }} size={12} />
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
                          <FaClock className="me-1" style={{ color: '#FFD700' }} size={12} />
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
 
                    {/* SELECT CAR TYPE */}
                    <div className="mb-3">
                      <label className="fw-bold form-label mb-3" style={{ ...formStyles.label, fontSize: '1.1rem' }}>
                        Select Car Type *
                      </label>
                      
                      <Row className="g-3">
                        {/* SEDAN */}
                        <Col xs={6}>
                          <div 
                            className={`car-option ${formData.carType === 'SEDAN' ? 'selected' : ''}`}
                            style={{
                              border: `2px solid ${formData.carType === 'SEDAN' ? '#FFD700' : '#dee2e6'}`,
                              borderRadius: '12px',
                              padding: '12px',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              backgroundColor: formData.carType === 'SEDAN' ? '#1388e9dd' : 'white',
                              height: '100%',
                              boxShadow: formData.carType === 'SEDAN' ? '0 8px 20px rgba(250, 250, 9, 0.4), 0 0 10px rgba(211, 245, 43, 0.3) inset' : '0 4px 12px rgba(0,0,0,0.1)',
                              transform: formData.carType === 'SEDAN' ? 'translateY(-2px)' : 'none'
                            }}
                            onClick={() => selectCar('SEDAN')}
                            onMouseEnter={(e) => {
                              if (formData.carType !== 'SEDAN') {
                                e.currentTarget.style.borderColor = '#FFD700';
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,215,0,0.2)';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (formData.carType !== 'SEDAN') {
                                e.currentTarget.style.borderColor = '#151618ff';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                                e.currentTarget.style.transform = 'none';
                              }
                            }}
                          >
                            <img 
                              src="https://i.pinimg.com/1200x/65/c3/63/65c3636ca6b81584e53084c105c7a54d.jpg"
                              alt="SEDAN"
                              style={{
                                width: '100%',
                                height: '90px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                marginBottom: '8px',
                                border: formData.carType === 'SEDAN' ? '2px solid #B8860B' : 'none'
                              }}
                              className="car-image"
                              loading="lazy"
                            />
                            <div className="fw-bold text-center car-name" style={{ 
                              color: formData.carType === 'SEDAN' ? '#f7f4f4ff' : '#333333',
                              ...boldStyle,
                              fontSize: '1.1rem'
                            }}>
                              SEDAN
                            </div>
                            <div className="fw-bold text-center car-price" style={{ 
                              color: formData.carType === 'SEDAN' ? '#8B0000' : '#8B0000',
                              ...boldStyle,
                              fontSize: '1rem'
                            }}>
                              ₹<OptimizedNumber num={14} />/km
                            </div>
                          </div>
                        </Col>

                        {/* ETIOS */}
                        <Col xs={6}>
                          <div 
                            className={`car-option ${formData.carType === 'ETIOS' ? 'selected' : ''}`}
                            style={{
                              border: `2px solid ${formData.carType === 'ETIOS' ? '#FFD700' : '#dee2e6'}`,
                              borderRadius: '12px',
                              padding: '12px',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              backgroundColor: formData.carType === 'ETIOS' ? '#1388e9dd' : 'white',
                              height: '100%',
                              boxShadow: formData.carType === 'ETIOS' ? '0 8px 20px rgba(255,215,0,0.4), 0 0 10px rgba(255,215,0,0.3) inset' : '0 4px 12px rgba(0,0,0,0.1)',
                              transform: formData.carType === 'ETIOS' ? 'translateY(-2px)' : 'none'
                            }}
                            onClick={() => selectCar('ETIOS')}
                            onMouseEnter={(e) => {
                              if (formData.carType !== 'ETIOS') {
                                e.currentTarget.style.borderColor = '#FFD700';
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,215,0,0.2)';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (formData.carType !== 'ETIOS') {
                                e.currentTarget.style.borderColor = '#dee2e6';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                                e.currentTarget.style.transform = 'none';
                              }
                            }}
                          >
                            <img 
                              src="https://i.pinimg.com/736x/b9/2a/2e/b92a2e7f7a93315f337daffcbb0f76d1.jpg"
                              alt="ETIOS"
                              style={{
                                width: '100%',
                                height: '90px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                marginBottom: '8px',
                                border: formData.carType === 'ETIOS' ? '2px solid #B8860B' : 'none'
                              }}
                              className="car-image"
                              loading="lazy"
                            />
                            <div className="fw-bold text-center car-name" style={{ 
                              color: formData.carType === 'ETIOS' ? '#f7f4f4ff' : '#333333',
                              ...boldStyle,
                              fontSize: '1.1rem'
                            }}>
                              ETIOS
                            </div>
                            <div className="fw-bold text-center car-price" style={{ 
                              color: formData.carType === 'ETIOS' ? '#ea2e2eff' : '#8B0000',
                              ...boldStyle,
                              fontSize: '1rem'
                            }}>
                              ₹<OptimizedNumber num={15} />/km
                            </div>
                          </div>
                        </Col>

                        {/* MUV */}
                        <Col xs={6}>
                          <div 
                            className={`car-option ${formData.carType === 'MUV' ? 'selected' : ''}`}
                            style={{
                              border: `2px solid ${formData.carType === 'MUV' ? '#FFD700' : '#dee2e6'}`,
                              borderRadius: '12px',
                              padding: '12px',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              backgroundColor: formData.carType === 'MUV' ? '#1388e9dd' : 'white',
                              height: '100%',
                              boxShadow: formData.carType === 'MUV' ? '0 8px 20px rgba(255,215,0,0.4), 0 0 10px rgba(255,215,0,0.3) inset' : '0 4px 12px rgba(0,0,0,0.1)',
                              transform: formData.carType === 'MUV' ? 'translateY(-2px)' : 'none'
                            }}
                            onClick={() => selectCar('MUV')}
                            onMouseEnter={(e) => {
                              if (formData.carType !== 'MUV') {
                                e.currentTarget.style.borderColor = '#FFD700';
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,215,0,0.2)';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (formData.carType !== 'MUV') {
                                e.currentTarget.style.borderColor = '#dee2e6';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                                e.currentTarget.style.transform = 'none';
                              }
                            }}
                          >
                            <img 
                              src="https://i.pinimg.com/736x/41/22/c1/4122c1500586bffc01010a1b1611e3a1.jpg"
                              alt="MUV"
                              style={{
                                width: '100%',
                                height: '90px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                marginBottom: '8px',
                                border: formData.carType === 'MUV' ? '2px solid #B8860B' : 'none'
                              }}
                              className="car-image"
                              loading="lazy"
                            />
                            <div className="fw-bold text-center car-name" style={{ 
                              color: formData.carType === 'MUV' ? '#f7f4f4ff' : '#333333',
                              ...boldStyle,
                              fontSize: '1.1rem'
                            }}>
                              MUV
                            </div>
                            <div className="fw-bold text-center car-price" style={{ 
                              color: formData.carType === 'MUV' ? '#8B0000' : '#8B0000',
                              ...boldStyle,
                              fontSize: '1rem'
                            }}>
                              ₹<OptimizedNumber num={19} />/km
                            </div>
                          </div>
                        </Col>

                        {/* INNOVA */}
                        <Col xs={6}>
                          <div 
                            className={`car-option ${formData.carType === 'INNOVA' ? 'selected' : ''}`}
                            style={{
                              border: `2px solid ${formData.carType === 'INNOVA' ? '#FFD700' : '#dee2e6'}`,
                              borderRadius: '12px',
                              padding: '12px',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              backgroundColor: formData.carType === 'INNOVA' ? '#1388e9dd' : 'white',
                              height: '100%',
                              boxShadow: formData.carType === 'INNOVA' ? '0 8px 20px rgba(255,215,0,0.4), 0 0 10px rgba(255,215,0,0.3) inset' : '0 4px 12px rgba(0,0,0,0.1)',
                              transform: formData.carType === 'INNOVA' ? 'translateY(-2px)' : 'none'
                            }}
                            onClick={() => selectCar('INNOVA')}
                            onMouseEnter={(e) => {
                              if (formData.carType !== 'INNOVA') {
                                e.currentTarget.style.borderColor = '#FFD700';
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,215,0,0.2)';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (formData.carType !== 'INNOVA') {
                                e.currentTarget.style.borderColor = '#dee2e6';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                                e.currentTarget.style.transform = 'none';
                              }
                            }}
                          >
                            <img 
                              src="https://i.pinimg.com/1200x/e1/d6/29/e1d629e06e9cfa85539a54f7cce5de7b.jpg"
                              alt="INNOVA"
                              style={{
                                width: '100%',
                                height: '90px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                marginBottom: '8px',
                                border: formData.carType === 'INNOVA' ? '2px solid #ecae33ff' : 'none'
                              }}
                              className="car-image"
                              loading="lazy"
                            />
                            <div className="fw-bold text-center car-name" style={{ 
                              color: formData.carType === 'INNOVA' ? '#f7f4f4ff' : '#333333',
                              ...boldStyle,
                              fontSize: '1.1rem'
                            }}>
                              INNOVA
                            </div>
                            <div className="fw-bold text-center car-price" style={{ 
                              color: formData.carType === 'INNOVA' ? '#8B0000' : '#8B0000',
                              ...boldStyle,
                              fontSize: '1rem'
                            }}>
                              ₹<OptimizedNumber num={20} />/km
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>

                    {/* Fare Estimate */}
                    {fareEstimate && (
                      <div className="bg-light rounded mb-3 fare-box" style={formStyles.fareBox}>
                        <div className="d-flex justify-content-between mb-1">
                          <span style={letterStyle}>Base Fare (Min <OptimizedNumber num={fareEstimate.minDistance} />km):</span>
                          <span className="fw-bold" style={{ color: '#8B0000', ...boldStyle }}>₹<OptimizedNumber num={fareEstimate.baseFare} /></span>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                          <span style={letterStyle}>Driver Bata:</span>
                          <span className="fw-bold" style={{ color: '#8B0000', ...boldStyle }}>₹<OptimizedNumber num={fareEstimate.driverBata} /></span>
                        </div>
                        <hr className="my-1" />
                        <div className="d-flex justify-content-between">
                          <span className="fw-bold" style={boldStyle}>Estimated Total:</span>
                          <span className="fw-bold" style={{ color: '#8B0000', ...boldStyle, fontSize: '1.1rem' }}>₹<OptimizedNumber num={fareEstimate.total} /></span>
                        </div>
                        <small className="text-muted d-block mt-1" style={letterStyle}>
                          *Toll, permit & hill charges extra
                        </small>
                      </div>
                    )}

                    {/* Book Your Cab Button */}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-100 fw-bold submit-button"
                      style={{
                        ...formStyles.button,
                        backgroundColor: '#FFD700',
                        color: '#8B0000',
                        border: '1px solid #8B0000'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFE55C';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.8) inset';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFD700';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.6) inset';
                      }}
                    >
                      {loading ? 'Booking...' : 'Book Your Cab'}
                    </Button>
                    
                    {/* WhatsApp Info */}
                    <p className="text-center mt-2 mb-0 small" style={{ color: '#FFFFFF', ...letterStyle }}>
                      <FaWhatsapp className="me-1" style={{ color: '#25d366' }} size={12} />
                      Notification sent to admin
                    </p>
                  </form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* SUCCESS POPUP - Your Booking Confirmed */}
      <Modal 
        show={showSuccessPopup} 
        onHide={handlePopupClose}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className="text-center p-5">
          <div className="mb-4">
            <FaCheckCircle size={80} className="text-success" />
          </div>
          <h2 className="fw-bold mb-3" style={{ 
            color: '#28a745',
            ...headingStyle,
            fontSize: '2rem'
          }}>
            Your Booking Confirmed!
          </h2>
          <p className="mb-4" style={{ 
            fontSize: '1.1rem',
            ...letterStyle,
            color: '#666'
          }}>
            Thank you for choosing Leo Drop Taxi. Your booking has been successfully confirmed.
          </p>
          <Button 
            variant="success" 
            size="lg"
            onClick={handlePopupClose}
            className="px-5 rounded-pill"
            style={{
              ...boldStyle,
              fontSize: '1.2rem'
            }}
          >
            OK
          </Button>
        </Modal.Body>
      </Modal>

      {/* Stats Section */}
      <Container className="my-5" ref={statsRef}>
        <h2 className="text-center mb-5" style={{ 
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          ...headingStyle
        }}>
          Our <span className="text-warning" style={headingStyle}>Achievements</span>
        </h2>
        <Row>
          {stats.map((stat, index) => (
            <Col md={3} sm={6} key={index} className="mb-4">
              <Card className="text-center p-4 border-0 shadow-sm h-100">
                <div className="display-1 mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>{stat.icon}</div>
                <h2 className="text-warning fw-bold" style={{ 
                  fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                  ...boldStyle
                }}>
                  {stat.isDecimal ? <OptimizedNumber num={stat.value.toFixed(1)} /> : <OptimizedNumber num={Math.round(stat.value).toLocaleString()} />}
                  {stat.suffix && <OptimizedNumber num={stat.suffix} />}
                </h2>
                <p className="text-secondary" style={{ 
                  fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                  ...letterStyle,
                  fontWeight: '500'
                }}>{stat.label}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* TARIFF SECTION */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5" style={{ 
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            ...headingStyle
          }}>
            <span className="text-warning" style={headingStyle}>Outstation</span> Tariff
          </h2>
          
          <Row>
            {tariffCars.map((car, index) => {
              const carCarouselImages = [
                car.image,
                car.image2,
                car.image3,
                car.image4
              ];
              
              return (
                <Col lg={6} md={6} key={index} className="mb-4">
                  <Card className="border-0 shadow h-100" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                    <Carousel 
                      interval={3000}
                      indicators={true}
                      controls={true}
                      pause="hover"
                      style={{ height: '280px' }}
                      className="carousel-container"
                    >
                      {carCarouselImages.map((imgUrl, imgIndex) => (
                        <Carousel.Item key={imgIndex}>
                          <img
                            className="d-block w-100"
                            src={imgUrl}
                            alt={`${car.name} - ${car.model} - View ${imgIndex + 1}`}
                            style={{
                              width: '100%',
                              height: '280px',
                              objectFit: 'cover',
                              objectPosition: 'center'
                            }}
                            loading="lazy"
                          />
                          <Carousel.Caption style={{ bottom: '0', left: '0', right: '0', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', textAlign: 'left' }}>
                            <h5 className="fw-bold mb-0" style={headingStyle}>{car.name}</h5>
                            <p className="mb-0 small" style={letterStyle}>{car.model}</p>
                          </Carousel.Caption>
                        </Carousel.Item>
                      ))}
                    </Carousel>

                    <Card.Body className="p-4">
                      <div className="mb-4">
                        <h6 className="fw-bold mb-3" style={{ ...headingStyle, fontSize: '1.1rem' }}>TARIFF</h6>
                        <Row className="g-3">
                          <Col xs={6}>
                            <div className="p-3 rounded text-center" style={{ backgroundColor: '#fff3cd', border: '1px solid #ffc107' }}>
                              <h6 className="fw-bold mb-2" style={boldStyle}>ONE WAY</h6>
                              <h5 className="text-warning fw-bold mb-1" style={boldStyle}>
                                <FaRupeeSign className="me-1" /> <OptimizedNumber num={car.oneWayRate} />/KM
                              </h5>
                              <small className="text-muted" style={letterStyle}>(Min <OptimizedNumber num={car.minKmOneWay} /> KM)</small>
                            </div>
                          </Col>
                          <Col xs={6}>
                            <div className="p-3 rounded text-center" style={{ backgroundColor: '#fff3cd', border: '1px solid #ffc107' }}>
                              <h6 className="fw-bold mb-2" style={boldStyle}>ROUND TRIP</h6>
                              <h5 className="text-warning fw-bold mb-1" style={boldStyle}>
                                <FaRupeeSign className="me-1" /> <OptimizedNumber num={car.roundTripRate} />/KM
                              </h5>
                              <small className="text-muted" style={letterStyle}>(Min <OptimizedNumber num={car.minKmRoundTrip} /> KM)</small>
                            </div>
                          </Col>
                        </Row>
                      </div>

                      <div>
                        <h6 className="fw-bold mb-3" style={headingStyle}><FaInfoCircle className="text-warning me-2" />INCLUDE WITH</h6>
                        <Row>
                          <Col xs={6}>
                            <ul className="list-unstyled">
                              <li className="mb-2 d-flex align-items-center" style={letterStyle}>
                                <span className="text-warning me-2 fw-bold">•</span>
                                Driver Bata <strong className="ms-1" style={boldStyle}>₹<OptimizedNumber num={car.driverBata} /></strong>
                              </li>
                              <li className="mb-2 d-flex align-items-center" style={letterStyle}>
                                <span className="text-warning me-2 fw-bold">•</span>
                                Hillstation Charges <strong className="ms-1" style={boldStyle}>₹<OptimizedNumber num={car.hillCharges} /></strong>
                              </li>
                            </ul>
                          </Col>
                          <Col xs={6}>
                            <ul className="list-unstyled">
                              <li className="mb-2 d-flex align-items-center" style={letterStyle}>
                                <span className="text-warning me-2 fw-bold">•</span>
                                Other State Permit <strong className="ms-1" style={boldStyle}>₹<OptimizedNumber num={car.permitCharge} />/KM</strong>
                              </li>
                              <li className="mb-2 d-flex align-items-center" style={letterStyle}>
                                <span className="text-warning me-2 fw-bold">•</span>
                                Tolls & Parking
                              </li>
                            </ul>
                          </Col>
                        </Row>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
          
          <div className="text-center mt-4">
            <Button variant="warning" onClick={() => navigate('/tariff')} style={boldStyle}>View All Tariffs</Button>
          </div>
        </Container>
      </section>

      {/* POPULAR ROUTES SECTION */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5" style={{ 
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            ...headingStyle
          }}>
            <span className="text-warning" style={headingStyle}>Popular</span> Routes
          </h2>
          <Row>
            {popularRoutes.map((route, index) => (
              <Col lg={6} key={index} className="mb-4">
                <Card className="border-0 shadow h-100" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                  <div className="position-relative" style={{ height: '200px', overflow: 'hidden' }}>
                    <img 
                      src={route.image} 
                      alt={`${route.from} to ${route.to}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                      className="route-image"
                      loading="lazy"
                    />
                    <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: 'white' }}>
                      <h5 className="fw-bold mb-1" style={headingStyle}>{route.from} to {route.to}</h5>
                      <p className="mb-0 small" style={letterStyle}>{route.description}</p>
                    </div>
                  </div>
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-warning text-dark rounded-circle p-2 me-3" style={{ width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="fs-5">{route.icon}</span>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1" style={headingStyle}>{route.from} → {route.to}</h6>
                        <small className="text-secondary" style={letterStyle}>Distance: {route.distance}</small>
                      </div>
                    </div>
                    <div className="small mb-3" style={boldStyle}>
                      <span className="fw-bold me-2" style={boldStyle}>SEDAN:</span> ₹<OptimizedNumber num={route.cars[0].oneWay} />/km | 
                      <span className="fw-bold ms-2 me-2" style={boldStyle}>SUV:</span> ₹<OptimizedNumber num={route.cars[2].oneWay} />/km
                    </div>
                    <div className="mt-3">
                      <Button variant="outline-warning" size="sm" className="w-100" onClick={() => navigate('/popular-routes')} style={boldStyle}>
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button variant="warning" onClick={() => navigate('/popular-routes')} style={boldStyle}>View All Routes</Button>
          </div>
        </Container>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5" style={{ 
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            ...headingStyle
          }}>
            About <span className="text-warning" style={headingStyle}>Us</span>
          </h2>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <img 
                src="https://i.pinimg.com/1200x/65/c3/63/65c3636ca6b81584e53084c105c7a54d.jpg"
                alt="Our Fleet"
                className="img-fluid rounded-3 shadow"
                loading="lazy"
              />
            </Col>
            <Col lg={6}>
              <h3 className="text-warning mb-4" style={headingStyle}>OUR COMPANY</h3>
              <p className="lead mb-4" style={letterStyle}>
                At <strong style={boldStyle}>Lexus DROP TAXI</strong>, we believe every journey should be safe, comfortable, and on time.
              </p>
              <p className="mb-4" style={letterStyle}>
                Since 2023, we've been proudly serving Tamilnadu, Kerala, Andhra Pradesh, Karnataka, and Pondicherry with reliable taxi services.
              </p>
              <Row className="g-3">
                {aboutStats.slice(0, 2).map((stat, idx) => (
                  <Col xs={6} key={idx}>
                    <Card className="border-0 shadow-sm p-3 text-center">
                      <div className="text-warning h3 mb-2">{stat.icon}</div>
                      <h5 className="fw-bold mb-1" style={boldStyle}>{stat.value}</h5>
                      <small className="text-secondary" style={letterStyle}>{stat.label}</small>
                    </Card>
                  </Col>
                ))}
              </Row>
              <div className="mt-4">
                <Button variant="warning" onClick={() => navigate('/about')} style={boldStyle}>Read More</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5" style={{ 
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            ...headingStyle
          }}>
            Customer <span className="text-warning" style={headingStyle}>Reviews</span>
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
                    <p className="mb-3 small" style={letterStyle}>"{testimonial.text}"</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <strong className="small" style={boldStyle}>{testimonial.name}</strong>
                      <div className="text-warning" style={boldStyle}>
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

      {/* WHY CHOOSE US */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5" style={{ 
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            ...headingStyle
          }}>
            Why <span className="text-warning" style={headingStyle}>Choose Us</span>
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
                  <h5 className="fw-bold mb-2" style={boldStyle}>{item.title}</h5>
                  <p className="text-secondary small mb-0" style={letterStyle}>{item.desc}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5" style={{ 
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            ...headingStyle
          }}>
            Contact <span className="text-warning" style={headingStyle}>Us</span>
          </h2>
          <Row>
            <Col lg={4} md={6} className="mb-4">
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="text-center p-4">
                  <div className="bg-warning rounded-circle d-inline-flex p-3 mb-3">
                    <FaMapMarkerAlt size={24} className="text-dark" />
                  </div>
                  <h5 className="fw-bold mb-3" style={boldStyle}>Visit Us</h5>
                  <p className="text-secondary mb-1" style={letterStyle}>No.71, 18th Block A Type Thiru,</p>
                  <p className="text-secondary mb-1" style={letterStyle}>Avadi, Chennai - 600054</p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="text-center p-4">
                  <div className="bg-warning rounded-circle d-inline-flex p-3 mb-3">
                    <FaPhone size={24} className="text-dark" />
                  </div>
                  <h5 className="fw-bold mb-3" style={boldStyle}>Call Us</h5>
                  <p className="text-secondary mb-1" style={boldStyle}>+91 <OptimizedNumber num={63810} /> <OptimizedNumber num={95854} /></p>
                  <p className="text-secondary mb-1" style={boldStyle}>+91 <OptimizedNumber num={72003} /> <OptimizedNumber num={43435} /></p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="text-center p-4">
                  <div className="bg-warning rounded-circle d-inline-flex p-3 mb-3">
                    <FaEnvelope size={24} className="text-dark" />
                  </div>
                  <h5 className="fw-bold mb-3" style={boldStyle}>Email Us</h5>
                  <p className="text-secondary mb-1" style={letterStyle}>info@lexusdroptaxi.com</p>
                  <p className="text-secondary mb-1" style={letterStyle}>nagarajan16052001@gmail.com</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="text-center mt-4">
            <Button variant="warning" onClick={() => navigate('/contact')} style={boldStyle}>Contact Us</Button>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-warning">
        <Container className="text-center">
          <h2 className="fw-bold mb-3" style={{ 
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            ...headingStyle
          }}>Ready to travel?</h2>
          <p className="lead mb-4" style={letterStyle}>Book your cab now and get <OptimizedNumber num={10} />% off on first ride!</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Button 
              variant="dark" 
              size="lg"
              className="rounded-pill px-5"
              onClick={() => document.querySelector('.card').scrollIntoView({ behavior: 'smooth' })}
              style={boldStyle}
            >
              Book Now
            </Button>
            <a href="tel:+916381095854">
              <Button variant="outline-dark" size="lg" className="rounded-pill px-5" style={boldStyle}>
                <FaPhone className="me-2" /> Call Us
              </Button>
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;