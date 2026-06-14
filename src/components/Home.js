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
  FaCar,
  FaUsers,
  FaAward,
  FaHeart,
  FaInfoCircle,
  FaRoad,
  FaMountain,
  FaWater,
  FaSun,
  FaEnvelope,
  FaStar
} from 'react-icons/fa';

// ============================================
// CONFIGURATION - UPDATE THIS WITH YOUR BACKEND URL
// ============================================
const API_URL = 'http://localhost:5000/api';
const CLIENT_WHATSAPP_NUMBER = '918148111516';
const CLIENT_PHONE_NUMBER = '918148111516';

// ============================================
// TAMIL NADU CITIES AND DISTANCES DATABASE
// ============================================
const tamilNaduCities = [
  { name: 'Chennai', lat: 13.0827, lng: 80.2707, district: 'Chennai' },
  { name: 'Coimbatore', lat: 11.0168, lng: 76.9558, district: 'Coimbatore' },
  { name: 'Madurai', lat: 9.9252, lng: 78.1198, district: 'Madurai' },
  { name: 'Tiruchirappalli', lat: 10.7905, lng: 78.7047, district: 'Tiruchirappalli' },
  { name: 'Tiruppur', lat: 11.1085, lng: 77.3411, district: 'Tiruppur' },
  { name: 'Salem', lat: 11.6643, lng: 78.1460, district: 'Salem' },
  { name: 'Erode', lat: 11.3410, lng: 77.7172, district: 'Erode' },
  { name: 'Tirunelveli', lat: 8.7139, lng: 77.7567, district: 'Tirunelveli' },
  { name: 'Vellore', lat: 12.9165, lng: 79.1325, district: 'Vellore' },
  { name: 'Thoothukkudi', lat: 8.7642, lng: 78.1348, district: 'Thoothukkudi' },
  { name: 'Dindigul', lat: 10.3624, lng: 77.9695, district: 'Dindigul' },
  { name: 'Thanjavur', lat: 10.7870, lng: 79.1378, district: 'Thanjavur' },
  { name: 'Ranipet', lat: 12.9235, lng: 79.3242, district: 'Ranipet' },
  { name: 'Krishnagiri', lat: 12.5187, lng: 78.2173, district: 'Krishnagiri' },
  { name: 'Karaikudi', lat: 10.0733, lng: 78.7798, district: 'Sivaganga' },
  { name: 'Kancheepuram', lat: 12.8222, lng: 79.7034, district: 'Kancheepuram' },
  { name: 'Cuddalore', lat: 11.7468, lng: 79.7643, district: 'Cuddalore' },
  { name: 'Nagapattinam', lat: 10.7650, lng: 79.8425, district: 'Nagapattinam' },
  { name: 'Kumbakonam', lat: 10.9562, lng: 79.3900, district: 'Thanjavur' },
  { name: 'Pudukkottai', lat: 10.3796, lng: 78.8211, district: 'Pudukkottai' },
  { name: 'Hosur', lat: 12.7409, lng: 77.8253, district: 'Krishnagiri' },
  { name: 'Nagercoil', lat: 8.1760, lng: 77.4295, district: 'Kanyakumari' },
  { name: 'Kanyakumari', lat: 8.0883, lng: 77.5385, district: 'Kanyakumari' },
  { name: 'Tiruvannamalai', lat: 12.2256, lng: 79.0745, district: 'Tiruvannamalai' },
  { name: 'Villupuram', lat: 11.9386, lng: 79.4898, district: 'Villupuram' },
  { name: 'Namakkal', lat: 11.2185, lng: 78.1748, district: 'Namakkal' },
  { name: 'Karur', lat: 10.9574, lng: 78.0767, district: 'Karur' },
  { name: 'Sivakasi', lat: 9.4500, lng: 77.8000, district: 'Virudhunagar' },
  { name: 'Rajapalayam', lat: 9.4500, lng: 77.5667, district: 'Virudhunagar' },
  { name: 'Pollachi', lat: 10.6583, lng: 77.0067, district: 'Coimbatore' },
  { name: 'Ooty', lat: 11.4069, lng: 76.6932, district: 'Nilgiris' },
  { name: 'Kodaikanal', lat: 10.2381, lng: 77.4892, district: 'Dindigul' },
  { name: 'Mettupalayam', lat: 11.3000, lng: 76.9333, district: 'Coimbatore' },
  { name: 'Avinashi', lat: 11.2000, lng: 77.2667, district: 'Tiruppur' },
  { name: 'Palladam', lat: 10.9833, lng: 77.3000, district: 'Tiruppur' },
  { name: 'Udumalpet', lat: 10.5833, lng: 77.2500, district: 'Tiruppur' },
  { name: 'Gobichettipalayam', lat: 11.4333, lng: 77.4500, district: 'Erode' },
  { name: 'Sathyamangalam', lat: 11.5000, lng: 77.2333, district: 'Erode' },
  { name: 'Bhavani', lat: 11.4500, lng: 77.6833, district: 'Erode' },
  { name: 'Rasipuram', lat: 11.4667, lng: 78.1667, district: 'Namakkal' },
  { name: 'Tiruchengode', lat: 11.3800, lng: 77.9000, district: 'Namakkal' },
  { name: 'Komarapalayam', lat: 11.4500, lng: 77.7000, district: 'Namakkal' },
  { name: 'Mettur', lat: 11.8000, lng: 77.8000, district: 'Salem' },
  { name: 'Edappadi', lat: 11.5667, lng: 77.6167, district: 'Salem' },
  { name: 'Attur', lat: 11.6000, lng: 78.6000, district: 'Salem' },
  { name: 'Vazhapadi', lat: 11.7333, lng: 78.4000, district: 'Salem' },
  { name: 'Palani', lat: 10.4500, lng: 77.5167, district: 'Dindigul' },
  { name: 'Oddanchatram', lat: 10.5000, lng: 77.7500, district: 'Dindigul' },
  { name: 'Vedasandur', lat: 10.5333, lng: 77.9500, district: 'Dindigul' },
  { name: 'Aruppukkottai', lat: 9.5167, lng: 78.1000, district: 'Virudhunagar' },
  { name: 'Virudhunagar', lat: 9.5833, lng: 77.9500, district: 'Virudhunagar' },
  { name: 'Srivilliputhur', lat: 9.5167, lng: 77.6333, district: 'Virudhunagar' },
  { name: 'Tenkasi', lat: 8.9667, lng: 77.3167, district: 'Tenkasi' },
  { name: 'Sankarankovil', lat: 9.2667, lng: 77.2000, district: 'Tenkasi' },
  { name: 'Ambasamudram', lat: 8.7000, lng: 77.4667, district: 'Tirunelveli' },
  { name: 'Valliyoor', lat: 8.4000, lng: 77.6167, district: 'Tirunelveli' },
  { name: 'Kallakurichi', lat: 11.7333, lng: 78.9500, district: 'Kallakurichi' },
  { name: 'Tindivanam', lat: 12.2333, lng: 79.6500, district: 'Villupuram' },
  { name: 'Gingee', lat: 12.2500, lng: 79.4167, district: 'Villupuram' },
  { name: 'Arakkonam', lat: 13.0833, lng: 79.6667, district: 'Ranipet' },
  { name: 'Walajapet', lat: 12.9333, lng: 79.3833, district: 'Ranipet' },
  { name: 'Melvisharam', lat: 13.0000, lng: 79.5833, district: 'Ranipet' },
  { name: 'Kovilpatti', lat: 9.1667, lng: 77.8667, district: 'Thoothukkudi' },
  { name: 'Ramanathapuram', lat: 9.3667, lng: 78.8333, district: 'Ramanathapuram' },
  { name: 'Paramakudi', lat: 9.5333, lng: 78.5833, district: 'Ramanathapuram' },
  { name: 'Mudukulathur', lat: 9.3333, lng: 78.5000, district: 'Ramanathapuram' },
  { name: 'Sivaganga', lat: 9.8667, lng: 78.4833, district: 'Sivaganga' },
  { name: 'Devakottai', lat: 9.9500, lng: 78.8333, district: 'Sivaganga' },
  { name: 'Manamadurai', lat: 9.7000, lng: 78.4833, district: 'Sivaganga' },
  { name: 'Courtallam', lat: 8.9333, lng: 77.2667, district: 'Tenkasi' },
  { name: 'Kutralam', lat: 8.9333, lng: 77.2667, district: 'Tenkasi' },
  { name: 'Courtalam', lat: 8.9333, lng: 77.2667, district: 'Tenkasi' }
];

// Distance matrix between cities
const distanceMatrix = {
  'Chennai': { 'Coimbatore': 510, 'Madurai': 460, 'Salem': 340, 'Tiruchirappalli': 330, 'Vellore': 145, 'Kanchipuram': 70, 'Cuddalore': 185, 'Tirunelveli': 620, 'Kanyakumari': 710, 'Ooty': 540, 'Kodaikanal': 520, 'Rameswaram': 560, 'Kumbakonam': 280, 'Thanjavur': 320, 'Courtallam': 650, 'Kutralam': 650, 'Tenkasi': 640 },
  'Coimbatore': { 'Chennai': 510, 'Madurai': 210, 'Salem': 160, 'Tiruchirappalli': 220, 'Ooty': 90, 'Kodaikanal': 190, 'Palani': 110, 'Erode': 90, 'Tiruppur': 55, 'Courtallam': 370, 'Kutralam': 370, 'Tenkasi': 360 },
  'Madurai': { 'Chennai': 460, 'Coimbatore': 210, 'Salem': 260, 'Tiruchirappalli': 140, 'Kanyakumari': 250, 'Rameswaram': 170, 'Kodaikanal': 120, 'Tirunelveli': 160, 'Courtallam': 180, 'Kutralam': 180, 'Tenkasi': 170 },
  'Salem': { 'Chennai': 340, 'Coimbatore': 160, 'Madurai': 260, 'Tiruchirappalli': 140, 'Erode': 75, 'Bangalore': 210, 'Courtallam': 360, 'Kutralam': 360 },
  'Tiruchirappalli': { 'Chennai': 330, 'Coimbatore': 220, 'Madurai': 140, 'Salem': 140, 'Kumbakonam': 70, 'Thanjavur': 60, 'Courtallam': 310, 'Kutralam': 310 },
  'Vellore': { 'Chennai': 145, 'Bangalore': 220, 'Salem': 200, 'Tiruppur': 320, 'Courtallam': 520 },
  'Tirunelveli': { 'Chennai': 620, 'Madurai': 160, 'Kanyakumari': 90, 'Nagercoil': 85, 'Tenkasi': 75, 'Courtallam': 70, 'Kutralam': 70 },
  'Kanyakumari': { 'Chennai': 710, 'Madurai': 250, 'Tirunelveli': 90, 'Nagercoil': 20, 'Courtallam': 140, 'Kutralam': 140 },
  'Erode': { 'Coimbatore': 90, 'Salem': 75, 'Tiruppur': 55, 'Chennai': 420, 'Courtallam': 380 },
  'Tiruppur': { 'Coimbatore': 55, 'Erode': 55, 'Chennai': 465, 'Salem': 130, 'Courtallam': 350 },
  'Ooty': { 'Coimbatore': 90, 'Mettupalayam': 40, 'Salem': 240, 'Courtallam': 430 },
  'Kodaikanal': { 'Madurai': 120, 'Coimbatore': 190, 'Palani': 50, 'Courtallam': 230 },
  'Thanjavur': { 'Tiruchirappalli': 60, 'Kumbakonam': 45, 'Chennai': 320, 'Courtallam': 350 },
  'Kumbakonam': { 'Thanjavur': 45, 'Tiruchirappalli': 70, 'Chennai': 280, 'Courtallam': 390 },
  'Tenkasi': { 'Tirunelveli': 75, 'Madurai': 170, 'Courtallam': 12, 'Kutralam': 12, 'Chennai': 640, 'Coimbatore': 360 },
  'Courtallam': { 'Tenkasi': 12, 'Tirunelveli': 70, 'Madurai': 180, 'Chennai': 650, 'Coimbatore': 370, 'Kanyakumari': 140, 'Salem': 360, 'Tiruchirappalli': 310, 'Kodaikanal': 230 },
  'Kutralam': { 'Tenkasi': 12, 'Tirunelveli': 70, 'Madurai': 180, 'Chennai': 650, 'Coimbatore': 370, 'Kanyakumari': 140 }
};

// Function to calculate distance between two cities
const calculateDistance = (from, to) => {
  if (!from || !to) return 0;
  
  let fromCity = from.trim().toLowerCase();
  let toCity = to.trim().toLowerCase();
  
  if (fromCity === 'courtallam' || fromCity === 'kutralam' || fromCity === 'courtalam') {
    fromCity = 'Courtallam';
  } else if (toCity === 'courtallam' || toCity === 'kutralam' || toCity === 'courtalam') {
    toCity = 'Courtallam';
  }
  
  const fromMatch = tamilNaduCities.find(city => city.name.toLowerCase() === fromCity);
  const toMatch = tamilNaduCities.find(city => city.name.toLowerCase() === toCity);
  
  if (!fromMatch || !toMatch) {
    const fromPartial = tamilNaduCities.find(city => fromCity.includes(city.name.toLowerCase()) || city.name.toLowerCase().includes(fromCity));
    const toPartial = tamilNaduCities.find(city => toCity.includes(city.name.toLowerCase()) || city.name.toLowerCase().includes(toCity));
    
    if (fromPartial && toPartial) {
      return calculateDistanceFromMatrix(fromPartial.name, toPartial.name);
    }
    return 50;
  }
  
  return calculateDistanceFromMatrix(fromMatch.name, toMatch.name);
};

const calculateDistanceFromMatrix = (fromName, toName) => {
  if (distanceMatrix[fromName] && distanceMatrix[fromName][toName]) {
    return distanceMatrix[fromName][toName];
  }
  
  if (distanceMatrix[toName] && distanceMatrix[toName][fromName]) {
    return distanceMatrix[toName][fromName];
  }
  
  if (fromName === 'Chennai') {
    const approximations = {
      'Kanchipuram': 70, 'Cuddalore': 185, 'Villupuram': 160, 'Nagapattinam': 320,
      'Pudukkottai': 380, 'Sivaganga': 450, 'Virudhunagar': 540, 'Karur': 370,
      'Namakkal': 410, 'Dindigul': 420, 'Hosur': 335, 'Krishnagiri': 280,
      'Ranipet': 105, 'Arakkonam': 80, 'Tiruvannamalai': 190, 'Tindivanam': 125,
      'Courtallam': 650, 'Kutralam': 650
    };
    if (approximations[toName]) return approximations[toName];
  }
  
  if (fromName === 'Coimbatore') {
    const approximations = {
      'Palani': 110, 'Dindigul': 200, 'Karur': 160, 'Namakkal': 130, 'Pollachi': 40,
      'Courtallam': 370, 'Kutralam': 370
    };
    if (approximations[toName]) return approximations[toName];
  }
  
  if (fromName === 'Madurai') {
    const approximations = {
      'Courtallam': 180, 'Kutralam': 180, 'Tenkasi': 170
    };
    if (approximations[toName]) return approximations[toName];
  }
  
  const fromCity = tamilNaduCities.find(c => c.name === fromName);
  const toCity = tamilNaduCities.find(c => c.name === toName);
  
  if (fromCity && toCity) {
    const R = 6371;
    const dLat = (toCity.lat - fromCity.lat) * Math.PI / 180;
    const dLon = (toCity.lng - fromCity.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(fromCity.lat * Math.PI / 180) * Math.cos(toCity.lat * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = Math.round(R * c);
    return Math.max(distance, 10);
  }
  
  return 50;
};

// Auto-suggest function for city names
const getCitySuggestions = (input) => {
  if (!input || input.length < 2) return [];
  const inputLower = input.toLowerCase();
  return tamilNaduCities
    .filter(city => city.name.toLowerCase().includes(inputLower))
    .slice(0, 5)
    .map(city => city.name);
};

// ============================================
// LETTER STYLING
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

const numberStyles = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontWeight: '700',
  fontSize: 'inherit',
  display: 'inline-block',
  letterSpacing: '-0.02em',
  color: 'inherit'
};

const OptimizedNumber = React.memo(({ num }) => {
  return <span style={numberStyles}>{num}</span>;
});

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
 
  const autoPlayRef = useRef(null);
  
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

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropSuggestions, setShowDropSuggestions] = useState(false);
  const [calculatedDistance, setCalculatedDistance] = useState(0);

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [fareEstimate, setFareEstimate] = useState(null);
  const [bookingInProgress, setBookingInProgress] = useState(false);

  const [counters, setCounters] = useState({
    trips: 0,
    rating: 0,
    awards: 0,
    customers: 0
  });

  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  const carouselImages = useMemo(() => [
    {
      url: 'images/image1.jpg',
      title: 'Luxury Sedans',
      description: 'Comfortable and stylish sedans for your journey'
    },
    {
      url: 'images/image2.jpg',
      title: 'Spacious SUVs',
      description: 'Perfect for family trips and group travel'
    },
    {
      url: 'images/image3.jpg',
      title: 'Premium INNOVA',
      description: 'Experience luxury with our premium fleet'
    },
    {
      url: 'images/image4.jpg',
      title: 'Hill Station Trips',
      description: 'Special packages for mountain getaways'
    }
  ], []);

  const popularDestinations = useMemo(() => [
    {
      id: 1,
      name: 'CHENNAI',
      state: 'Tamil Nadu',
      description: 'Looking for reliable taxi services in Chennai? Explore the cultural capital of Tamil Nadu with our local and round trip taxi packages.',
      popularSpots: ['Marina Beach', 'Kapaleeshwar Temple', 'San Thome Cathedral', 'Guindy National Park'],
      image: '/images/routess/chennai.png',
      shareLink: 'onewaydroptaxi.in/Chennai-drop-taxi',
      bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      name: 'COIMBATORE',
      state: 'Tamil Nadu',
      description: 'Explore the Manchester of South India with our premium taxi services. Visit iconic temples and scenic hill stations nearby.',
      popularSpots: ['Marudamalai Temple', 'Isha Yoga Center', 'VOC Park', 'Siruvani Falls'],
      image: '/images/routess/coimbator.png',
      shareLink: 'onewaydroptaxi.in/Coimbatore-drop-taxi',
      bgGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 3,
      name: 'MADURAI',
      state: 'Tamil Nadu',
      description: 'Experience the cultural heart of Tamil Nadu! Visit the magnificent Meenakshi Temple and explore ancient traditions.',
      popularSpots: ['Meenakshi Temple', 'Thirumalai Nayakkar Palace', 'Koodal Azhagar Temple', 'Samanalar Hills'],
      image: '/images/routess/maadurai1.png',
      shareLink: 'onewaydroptaxi.in/Madurai-drop-taxi',
      bgGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 4,
      name: 'BENGALURU',
      state: 'Karnataka',
      description: 'Discover the Garden City with our comfortable taxi services. Perfect for IT visits, sightseeing, and outstation trips.',
      popularSpots: ['Cubbon Park', 'Bangalore Palace', 'Lalbagh Garden', 'Wonderla Amusement Park'],
      image: '/images/routess/bengaluru.png',
      shareLink: 'onewaydroptaxi.in/bengaluru-drop-taxi',
      bgGradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
    }
  ], []);

  // Function to update fare based on distance
  const updateFareWithDistance = useCallback((distance) => {
    if (!formData.carType) return;
    
    const selectedCar = cars.find(c => c.name === formData.carType);
    if (!selectedCar) return;
    
    const actualDistance = Math.max(distance, 1);
    const rate = formData.tripType === 'one-way' ? selectedCar.oneWayRate : selectedCar.roundTripRate;
    const baseFare = rate * actualDistance;
    const driverBata = selectedCar.driverBata || 400;
    const hillCharges = selectedCar.hillCharges || 300;
    
    setCalculatedDistance(actualDistance);
    setFareEstimate({
      carName: selectedCar.name,
      rate: rate,
      actualDistance: actualDistance,
      baseFare: baseFare,
      driverBata: driverBata,
      hillCharges: hillCharges,
      total: baseFare + driverBata
    });
  }, [formData.carType, formData.tripType, cars]);

  // Calculate distance when pickup or drop location changes
  useEffect(() => {
    if (formData.pickupLocation && formData.dropLocation) {
      const distance = calculateDistance(formData.pickupLocation, formData.dropLocation);
      updateFareWithDistance(distance);
    } else {
      setFareEstimate(null);
      setCalculatedDistance(0);
    }
  }, [formData.pickupLocation, formData.dropLocation, formData.tripType, formData.carType, updateFareWithDistance]);

  // Handle pickup location change with suggestions
  const handlePickupChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, pickupLocation: value }));
    
    if (value.length >= 2) {
      const suggestions = getCitySuggestions(value);
      setPickupSuggestions(suggestions);
      setShowPickupSuggestions(true);
    } else {
      setPickupSuggestions([]);
      setShowPickupSuggestions(false);
    }
  };

  // Handle drop location change with suggestions
  const handleDropChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, dropLocation: value }));
    
    if (value.length >= 2) {
      const suggestions = getCitySuggestions(value);
      setDropSuggestions(suggestions);
      setShowDropSuggestions(true);
    } else {
      setDropSuggestions([]);
      setShowDropSuggestions(false);
    }
  };

  // Select suggestion for pickup
  const selectPickupSuggestion = (city) => {
    setFormData(prev => ({ ...prev, pickupLocation: city }));
    setPickupSuggestions([]);
    setShowPickupSuggestions(false);
  };

  // Select suggestion for drop
  const selectDropSuggestion = (city) => {
    setFormData(prev => ({ ...prev, dropLocation: city }));
    setDropSuggestions([]);
    setShowDropSuggestions(false);
  };

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
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

  useEffect(() => {
    if (statsVisible) {
      const targets = {
        trips: 25000,
        rating: 48,
        awards: 10,
        customers: 30000
      };

      const duration = 1500;
      const steps = 30;
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

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

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
            { name: 'SEDAN', displayName: 'SEDAN', oneWayRate: 15, roundTripRate: 14, driverBata: 400, hillCharges: 300 },
            { name: 'ETIOS', displayName: 'ETIOS', oneWayRate: 16, roundTripRate: 15, driverBata: 400, hillCharges: 300 },
            { name: 'MUV', displayName: 'MUV', oneWayRate: 20, roundTripRate: 19, driverBata: 400, hillCharges: 300 },
            { name: 'INNOVA', displayName: 'INNOVA', oneWayRate: 21, roundTripRate: 20, driverBata: 400, hillCharges: 300 }
          ]);
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
        setCars([
          { name: 'SEDAN', displayName: 'SEDAN', oneWayRate: 15, roundTripRate: 14, driverBata: 400, hillCharges: 300 },
          { name: 'ETIOS', displayName: 'ETIOS', oneWayRate: 16, roundTripRate: 15, driverBata: 400, hillCharges: 300 },
          { name: 'MUV', displayName: 'MUV', oneWayRate: 20, roundTripRate: 19, driverBata: 400, hillCharges: 300 },
          { name: 'INNOVA', displayName: 'INNOVA', oneWayRate: 21, roundTripRate: 20, driverBata: 400, hillCharges: 300 }
        ]);
      }
    };
    
    fetchCars();
  }, []);

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
    
    if (selectedCar && calculatedDistance > 0) {
      const actualDistance = Math.max(calculatedDistance, 1);
      const rate = formData.tripType === 'one-way' ? selectedCar.oneWayRate : selectedCar.roundTripRate;
      const baseFare = rate * actualDistance;
      const driverBata = selectedCar.driverBata || 400;
      const hillCharges = selectedCar.hillCharges || 300;
      
      setFareEstimate({
        carName: selectedCar.name,
        rate: rate,
        actualDistance: actualDistance,
        baseFare: baseFare,
        driverBata: driverBata,
        hillCharges: hillCharges,
        total: baseFare + driverBata
      });
      
      toast.success(`${carName} selected - Fare calculated!`);
    } else if (selectedCar && formData.pickupLocation && formData.dropLocation) {
      const distance = calculateDistance(formData.pickupLocation, formData.dropLocation);
      const actualDistance = Math.max(distance, 1);
      const rate = formData.tripType === 'one-way' ? selectedCar.oneWayRate : selectedCar.roundTripRate;
      const baseFare = rate * actualDistance;
      const driverBata = selectedCar.driverBata || 400;
      const hillCharges = selectedCar.hillCharges || 300;
      
      setFareEstimate({
        carName: selectedCar.name,
        rate: rate,
        actualDistance: actualDistance,
        baseFare: baseFare,
        driverBata: driverBata,
        hillCharges: hillCharges,
        total: baseFare + driverBata
      });
      
      toast.success(`${carName} selected - Fare calculated!`);
    } else {
      toast.info(`Please enter pickup and drop locations first for accurate fare`);
    }
  };

  // Convert 24-hour time to 12-hour format with AM/PM
  const formatTimeTo12Hour = (time24) => {
    if (!time24) return '';
    
    let [hours, minutes] = time24.split(':');
    hours = parseInt(hours);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes.padStart(2, '0');
    return `${hours}:${minutesStr} ${ampm}`;
  };

  const generateWhatsAppMessage = (booking) => {
    const tripTypeText = booking.tripType === 'one-way' ? 'ONE WAY' : 'ROUND TRIP';
    
    const formattedDate = new Date(booking.pickupDate).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    const formattedTime = formatTimeTo12Hour(booking.pickupTime);
    
    // Using simple text without problematic emojis for better WhatsApp compatibility
    return encodeURIComponent(
      `*NEW TAXI BOOKING - Lexus DROP TAXI*\n\n` +
      `----------------------------------------\n` +
      `Booking ID: ${booking.bookingId}\n` +
      `Customer Name: ${booking.name}\n` +
      `Customer Mobile: ${booking.mobile}\n` +
      `----------------------------------------\n` +
      `Car Type: ${booking.carType}\n` +
      `Trip Type: ${tripTypeText}\n` +
      `From: ${booking.pickupLocation}\n` +
      `To: ${booking.dropLocation}\n` +
      `Distance: ${booking.fareEstimate.actualDistance} km\n` +
      `Date: ${formattedDate}\n` +
      `Time: ${formattedTime}\n` +
      `----------------------------------------\n` +
      `FARE DETAILS:\n` +
      `Rate: Rs.${booking.fareEstimate.rate}/km\n` +
      `Total Distance: ${booking.fareEstimate.actualDistance} km\n` +
      `Base Fare: Rs.${booking.fareEstimate.baseFare}\n` +
      `Driver Bata: Rs.${booking.fareEstimate.driverBata}\n` +
      `TOTAL FARE: Rs.${booking.fareEstimate.total}\n` +
      `----------------------------------------\n` +
      `Note: Toll, state permit & hill charges extra if applicable\n` +
      `Hill Station Charges: Rs.${booking.fareEstimate.hillCharges || 300} (if applicable)\n\n` +
      `Contact Customer: ${booking.mobile}\n` +
      `Please confirm this booking with the customer.`
    );
  };

  const sendWhatsAppToClient = (message) => {
    const whatsappUrl = `https://wa.me/${CLIENT_WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const saveBookingToBackend = async (bookingData) => {
    try {
      const token = localStorage.getItem('token');
      
      const backendBookingData = {
        tripType: bookingData.tripType,
        carType: bookingData.carType,
        pickupLocation: bookingData.pickupLocation,
        dropLocation: bookingData.dropLocation,
        pickupDate: bookingData.pickupDate,
        pickupTime: bookingData.pickupTime,
        distance: bookingData.fareEstimate.actualDistance,
        estimatedFare: bookingData.fareEstimate.baseFare,
        driverBata: bookingData.fareEstimate.driverBata,
        totalFare: bookingData.fareEstimate.total,
        customerName: bookingData.name,
        customerMobile: bookingData.mobile,
        bookingId: bookingData.bookingId,
        status: 'confirmed'
      };

      if (token) {
        const response = await axios.post(`${API_URL}/bookings`, backendBookingData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        return response.data.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error saving booking to backend:', error);
      return null;
    }
  };

  const saveToLocalStorage = (bookingData) => {
    try {
      const localBookings = JSON.parse(localStorage.getItem('localBookings') || '[]');
      localBookings.unshift({
        ...bookingData,
        savedAt: new Date().toISOString()
      });
      localStorage.setItem('localBookings', JSON.stringify(localBookings.slice(0, 20)));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.pickupLocation || !formData.dropLocation) {
      toast.error('Please enter pickup and drop locations');
      return;
    }

    if (!formData.name || formData.name.trim().length < 2) {
      toast.error('Please enter a valid name');
      return;
    }

    if (!formData.mobile || !/^[6-9]\d{9}$/.test(formData.mobile)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    if (!formData.carType) {
      toast.error('Please select a car type');
      return;
    }

    if (!fareEstimate) {
      toast.error('Please wait for fare calculation');
      return;
    }

    if (bookingInProgress) {
      toast.info('Booking in progress...');
      return;
    }

    setBookingInProgress(true);
    setLoading(true);

    try {
      const bookingData = {
        ...formData,
        fareEstimate,
        bookingId: `LEX${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
        bookingDate: new Date().toISOString(),
        status: 'confirmed'
      };
      
      let savedBooking = null;
      
      if (user) {
        toast.info('Saving your booking...');
        savedBooking = await saveBookingToBackend(bookingData);
        if (savedBooking) {
          toast.success('Booking saved successfully!');
          bookingData._id = savedBooking._id;
        } else {
          toast.warning('Saved locally - backend not available');
        }
      }
      
      saveToLocalStorage(bookingData);
      
      const clientMessage = generateWhatsAppMessage(bookingData);
      sendWhatsAppToClient(clientMessage);
      
      setShowSuccessPopup(true);
      
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
      setCalculatedDistance(0);
      
      toast.success('Booking confirmed! Admin will contact you shortly.');
      
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Booking failed. Please try again or contact support.');
    } finally {
      setLoading(false);
      setBookingInProgress(false);
    }
  };

  const handlePopupClose = () => {
    setShowSuccessPopup(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stats = [
    { icon: '🚗', value: counters.trips, label: 'Trips Completed', suffix: '+' },
    { icon: '⭐', value: counters.rating, label: 'Customer Rating', suffix: '', isDecimal: true },
    { icon: '🏆', value: counters.awards, label: 'Awards', suffix: '+' },
    { icon: '👥', value: counters.customers, label: 'Happy Customers', suffix: '+' }
  ];

  const tariffCars = useMemo(() => [
    {
      name: 'SEDAN',
      oneWayRate: 15,
      roundTripRate: 14,
      driverBata: 400,
      hillCharges: 300,
      permitCharge: 14,
      images: [
        { url: '/images/sedan/tata-zest-1.jpg', 
          model: 'TATA ZEST', 
          bgColor: '#FFD700' },
        { url: '/images/sedan/swift-dzire-1.jpg', 
          model: 'SWIFT DZIRE', 
          bgColor: '#FFD700' },
        { url: '/images/sedan/hyundai-aura-1.jpg', 
          model: 'HYNDAI AURA', 
          bgColor: '#FFD700' }
      ]
    },
    {
      name: 'ETIOS',
      oneWayRate: 16,
      roundTripRate: 15,
      driverBata: 400,
      hillCharges: 300,
      permitCharge: 14,
      images: [
        { url: '/images/sedan2/nissan-1.jpg', 
          model: 'NISSIAN SUNNY', 
          bgColor: '#FFD700' },
        { url: '/images/sedan2/etios-2.jpg', 
          model: 'TOYOTA ETIOS', 
          bgColor: '#FFD700' },
        { url: '/images/sedan2/ciaz-1.jpg', 
          model: 'MARUTI CIAZ', 
          bgColor: '#FFD700' }
      ]
    },
    {
      name: 'MUV',
      oneWayRate: 20,
      roundTripRate: 19,
      driverBata: 400,
      hillCharges: 300,
      permitCharge: 14,
      images: [
        { url: '/images/suv/xylo-1.jpg', 
          model: 'XYLO', 
          bgColor: '#FFD700' },
        { url: '/images/suv/ertiga-1.jpg', 
          model: 'MARUTI ERTIGA', 
          bgColor: '#FFD700' },
        { url: '/images/suv/marazzo-1.jpg', 
          model: 'MARAZZO', 
          bgColor: '#FFD700' }
      ]
    },
    {
      name: 'INNOVA',
      oneWayRate: 21,
      roundTripRate: 20,
      driverBata: 400,
      hillCharges: 300,
      permitCharge: 14,
      images: [
        { url: '/images/innova/innova-1.jpg', 
          model: 'INNOVA', 
          bgColor: '#FFD700' },
        { url: '/images/innova/innova-crysta-1.jpg', 
          model: 'INNOVA CRYSTA', 
          bgColor: '#FFD700' },
        { url: '/images/innova/innova-vehicle-1.jpg', 
          model: 'INNOVA VEHICLE', 
          bgColor: '#FFD700' }
      ]
    }
  ], []);

  const popularRoutes = useMemo(() => [
    {
      from: 'kanniyakumari',
      to: 'chennai',
      icon: <FaWater />,
      image: '/images/routess/kanniyakumari.jpg',
      description: 'Princess of Hill Stations - Scenic beauty & pleasant',
      distance: '705 km',
      cars: [
        { type: 'SEDAN', oneWay: 15, roundTrip: 14 },
        { type: 'ETIOS', oneWay: 16, roundTrip: 15 },
        { type: 'MUV', oneWay: 20, roundTrip: 19 },
        { type: 'INNOVA', oneWay: 21, roundTrip: 20 }
      ]
    },
    {
      from: 'Chennai',
      to: 'Coutralam',
      icon: <FaMountain />,
      image: '/images/routess/kuththalam.jpg',
      description: 'Famous waterfalls & natural spa - The Spa of South',
      distance: '650 km',
      cars: [
        { type: 'SEDAN', oneWay: 15, roundTrip: 14 },
        { type: 'ETIOS', oneWay: 16, roundTrip: 15 },
        { type: 'MUV', oneWay: 20, roundTrip: 19 },
        { type: 'INNOVA', oneWay: 21, roundTrip: 20 }
      ]
    },
    {
      from: 'Chennai',
      to: 'madurai',
      icon: <FaRoad />,
      image: '/images/routess/madurai.jpg',
      description: 'Southernmost tip of India - Sunrise & sunset view',
      distance: '456 km',
      cars: [
        { type: 'SEDAN', oneWay: 15, roundTrip: 14 },
        { type: 'ETIOS', oneWay: 16, roundTrip: 15 },
        { type: 'MUV', oneWay: 20, roundTrip: 19 },
        { type: 'INNOVA', oneWay: 21, roundTrip: 20 }
      ]
    },
    {
      from: 'Tenkasi',
      to: 'Chennai',
      icon: <FaSun />,
      image: '/images/routess/tenkasi.jpg',
      description: 'Temple town to Metropolitan city - Comfortable journey',
      distance: '634 km',
      cars: [
        { type: 'SEDAN', oneWay: 15, roundTrip: 14 },
        { type: 'ETIOS', oneWay: 16, roundTrip: 15 },
        { type: 'MUV', oneWay: 20, roundTrip: 19 },
        { type: 'INNOVA', oneWay: 21, roundTrip: 20 }
      ]
    }
  ], []);

  const aboutStats = useMemo(() => [
    { icon: <FaCar />, value: '15000+', label: 'Trips Completed' },
    { icon: <FaUsers />, value: '5000+', label: 'Happy Customers' },
    { icon: <FaAward />, value: '10+', label: 'Awards' },
    { icon: <FaHeart />, value: '100+', label: 'Fleet Size' }
  ], []);

  const generateSparkles = useCallback(() => {
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
        willChange: 'transform, opacity'
      };
      sparkles.push(<div key={`sparkle-${i}`} className="sparkle" style={style}></div>);
    }
    return sparkles;
  }, []);

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
      willChange: 'transform, box-shadow'
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
    suggestionList: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      maxHeight: '200px',
      overflowY: 'auto',
      zIndex: 1000,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    },
    suggestionItem: {
      padding: '8px 12px',
      cursor: 'pointer',
      borderBottom: '1px solid #eee',
      transition: 'background-color 0.2s ease',
      ...letterStyle
    },
    mobileStyles: `
      /* Desktop and Tablet Default */
      .hero-row {
        display: flex;
        align-items: center;
      }
      
      .destination-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer;
      }
      
      .destination-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
      }
      
      .spot-tag {
        display: inline-block;
        background: rgba(255,255,255,0.2);
        border-radius: 20px;
        padding: 4px 12px;
        font-size: 0.75rem;
        margin-right: 8px;
        margin-bottom: 8px;
      }
      
      .suggestions-container {
        position: relative;
      }
      
      .suggestions-list {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        max-height: 200px;
        overflow-y: auto;
      }
      
      .suggestion-item {
        padding: 8px 12px;
        cursor: pointer;
        transition: background 0.2s;
      }
      
      .suggestion-item:hover {
        background: #f0f0f0;
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
          font-weight: 700 !important;
        }
        
        .carousel-caption p {
          font-size: 0.9rem !important;
        }
        
        .carousel-indicators {
          bottom: 10px !important;
        }
        
        .form-card-body {
          padding: 1.2rem !important;
        }
        
        .form-title {
          font-size: 1.4rem !important;
          font-weight: 700 !important;
        }
        
        .form-label {
          font-size: 0.9rem !important;
        }
        
        .form-input {
          font-size: 0.95rem !important;
          padding: 0.5rem 0.7rem !important;
        }
        
        .trip-type-box {
          padding: 0.5rem !important;
          font-size: 0.9rem !important;
          font-weight: 700 !important;
        }
        
        .fare-box {
          padding: 0.7rem !important;
          font-size: 0.9rem !important;
        }
        
        .submit-button {
          font-size: 1rem !important;
          padding: 0.6rem !important;
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
          font-weight: 700 !important;
        }
        
        .destination-card .card-body {
          padding: 1.2rem !important;
        }
        
        .destination-card h4 {
          font-size: 1.3rem !important;
        }
        
        .destination-card .btn {
          font-size: 0.85rem !important;
          padding: 8px 12px !important;
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
          height: 310px !important;
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
        
        .destination-card .popular-spots {
          font-size: 0.7rem !important;
        }
        
        .destination-card .spot-tag {
          font-size: 0.65rem !important;
          padding: 2px 8px !important;
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
      
      /* Animations */
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
      <style>{formStyles.mobileStyles}</style>

      {/* FLOATING WHATSAPP AND PHONE ICONS */}
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

      {/* Hero Section - Keep as is from your original code */}
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
                Anywhere You Go,<br />
                <span className="text-warning" style={headingStyle}>We're There</span>
              </h1>
              <p 
                className="lead mb-5" 
                style={{ 
                  fontSize: 'clamp(1.2rem, 2vw, 2.1rem)',
                  textShadow: '1px 1px 2px rgba(242, 240, 240, 0.97)',
                  ...letterStyle,
                  lineHeight: '1.6',
                  color: '#FFFFFF'
                }}
              >
                Safe, comfortable, and on-time taxi service across Tamilnadu, 
                Kerala, Andhra Pradesh, Karnataka, and Pondicherry.
              </p>
            </Col>

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
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${image.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      borderRadius: '15px',
                      willChange: 'opacity'
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
                        textShadow: '2px 2px 4px rgba(11, 11, 11, 0.5)'
                      }}
                    >
                      <h3 className="fw-bold mb-2" style={headingStyle}>{image.title}</h3>
                      <p className="mb-0" style={letterStyle}>{image.description}</p>
                    </div>
                  </div>
                ))}

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

            <Col lg={6} className="hero-col-form">
              <Card 
                className="border-0 shadow-lg form-card" 
                style={{
                  ...formStyles.card,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {generateSparkles()}
                
                <Card.Body className="form-card-body" style={formStyles.cardBody}>
                  <h3 className="text-center fw-bold mb-4 form-title" style={formStyles.title}>
                    <span style={{ color: '#FFFFFF', ...headingStyle }}>Lexus-Drop</span>{' '}
                    <span style={{ color: '#FFD700', ...headingStyle }}>Taxi</span>
                  </h3>

                  <form onSubmit={handleSubmit}>
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
                            if (formData.carType && formData.pickupLocation && formData.dropLocation) {
                              const distance = calculateDistance(formData.pickupLocation, formData.dropLocation);
                              updateFareWithDistance(distance);
                            }
                          }}
                        >
                          <strong style={{ fontSize: '1.1rem', letterSpacing: '0px', ...boldStyle }}>ONE WAY</strong>
                          <br />
                          
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
                            if (formData.carType && formData.pickupLocation && formData.dropLocation) {
                              const distance = calculateDistance(formData.pickupLocation, formData.dropLocation);
                              updateFareWithDistance(distance);
                            }
                          }}
                        >
                          <strong style={{ fontSize: '1.1rem', letterSpacing: '0px', ...boldStyle }}>ROUND TRIP</strong>
                          <br />
                          
                        </div>
                      </div>
                    </div>

                    <div className="mb-2 position-relative">
                      <label className="fw-bold form-label" style={formStyles.label}>
                        <FaMapMarkerAlt className="me-1" style={{ color: '#FFD700' }} size={12} />
                        Pickup Location *
                      </label>
                      <input
                        type="text"
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handlePickupChange}
                        onFocus={() => formData.pickupLocation.length >= 2 && setShowPickupSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowPickupSuggestions(false), 200)}
                        className="form-control form-input"
                        style={formStyles.input}
                        placeholder="Enter Pickup Location (e.g., Chennai, Coimbatore)"
                        required
                      />
                      {showPickupSuggestions && pickupSuggestions.length > 0 && (
                        <div className="suggestions-list" style={formStyles.suggestionList}>
                          {pickupSuggestions.map((city, idx) => (
                            <div
                              key={idx}
                              className="suggestion-item"
                              style={formStyles.suggestionItem}
                              onClick={() => selectPickupSuggestion(city)}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                            >
                              {city}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mb-2 position-relative">
                      <label className="fw-bold form-label" style={formStyles.label}>
                        <FaMapMarkerAlt className="me-1" style={{ color: '#FFD700' }} size={12} />
                        Drop Location *
                      </label>
                      <input
                        type="text"
                        name="dropLocation"
                        value={formData.dropLocation}
                        onChange={handleDropChange}
                        onFocus={() => formData.dropLocation.length >= 2 && setShowDropSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowDropSuggestions(false), 200)}
                        className="form-control form-input"
                        style={formStyles.input}
                        placeholder="Enter Drop Location (e.g., Madurai, Salem)"
                        required
                      />
                      {showDropSuggestions && dropSuggestions.length > 0 && (
                        <div className="suggestions-list" style={formStyles.suggestionList}>
                          {dropSuggestions.map((city, idx) => (
                            <div
                              key={idx}
                              className="suggestion-item"
                              style={formStyles.suggestionItem}
                              onClick={() => selectDropSuggestion(city)}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                            >
                              {city}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {calculatedDistance > 0 && formData.pickupLocation && formData.dropLocation && (
                      <div className="mb-2 text-center">
                        <small className="text-white" style={{ ...letterStyle, backgroundColor: 'rgba(0,0,0,0.5)', padding: '4px 8px', borderRadius: '20px', display: 'inline-block' }}>
                          📍 Distance: {calculatedDistance} km
                        </small>
                      </div>
                    )}

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
 
                    <div className="mb-3">
                      <label className="fw-bold form-label mb-3" style={{ ...formStyles.label, fontSize: '1.1rem' }}>
                        Select Car Type *
                      </label>
                      
                      <Row className="g-3">
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
                          >
                            <img 
                              src="/images/sedan/hyundai-aura-1.jpg"
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
                              ₹<OptimizedNumber num={15} />/km
                            </div>
                          </div>
                        </Col>

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
                          >
                            <img 
                              src="/images/sedan2/ciaz-1.jpg"
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
                              ₹<OptimizedNumber num={16} />/km
                            </div>
                          </div>
                        </Col>

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
                          >
                            <img 
                              src="/images/suv/marazzo-1.jpg"
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
                              ₹<OptimizedNumber num={20} />/km
                            </div>
                          </div>
                        </Col>

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
                          >
                            <img 
                              src="/images/innova/innova-1.jpg"
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
                              ₹<OptimizedNumber num={21} />/km
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>

                    {fareEstimate && (
                      <div className="bg-light rounded mb-3 fare-box" style={formStyles.fareBox}>
                        <div className="d-flex justify-content-between mb-1">
                          <span style={letterStyle}>Distance:</span>
                          <span className="fw-bold" style={{ color: '#8B0000', ...boldStyle }}><OptimizedNumber num={fareEstimate.actualDistance} /> km</span>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                          <span style={letterStyle}>Base Fare (@ ₹<OptimizedNumber num={fareEstimate.rate} />/km):</span>
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
                          *Toll, permit & hill charges extra if applicable
                        </small>
                      </div>
                    )}

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

      {/* SUCCESS POPUP */}
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
            Thank you for choosing Lexus Drop Taxi. Your booking has been successfully confirmed.
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
              const carImages = car.images;
              
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
                      {carImages.map((imageObj, imgIndex) => (
                        <Carousel.Item key={imgIndex}>
                          <div style={{
                            width: '100%',
                            height: '280px',
                            backgroundColor: imageObj.bgColor || '#FFD700',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <img
                              src={imageObj.url}
                              alt={`${car.name} - ${imageObj.model}`}
                              style={{
                                maxWidth: '100%',
                                maxHeight: '260px',
                                width: 'auto',
                                height: 'auto',
                                objectFit: 'contain'
                              }}
                              loading="lazy"
                            />
                          </div>
                          <Carousel.Caption style={{ 
                            bottom: '0', 
                            left: '0', 
                            right: '0', 
                            background: 'linear-gradient(to top, #FFD700, transparent)', 
                            textAlign: 'left',
                            padding: '15px'
                          }}>
                            <h5 className="fw-bold mb-1" style={{ 
                              ...headingStyle, 
                              fontSize: '1.2rem',
                              color: '#052a62ff'
                            }}>
                              {car.name} {imageObj.model}
                            </h5>
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
                              <small className="text-muted" style={letterStyle}>(Actual Distance Only)</small>
                            </div>
                          </Col>
                          <Col xs={6}>
                            <div className="p-3 rounded text-center" style={{ backgroundColor: '#fff3cd', border: '1px solid #ffc107' }}>
                              <h6 className="fw-bold mb-2" style={boldStyle}>ROUND TRIP</h6>
                              <h5 className="text-warning fw-bold mb-1" style={boldStyle}>
                                <FaRupeeSign className="me-1" /> <OptimizedNumber num={car.roundTripRate} />/KM
                              </h5>
                              <small className="text-muted" style={letterStyle}>(Actual Distance Only)</small>
                            </div>
                          </Col>
                        </Row>
                      </div>

                      <div>
                        <h6 className="fw-bold mb-3" style={headingStyle}><FaInfoCircle className="text-warning me-2" />EXCLUDE WITH</h6>
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
                      <span className="fw-bold ms-2 me-2" style={boldStyle}>MUV:</span> ₹<OptimizedNumber num={route.cars[2].oneWay} />/km
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

      {/* Popular Destinations Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5" style={{ 
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            ...headingStyle
          }}>
            Popular <span className="text-warning" style={headingStyle}>Destinations</span>
          </h2>
          
          <Row className="g-4">
            {popularDestinations.map((destination) => (
              <Col lg={6} md={6} key={destination.id}>
                <Card className="border-0 shadow-lg h-100 destination-card" style={{ 
                  borderRadius: '20px', 
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}>
                  <div className="position-relative" style={{ height: '220px', overflow: 'hidden' }}>
                    <img 
                      src={destination.image}
                      alt={destination.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                      className="destination-img"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/600x400?text=' + destination.name;
                      }}
                    />
                    <div 
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{
                        background: `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)`,
                      }}
                    ></div>
                    <div 
                      className="position-absolute bottom-0 start-0 w-100 p-4"
                      style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                      }}
                    >
                      <h3 className="fw-bold text-white mb-0" style={{ ...headingStyle, fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                        {destination.name}
                      </h3>
                      <p className="text-warning fw-semibold mb-0" style={letterStyle}>
                        {destination.state}
                      </p>
                    </div>
                  </div>

                  <Card.Body className="p-4">
                    <p className="mb-3" style={letterStyle}>
                      {destination.description}
                    </p>

                    <div className="mb-3">
                      <h6 className="fw-bold mb-2" style={{ ...boldStyle, fontSize: '0.85rem', color: '#666' }}>
                        <FaStar className="text-warning me-1" size={12} />
                        POPULAR SPOTS:
                      </h6>
                      <div className="popular-spots">
                        {destination.popularSpots.map((spot, idx) => (
                          <span key={idx} className="spot-tag" style={{
                            display: 'inline-block',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '20px',
                            padding: '4px 12px',
                            fontSize: '0.75rem',
                            marginRight: '8px',
                            marginBottom: '8px',
                            ...letterStyle
                          }}>
                            {spot}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="d-flex gap-2 mt-3">
                      <Button 
                        variant="warning" 
                        size="sm" 
                        className="flex-grow-1 fw-bold"
                        style={{ borderRadius: '10px', ...boldStyle }}
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            pickupLocation: destination.name,
                            dropLocation: ''
                          }));
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        VIEW DETAILS
                      </Button>
                      <Button 
                        variant="outline-warning" 
                        size="sm"
                        style={{ borderRadius: '10px', ...boldStyle }}
                        onClick={() => window.location.href = `tel:+${CLIENT_PHONE_NUMBER}`}
                      >
                        <FaPhone /> CALL
                      </Button>
                      <Button 
                        variant="success" 
                        size="sm"
                        style={{ borderRadius: '10px', backgroundColor: '#25d366', borderColor: '#25d366', ...boldStyle }}
                        onClick={() => window.open(`https://wa.me/${CLIENT_WHATSAPP_NUMBER}?text=Hi! I'm interested in taxi service to ${destination.name}`, '_blank')}
                      >
                        <FaWhatsapp /> WHATSAPP
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
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
                src="/images/sedan/swift-dzire-2.jpg"
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
                Since 2025, we've been proudly serving Tamilnadu, Kerala, Andhra Pradesh, Karnataka, and Pondicherry with reliable taxi services.
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
                  <p className="text-secondary mb-1" style={boldStyle}>+91 81481 11516</p>
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
                  <p className="text-secondary mb-1" style={letterStyle}>lexusno1taxi@gmail.com</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="text-center mt-4">
            <Button variant="warning" onClick={() => navigate('/contact')} style={boldStyle}>Contact Us</Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;