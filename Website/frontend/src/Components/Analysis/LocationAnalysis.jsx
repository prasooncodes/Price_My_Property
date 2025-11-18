import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { fetchData } from './FetchData';
import LocationInput from './LocationInput';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';

const LocationAnalysis = () => {
  const [mapData, setMapData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [locationInput, setLocationInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Price (Crores)');
  
  const categoryOptions = ['Area (sqft)', 'Price (Crores)', 'BHK', 'Price/Sqft'];
  const categoryLabels = {
    'Area (sqft)': 'Area (sqft)',
    'Price (Crores)': 'Price (Crores)',
    'BHK': 'BHK',
    'Price/Sqft': 'Price/Sqft',
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        setMapData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (locationInput) {
      setFilteredData(mapData.filter(item =>
        item.location.toLowerCase().includes(locationInput.toLowerCase())
      ));
    } else {
      setFilteredData(mapData);
    }
  }, [locationInput, mapData]);

  const getColor = (item) => {
    switch (selectedCategory) {
      case 'Area (sqft)': return item.AREA;
      case 'Price (Crores)': return item.PRICE;
      case 'BHK': return item.BEDROOM_NUM;
      case 'Price/Sqft': return item.Price_per_sqft;
      default: return 0;
    }
  };

  return (
    <Container fluid className="mt-5">
      <h3 className="text-center mb-4" style={{ color: '#f5f5f5', fontWeight: 600 }}>Kolkata Property Map Analysis</h3>
      <Row>
        <Col md={3}>
          <Card className="p-3 mb-4 shadow" style={{ backgroundColor: '#2b2d3a', color: '#f5f5f5', borderRadius: '12px' }}>
            <h5 className="mb-3">Select Category</h5>
            <Form>
              {categoryOptions.map(option => (
                <Form.Check
                  key={option}
                  type="radio"
                  label={categoryLabels[option] || option}
                  value={option}
                  checked={selectedCategory === option}
                  onChange={() => setSelectedCategory(option)}
                  className="mb-2"
                  style={{ color: '#f5f5f5' }}
                />
              ))}
            </Form>
            <div className="mt-4">
              <LocationInput locationInput={locationInput} setLocationInput={setLocationInput} />
            </div>
          </Card>
        </Col>

        <Col md={9}>
          <div style={{ width: '100%', height: '90vh' }}>
            <Plot
              data={[{
                type: 'scattermapbox',
                lat: filteredData.map(item => item.LATITUDE),
                lon: filteredData.map(item => item.LONGITUDE),
                mode: 'markers',
                marker: {
                  size: 12,
                  color: filteredData.map(item => getColor(item)),
                  colorscale: 'Cividis',
                  colorbar: { title: categoryLabels[selectedCategory] },
                },
                text: filteredData.map(item => 
                  `${item.location}\nPrice: ₹${item.PRICE} Cr\nBHK: ${item.BEDROOM_NUM}\nArea: ${item.AREA} sqft`
                ),
                hoverinfo: 'text'
              }]}
              layout={{
                autosize: true,
                mapbox: {
                  style: 'open-street-map',
                  zoom: 10,
                  center: { lat: 22.5726, lon: 88.3639}, 
                },
                title: {
                  text: 'Property Analysis in Kolkata',
                  font: { color: '#f5f5f5', size: 22 },
                  x: 0.5,
                },
                paper_bgcolor: '#1c1e29',
                plot_bgcolor: '#1c1e29',
                font: { color: '#f5f5f5' },
                margin: { t: 50, b: 50, l: 0, r: 0 },
              }}
              style={{ width: '100%', height: '100%' }}
              config={{ displayModeBar: false }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LocationAnalysis;
