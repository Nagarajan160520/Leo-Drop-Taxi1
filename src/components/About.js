import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { 
  FaCar, 
  FaUsers, 
  FaAward, 
  FaHeart, 
  FaHandshake, 
  FaClock, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaRupeeSign,
  FaStar,
  FaShieldAlt,
  FaRocket,
  FaGem
} from 'react-icons/fa';

const About = () => {
  const [statsVisible, setStatsVisible] = useState(false);
  const [counters, setCounters] = useState({
    trips: 0,
    customers: 0,
    awards: 0,
    fleet: 0
  });

  const statsRef = useRef(null);

  const stats = [
    { icon: <FaCar />, value: 15000, label: 'Trips Completed', suffix: '+', target: 15000 },
    { icon: <FaUsers />, value: 5000, label: 'Happy Customers', suffix: '+', target: 5000 },
    { icon: <FaAward />, value: 10, label: 'Awards', suffix: '+', target: 10 },
    { icon: <FaHeart />, value: 100, label: 'Fleet Size', suffix: '+', target: 100 }
  ];

  // Intersection Observer for stats animation - FIXED
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

  // Counter animation when stats become visible
  useEffect(() => {
    if (statsVisible) {
      const targets = {
        trips: 15000,
        customers: 5000,
        awards: 10,
        fleet: 100
      };

      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        
        if (currentStep <= steps) {
          const progress = currentStep / steps;
          
          setCounters({
            trips: Math.min(Math.round(targets.trips * progress), targets.trips),
            customers: Math.min(Math.round(targets.customers * progress), targets.customers),
            awards: Math.min(Math.round(targets.awards * progress), targets.awards),
            fleet: Math.min(Math.round(targets.fleet * progress), targets.fleet)
          });
        } else {
          setCounters({
            trips: targets.trips,
            customers: targets.customers,
            awards: targets.awards,
            fleet: targets.fleet
          });
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [statsVisible]);

  return (
    <div className="about-page">
      {/* Custom CSS for animations */}
      <style>{`
        /* Fade In Animation */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Slide In Left Animation */
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Slide In Right Animation */
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Scale In Animation */
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Rotate In Animation */
        @keyframes rotateIn {
          from {
            opacity: 0;
            transform: rotate(-10deg) scale(0.9);
          }
          to {
            opacity: 1;
            transform: rotate(0) scale(1);
          }
        }

        /* Bounce Animation */
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* Pulse Animation */
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        /* Shine Animation */
        @keyframes shine {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        /* Float Animation */
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        /* Glow Animation */
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 193, 7, 0.2);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 193, 7, 0.6);
          }
        }

        /* Ripple Animation */
        @keyframes ripple {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.4);
          }
          70% {
            box-shadow: 0 0 0 20px rgba(255, 193, 7, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 193, 7, 0);
          }
        }

        /* Background Gradient Animation */
        @keyframes gradientBG {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Apply animations to elements */
        .fade-in {
          animation: fadeIn 1s ease forwards;
        }

        .slide-in-left {
          animation: slideInLeft 1s ease forwards;
        }

        .slide-in-right {
          animation: slideInRight 1s ease forwards;
        }

        .scale-in {
          animation: scaleIn 0.8s ease forwards;
        }

        .rotate-in {
          animation: rotateIn 1s ease forwards;
        }

        .bounce {
          animation: bounce 2s infinite ease-in-out;
        }

        .pulse {
          animation: pulse 2s infinite ease-in-out;
        }

        .float {
          animation: float 3s infinite ease-in-out;
        }

        .glow {
          animation: glow 2s infinite ease-in-out;
        }

        .ripple {
          animation: ripple 2s infinite;
        }

        /* Hero Section with Gradient Animation */
        .hero-section {
          background: linear-gradient(135deg, #ffc107, #ff9800, #ff5722);
          background-size: 200% 200%;
          animation: gradientBG 8s ease infinite;
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 50%);
          animation: rotateIn 10s linear infinite;
        }

        /* Stat Card Animations */
        .stat-card {
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }

        .stat-card:hover {
          transform: translateY(-15px) scale(1.05);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,193,7,0.2) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .stat-card:hover::before {
          opacity: 1;
          animation: rotateIn 8s linear infinite;
        }

        .stat-icon {
          transition: all 0.5s ease;
        }

        .stat-card:hover .stat-icon {
          transform: scale(1.2) rotate(360deg);
          color: #ffc107;
        }

        /* Content Image Animation */
        .content-image {
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }

        .content-image:hover {
          transform: scale(1.05) rotate(2deg);
          box-shadow: 0 30px 60px rgba(0,0,0,0.3);
        }

        .content-image::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }

        .content-image:hover::before {
          left: 100%;
        }

        /* Mission Card Animations */
        .mission-card {
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }

        .mission-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 25px 50px rgba(0,0,0,0.2);
        }

        .mission-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #ffc107, #ff9800, #ff5722);
          transform: scaleX(0);
          transition: transform 0.5s ease;
        }

        .mission-card:hover::after {
          transform: scaleX(1);
        }

        /* List Item Animations */
        .list-item {
          transition: all 0.3s ease;
          position: relative;
          padding-left: 20px;
        }

        .list-item:hover {
          transform: translateX(10px);
          color: #ffc107;
        }

        .list-item::before {
          content: '→';
          position: absolute;
          left: 0;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .list-item:hover::before {
          opacity: 1;
          transform: translateX(-5px);
        }

        /* Handshake Icon Animation */
        .handshake-icon {
          transition: all 0.5s ease;
        }

        .handshake-icon:hover {
          transform: rotate(360deg) scale(1.2);
          color: #ffc107;
        }

        /* Counter Number Animation */
        .counter-number {
          display: inline-block;
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #ffc107, #ff9800);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 200%;
          animation: gradientBG 3s ease infinite;
        }

        /* Staggered animations for cards */
        .stat-card:nth-child(1) { animation-delay: 0.1s; }
        .stat-card:nth-child(2) { animation-delay: 0.2s; }
        .stat-card:nth-child(3) { animation-delay: 0.3s; }
        .stat-card:nth-child(4) { animation-delay: 0.4s; }
      `}</style>

      {/* Hero Section with Animated Gradient */}
      <section className="hero-section py-5 position-relative overflow-hidden">
        <Container className="text-center position-relative" style={{ zIndex: 2 }}>
          <h1 
            className="display-4 fw-bold mb-3 text-white fade-in"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
          >
            About Leo Drop Taxi
          </h1>
          <p 
            className="lead text-white slide-in-left"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
          >
            Your trusted travel partner since 2023
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <div className="bounce">
              <FaStar size={30} className="text-white" />
            </div>
            <div className="pulse">
              <FaShieldAlt size={30} className="text-white" />
            </div>
            <div className="float">
              <FaRocket size={30} className="text-white" />
            </div>
            <div className="glow">
              <FaGem size={30} className="text-white" />
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-5">
        {/* Stats Section with Counter Animations */}
        <Row className="mb-5" ref={statsRef}>
          {stats.map((stat, index) => (
            <Col lg={3} md={6} key={index} className="mb-4">
              <Card className="text-center p-4 border-0 shadow-sm h-100 stat-card scale-in">
                <div className="stat-icon text-warning display-1 mb-3">
                  {stat.icon}
                </div>
                <h2 className="fw-bold mb-2">
                  <span className="counter-number">
                    {index === 0 && counters.trips}
                    {index === 1 && counters.customers}
                    {index === 2 && counters.awards}
                    {index === 3 && counters.fleet}
                    {stat.suffix}
                  </span>
                </h2>
                <p className="text-secondary">{stat.label}</p>
              </Card>
            </Col>
          ))}
        </Row>

        {/* About Content with Advanced Animations */}
        <Row className="mb-5 align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <div className="content-image position-relative">
              <img 
                src="https://i.pinimg.com/1200x/65/c3/63/65c3636ca6b81584e53084c105c7a54d.jpg"
                alt="Our Fleet"
                className="img-fluid rounded-3 shadow"
                style={{ transition: 'all 0.5s ease' }}
              />
              <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center opacity-0 hover-opacity-100" 
                   style={{ 
                     background: 'rgba(255,193,7,0.2)',
                     transition: 'opacity 0.5s ease',
                     borderRadius: '15px'
                   }}>
                <span className="text-white fw-bold">Premium Fleet</span>
              </div>
            </div>
          </Col>
          <Col lg={6} className="slide-in-right">
            <h2 className="text-warning mb-4">OUR COMPANY</h2>
            <p className="lead mb-4">
              At <strong className="text-warning">Lexus DROP TAXI</strong>, we believe every journey should be safe, 
              comfortable, and on time.
            </p>
            <p className="mb-4">
              Since 2023, we've been proudly serving <strong>Tamilnadu, Kerala, Andra Pradesh, 
              Karnataka, and Pondicherry</strong> with reliable taxi services for locals, travelers, 
              and businesses. From quick city trips to long-distance rides, our professional drivers, 
              well-maintained vehicles, and 24/7 availability ensure you reach your destination 
              without stress or delays.
            </p>
            <div className="d-flex align-items-center handshake-wrapper">
              <FaHandshake className="text-warning me-3 handshake-icon" size={40} />
              <div>
                <h5 className="mb-1">Our Promise</h5>
                <p className="text-secondary mb-0">
                  Safe, comfortable, and on-time service every time
                </p>
              </div>
            </div>
          </Col>
        </Row>

        {/* Mission & Values with Advanced Animations */}
        <Row className="mb-5">
          <Col md={6} className="mb-4">
            <Card className="border-0 shadow h-100 mission-card slide-in-left">
              <Card.Body className="p-5">
                <h3 className="text-warning mb-4">Our Mission</h3>
                <p className="lead">
                  To provide fast, friendly, and affordable transportation while keeping 
                  safety and customer satisfaction at the heart of everything we do.
                </p>
                <div className="mt-4">
                  <div className="progress" style={{ height: '4px' }}>
                    <div className="progress-bar bg-warning" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-end mt-2 small">85% Achieved</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="border-0 shadow h-100 mission-card slide-in-left" style={{ animationDelay: '0.2s' }}>
              <Card.Body className="p-5">
                <h3 className="text-warning mb-4">Why Choose Us</h3>
                <ul className="list-unstyled">
                  <li className="mb-3 list-item">
                    <FaCar className="text-warning me-3" />
                    Trained & Courteous Drivers - Polite, experienced, and customer-focused.
                  </li>
                  <li className="mb-3 list-item">
                    <FaClock className="text-warning me-3" />
                    Always On Time - We value your time as much as you do.
                  </li>
                  <li className="mb-3 list-item">
                    <FaRupeeSign className="text-warning me-3" />
                    Fair & Transparent Pricing - No hidden charges.
                  </li>
                  <li className="mb-3 list-item">
                    <FaMapMarkerAlt className="text-warning me-3" />
                    GPS-Enabled Vehicles - For real-time tracking and safety.
                  </li>
                  <li className="mb-3 list-item">
                    <FaPhone className="text-warning me-3" />
                    24/7 Booking Support - We're always here when you need a ride.
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Floating Action Button */}
        <div className="position-fixed bottom-0 end-0 m-4" style={{ zIndex: 1000 }}>
          <button 
            className="btn btn-warning rounded-circle p-3 shadow-lg bounce"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ width: '60px', height: '60px' }}
          >
            ↑
          </button>
        </div>
      </Container>
    </div>
  );
};

export default About;