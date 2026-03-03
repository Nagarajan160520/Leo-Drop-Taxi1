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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.navbar')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [navigate]);

  return (
    <>
      {/* Custom CSS for animations - WITH GOLD SHINING BACKGROUND */}
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
        /* GOLD SHINING BACKGROUND ANIMATIONS */
        /* ============================================ */
        
        @keyframes goldShine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
            opacity: 0;
          }
          25% {
            opacity: 0.8;
          }
          50% {
            transform: translateX(0) translateY(0) rotate(45deg);
            opacity: 1;
          }
          75% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
            opacity: 0;
          }
        }

        @keyframes goldShine2 {
          0% {
            transform: translateX(100%) translateY(-100%) rotate(-45deg);
            opacity: 0;
          }
          25% {
            opacity: 0.8;
          }
          50% {
            transform: translateX(0) translateY(0) rotate(-45deg);
            opacity: 1;
          }
          75% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(-100%) translateY(100%) rotate(-45deg);
            opacity: 0;
          }
        }

        @keyframes goldPulse {
          0%, 100% {
            background-position: 0% 50%;
            opacity: 0.8;
          }
          50% {
            background-position: 100% 50%;
            opacity: 1;
          }
        }

        @keyframes goldSparkle {
          0%, 100% { 
            opacity: 0.2; 
            transform: scale(1); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.5); 
            box-shadow: 0 0 25px rgba(255, 215, 0, 0.9);
          }
        }

        @keyframes goldFloat {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          25% {
            opacity: 0.5;
          }
          50% {
            transform: translateY(-40px) translateX(20px) rotate(180deg);
            opacity: 0.8;
          }
          75% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-80px) translateX(40px) rotate(360deg);
            opacity: 0;
          }
        }

        /* Navbar entrance animation */
        .navbar {
          animation: slideIn 0.8s ease-out;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%) !important;
        }

        /* Gold shining background overlay */
        .navbar::before {
          content: '';
          position: absolute;
          top: -150%;
          left: -150%;
          right: -150%;
          bottom: -150%;
          background: linear-gradient(
            115deg,
            transparent 30%,
            rgba(255, 215, 0, 0.15) 35%,
            rgba(255, 215, 0, 0.25) 40%,
            rgba(255, 215, 0, 0.35) 45%,
            rgba(255, 215, 0, 0.45) 50%,
            rgba(255, 215, 0, 0.35) 55%,
            rgba(255, 215, 0, 0.25) 60%,
            rgba(255, 215, 0, 0.15) 65%,
            transparent 70%
          );
          transform: rotate(25deg);
          animation: goldShine 10s infinite linear;
          pointer-events: none;
          z-index: 0;
          opacity: 0.6;
        }

        .navbar::after {
          content: '';
          position: absolute;
          top: -150%;
          left: -150%;
          right: -150%;
          bottom: -150%;
          background: linear-gradient(
            -115deg,
            transparent 30%,
            rgba(255, 215, 0, 0.1) 35%,
            rgba(255, 215, 0, 0.2) 40%,
            rgba(255, 215, 0, 0.3) 45%,
            rgba(255, 215, 0, 0.4) 50%,
            rgba(255, 215, 0, 0.3) 55%,
            rgba(255, 215, 0, 0.2) 60%,
            rgba(255, 215, 0, 0.1) 65%,
            transparent 70%
          );
          transform: rotate(-25deg);
          animation: goldShine2 12s infinite linear;
          pointer-events: none;
          z-index: 0;
          opacity: 0.5;
        }

        /* Gold pulsing overlay */
        .navbar .gold-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 50%, rgba(255,215,0,0.15) 0%, transparent 50%),
                      radial-gradient(circle at 70% 80%, rgba(255,215,0,0.12) 0%, transparent 40%),
                      radial-gradient(circle at 90% 20%, rgba(255,215,0,0.1) 0%, transparent 45%),
                      repeating-linear-gradient(45deg, rgba(255,215,0,0.02) 0px, rgba(255,215,0,0.02) 2px, transparent 2px, transparent 8px);
          animation: goldPulse 5s infinite ease-in-out;
          pointer-events: none;
          z-index: 1;
        }

        /* Gold sparkles */
        .gold-sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 215, 0, 0.8);
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
          animation: goldSparkle 3s infinite ease-in-out;
          pointer-events: none;
          z-index: 2;
        }

        .gold-sparkle:nth-child(1) {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .gold-sparkle:nth-child(2) {
          top: 60%;
          right: 15%;
          width: 6px;
          height: 6px;
          animation-delay: 0.5s;
        }

        .gold-sparkle:nth-child(3) {
          bottom: 30%;
          left: 30%;
          width: 3px;
          height: 3px;
          animation-delay: 1s;
        }

        .gold-sparkle:nth-child(4) {
          top: 40%;
          right: 40%;
          width: 5px;
          height: 5px;
          animation-delay: 1.5s;
        }

        .gold-sparkle:nth-child(5) {
          bottom: 50%;
          left: 60%;
          width: 4px;
          height: 4px;
          animation-delay: 2s;
        }

        .gold-sparkle:nth-child(6) {
          top: 70%;
          left: 80%;
          width: 3px;
          height: 3px;
          animation-delay: 2.5s;
        }

        .gold-sparkle:nth-child(7) {
          bottom: 15%;
          right: 25%;
          width: 5px;
          height: 5px;
          animation-delay: 3s;
        }

        .gold-sparkle:nth-child(8) {
          top: 85%;
          left: 15%;
          width: 4px;
          height: 4px;
          animation-delay: 3.5s;
        }

        /* Floating gold particles */
        .gold-particle {
          position: absolute;
          width: 20px;
          height: 20px;
          background: transparent;
          border: 2px solid rgba(255, 215, 0, 0.15);
          transform: rotate(45deg);
          animation: goldFloat 15s infinite;
          pointer-events: none;
          z-index: 1;
        }

        .gold-particle:nth-child(9) {
          top: 20%;
          left: 20%;
          animation-delay: 0s;
        }

        .gold-particle:nth-child(10) {
          top: 70%;
          right: 25%;
          width: 30px;
          height: 30px;
          animation-delay: 3s;
        }

        .gold-particle:nth-child(11) {
          bottom: 40%;
          left: 70%;
          width: 25px;
          height: 25px;
          animation-delay: 6s;
        }

        .gold-particle:nth-child(12) {
          top: 50%;
          right: 60%;
          width: 15px;
          height: 15px;
          animation-delay: 9s;
        }

        /* Scroll effect - enhanced with gold */
        .navbar.scrolled {
          background: linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(30,30,30,0.99) 50%, rgba(0,0,0,0.98) 100%) !important;
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5), 
                      0 1px 3px rgba(255,215,0,0.3),
                      0 0 30px rgba(255,215,0,0.2) !important;
        }

        .navbar.scrolled::before {
          opacity: 0.8;
        }

        .navbar.scrolled::after {
          opacity: 0.7;
        }

        /* Logo animation */
        .navbar-brand {
          transition: all 0.3s ease;
          animation: float 3s ease-in-out infinite;
          position: relative;
          z-index: 10;
        }

        .navbar-brand:hover {
          transform: scale(1.08) rotate(2deg);
          filter: drop-shadow(0 5px 20px rgba(255,215,0,0.7));
        }

        /* Toggle button animation */
        .navbar-toggler {
          transition: all 0.3s ease;
          position: relative;
          z-index: 10;
          border: 2px solid rgba(255, 215, 0, 0.5) !important;
          border-radius: 10px !important;
        }

        .navbar-toggler:hover {
          transform: rotate(90deg);
          border-color: #ffc107 !important;
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
        }

        .navbar-toggler:active {
          transform: scale(0.95);
        }

        .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='%23ffc107' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
        }

        /* Nav Link Hover Effect - GOLD SHINING */
        .nav-link-custom {
          transition: all 0.3s ease;
          position: relative;
          color: white !important;
          z-index: 10;
          font-weight: 600 !important;
          border-radius: 8px;
          margin: 0 2px;
        }

        .nav-link-custom:hover {
          color: #000000 !important;
          background: linear-gradient(135deg, #FFD700, #FFA500, #FFD700);
          background-size: 200% 200%;
          animation: shine 2s infinite;
          transform: translateY(-3px);
          box-shadow: 0 5px 20px rgba(255, 215, 0, 0.6);
          text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }

        .nav-link-custom:hover .nav-icon {
          color: #000000 !important;
          transform: scale(1.2);
        }

        .nav-icon {
          transition: all 0.3s ease;
          color: #ffc107 !important;
        }

        /* Active link effect - GOLD */
        .nav-link-custom.active {
          color: #000000 !important;
          background: linear-gradient(135deg, #FFD700, #FFA500);
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.5);
        }

        .nav-link-custom.active .nav-icon {
          color: #000000 !important;
        }

        .nav-link-custom.active::after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 4px;
          background: linear-gradient(90deg, transparent, #000000, transparent);
          border-radius: 2px;
          animation: goldPulse 2s infinite;
        }

        /* Phone number animation - GOLD */
        .phone-number {
          position: relative;
          transition: all 0.3s ease;
          animation: float 3s ease-in-out infinite;
          z-index: 10;
          background: rgba(0,0,0,0.3);
          padding: 8px 15px;
          border-radius: 30px;
          border: 2px solid rgba(27, 26, 20, 0.3);
        }

        .phone-number:hover {
          animation: phoneRing 0.5s ease-in-out;
          color: #000000 !important;
          background: linear-gradient(135deg, #f6f616ff, #eda71cff);
          transform: scale(1.05);
          border-color: #ffc107;
          box-shadow: 0 5px 20px rgba(255, 215, 0, 0.6);
        }

        .phone-number:hover .phone-icon {
          color: #000000 !important;
        }

        .phone-number::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          border-radius: 30px;
          background: rgba(255, 215, 0, 0.4);
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.3s ease;
          pointer-events: none;
        }

        .phone-number:hover::before {
          transform: translate(-50%, -50%) scale(1.2);
          animation: ripple 1s ease-out infinite;
        }

        .phone-icon {
          transition: transform 0.3s ease;
          color: #0b0b0bff !important;
        }

        /* Logout button animation - GOLD */
        .logout-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          background: transparent;
          border: 2px solid #ffc107 !important;
          color: #ffc107 !important;
          z-index: 10;
          font-weight: bold !important;
        }

        .logout-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: linear-gradient(135deg, #FFD700, #FFA500);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
          pointer-events: none;
          z-index: -1;
        }

        .logout-btn:hover::before {
          width: 300px;
          height: 300px;
        }

        .logout-btn:hover {
          transform: translateY(-2px);
          animation: shine 1.5s infinite;
          background-size: 200% 100%;
          color: black !important;
          border-color: #ffc107 !important;
          box-shadow: 0 5px 20px rgba(255,215,0,0.6);
        }

        .logout-btn:hover svg {
          color: black !important;
        }

        .logout-btn:active {
          transform: translateY(0);
        }

        /* User name link animation - GOLD */
        .user-link {
          position: relative;
          transition: all 0.3s ease;
          z-index: 10;
          padding: 8px 15px;
          border-radius: 30px;
          background: rgba(0,0,0,0.3);
          border: 2px solid rgba(255, 215, 0, 0.3);
        }

        .user-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #FFD700, #FFA500, transparent);
          transform: translateX(-50%);
          transition: width 0.3s ease;
        }

        .user-link:hover::after {
          width: 80%;
        }

        .user-link:hover {
          color: black !important;
          background: linear-gradient(135deg, #FFD700, #FFA500);
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(255, 215, 0, 0.5);
          border-color: #ffc107;
        }

        .user-link:hover svg {
          color: black !important;
        }

        /* ============================================ */
        /* MOBILE MENU FIX - LINKS DON'T HIDE ON TOUCH */
        /* ============================================ */
        @media (max-width: 991px) {
          /* Keep menu open when toggled */
          .navbar-collapse {
            background: linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(20,20,20,0.99) 100%);
            border-radius: 20px;
            padding: 25px;
            margin-top: 20px;
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
            border: 2px solid rgba(255, 215, 0, 0.2);
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            transition: all 0.3s ease;
          }

          /* Remove animation that might hide links */
          .navbar-collapse.collapsing {
            transition: all 0.3s ease;
          }

          .navbar-collapse.show {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
          }

          /* Remove slide-in animation that might cause issues */
          .nav-link-custom {
            transform: none;
            opacity: 1;
            animation: none;
            background: rgba(0,0,0,0.5);
            margin: 8px 0;
            padding: 15px 20px !important;
            border-radius: 10px;
            border: 1px solid rgba(255, 215, 0, 0.2);
            width: 100%;
            text-align: left;
            font-size: 16px !important;
            transition: all 0.2s ease;
          }

          /* Ensure links are visible and tappable */
          .nav-link-custom:active {
            background: linear-gradient(135deg, #FFD700, #FFA500);
            color: black !important;
            transform: scale(0.98);
          }

          /* Remove staggered delays */
          .nav-link-custom:nth-child(1),
          .nav-link-custom:nth-child(2),
          .nav-link-custom:nth-child(3),
          .nav-link-custom:nth-child(4),
          .nav-link-custom:nth-child(5),
          .nav-link-custom:nth-child(6) {
            animation: none;
            opacity: 1;
            transform: none;
          }

          /* Make phone number and user section full width */
          .phone-number {
            width: 100%;
            justify-content: center;
            margin: 10px 0;
            padding: 12px 15px;
            font-size: 16px !important;
          }

          .user-link {
            width: 100%;
            justify-content: center;
            margin: 10px 0;
            padding: 12px 15px;
            font-size: 16px !important;
          }

          .logout-btn {
            width: 100%;
            margin: 5px 0;
            padding: 12px 20px !important;
            font-size: 16px !important;
          }

          /* Ensure nav items stack properly */
          .navbar-nav {
            width: 100%;
            margin: 0;
            padding: 0;
          }

          /* Fix alignment */
          .ms-auto {
            margin-left: 0 !important;
            width: 100%;
          }

          /* Ensure all elements are visible */
          .nav {
            width: 100%;
            flex-direction: column;
            align-items: stretch !important;
          }

          /* Remove any transforms that might hide elements */
          .navbar-collapse.collapse:not(.show) {
            display: none !important;
          }

          .navbar-collapse.collapse.show {
            display: block !important;
          }

          /* Ensure background animations don't interfere */
          .navbar-collapse::before,
          .navbar-collapse::after {
            pointer-events: none;
          }
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
          background: rgba(255, 215, 0, 0.4);
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
        .navbar > .container-fluid,
        .navbar-brand,
        .navbar-collapse,
        .navbar-nav,
        .nav-link-custom {
          position: relative;
          z-index: 20;
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
        expanded={menuOpen}
        onToggle={(open) => setMenuOpen(open)}
      >
        {/* Gold shining overlay */}
        <div className="gold-overlay"></div>
        
        {/* Gold sparkles */}
        <div className="gold-sparkle"></div>
        <div className="gold-sparkle"></div>
        <div className="gold-sparkle"></div>
        <div className="gold-sparkle"></div>
        <div className="gold-sparkle"></div>
        <div className="gold-sparkle"></div>
        <div className="gold-sparkle"></div>
        <div className="gold-sparkle"></div>

        {/* Floating gold particles */}
        <div className="gold-particle"></div>
        <div className="gold-particle"></div>
        <div className="gold-particle"></div>
        <div className="gold-particle"></div>

        <Container fluid="lg">
          {/* Brand/Logo Section */}
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

          {/* Toggle Button */}
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
            <span className="navbar-toggler-icon"></span>
          </BSNavbar.Toggle>

          <BSNavbar.Collapse id="basic-navbar-nav">
            {/* Navigation Links - GOLD SHINING ON HOVER */}
            <Nav className="mx-auto" style={{ alignItems: 'center', gap: '5px' }}>
              <Nav.Link 
                as={Link} 
                to="/" 
                className="nav-link-custom px-4 py-3"
                style={{ fontSize: '18px', fontWeight: '600' }}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Nav.Link>
              
              <Nav.Link 
                as={Link} 
                to="/tariff" 
                className="nav-link-custom px-4 py-3"
                style={{ fontSize: '18px', fontWeight: '600' }}
                onClick={() => setMenuOpen(false)}
              >
                <FaMoneyBill className="me-2 nav-icon" size={18} /> Tariff
              </Nav.Link>
              
              <Nav.Link 
                as={Link} 
                to="/popular-routes" 
                className="nav-link-custom px-4 py-3"
                style={{ fontSize: '18px', fontWeight: '600' }}
                onClick={() => setMenuOpen(false)}
              >
                <FaRoad className="me-2 nav-icon" size={18} /> Routes
              </Nav.Link>
              
              <Nav.Link 
                as={Link} 
                to="/customer-info" 
                className="nav-link-custom px-4 py-3"
                style={{ fontSize: '18px', fontWeight: '600' }}
                onClick={() => setMenuOpen(false)}
              >
                <FaInfoCircle className="me-2 nav-icon" size={18} /> Customer Info
              </Nav.Link>
              
              <Nav.Link 
                as={Link} 
                to="/about" 
                className="nav-link-custom px-4 py-3"
                style={{ fontSize: '18px', fontWeight: '600' }}
                onClick={() => setMenuOpen(false)}
              >
                About
              </Nav.Link>
              
              <Nav.Link 
                as={Link} 
                to="/contact" 
                className="nav-link-custom px-4 py-3"
                style={{ fontSize: '18px', fontWeight: '600' }}
                onClick={() => setMenuOpen(false)}
              >
                <FaEnvelope className="me-2 nav-icon" size={18} /> Contact
              </Nav.Link>
            </Nav>

            {/* Right Section - Phone and User */}
            <Nav className="align-items-center" style={{ gap: '15px' }}>
              {/* Phone Number - GOLD SHINING */}
              <a 
                href="tel:+916381095854" 
                className="text-warning text-decoration-none d-flex align-items-center phone-number"
                style={{ fontSize: '20px', fontWeight: 'bold' }}
                onMouseEnter={() => setShowPhoneTooltip(true)}
                onMouseLeave={() => setShowPhoneTooltip(false)}
                onClick={() => setMenuOpen(false)}
              >
                <FaPhone className="me-2 phone-icon" size={20} /> 
                <span>+91 63810 95854</span>
                
                {/* Tooltip Animation */}
                {showPhoneTooltip && (
                  <span className="tooltip-animation" style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '0',
                    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                    color: 'black',
                    padding: '8px 15px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 5px 20px rgba(255,215,0,0.6)',
                    zIndex: 1000,
                    fontWeight: 'bold'
                  }}>
                    📞 Call us 24/7
                  </span>
                )}
              </a>
              
              {/* User Section - GOLD SHINING */}
              {user ? (
                <div className="d-flex align-items-center" style={{ gap: '15px' }}>
                  <Nav.Link 
                    as={Link} 
                    to="/my-bookings" 
                    className="text-white d-flex align-items-center user-link"
                    style={{ fontSize: '18px', fontWeight: '600' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaUser className="me-2" size={18} /> 
                    <span style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {user.name}
                    </span>
                  </Nav.Link>
                  
                  <Button 
                    variant="outline-warning" 
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }} 
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