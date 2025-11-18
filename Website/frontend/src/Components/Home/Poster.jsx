import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Form, InputGroup, Button, Dropdown } from 'react-bootstrap';
import { FaMapMarkerAlt, FaBed, FaHome, FaSearch, FaInfoCircle } from 'react-icons/fa';

import image1 from '../../Images/image1.jpeg';
import image2 from '../../Images/image2.jpeg';
import image3 from '../../Images/image3.jpg';

const Poster = () => {
    const [bedroom, setBedroom] = useState('Bedrooms');
    const [propertyType, setPropertyType] = useState('Property Type');

    const heroContainerStyle = {
        position: 'relative',
        height: '110vh',
        minHeight: '750px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    };

    const carouselOverlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    const contentWrapperStyle = {
        position: 'relative',
        zIndex: 3,
        maxWidth: '1000px',
        padding: '0 20px',
        width: '100%',
    };

    const headlineStyle = {
        fontSize: 'clamp(3rem, 5vw, 5rem)',
        fontWeight: '800',
        marginBottom: '30px',
        textShadow: '0 6px 20px rgba(0,0,0,0.5)',
        letterSpacing: '-1.5px',
        background: 'linear-gradient(45deg, #fff, #f0f0f0)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: '1.1',
    };

    const subHeadlineStyle = {
        fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
        fontWeight: '300',
        marginBottom: '60px',
        textShadow: '0 3px 15px rgba(0,0,0,0.4)',
        color: 'rgba(255, 255, 255, 0.9)',
        lineHeight: '1.4',
    };

    const searchBarStyle = {
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '35px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        maxWidth: '920px',
        margin: '0 auto',
    };

    const searchRowStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '18px',
        alignItems: 'center',
        marginBottom: '25px',
    };

    const inputGroupStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '12px',
        overflow: 'hidden',
        border: 'none',
    };

    const formControlStyle = {
        border: 'none',
        backgroundColor: 'transparent',
        color: '#333',
        fontSize: '15px',
        fontWeight: '500',
        padding: '14px 15px',
    };

    const dropdownToggleStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: 'transparent',
        color: '#333',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '14px 15px',
        fontWeight: '500',
        fontSize: '14px',
        border: 'none',
    };

    const searchButtonStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderColor: 'transparent',
        color: '#fff',
        fontWeight: '600',
        borderRadius: '12px',
        padding: '14px 25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '15px',
        minHeight: '50px',
        border: 'none',
    };

    const infoTextStyle = {
        fontSize: '14px',
        color: 'rgba(255, 255, 255, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: '400',
    };

    const carouselStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    };

    const carouselImageStyle = {
        height: '110vh',
        minHeight: '750px',
        objectFit: 'cover',
        objectPosition: 'center',
        filter: 'brightness(0.7) contrast(1.1)',
    };

    return (
        <div style={heroContainerStyle}>
            <Carousel interval={8000} fade controls={false} indicators={false} style={carouselStyle}>
                <Carousel.Item style={{ height: '100%' }}>
                    <img src={image1} alt="Cityscape" className="d-block w-100" style={carouselImageStyle} />
                </Carousel.Item>
                <Carousel.Item style={{ height: '100%' }}>
                    <img src={image2} alt="Modern home" className="d-block w-100" style={carouselImageStyle} />
                </Carousel.Item>
                <Carousel.Item style={{ height: '100%' }}>
                    <img src={image3} alt="Abstract property" className="d-block w-100" style={carouselImageStyle} />
                </Carousel.Item>
            </Carousel>

            <div style={carouselOverlayStyle} />

            <div style={contentWrapperStyle}>
                <h1 style={headlineStyle}>Unlock Your Future</h1>
                <p style={subHeadlineStyle}>Seamlessly Find Your Dream Property</p>

                <div style={searchBarStyle}>
                    <div style={searchRowStyle}>
                        <Dropdown>
                            <Dropdown.Toggle style={dropdownToggleStyle}>
                                <FaBed className="me-2" /> {bedroom}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setBedroom('1 BHK')}>1 BHK</Dropdown.Item>
                                <Dropdown.Item onClick={() => setBedroom('2 BHK')}>2 BHK</Dropdown.Item>
                                <Dropdown.Item onClick={() => setBedroom('3 BHK')}>3 BHK</Dropdown.Item>
                                <Dropdown.Item onClick={() => setBedroom('4+ BHK')}>4+ BHK</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown>
                            <Dropdown.Toggle style={dropdownToggleStyle}>
                                <FaHome className="me-2" /> {propertyType}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setPropertyType('Flat')}>Flat</Dropdown.Item>
                                <Dropdown.Item onClick={() => setPropertyType('Villa')}>Villa</Dropdown.Item>
                                <Dropdown.Item onClick={() => setPropertyType('Penthouse')}>Penthouse</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <InputGroup style={inputGroupStyle}>
                            <InputGroup.Text style={{ border: 'none', backgroundColor: 'transparent', padding: '14px 15px' }}>
                                <FaMapMarkerAlt style={{ color: '#667eea' }} />
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Enter Location or Area..." style={formControlStyle} />
                        </InputGroup>

                        <Button style={searchButtonStyle}>
                            <FaSearch className="me-2" /> Search Properties
                        </Button>
                    </div>
                    <p style={infoTextStyle}>
                        <FaInfoCircle /> Currently featuring premium properties across a major city
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Poster;
