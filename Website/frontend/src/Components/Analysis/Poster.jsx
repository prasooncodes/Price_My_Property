import React from 'react';
import { Container } from 'react-bootstrap';
import statistics from '../../Images/statistics.png';

const Poster = () => {
    const posterStyle = {
        backgroundImage: `url(${statistics})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '60vh',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        overflow: 'hidden',
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        transition: 'background 0.3s ease',
    };

    const contentStyle = {
        zIndex: 2,
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
    };

    const headingStyle = {
        fontSize: '3rem',
        fontWeight: 700,
        marginBottom: '15px',
        lineHeight: 1.2,
        textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
    };

    const textStyle = {
        fontSize: '1.2rem',
        lineHeight: 1.6,
        textShadow: '1px 1px 6px rgba(0,0,0,0.6)',
    };

    return (
        <Container fluid style={posterStyle}>
            <div style={overlayStyle}></div>
            <div style={contentStyle}>
                <h1 style={headingStyle}>Unlock The Insights</h1>
                <p style={textStyle}>
                    Explore key statistics that help you make smarter and informed real estate decisions.
                </p>
            </div>
        </Container>
    );
};

export default Poster;
