import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar as BSNavbar, Nav, Container, Button } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaPhone, FaInfoCircle, FaRoad, FaMoneyBill, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPhoneTooltip, setShowPhoneTooltip] = useState(false);

  // Scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Custom CSS for animations - WITH CROSS SHADOW EFFECTS */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes phoneRing {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(10deg); }
          20% { transform: rotate(-10deg); }
          30% { transform: rotate(10deg); }
          40% { transform: rotate(-10deg); }
          50% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes shine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        /* ============================================ */
        /* CROSS SHADOW ANIMATIONS - BACKGROUND EFFECTS */
        /* ============================================ */
        
        /* Moving cross shadows */
        @keyframes crossShadow1 {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
            opacity: 0;
          }
          25% {
            opacity: 0.5;
          }
          50% {
            transform: translateX(0) translateY(0) rotate(45deg);
            opacity: 0.8;
          }
          75% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
            opacity: 0;
          }
        }

        @keyframes crossShadow2 {
          0% {
            transform: translateX(100%) translateY(-100%) rotate(-45deg);
            opacity: 0;
          }
          25% {
            opacity: 0.5;
          }
          50% {
            transform: translateX(0) translateY(0) rotate(-45deg);
            opacity: 0.8;
          }
          75% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(-100%) translateY(100%) rotate(-45deg);
            opacity: 0;
          }
        }

        @keyframes crossShadow3 {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1) rotate(180deg);
            opacity: 0.6;
          }
          100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes crossShadow4 {
          0% {
            clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
            transform: translateX(-100%) scale(0);
            opacity: 0;
          }
          50% {
            transform: translateX(0) scale(1);
            opacity: 0.5;
          }
          100% {
            transform: translateX(100%) scale(0);
            opacity: 0;
          }
        }

        /* Pulsing background light */
        @keyframes bgPulse {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        /* Floating particles */
        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          25% {
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) translateX(20px) rotate(180deg);
            opacity: 0.5;
          }
          75% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-60px) translateX(40px) rotate(360deg);
            opacity: 0;
          }
        }

        /* Navbar entrance animation */
        .navbar {
          animation: slideIn 0.8s ease-out;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        /* Background with moving cross shadows */
        .navbar::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(255, 193, 7, 0.05) 20px,
            rgba(255, 193, 7, 0.05) 40px
          );
          animation: crossShadow1 8s infinite linear;
          pointer-events: none;
          z-index: 0;
        }

        .navbar::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          background: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 30px,
            rgba(255, 193, 7, 0.03) 30px,
            rgba(255, 193, 7, 0.03) 60px
          );
          animation: crossShadow2 10s infinite linear;
          pointer-events: none;
          z-index: 0;
        }

        /* Cross shadow overlay */
        .navbar .cross-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 50%, rgba(255,193,7,0.1) 0%, transparent 50%),
                      radial-gradient(circle at 70% 80%, rgba(255,193,7,0.08) 0%, transparent 40%),
                      radial-gradient(circle at 90% 20%, rgba(255,193,7,0.05) 0%, transparent 45%);
          animation: bgPulse 5s infinite ease-in-out;
          pointer-events: none;
          z-index: 1;
        }

        /* Floating cross particles */
        .cross-particle {
          position: absolute;
          width: 40px;
          height: 40px;
          background: transparent;
          border: 2px solid rgba(255, 193, 7, 0.1);
          transform: rotate(45deg);
          animation: floatParticle 12s infinite;
          pointer-events: none;
          z-index: 1;
        }

        .cross-particle:nth-child(1) {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .cross-particle:nth-child(2) {
          top: 60%;
          right: 15%;
          width: 30px;
          height: 30px;
          animation-delay: 2s;
          animation-duration: 14s;
        }

        .cross-particle:nth-child(3) {
          bottom: 10%;
          left: 30%;
          width: 25px;
          height: 25px;
          animation-delay: 4s;
          animation-duration: 10s;
        }

        .cross-particle:nth-child(4) {
          top: 30%;
          right: 40%;
          width: 35px;
          height: 35px;
          animation-delay: 6s;
          animation-duration: 16s;
        }

        /* Scroll effect - enhanced with cross shadows */
        .navbar.scrolled {
          background: linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 100%) !important;
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3), 
                      0 1px 3px rgba(255,193,7,0.2),
                      0 0 30px rgba(255,193,7,0.1) !important;
        }

        .navbar.scrolled::before {
          opacity: 0.8;
        }

        .navbar.scrolled::after {
          opacity: 0.6;
        }

        /* Logo animation */
        .navbar-brand {
          transition: all 0.3s ease;
          animation: float 3s ease-in-out infinite;
          position: relative;
          z-index: 2;
        }

        .navbar-brand:hover {
          transform: scale(1.05) rotate(2deg);
          filter: drop-shadow(0 5px 15px rgba(255,193,7,0.5));
        }

        /* Toggle button animation */
        .navbar-toggler {
          transition: all 0.3s ease;
          position: relative;
          z-index: 2;
        }

        .navbar-toggler:hover {
          transform: rotate(90deg);
        }

        .navbar-toggler:active {
          transform: scale(0.95);
        }

        /* Nav Link Hover Effect - CHANGES COLOR ON HOVER */
        .nav-link-custom {
          transition: all 0.3s ease;
          position: relative;
          color: white !important;
          z-index: 2;
        }

        .nav-link-custom:hover {
          color: #ffc107 !important;
          transform: translateY(-2px);
          text-shadow: 0 2px 10px rgba(255, 193, 7, 0.5);
        }

        .nav-link-custom:hover .nav-icon {
          color: #ffc107 !important;
          transform: scale(1.1);
        }

        .nav-icon {
          transition: all 0.3s ease;
        }

        /* Active link effect */
        .nav-link-custom.active {
          color: #ffc107 !important;
        }

        .nav-link-custom.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 3px;
          background: #ffc107;
          border-radius: 3px;
        }

        /* Phone number animation */
        .phone-number {
          position: relative;
          transition: all 0.3s ease;
          animation: float 3s ease-in-out infinite;
          z-index: 2;
        }

        .phone-number:hover {
          animation: phoneRing 0.5s ease-in-out;
          color: #ffc107 !important;
          transform: scale(1.05);
        }

        .phone-number::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(255, 193, 7, 0.3);
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.3s ease;
          pointer-events: none;
        }

        .phone-number:hover::before {
          transform: translate(-50%, -50%) scale(1.2);
          animation: ripple 1s ease-out infinite;
        }

        /* Phone icon animation */
        .phone-icon {
          transition: transform 0.3s ease;
        }

        .phone-number:hover .phone-icon {
          animation: phoneRing 0.5s ease-in-out;
        }

        /* Logout button animation */
        .logout-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          background: transparent;
          border: 2px solid #ffc107;
          color: #ffc107;
          z-index: 2;
        }

        .logout-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 193, 7, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
          pointer-events: none;
        }

        .logout-btn:hover::before {
          width: 300px;
          height: 300px;
        }

        .logout-btn:hover {
          transform: translateY(-2px);
          animation: shine 1.5s infinite;
          background: linear-gradient(90deg, #ffc107, #ffd700, #ffc107);
          background-size: 200% 100%;
          color: black !important;
          border-color: #ffc107 !important;
          box-shadow: 0 5px 20px rgba(255,193,7,0.5);
        }

        .logout-btn:active {
          transform: translateY(0);
        }

        /* User name link animation */
        .user-link {
          position: relative;
          transition: all 0.3s ease;
          z-index: 2;
        }

        .user-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ffc107, transparent);
          transform: translateX(-50%);
          transition: width 0.3s ease;
        }

        .user-link:hover::after {
          width: 80%;
        }

        .user-link:hover {
          color: #ffc107 !important;
        }

        /* Mobile menu animation */
        @media (max-width: 991px) {
          .navbar-collapse {
            background: linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(20,20,20,0.99) 100%);
            border-radius: 15px;
            padding: 20px;
            margin-top: 15px;
            backdrop-filter: blur(10px);
            animation: slideIn 0.5s ease-out;
            position: relative;
            overflow: hidden;
          }

          .navbar-collapse::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            right: -50%;
            bottom: -50%;
            background: repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(255, 193, 7, 0.08) 20px,
              rgba(255, 193, 7, 0.08) 40px
            );
            animation: crossShadow1 8s infinite linear;
            pointer-events: none;
          }

          .navbar-collapse::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            right: -50%;
            bottom: -50%;
            background: repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 30px,
              rgba(255, 193, 7, 0.05) 30px,
              rgba(255, 193, 7, 0.05) 60px
            );
            animation: crossShadow2 10s infinite linear;
            pointer-events: none;
          }

          .nav-link-custom {
            transform: translateX(-20px);
            opacity: 0;
            animation: slideInRight 0.5s ease-out forwards;
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .nav-link-custom:nth-child(1) { animation-delay: 0.1s; }
          .nav-link-custom:nth-child(2) { animation-delay: 0.2s; }
          .nav-link-custom:nth-child(3) { animation-delay: 0.3s; }
          .nav-link-custom:nth-child(4) { animation-delay: 0.4s; }
          .nav-link-custom:nth-child(5) { animation-delay: 0.5s; }
          .nav-link-custom:nth-child(6) { animation-delay: 0.6s; }
        }

        /* Tooltip animation */
        .tooltip-animation {
          animation: slideIn 0.3s ease-out;
        }

        /* Ripple effect for click */
        .ripple-effect {
          position: relative;
          overflow: hidden;
        }

        .ripple-effect::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.3s ease, height 0.3s ease;
          pointer-events: none;
        }

        .ripple-effect:active::after {
          width: 200px;
          height: 200px;
          opacity: 0;
        }

        /* Ensure content is above background animations */
        .navbar > .container,
        .navbar > .container-fluid {
          position: relative;
          z-index: 2;
        }
      `}</style>

      <BSNavbar 
        bg="black" 
        variant="dark" 
        expand="lg" 
        className={`shadow-lg navbar ${scrolled ? 'scrolled' : ''}`} 
        sticky="top" 
        style={{ 
          minHeight: '90px',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onToggle={(open) => setMenuOpen(open)}
      >
        {/* Cross shadow overlay */}
        <div className="cross-overlay"></div>
        
        {/* Floating cross particles */}
        <div className="cross-particle"></div>
        <div className="cross-particle"></div>
        <div className="cross-particle"></div>
        <div className="cross-particle"></div>

        <Container fluid="lg">
          {/* Brand/Logo Section - With Float Animation */}
          <BSNavbar.Brand as={Link} to="/" className="d-flex align-items-center navbar-brand">
            <img 
              src="/images/logo.png"
              alt="Leo Drop Taxi"
              style={{ 
                height: '70px', 
                width: 'auto', 
                borderRadius: '20px',
                marginRight: '15px',
                objectFit: 'contain'
              }} 
            />
          </BSNavbar.Brand>

          {/* Toggle Button - With Rotate Animation */}
          <BSNavbar.Toggle 
            aria-controls="basic-navbar-nav" 
            className="border-0 navbar-toggler" 
            style={{ 
              backgroundColor: 'transparent',
              padding: '12px',
              border: 'none',
              outline: 'none',
              transform: menuOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="navbar-toggler-icon" style={{ 
              width: '2em', 
              height: '2em',
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='white' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`,
              transition: 'all 0.3s ease'
            }}></span>
          </BSNavbar.Toggle>

          <BSNavbar.Collapse id="basic-navbar-nav">
            {/* Navigation Links - WITH HOVER COLOR CHANGE */}
            <Nav className="mx-auto" style={{ alignItems: 'center', gap: '5px' }}>
              <Nav.Link 
                as={Link} 
                to="/" 
                className="nav-link-custom px-4 py-3"
                style={{ fontSize: '18px', fontWeight: '500' }}
              >
                Home
              </Nav.Link>
              
              <Nav.Link 
                as={Link} 
                to="/tariff" 
                className="nav-link-custom px-4 py-3"
                style={{ fontSize: '18px', fontWeight: '500' }}
              >
                <FaMoneyBill className="me-2 nav-icon" size={18} /> Tariff
              </Nav.Link>
              
              <Nav.Link 
                as={Link} 
                to="/popular-routes" 
                className="nav-link-custom px-4 py-3"
                style={{ fontSize: '18px', fontWeight: '500' }}
              >
                <FaRoad className="me-2 nav-icon" size={18} /> Routes
              </Nav.Link>
              
              <Nav.Link 
                as={Link} 
                to="/customer-info" 
                className="nav-link-custom px-4 py-3"
                style={{ fontSize: '18px', fontWeight: '500' }}
              >
                <FaInfoCircle className="me-2 nav-icon" size={18} /> Customer Info
              </Nav.Link>
              
              <Nav.Link 
                as={Link} 
                to="/about" 
                className="nav-link-custom px-4 py-3"
                style={{ fontSize: '18px', fontWeight: '500' }}
              >
                About
              </Nav.Link>
              
              <Nav.Link 
                as={Link} 
                to="/contact" 
                className="nav-link-custom px-4 py-3"
                style={{ fontSize: '18px', fontWeight: '500' }}
              >
                <FaEnvelope className="me-2 nav-icon" size={18} /> Contact
              </Nav.Link>
            </Nav>

            {/* Right Section - Phone and User - With Animations on Elements Only */}
            <Nav className="align-items-center" style={{ gap: '15px' }}>
              {/* Phone Number - With Ring Animation */}
              <a 
                href="tel:+916381095854" 
                className="text-warning text-decoration-none d-flex align-items-center phone-number"
                style={{ fontSize: '20px', fontWeight: 'bold' }}
                onMouseEnter={() => setShowPhoneTooltip(true)}
                onMouseLeave={() => setShowPhoneTooltip(false)}
              >
                <FaPhone className="me-2 phone-icon" size={20} /> 
                <span>+91 63810 95854</span>
                
                {/* Tooltip Animation */}
                {showPhoneTooltip && (
                  <span className="tooltip-animation" style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '0',
                    background: 'linear-gradient(135deg, #ffc107, #ffd700)',
                    color: 'black',
                    padding: '8px 15px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 5px 20px rgba(255,193,7,0.4)',
                    zIndex: 1000
                  }}>
                    📞 Call us 24/7
                  </span>
                )}
              </a>
              
              {/* User Section - With Animations */}
              {user ? (
                <div className="d-flex align-items-center" style={{ gap: '15px' }}>
                  <Nav.Link 
                    as={Link} 
                    to="/my-bookings" 
                    className="text-white d-flex align-items-center user-link"
                    style={{ fontSize: '18px', fontWeight: '500' }}
                  >
                    <FaUser className="me-2" size={18} /> 
                    <span style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {user.name}
                    </span>
                  </Nav.Link>
                  
                  <Button 
                    variant="outline-warning" 
                    onClick={handleLogout} 
                    className="rounded-pill logout-btn ripple-effect"
                    style={{ 
                      fontSize: '16px', 
                      padding: '10px 20px',
                      fontWeight: 'bold',
                      borderWidth: '2px'
                    }}
                  >
                    <FaSignOutAlt className="me-2" size={16} /> Logout
                  </Button>
                </div>
              ) : null}
            </Nav>
          </BSNavbar.Collapse>
        </Container>
      </BSNavbar>
    </>
  );
};

export default Navbar;