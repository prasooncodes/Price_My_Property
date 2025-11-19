import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { locationSuggestions } from '../../others/Keywords';
import HistoryTable from './HistoryTable';
import Recommendation from './Recommendation';
import { Container, Row, Col, Form, Button, ListGroup, Card } from 'react-bootstrap';

const locationOptions = locationSuggestions;

const Predict = () => {
    const [data, setData] = useState(null);
    const [location, setLocation] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [bedroom, setBedroom] = useState('');
    const [balcony, setBalcony] = useState('');
    const [area, setArea] = useState('');
    const [age, setAge] = useState('');
    const [furnish, setFurnish] = useState('');
    const [amenity, setAmenity] = useState('');
    const [floor, setFloor] = useState('');
    const [history, setHistory] = useState([]);
    const [FormData, setFormData] = useState({});
    const [predictedData, setPredictedData] = useState();

    const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL || 'http://localhost:4000/api/';
    const DJANGO_API_URL = process.env.REACT_APP_DJANGO_API_URL || 'http://localhost:8000/';

    const fetchData = async (sessionId) => {
        if (!sessionId) return;
        try {
            const response = await axios.get(`${process.env.REACT_APP_DJANGO_API_URL}fetchdata/?session_id=${sessionId}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // fetchData();
        const savedHistory = localStorage.getItem('searchHistory');
        if (savedHistory) setHistory(JSON.parse(savedHistory));
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        setLocation(value);
        if (value.length > 0) {
            const filtered = locationOptions.filter(option => option.toLowerCase().includes(value.toLowerCase()));
            setFilteredSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setFilteredSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setLocation(suggestion);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
    };

    const formHandler = async (e) => {
        e.preventDefault();
        const formData = { location, bedroom, balcony, area, age, furnish, amenity, floor };

        try {
            const response = await axios.post(`${process.env.REACT_APP_DJANGO_API_URL}submit/`, formData);
            const result = response.data;
            setFormData({ ...formData, PRICE: result.prediction });
            fetchData(result.session_id);

            const updatedHistory = [{ query: formData, prediction: result.prediction }, ...history];
            setHistory(updatedHistory);
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    const handleDelete = (index) => {
        const newHistory = history.filter((_, i) => i !== index);
        setHistory(newHistory);
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    };

    const getSuggestion = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_DJANGO_API_URL}recommend/Prediction-recommendations/`, FormData);
            setPredictedData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getSuggestion();
    }, [FormData]);

    return (
        <>
            <Container>
                <Row className="mb-4">
                    <h1 className="text-center mt-4 fw-bold">Welcome Back Chief!</h1>
                </Row>

                <Row>
                    <Col md={6}>
                        <Card style={{ border: '2px solid purple', borderRadius: '20px', padding: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }} className="shadow-lg">
                            <Card.Body className="p-4 justify-content-center">
                                <h2 className="text-center mb-4 fw-bold" style={{ background: 'linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                                    Input Parameters
                                </h2>

                                <form onSubmit={formHandler}>
                                    <Row className="justify-content-center">
                                        <Col className="mb-3">
                                            <Row>
                                                <Col md={5}>
                                                    <label className="mb-2">Select Location:</label>
                                                    <input
                                                        className="form-control mb-3"
                                                        type="text"
                                                        value={location}
                                                        onChange={handleChange}
                                                        placeholder="Type Location..."
                                                        required
                                                        style={{ backgroundColor: '#f0f0f0', border: '2px solid #833ab4', borderRadius: '8px', padding: '8px', fontSize: '16px', color: '#333', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                                                    />
                                                    {showSuggestions && location && (
                                                        <ListGroup className="mb-3">
                                                            {filteredSuggestions.map((suggestion, index) => (
                                                                <ListGroup.Item key={index} onClick={() => handleSuggestionClick(suggestion)} action>
                                                                    {suggestion}
                                                                </ListGroup.Item>
                                                            ))}
                                                        </ListGroup>
                                                    )}
                                                </Col>

                                                <Col md={7}>
                                                    <label className="mb-2">Select Bedroom Number:</label>
                                                    <div className="mb-3">
                                                        {[1, 2, 3, 4, 5, 6].map(num => (
                                                            <Form.Check key={num} inline label={num} type="radio" name="bedroom" value={num} onChange={e => setBedroom(e.target.value)} checked={bedroom === num.toString()} required />
                                                        ))}
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={6}>
                                                    <label className="mb-2">Select Built-up Area (Sq.ft.):</label>
                                                    <input className="form-control mb-3" type="number" value={area} onChange={e => setArea(e.target.value)} placeholder="Enter Buildup Area..." required
                                                        style={{ backgroundColor: '#f0f0f0', border: '2px solid #833ab4', borderRadius: '8px', padding: '8px', fontSize: '16px', color: '#333', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                                                    />
                                                </Col>
                                                <Col md={6}>
                                                    <label className="mb-2">Select Balcony Number:</label>
                                                    <div className="mb-3">
                                                        {[0,1,2,3,4].map(num => (
                                                            <Form.Check key={num} inline label={num} type="radio" name="balcony" value={num} onChange={e => setBalcony(e.target.value)} checked={balcony === num.toString()} required />
                                                        ))}
                                                    </div>
                                                </Col>
                                            </Row>

                                            <label className="mb-2">Select Age Type:</label>
                                            <div className="mb-3">
                                                {["New Property", "Relatively New Property", "Moderately Old", "Old Property"].map(val => (
                                                    <Form.Check key={val} inline label={val.split(' ')[0]} type="radio" name="age" value={val} onChange={e => setAge(e.target.value)} checked={age === val} required />
                                                ))}
                                            </div>

                                            <label className="mb-2">Select Furnishing Type:</label>
                                            <div className="mb-3">
                                                {["Unfurnished","Semi-furnished","Luxury furnished","Fully furnished"].map(val => (
                                                    <Form.Check key={val} inline label={val.split(' ')[0]} type="radio" name="furnish" value={val} onChange={e => setFurnish(e.target.value)} checked={furnish === val} required />
                                                ))}
                                            </div>

                                            <Row>
                                                <Col md={6}>
                                                    <label className="mb-2">Select Amenity Type:</label>
                                                    <div className="mb-3">
                                                        {["Low","Medium","High"].map(val => (
                                                            <Form.Check key={val} inline label={val} type="radio" name="amenity" value={val} onChange={e => setAmenity(e.target.value)} checked={amenity === val} required />
                                                        ))}
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <label className="mb-2">Select Floor Type:</label>
                                                    <div className="mb-3">
                                                        {["Low Floor","Mid Floor","High Floor"].map(val => (
                                                            <Form.Check key={val} inline label={val.split(' ')[0]} type="radio" name="floor" value={val} onChange={e => setFloor(e.target.value)} checked={floor === val} required />
                                                        ))}
                                                    </div>
                                                </Col>
                                            </Row>

                                            <div className="text-center">
                                                <Button type="submit" className="custom-button w-100">Get Prediction</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </form>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        {data ? (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
                                <Card style={{ borderColor: 'purple', borderWidth: '1px', padding: '20px', width: '100%', maxWidth: '600px' }}>
                                    {data.prediction !== null && data.prediction !== undefined ? (
                                        <div>
                                            <p className="text-center mt-4">
                                                <strong>Approx Price Range</strong> : {(data.prediction) > 1
                                                    ? `${(data.prediction - 0.13).toFixed(2)} to ${(data.prediction + 0.13).toFixed(2)} Cr`
                                                    : `${((data.prediction - 0.13) * 100).toFixed(2)} to ${((data.prediction + 0.13) * 100).toFixed(2)} Lakh`}
                                            </p>
                                            {area && !isNaN(area) && area > 0 ? (
                                                <p className="text-center"><strong>Approx Price/ sq.ft.</strong> : Rs. {Math.round((data.prediction * 10000000) / area)}/-</p>
                                            ) : (
                                                <p className="text-center text-danger"><strong>Fill the Form to Get the Result</strong></p>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-center text-danger"><strong>No prediction available</strong></p>
                                    )}
                                </Card>
                            </div>
                        ) : (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
                                <h3 className="text-center text-success"><strong>Fill input parameters to get prediction!</strong></h3>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>

            <Recommendation data={predictedData} />
            <HistoryTable history={history} onDelete={handleDelete} />
        </>
    );
};

export default Predict;
