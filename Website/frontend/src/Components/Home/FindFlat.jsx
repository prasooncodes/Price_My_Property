import React, { useState } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  DropdownButton,
  ListGroup,
} from 'react-bootstrap';
import { locationSuggestions } from '../../others/Keywords';
import { useDispatch } from 'react-redux';
import { searchFlatSlice } from '../../RTK/Slices/SearchSlice';

const FindFlat = () => {
  const locationOptions = locationSuggestions;
  const [location, setLocation] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [bedroom, setBedroom] = useState('');
  const [property, setProperty] = useState('');

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    if (value.length > 0) {
      const filtered = locationOptions.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchFlatSlice({ location, bedroom, property }));
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={9}>
          <Form onSubmit={handleSubmit}>
            <Row className="align-items-center mb-4">
              {/* Bedroom Dropdown */}
              <Col md={2}>
                <DropdownButton
                  title={bedroom ? `${bedroom} BHK` : 'Select BHK'}
                  variant="success"
                  id="dropdown-bedroom"
                  className="w-100"
                >
                  <div className="p-3">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <Form.Check
                        key={num}
                        type="radio"
                        label={`${num} BHK`}
                        name="bedroom"
                        value={num}
                        onChange={(e) => setBedroom(e.target.value)}
                        checked={bedroom === `${num}`}
                        style={{ margin: '5px 0', fontSize: '14px' }}
                      />
                    ))}
                  </div>
                </DropdownButton>
              </Col>

              {/* Property Type Dropdown */}
              <Col md={3}>
                <DropdownButton
                  title={property || 'Select Property'}
                  variant="success"
                  id="dropdown-property"
                  className="w-100"
                >
                  <div className="p-3">
                    {['Flat/Apartment', 'Farm House', 'House/Villa', 'Residential Land'].map(
                      (type) => (
                        <Form.Check
                          key={type}
                          type="radio"
                          label={type}
                          name="property"
                          value={type}
                          onChange={(e) => setProperty(e.target.value)}
                          checked={property === type}
                          style={{ margin: '5px 0', fontSize: '14px' }}
                        />
                      )
                    )}
                  </div>
                </DropdownButton>
              </Col>
            </Row>

            {/* Location Input */}
            <Row className="mb-4">
              <Col md={10}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type Location to Search properties..."
                  value={location}
                  onChange={handleChange}
                  required
                  style={{
                    backgroundColor: '#f7f7f7',
                    border: '2px solid #833ab4',
                    borderRadius: '10px',
                    padding: '12px 18px',
                    fontSize: '16px',
                    color: '#333',
                  }}
                />
                {showSuggestions && (
                  <ListGroup className="mt-1">
                    {filteredSuggestions.map((suggestion, idx) => (
                      <ListGroup.Item
                        key={idx}
                        action
                        onClick={() => handleSuggestionClick(suggestion)}
                        style={{ cursor: 'pointer', padding: '8px 12px' }}
                      >
                        {suggestion}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Col>

              <Col md={2}>
                <Button
                  type="submit"
                  className="w-100"
                  style={{ padding: '12px 0', fontSize: '16px', fontWeight: '500' }}
                >
                  Search
                </Button>
              </Col>
            </Row>
            <p style={{ color: 'red', fontSize: '14px' }}>(Note: Only Flat data is available)</p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FindFlat;
