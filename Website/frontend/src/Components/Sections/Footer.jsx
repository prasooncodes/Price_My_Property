import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '@fortawesome/fontawesome-free/css/all.min.css' 

const Footer = () => {
  const currentYear = new Date().getFullYear() 

  return (
    <footer className="custom-footer">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={12}>
            <p> &copy; {currentYear} PriceMyProperty All rights reserved.</p>
          </Col>
        </Row>

        <Row className="justify-content-center text-center">
          <Col md={12}>
            <a href="https://www.linkedin.com/in/lakshsharma18/" className="social-link mx-2">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://github.com/prasooncodes" className="social-link mx-2">
              <i className="fab fa-github"></i>
            </a>
          </Col>
        </Row>
      </Container>

      <style>{`
        .custom-footer {
          background: linear-gradient(90deg, #0e1117, #1a1f2c);
          color: #ccc;
          padding: 25px 0;
          margin-top: 30px;
          font-size: 0.95rem;
          letter-spacing: 0.5px;
          box-shadow: 0 -2px 10px rgba(0,0,0,0.4);
        }
        .custom-footer p {
          margin-bottom: 10px;
          color: #aaa;
          font-weight: 500;
        }
        .social-link {
          color: #bbb;
          font-size: 1.6rem;
          transition: all 0.3s ease;
        }
        .social-link:hover {
          color: #00c2ff;
          transform: translateY(-3px) scale(1.15);
          text-shadow: 0 0 10px rgba(0,194,255,0.7);
        }
      `}</style>
    </footer>
  )
}

export default Footer
