import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Booking from './components/Booking';
import Login from './components/Login';
import Register from './components/Register';
import MyBookings from './components/MyBookings';
import Tariff from './components/Tariff';
import About from './components/About';
import Contact from './components/Contact';
import PopularRoutes from './components/PopularRoutes';
import CustomerInfo from './components/CustomerInfo';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tariff" element={<Tariff />} />
              <Route path="/popular-routes" element={<PopularRoutes />} />
              <Route path="/customer-info" element={<CustomerInfo />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/booking" 
                element={
                  <PrivateRoute>
                    <Booking />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/my-bookings" 
                element={
                  <PrivateRoute>
                    <MyBookings />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;