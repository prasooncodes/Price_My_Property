import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from './building.png';

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('/');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { to: '/', icon: 'fa-solid fa-home', text: 'Home' },
    { to: '/predict', icon: 'fa-solid fa-brain', text: 'Predict' },
    { to: '/analysis', icon: 'fa-solid fa-chart-line', text: 'Analysis' },
    { to: '/wishlist', icon: 'fa-solid fa-heart', text: 'Wishlist' }
  ];

  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        variant="dark"
        className={`modern-navbar ${scrolled ? 'scrolled' : ''}`}
      >
        <Container>
          <LinkContainer to="/" onClick={() => setActiveLink('/')}>
            <Navbar.Brand className="brand-container">
              <div className="logo-wrapper">
                <img src={logo} alt="Logo" className="brand-logo" />
              </div>
              <div className="brand-text">
                <span className="brand-name">Price</span>
                <span className="brand-accent">My</span>
                <span className="brand-name">Property</span>
              </div>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="main-navbar-nav" className="custom-toggler">
            <span></span>
            <span></span>
            <span></span>
          </Navbar.Toggle>
          
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="ms-auto nav-container">
              {navItems.map((item, index) => (
                <LinkContainer 
                  key={item.to} 
                  to={item.to} 
                  onClick={() => setActiveLink(item.to)}
                >
                  <Nav.Link 
                    className={`nav-item-modern ${activeLink === item.to ? 'active' : ''}`}
                    style={{ '--delay': `${index * 0.1}s` }}
                  >
                    <div className="nav-content">
                      <i className={item.icon}></i>
                      <span className="nav-text">{item.text}</span>
                    </div>
                    <div className="nav-indicator"></div>
                  </Nav.Link>
                </LinkContainer>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <style jsx>{`
        .modern-navbar {
          background: linear-gradient(135deg, 
            rgba(15, 23, 42, 0.95) 0%, 
            rgba(30, 41, 59, 0.95) 50%, 
            rgba(15, 23, 42, 0.95) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0;
          padding: 1rem 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          animation: slideInDown 0.8s ease-out;
          z-index: 1050;
        }

        .modern-navbar.scrolled {
          background: linear-gradient(135deg, 
            rgba(15, 23, 42, 0.98) 0%, 
            rgba(30, 41, 59, 0.98) 50%, 
            rgba(15, 23, 42, 0.98) 100%);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
          border-bottom: 1px solid rgba(59, 130, 246, 0.3);
        }

        .brand-container {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          transition: transform 0.3s ease;
          cursor: pointer;
        }

        .brand-container:hover {
          transform: scale(1.05);
        }

        .logo-wrapper {
          position: relative;
          padding: 8px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
        }

        .logo-wrapper::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4);
          border-radius: 14px;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .brand-container:hover .logo-wrapper::before {
          opacity: 1;
        }

        .brand-logo {
          height: 28px;
          width: auto;
          filter: brightness(1.2);
        }

        .brand-text {
          display: flex;
          align-items: center;
          font-weight: 700;
          font-size: 1.5rem;
          letter-spacing: -0.5px;
        }

        .brand-name {
          color: #ffffff;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .brand-accent {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 2px;
        }

        .nav-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-item-modern {
          position: relative;
          color: rgba(255, 255, 255, 0.8) !important;
          padding: 12px 20px !important;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          overflow: hidden;
          animation: fadeInUp 0.6s ease-out var(--delay) both;
          backdrop-filter: blur(10px);
        }

        .nav-item-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.1), 
            rgba(139, 92, 246, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 12px;
        }

        .nav-content {
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
          z-index: 2;
        }

        .nav-content i {
          font-size: 1rem;
          transition: transform 0.3s ease;
        }

        .nav-text {
          font-weight: 500;
          font-size: 0.9rem;
          letter-spacing: 0.3px;
        }

        .nav-indicator {
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          height: 2px;
          width: 20px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 2px;
          transition: transform 0.3s ease;
        }

        .nav-item-modern:hover {
          color: #ffffff !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);
        }

        .nav-item-modern:hover::before {
          opacity: 1;
        }

        .nav-item-modern:hover .nav-content i {
          transform: scale(1.2) rotate(5deg);
        }

        .nav-item-modern:hover .nav-indicator {
          transform: translateX(-50%) scaleX(1);
        }

        .nav-item-modern.active {
          color: #ffffff !important;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.2), 
            rgba(139, 92, 246, 0.2));
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.15);
        }

        .nav-item-modern.active .nav-indicator {
          transform: translateX(-50%) scaleX(1);
        }

        .custom-toggler {
          border: none;
          padding: 4px 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .custom-toggler:focus {
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
        }

        .custom-toggler span {
          display: block;
          width: 22px;
          height: 2px;
          background: #ffffff;
          margin: 4px 0;
          transition: 0.3s;
          border-radius: 2px;
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 991px) {
          .modern-navbar {
            padding: 0.8rem 0;
          }
          
          .brand-text {
            font-size: 1.3rem;
          }
          
          .nav-container {
            margin-top: 1rem;
            flex-direction: column;
            gap: 4px;
          }
          
          .nav-item-modern {
            width: 100%;
            text-align: center;
            margin: 2px 0;
          }
        }

        @media (max-width: 576px) {
          .brand-text {
            font-size: 1.1rem;
          }
          
          .logo-wrapper {
            padding: 6px;
          }
          
          .brand-logo {
            height: 24px;
          }
        }
      `}</style>
    </>
  );
}

export default NavBar;