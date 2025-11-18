import React from 'react';
import { Card, Row, Col, Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchResult = () => {
  const { data } = useSelector((state) => state.searchResult || { data: { result: [] } });

  const wishlistHandler = (flat) => {
    const existingData = JSON.parse(localStorage.getItem('wishList')) || [];
    if (!existingData.some((item) => item._id === flat._id)) {
      existingData.push(flat);
      localStorage.setItem('wishList', JSON.stringify(existingData));
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col md={9}>
          {(!data || !Array.isArray(data.result) || data.result.length === 0) ? null : (
            <div style={{ padding: '20px 10px' }}>
              <h4 style={{ marginBottom: '25px', color: '#fff' }}>
                Search Results for <span style={{ color: '#00c2ff' }}>{data.result[0].location}</span>:
              </h4>
              <Row>
                {data.result.map((flat) => (
                  <Col md={12} key={flat._id} className="mb-4">
                    <Card
                      style={{
                        backgroundColor: '#1a1a1a',
                        color: '#fff',
                        borderRadius: '12px',
                        border: '1px solid #333',
                        overflow: 'hidden',
                      }}
                    >
                      <Row>
                        <Col md={4}>
                          <Card.Img
                            src={flat.Image}
                            alt="Property"
                            style={{
                              height: '100%',
                              minHeight: '200px',
                              objectFit: 'cover',
                              borderRadius: '12px 0 0 12px',
                            }}
                          />
                        </Col>
                        <Col md={8}>
                          <Card.Body style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                              <div>
                                <Card.Title style={{ marginBottom: '5px', fontSize: '1.3rem', color: '#fff' }}>
                                  {flat.SOCIETY_NAME}, {flat.CITY}
                                </Card.Title>
                                <Card.Subtitle style={{ marginBottom: '10px', color: '#aaa', fontSize: '0.95rem' }}>
                                  {flat.BEDROOM_NUM} BHK {flat.PROPERTY_TYPE} in {flat.location}
                                </Card.Subtitle>
                              </div>
                              <Button
                                variant="outline-light"
                                style={{
                                  backgroundColor: 'transparent',
                                  border: 'none',
                                  fontSize: '1.5rem',
                                  padding: 0,
                                }}
                                onClick={() => wishlistHandler(flat)}
                              >

                              </Button>
                            </div>

                            <div style={{ marginTop: '15px' }}>
                              <h5 style={{ fontSize: '1.6rem', color: '#00ff99' }}>
                                ₹{flat.PRICE > 1 ? `${flat.PRICE.toFixed(2)} Cr` : `${(flat.PRICE * 100).toFixed(2)} Lakh`}
                              </h5>
                              <span style={{ color: '#ccc', fontSize: '0.95rem' }}>
                                {flat.AREA} sqft | ₹{flat.Price_per_sqft} / sqft
                              </span>
                            </div>

                            <p style={{ marginTop: '10px', color: '#bbb', fontSize: '0.95rem', lineHeight: '1.4' }}>
                              Age: {flat.AGE} <br />
                              <strong>{flat.BEDROOM_NUM} BHK</strong>, {flat.BALCONY_NUM} Balconies | {flat.Situation}
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                              <Link
                                to={`/flats/${flat._id}`}
                                style={{ textDecoration: 'underline', cursor: 'pointer', color: '#00c2ff', fontWeight: '500' }}
                              >
                                View Details <i className="fa-solid fa-arrow-up-right-from-square"></i>
                              </Link>
                              <Button
                                onClick={() => window.location.href = `tel:${flat.Contact}`}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  padding: 0,
                                }}
                              >
                                <i className="fa-solid fa-phone" style={{ color: '#00ff00', fontSize: '1.4rem' }}></i>
                              </Button>
                            </div>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SearchResult;
