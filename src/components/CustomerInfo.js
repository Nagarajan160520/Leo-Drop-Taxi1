import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { FaInfoCircle, FaPhone, FaWhatsapp, FaTruck, FaUsers, FaAward, FaClock } from 'react-icons/fa';

const CustomerInfo = () => {
  const [counters, setCounters] = useState({
    trips: 0,
    customers: 0,
    years: 0,
    satisfaction: 0
  });

  const [isVisible, setIsVisible] = useState(false);
  // Removed unused statsRef
  const cardRefs = useRef([]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains('stats-card')) {
              setIsVisible(true);
            }
            entry.target.classList.add('fade-in-up');
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px' }
    );

    // Create a copy of cardRefs.current for cleanup
    const currentRefs = cardRefs.current;

    // Observe all cards
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      // Use the copied refs for cleanup
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []); // Empty dependency array since cardRefs is stable

  // Counter animation
  useEffect(() => {
    if (isVisible) {
      const targets = {
        trips: 15000,
        customers: 5000,
        years: 2,
        satisfaction: 98
      };

      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = Math.min(currentStep / steps, 1);

        setCounters({
          trips: Math.floor(targets.trips * progress),
          customers: Math.floor(targets.customers * progress),
          years: Math.floor(targets.years * progress),
          satisfaction: Math.floor(targets.satisfaction * progress)
        });

        if (progress === 1) clearInterval(timer);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return (
    <div className="customer-info-page">
      {/* Hero Section with Animation */}
      <section className="hero-section-customer py-5">
        <Container>
          <div className="text-center" 
               style={{ animation: 'slideInDown 1s ease-out' }}>
            <h1 className="display-4 fw-bold mb-4">
              <span className="text-warning">Customer</span> Information
            </h1>
            <p className="lead text-muted" 
               style={{ animation: 'fadeIn 1.5s ease-out 0.3s both' }}>
              Everything you need to know about our services
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-5">
        <Row>
          <Col lg={8} className="mx-auto">
            {/* Main Information Card with Floating Animation */}
            <Card 
              ref={el => cardRefs.current[0] = el}
              className="border-0 shadow-lg mb-5 info-card"
              style={{ 
                borderRadius: '20px',
                transform: 'translateY(0)',
                transition: 'all 0.3s ease'
              }}
            >
              <Card.Body className="p-5">
                <h4 className="text-warning mb-4" 
                    style={{ 
                      animation: 'slideInLeft 0.8s ease-out',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                  <FaInfoCircle className="me-2 pulse-icon" />
                  Fare Details Above
                </h4>

                <ListGroup variant="flush" className="animated-list">
                  {[
                    "Toll fees, Inter-State Permit charges (if any) are extra.",
                    "Drop Trips - Driver Bata For Sedan Rs.400 & SUV Rs.500",
                    "Waiting Charges Rs.150 per hour",
                    "Drop Trips - Minimum running must be 130kms per day",
                    "Round Trips - Driver Bata Sedan Rs.400 & SUV Rs.500/- per day",
                    "Round Trips - Minimum running must be 250kms per day. For Bengaluru it is minimum 300kms per day.",
                    "Hill station charges - Sedan Rs.400 & SUV Rs.500",
                    "1 day means 1 calendar day (from midnight 12 to Next Midnight 12)"
                  ].map((item, index) => (
                    <ListGroup.Item 
                      key={index}
                      className="px-0 border-0 list-item"
                      style={{ 
                        animation: `slideInRight 0.5s ease-out ${index * 0.1}s both`,
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        padding: '12px 0'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(10px)';
                        e.currentTarget.style.backgroundColor = '#fff3cd';
                        e.currentTarget.style.paddingLeft = '15px';
                        e.currentTarget.style.borderRadius = '8px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.paddingLeft = '0';
                        e.currentTarget.style.borderRadius = '0';
                      }}
                    >
                      <span className="text-warning me-3 fw-bold bullet-animation">•</span>
                      {item}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>

            {/* Stats Cards with Counter Animation */}
            <Row className="g-4 mb-5">
              <Col md={6}>
                <Card 
                  ref={el => cardRefs.current[1] = el}
                  className="border-0 shadow-lg stats-card h-100"
                  style={{ 
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    animation: 'scaleIn 0.5s ease-out'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <Card.Body className="text-center p-4">
                    <div className="stats-icon-wrapper mb-3">
                      <FaTruck className="text-warning stats-icon" size={40} />
                    </div>
                    <h3 className="fw-bold text-warning counter-number">{counters.trips}+</h3>
                    <p className="text-muted">Trips Completed</p>
                    <div className="progress-bar-custom">
                      <div className="progress-fill" style={{ width: '100%' }}></div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card 
                  ref={el => cardRefs.current[2] = el}
                  className="border-0 shadow-lg stats-card h-100"
                  style={{ 
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    animation: 'scaleIn 0.5s ease-out 0.1s both'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <Card.Body className="text-center p-4">
                    <div className="stats-icon-wrapper mb-3">
                      <FaUsers className="text-warning stats-icon" size={40} />
                    </div>
                    <h3 className="fw-bold text-warning counter-number">{counters.customers}+</h3>
                    <p className="text-muted">Happy Customers</p>
                    <div className="progress-bar-custom">
                      <div className="progress-fill" style={{ width: '100%' }}></div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card 
                  ref={el => cardRefs.current[3] = el}
                  className="border-0 shadow-lg stats-card h-100"
                  style={{ 
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    animation: 'scaleIn 0.5s ease-out 0.2s both'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <Card.Body className="text-center p-4">
                    <div className="stats-icon-wrapper mb-3">
                      <FaAward className="text-warning stats-icon" size={40} />
                    </div>
                    <h3 className="fw-bold text-warning counter-number">{counters.years}+</h3>
                    <p className="text-muted">Years of Service</p>
                    <div className="progress-bar-custom">
                      <div className="progress-fill" style={{ width: '100%' }}></div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card 
                  ref={el => cardRefs.current[4] = el}
                  className="border-0 shadow-lg stats-card h-100"
                  style={{ 
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    animation: 'scaleIn 0.5s ease-out 0.3s both'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <Card.Body className="text-center p-4">
                    <div className="stats-icon-wrapper mb-3">
                      <FaClock className="text-warning stats-icon" size={40} />
                    </div>
                    <h3 className="fw-bold text-warning counter-number">{counters.satisfaction}%</h3>
                    <p className="text-muted">Customer Satisfaction</p>
                    <div className="progress-bar-custom">
                      <div className="progress-fill" style={{ width: `${counters.satisfaction}%` }}></div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Achievement Card with Parallax Effect */}
            <Card 
              ref={el => cardRefs.current[5] = el}
              className="border-0 shadow-lg mb-5 achievement-card"
              style={{ 
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #ffc107 0%, #ffdb6e 100%)',
                transform: 'translateY(0)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(255,193,7,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <Card.Body className="p-5 text-center">
                <div className="achievement-badge mb-4">
                  <span className="badge-number">15,000+</span>
                </div>
                <h2 className="fw-bold mb-3">TRIPS COMPLETED</h2>
                <p className="mb-4 fs-5">
                  We are proud to announce that we have successfully completed over 15,000 trips! 
                  This milestone reflects the trust our customers place in us and our commitment 
                  to providing safe, reliable, and comfortable rides.
                </p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <a 
                    href="tel:+917200343435" 
                    className="btn btn-dark btn-lg rounded-pill px-5 pulse-button"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    <FaPhone className="me-2 bounce-icon" /> CALL NOW →
                  </a>
                </div>
              </Card.Body>
            </Card>

            {/* Support Card with 3D Effect */}
            <Card 
              ref={el => cardRefs.current[6] = el}
              className="border-0 shadow-lg support-card"
              style={{ 
                borderRadius: '20px',
                transition: 'all 0.3s ease',
                transform: 'perspective(1000px) rotateX(0deg)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(2deg) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) scale(1)';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <Card.Body className="p-5 text-center">
                <div className="support-icon-wrapper mb-4">
                  <div className="pulse-ring"></div>
                  <FaPhone className="text-warning support-icon" size={50} />
                </div>
                <h4 className="fw-bold mb-3">24x7 CUSTOMER SUPPORT</h4>
                <p className="text-secondary mb-4 fs-5">
                  Anytime, Anywhere. We are available 24/7 to assist with bookings, 
                  queries, or emergencies—because your journey matters to us, day or night.
                </p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <a 
                    href="tel:+917200343435" 
                    className="btn btn-outline-dark rounded-pill px-4 btn-hover"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    <FaPhone className="me-2 rotate-icon" /> Call Us
                  </a>
                  <a 
                    href="https://wa.me/917200343435" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-success rounded-pill px-4 btn-hover"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 10px 20px rgba(37,211,102,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    <FaWhatsapp className="me-2 bounce-icon" /> WhatsApp
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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

        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.7);
          }
          70% {
            transform: scale(1.05);
            box-shadow: 0 0 0 20px rgba(255, 193, 7, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 193, 7, 0);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .pulse-icon {
          animation: pulse 2s infinite;
        }

        .bounce-icon {
          animation: bounce 2s infinite;
        }

        .rotate-icon {
          transition: transform 0.3s ease;
        }

        .rotate-icon:hover {
          animation: rotate 0.5s ease;
        }

        .bullet-animation {
          display: inline-block;
          transition: transform 0.3s ease;
        }

        .list-item:hover .bullet-animation {
          transform: scale(1.5) rotate(360deg);
          color: #ffc107;
        }

        .stats-icon-wrapper {
          position: relative;
          display: inline-block;
        }

        .stats-icon {
          transition: all 0.3s ease;
        }

        .stats-card:hover .stats-icon {
          transform: scale(1.2) rotate(360deg);
        }

        .counter-number {
          font-size: 2.5rem;
          background: linear-gradient(135deg, #ffc107, #ffdb6e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s infinite;
          background-size: 200% 100%;
        }

        .progress-bar-custom {
          height: 6px;
          background: #e0e0e0;
          border-radius: 3px;
          overflow: hidden;
          margin-top: 10px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #ffc107, #ffdb6e);
          transition: width 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 2s infinite;
        }

        .achievement-card {
          position: relative;
          overflow: hidden;
        }

        .achievement-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
          animation: rotate 20s linear infinite;
        }

        .achievement-badge {
          display: inline-block;
          padding: 15px 30px;
          background: white;
          border-radius: 50px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .badge-number {
          font-size: 2rem;
          font-weight: bold;
          color: #ffc107;
        }

        .support-card {
          position: relative;
          overflow: hidden;
        }

        .support-icon-wrapper {
          position: relative;
          display: inline-block;
        }

        .pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255, 193, 7, 0.3);
          animation: pulse 2s infinite;
        }

        .btn-hover {
          transition: all 0.3s ease;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .hero-section-customer {
            padding: 2rem 0;
          }
          
          h1 {
            font-size: 2rem;
          }
          
          .p-5 {
            padding: 1.5rem !important;
          }
          
          .counter-number {
            font-size: 2rem;
          }
          
          .badge-number {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 576px) {
          .hero-section-customer {
            padding: 1.5rem 0;
          }
          
          h1 {
            font-size: 1.8rem;
          }
          
          .p-5 {
            padding: 1.2rem !important;
          }
          
          .btn-lg {
            font-size: 1rem;
            padding: 0.5rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CustomerInfo;