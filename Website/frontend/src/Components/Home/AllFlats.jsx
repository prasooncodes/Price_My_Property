import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllData } from '../../RTK/Slices/allDataSlice';
import { Card, Row, Col, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import Loading from '../Sections/Loading'; // Assuming this is your loading spinner component
import { FaHeart, FaPhone, FaArrowRight, FaRulerCombined, FaBed, FaBath, FaHome, FaCity, FaCalendarAlt } from 'react-icons/fa';

// Import the new CSS file
import './AllFlats.css'; // Make sure the path is correct relative to this file

const AllFlats = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [isHovered, setIsHovered] = useState({}); // State to manage hover for each card

    const { data, loading, error, hasMoreData } = useSelector((state) => state.allData);

    useEffect(() => {
        if (!loading && hasMoreData) {
            dispatch(fetchAllData(page));
        }
    }, [page, dispatch, hasMoreData, loading]); // Added loading to dependencies

    useEffect(() => {
        const handleScroll = debounce(() => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const currentScrollPosition = window.scrollY;

            if (windowHeight + currentScrollPosition + 200 >= documentHeight && hasMoreData && !loading) {
                setPage((prevPage) => prevPage + 1);
            }
        }, 300);

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasMoreData, loading]);

    // Initial fetch on component mount for the first page
    useEffect(() => {
        if (page === 1) { // Only fetch page 1 on mount if it hasn't been fetched
            dispatch(fetchAllData(1));
        }
    }, [dispatch, page]);


    if (loading && page === 1)
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
                <Loading />
            </div>
        );

    if (error) {
        console.error(error);
        return (
            <div className="text-center mt-5 error-message">
                <p className="text-danger">Error: {error}</p>
                <Button variant="primary" onClick={() => dispatch(fetchAllData(page))}>Retry</Button>
            </div>
        );
    }

    const wishlistHandler = (flat) => {
        const existingData = JSON.parse(localStorage.getItem('wishList')) || [];
        const flatExists = existingData.some((item) => item._id === flat._id);

        if (!flatExists) {
            existingData.push(flat);
            localStorage.setItem('wishList', JSON.stringify(existingData));
            alert(`${flat.SOCIETY_NAME} added to wishlist!`);
        } else {
            alert(`${flat.SOCIETY_NAME} is already in your wishlist!`);
        }
    };

    return (
        <div className="all-flats-page"> {/* Apply main page background class */}
            <Container>
                <h2>Explore All Properties</h2>
                <Row className="justify-content-center">
                    <Col lg={10}>
                        {(!data || !Array.isArray(data) || data.length === 0) ? (
                            <p className="no-properties-message">No properties found. Please try again later.</p>
                        ) : (
                            <Row>
                                {data.map((flat) => (
                                    <Col xs={12} key={flat._id} className="mb-4">
                                        <Card
                                            className="property-card" // Apply card class
                                            onMouseEnter={() => setIsHovered(prev => ({ ...prev, [flat._id]: true }))}
                                            onMouseLeave={() => setIsHovered(prev => ({ ...prev, [flat._id]: false }))}
                                        >
                                            <Row className="g-0"> {/* Bootstrap 5: use g-0 for no gutter */}
                                                <Col md={4} className="card-img-col">
                                                    <Card.Img
                                                        src={flat.Image}
                                                        alt={`Image of ${flat.SOCIETY_NAME}, ${flat.CITY}`}
                                                        className="card-img" // Apply image class
                                                    />
                                                </Col>
                                                <Col md={8}>
                                                    <Card.Body className="card-body"> {/* Apply body class */}
                                                        <div>
                                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                                <div>
                                                                    <Card.Title className="card-title"> {/* Apply title class */}
                                                                        {flat.SOCIETY_NAME}
                                                                    </Card.Title>
                                                                    <Card.Subtitle className="card-subtitle"> {/* Apply subtitle class */}
                                                                        <FaCity className="me-1" /> {flat.location}, {flat.CITY}
                                                                    </Card.Subtitle>
                                                                </div>
                                                                <Button
                                                                    onClick={(e) => { e.stopPropagation(); wishlistHandler(flat); }}
                                                                    className="wishlist-button" // Apply wishlist button class
                                                                    aria-label="Add to wishlist"
                                                                >
                                                                    <FaHeart />
                                                                </Button>
                                                            </div>

                                                            <div className="mb-3">
                                                                <h5 className="price-text"> {/* Apply price class */}
                                                                    ₹{flat.PRICE >= 1 ? `${flat.PRICE.toFixed(2)} Cr` : `${(flat.PRICE * 100).toFixed(2)} Lakh`}
                                                                </h5>
                                                                <span className="details-text"> {/* Apply details text class */}
                                                                    <FaRulerCombined /> {flat.AREA} sqft | ₹{flat.Price_per_sqft} / sqft
                                                                </span>
                                                            </div>

                                                            <div className="mb-3">
                                                                <p className="details-text"> {/* Apply details text class */}
                                                                    <FaBed /> {flat.BEDROOM_NUM} BHK &nbsp; | &nbsp;
                                                                    <FaBath /> {flat.BALCONY_NUM} Balconies
                                                                </p>
                                                                <p className="details-text"> {/* Apply details text class */}
                                                                    <FaCalendarAlt /> Age: {flat.AGE} &nbsp; | &nbsp;
                                                                    <FaHome /> Type: {flat.PROPERTY_TYPE}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex justify-content-between align-items-center mt-3 action-buttons">
                                                            <Link
                                                                to={`/flats/${flat._id}`}
                                                            >
                                                                <Button variant="outline-primary" className="btn-outline-primary-custom"> {/* Use custom class */}
                                                                    View Details <FaArrowRight className="ms-2" />
                                                                </Button>
                                                            </Link>
                                                            <Button
                                                                onClick={(e) => { e.stopPropagation(); window.location.href = `tel:${flat.Contact}`; }}
                                                                variant="primary"
                                                                className="btn-primary-custom" // Use custom class
                                                            >
                                                                <FaPhone /> Contact
                                                            </Button>
                                                        </div>
                                                    </Card.Body>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Col>
                </Row>

                {loading && page > 1 && (
                    <div className="d-flex justify-content-center align-items-center mt-4">
                        <Loading />
                    </div>
                )}
                {!hasMoreData && !loading && data.length > 0 && (
                    <p className="end-of-list-message">You've reached the end of the list!</p>
                )}
            </Container>
        </div>
    );
};

export default AllFlats;