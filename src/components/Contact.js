import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Client and Driver WhatsApp Numbers
  const CLIENT_NUMBER = '916381095854'; // 91 (India code) + 6381095854
  const DRIVER_NUMBER = '917200343435'; // 91 (India code) + 7200343435

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Generate WhatsApp message for Client
  const generateClientMessage = (data) => {
    return encodeURIComponent(
      `📞 *NEW CONTACT FORM SUBMISSION - LEO DROP TAXI* 📞\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Name:* ${data.name}\n` +
      `📧 *Email:* ${data.email}\n` +
      `📱 *Phone:* ${data.phone || 'Not provided'}\n` +
      `📝 *Subject:* ${data.subject}\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `💬 *Message:*\n${data.message}\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `⏰ *Submitted:* ${new Date().toLocaleString('en-IN')}\n\n` +
      `Please respond to this customer inquiry.`
    );
  };

  // Generate WhatsApp message for Driver
  const generateDriverMessage = (data) => {
    return encodeURIComponent(
      `🚖 *NEW CUSTOMER INQUIRY - LEO DROP TAXI* 🚖\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Customer:* ${data.name}\n` +
      `📱 *Phone:* ${data.phone || 'Not provided'}\n` +
      `📧 *Email:* ${data.email}\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `📝 *Subject:* ${data.subject}\n` +
      `💬 *Query:* ${data.message}\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `⏰ *Time:* ${new Date().toLocaleString('en-IN')}\n\n` +
      `Please check availability and respond.`
    );
  };

  // Send WhatsApp message
  const sendWhatsApp = (phoneNumber, message) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        toast.error('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // Simulate API call - Replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate messages
      const clientMessage = generateClientMessage(formData);
      const driverMessage = generateDriverMessage(formData);
      
      // Send to Client
      sendWhatsApp(CLIENT_NUMBER, clientMessage);
      
      // Send to Driver
      sendWhatsApp(DRIVER_NUMBER, driverMessage);
      
      toast.success('Message sent successfully! WhatsApp notifications sent.');
      setSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt size={24} />,
      title: 'Visit Us',
      details: [
        'No.71, 18th Block A Type Thiru,',
        'Avadi, Chennai - 600054,',
        'Tamil Nadu, India'
      ]
    },
    {
      icon: <FaPhone size={24} />,
      title: 'Call Us',
      details: [
        '+91 63810 95854',
        '+91 63810 95854',
        '24/7 Support Available'
      ]
    },
    {
      icon: <FaEnvelope size={24} />,
      title: 'Email Us',
      details: [
        'info@leodroptaxi.com',
        'booking@leodroptaxi.com',
        'support@leodroptaxi.com'
      ]
    },
    {
      icon: <FaClock size={24} />,
      title: 'Working Hours',
      details: [
        'Mon - Sun: 24/7',
        'Customer Support: Always Open',
        'Emergency: 24x7 Available'
      ]
    }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com/leodroptaxi', color: '#1877f2', label: 'Facebook' },
    { icon: <FaTwitter />, url: 'https://twitter.com/leodroptaxi', color: '#1da1f2', label: 'Twitter' },
    { icon: <FaInstagram />, url: 'https://instagram.com/leodroptaxi', color: '#e4405f', label: 'Instagram' },
    { icon: <FaYoutube />, url: 'https://youtube.com/leodroptaxi', color: '#ff0000', label: 'YouTube' },
    { icon: <FaWhatsapp />, url: 'https://wa.me/917200343435', color: '#25d366', label: 'WhatsApp' }
  ];

  const faqs = [
    {
      question: 'How can I book a cab?',
      answer: 'You can book a cab through our website by clicking on the "Booking" tab, or call us directly at +91 72003 43435. You can also book via WhatsApp.'
    },
    {
      question: 'What are the payment options?',
      answer: 'We accept cash, credit/debit cards, UPI (Google Pay, PhonePe, Paytm), and bank transfers. Online payment option will be available soon.'
    },
    {
      question: 'Is there any cancellation charges?',
      answer: 'Free cancellation up to 2 hours before pickup. Cancellations within 2 hours may incur charges equal to driver bata.'
    },
    {
      question: 'Do you provide service to hill stations?',
      answer: 'Yes, we provide service to all major hill stations including Kodaikanal, Ooty, Kothagiri, Yercaud, and more. Additional hill station charges apply.'
    },
    {
      question: 'How do I calculate the fare?',
      answer: 'Fare is calculated based on distance, car type, and trip type. You can use our fare calculator on the booking page or call us for an estimate.'
    }
  ];

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="bg-warning py-5">
        <Container className="text-center">
          <h1 className="display-4 fw-bold mb-3">Contact Us</h1>
          <p className="lead">
            Get in touch with us for any queries or assistance
          </p>
        </Container>
      </section>

      <Container className="py-5">
        {/* Contact Info Cards */}
        <Row className="mb-5 g-4">
          {contactInfo.map((info, index) => (
            <Col lg={3} md={6} key={index}>
              <Card className="contact-info h-100 border-0 shadow">
                <Card.Body className="text-center p-4">
                  <div className="text-warning mb-3">
                    {info.icon}
                  </div>
                  <h5 className="mb-3 fw-bold">{info.title}</h5>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-secondary mb-1">
                      {detail}
                    </p>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Contact Form & Map */}
        <Row className="mb-5">
          <Col lg={6} className="mb-4 mb-lg-0">
            <Card className="border-0 shadow h-100">
              <Card.Body className="p-5">
                <h3 className="text-warning mb-4 fw-bold">Send us a Message</h3>
                
                {submitted ? (
                  <Alert variant="success" className="text-center p-5">
                    <FaCheckCircle size={50} className="text-success mb-3" />
                    <Alert.Heading className="mb-4">Thank You! 🎉</Alert.Heading>
                    <p className="mb-4">
                      Your message has been sent successfully. <br />
                      WhatsApp notifications sent to our team.
                    </p>
                    <Button 
                      variant="warning" 
                      onClick={() => setSubmitted(false)}
                      className="rounded-pill px-5"
                    >
                      Send Another Message
                    </Button>
                  </Alert>
                ) : (
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-bold">Your Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                            size="lg"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-bold">Email *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            size="lg"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-bold">Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="10-digit mobile number"
                            size="lg"
                            maxLength="10"
                            pattern="[0-9]{10}"
                          />
                          <Form.Text className="text-muted">
                            WhatsApp notifications will be sent
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-bold">Subject *</Form.Label>
                          <Form.Control
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="Enter subject"
                            size="lg"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold">Message *</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Write your message here..."
                        size="lg"
                      />
                    </Form.Group>

                    {/* WhatsApp Info */}
                    <div className="bg-light p-3 rounded mb-4">
                      <p className="mb-2 small">
                        <FaWhatsapp className="text-success me-2" size={16} />
                        <strong>WhatsApp notifications will be sent to:</strong>
                      </p>
                      <div className="d-flex justify-content-between small">
                        <span>📱 Client: +91 63810 95854</span>
                        <span>🚖 Driver: +91 72003 43435</span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="warning"
                      size="lg"
                      disabled={loading}
                      className="w-100 rounded-pill py-3 fw-bold"
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="border-0 shadow h-100">
              <Card.Body className="p-5">
                <h3 className="text-warning mb-4 fw-bold">Find Us</h3>
                
                {/* Map */}
                <div className="map-container mb-4">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1431.4197464475671!2d77.1773719889546!3d9.008423819831476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b067f249ac03c2b%3A0x37c3dff464f02976!2z4K6k4K-G4K6p4K-N4K6V4K6-4K6a4K6_IOCuruCuvuCuteCun-CvjeCun-CuruCvjSDgrongrpngr43grpXgrrPgr4gg4K6F4K6p4K-N4K6q4K-B4K6f4K6p4K-NIOCuteCusOCuteCvh-CuseCvjeCuleCuv-CuseCupOCvgQ!5e1!3m2!1sen!2sin!4v1771498476454!5m2!1sen!2sin" 
                    width="100%" 
                    height="300" 
                    style={{ border: 0, borderRadius: '15px' }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Leo Drop Taxi Location"
                  ></iframe>
                </div>

                {/* Social Links */}
                <h5 className="mb-3 fw-bold">Connect With Us</h5>
                <div className="d-flex gap-3 mb-4 flex-wrap">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                      style={{ backgroundColor: social.color }}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>

                {/* Quick Contact */}
                <h5 className="mb-3 fw-bold">Quick Contact</h5>
                <div className="bg-light p-4 rounded">
                  <p className="mb-3 d-flex align-items-center">
                    <FaPhone className="text-warning me-3" size={20} />
                    <span>
                      <strong>Client:</strong><br />
                      <a href="tel:+916381095854" className="text-decoration-none text-dark">
                        +91 63810 95854
                      </a>
                    </span>
                  </p>
                  <p className="mb-3 d-flex align-items-center">
                    <FaWhatsapp className="text-warning me-3" size={20} />
                    <span>
                      <strong>Driver:</strong><br />
                      <a href="https://wa.me/916381095854" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark">
                        +91 63810 95854
                      </a>
                    </span>
                  </p>
                  <p className="mb-3 d-flex align-items-center">
                    <FaEnvelope className="text-warning me-3" size={20} />
                    <span>
                      <strong>Support:</strong><br />
                      <a href="mailto:nagarajan16052001@gmail.com" className="text-decoration-none text-dark">
                        nagarajan16052001@gmail.com
                      </a>
                    </span>
                  </p>
                  <p className="mb-0 d-flex align-items-center">
                    <FaClock className="text-warning me-3" size={20} />
                    <span>
                      <strong>Emergency Service:</strong><br />
                      24/7 Available
                    </span>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* FAQ Section */}
        <Row className="mb-5">
          <Col>
            <Card className="border-0 shadow">
              <Card.Body className="p-5">
                <h2 className="text-center text-warning fw-bold mb-5">
                  Frequently Asked Questions
                </h2>
                <Row>
                  <Col md={6}>
                    {faqs.slice(0, 3).map((faq, index) => (
                      <div key={index} className="mb-4">
                        <h5 className="fw-bold mb-2">{faq.question}</h5>
                        <p className="text-secondary">{faq.answer}</p>
                      </div>
                    ))}
                  </Col>
                  <Col md={6}>
                    {faqs.slice(3).map((faq, index) => (
                      <div key={index} className="mb-4">
                        <h5 className="fw-bold mb-2">{faq.question}</h5>
                        <p className="text-secondary">{faq.answer}</p>
                      </div>
                    ))}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Call to Action */}
        <Row>
          <Col>
            <Card className="bg-warning border-0">
              <Card.Body className="p-5 text-center">
                <h2 className="fw-bold mb-4">Need Immediate Assistance?</h2>
                <p className="lead mb-4">
                  Our customer support team is available 24/7 to help you with bookings and queries.
                </p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <a href="tel:+916381095854">
                    <Button variant="dark" size="lg" className="rounded-pill px-5 py-3">
                      <FaPhone className="me-2" /> Call Client
                    </Button>
                  </a>
                  <a href="tel:+916381095854">
                    <Button variant="dark" size="lg" className="rounded-pill px-5 py-3">
                      <FaPhone className="me-2" /> Call Driver
                    </Button>
                  </a>
                  <a href="https://wa.me/916381095854" target="_blank" rel="noopener noreferrer">
                    <Button variant="success" size="lg" className="rounded-pill px-5 py-3">
                      <FaWhatsapp className="me-2" /> WhatsApp Driver
                    </Button>
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Custom CSS */}
      <style>{`
        .contact-info {
          transition: all 0.3s ease;
        }
        .contact-info:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2) !important;
        }
        .social-icon {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .social-icon:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        .map-container {
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        iframe {
          width: 100%;
          height: 100%;
          min-height: 300px;
        }
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.5rem;
          }
          .p-5 {
            padding: 1.5rem !important;
          }
          .gap-3 {
            gap: 0.5rem !important;
          }
          .btn-lg {
            padding: 0.5rem 1rem !important;
            font-size: 0.9rem !important;
          }
        }
        @media (max-width: 576px) {
          .d-flex.justify-content-center.gap-3 {
            flex-direction: column;
            align-items: center;
          }
          .btn-lg {
            width: 100%;
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;