import fs from 'fs';
import mongoose from 'mongoose';
import FlatData from './db/FlatModel.js';
import { connectToDatabase } from './db/db.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const importData = async () => {
  try {
    // Connect to database
    await connectToDatabase();

    // Clear existing data
    await FlatData.deleteMany({});
    console.log('Cleared existing data');

    // Try to read the FlatData.json file from ML_Operations
    const dataPath = path.join(__dirname, '../../ML_Operations/FlatData.json');
    let jsonData;
    
    try {
      jsonData = fs.readFileSync(dataPath, 'utf8');
      console.log('Found FlatData.json from ML_Operations');
    } catch (error) {
      console.log('FlatData.json not found, creating sample data...');
      // Create sample data if FlatData.json doesn't exist
      const sampleData = [
        {
          PROPERTY_TYPE: 'Apartment',
          SOCIETY_NAME: 'Green Valley Apartments',
          CITY: 'Kolkata',
          location: 'Garia',
          BEDROOM_NUM: 2,
          BALCONY_NUM: 1,
          AREA: 1000,
          Price_per_sqft: 5000,
          PRICE: 50,
          AGE: 'Old Property',
          FURNISH: 'Unfurnished',
          amenity_luxury: '246',
          FLOOR_NUM: '3',
          LATITUDE: 22.5726,
          LONGITUDE: 88.3639,
          TOTAL_FLOOR: 10,
          DESCRIPTION: 'Beautiful 2BHK apartment in prime location',
          Facing_Direction: 'North',
          Image: 'https://via.placeholder.com/400x300?text=Property+Image',
          Loan_Availability: true,
          Estimated_Monthly_EMI: 25000,
          Maintenance_Fees: 2000,
          Property_Tax: 5000,
          Stamp_Duty_Registration_Costs: 100000,
          Nearest_Schools: { name: 'ABC School', distance: 0.5 },
          Nearest_Colleges: { name: 'XYZ College', distance: 1.2 },
          Nearest_Hospitals: { name: 'City Hospital', distance: 0.8 },
          Nearest_Markets: { name: 'Local Market', distance: 0.3 },
          Nearest_Public_Transport: { name: 'Bus Stop', distance: 0.2 },
          Nearest_Restaurants: { name: 'Food Court', distance: 0.5 },
          Nearest_Railway_Stations: { name: 'Garia Station', distance: 1.0 },
          Nearest_Malls: { name: 'South City Mall', distance: 2.0 },
          Swimming_Pool: true,
          Playground: true,
          RERA_Registration_Number: 12345,
          '24x7_Security': true,
          Visitor_Parking: true,
          Intercom_Facility: true,
          Power_Backup: true,
          Water_Supply: '24/7',
          Pet_Friendly: false,
          Fire_Safety_Installed: true
        },
        {
          PROPERTY_TYPE: 'Apartment',
          SOCIETY_NAME: 'Blue Heights',
          CITY: 'Kolkata',
          location: 'Tollygunge',
          BEDROOM_NUM: 3,
          BALCONY_NUM: 2,
          AREA: 1200,
          Price_per_sqft: 4500,
          PRICE: 60,
          AGE: 'New Property',
          FURNISH: 'Semi-Furnished',
          amenity_luxury: '300',
          FLOOR_NUM: '5',
          LATITUDE: 22.4962,
          LONGITUDE: 88.3516,
          TOTAL_FLOOR: 15,
          DESCRIPTION: 'Spacious 3BHK apartment with modern amenities',
          Facing_Direction: 'East',
          Image: 'https://via.placeholder.com/400x300?text=3BHK+Apartment',
          Loan_Availability: true,
          Estimated_Monthly_EMI: 35000,
          Maintenance_Fees: 3000,
          Property_Tax: 7000,
          Stamp_Duty_Registration_Costs: 120000,
          Nearest_Schools: { name: 'Modern School', distance: 0.3 },
          Nearest_Colleges: { name: 'Engineering College', distance: 2.0 },
          Nearest_Hospitals: { name: 'Metro Hospital', distance: 1.0 },
          Nearest_Markets: { name: 'Super Market', distance: 0.4 },
          Nearest_Public_Transport: { name: 'Metro Station', distance: 0.5 },
          Nearest_Restaurants: { name: 'Fine Dining', distance: 0.7 },
          Nearest_Railway_Stations: { name: 'Tollygunge Station', distance: 1.5 },
          Nearest_Malls: { name: 'Quest Mall', distance: 3.0 },
          Swimming_Pool: true,
          Playground: false,
          RERA_Registration_Number: 54321,
          '24x7_Security': true,
          Visitor_Parking: true,
          Intercom_Facility: false,
          Power_Backup: true,
          Water_Supply: '24/7',
          Pet_Friendly: true,
          Fire_Safety_Installed: true
        },
        {
          PROPERTY_TYPE: 'Apartment',
          SOCIETY_NAME: 'Sunrise Residency',
          CITY: 'Kolkata',
          location: 'Salt Lake',
          BEDROOM_NUM: 1,
          BALCONY_NUM: 1,
          AREA: 800,
          Price_per_sqft: 6000,
          PRICE: 40,
          AGE: 'New Property',
          FURNISH: 'Furnished',
          amenity_luxury: '400',
          FLOOR_NUM: '7',
          LATITUDE: 22.5807,
          LONGITUDE: 88.4372,
          TOTAL_FLOOR: 20,
          DESCRIPTION: 'Compact 1BHK apartment perfect for singles',
          Facing_Direction: 'South',
          Image: 'https://via.placeholder.com/400x300?text=1BHK+Studio',
          Loan_Availability: true,
          Estimated_Monthly_EMI: 20000,
          Maintenance_Fees: 1500,
          Property_Tax: 3000,
          Stamp_Duty_Registration_Costs: 80000,
          Nearest_Schools: { name: 'City School', distance: 0.8 },
          Nearest_Colleges: { name: 'Salt Lake College', distance: 1.5 },
          Nearest_Hospitals: { name: 'Apollo Hospital', distance: 2.0 },
          Nearest_Markets: { name: 'City Center', distance: 0.6 },
          Nearest_Public_Transport: { name: 'Salt Lake Station', distance: 0.3 },
          Nearest_Restaurants: { name: 'Salt Lake Restaurant', distance: 0.4 },
          Nearest_Railway_Stations: { name: 'Bidhannagar Station', distance: 2.0 },
          Nearest_Malls: { name: 'City Centre Mall', distance: 1.0 },
          Swimming_Pool: false,
          Playground: true,
          RERA_Registration_Number: 67890,
          '24x7_Security': true,
          Visitor_Parking: false,
          Intercom_Facility: true,
          Power_Backup: true,
          Water_Supply: '24/7',
          Pet_Friendly: false,
          Fire_Safety_Installed: true
        }
      ];

      await FlatData.insertMany(sampleData);
      console.log(`Imported ${sampleData.length} sample properties`);
      process.exit(0);
    }

    const data = JSON.parse(jsonData);
    console.log(`Found ${data.length} properties in FlatData.json`);

    // Process and validate data
    const processedData = data.map((item, index) => {
      try {
        return {
          PROPERTY_TYPE: item.PROPERTY_TYPE || 'Apartment',
          SOCIETY_NAME: item.SOCIETY_NAME || `Society ${index + 1}`,
          CITY: item.CITY || 'Kolkata',
          location: item.location || 'Unknown',
          BEDROOM_NUM: Number(item.BEDROOM_NUM) || 2,
          BALCONY_NUM: Number(item.BALCONY_NUM) || 1,
          AREA: Number(item.AREA) || 1000,
          Price_per_sqft: Number(item.Price_per_sqft) || 5000,
          PRICE: Number(item.PRICE) || 50,
          AGE: item.AGE || 'Old Property',
          FURNISH: item.FURNISH || 'Unfurnished',
          amenity_luxury: String(item.amenity_luxury || '200'),
          FLOOR_NUM: String(item.FLOOR_NUM || '1'),
          LATITUDE: Number(item.LATITUDE) || 22.5726,
          LONGITUDE: Number(item.LONGITUDE) || 88.3639,
          TOTAL_FLOOR: Number(item.TOTAL_FLOOR) || 5,
          DESCRIPTION: item.DESCRIPTION || 'Property for sale',
          Facing_Direction: item.Facing_Direction || 'North',
          Image: item.Image || 'https://via.placeholder.com/400x300?text=Property+Image',
          Loan_Availability: Boolean(item.Loan_Availability !== false),
          Estimated_Monthly_EMI: Number(item.Estimated_Monthly_EMI) || 20000,
          Maintenance_Fees: Number(item.Maintenance_Fees) || 2000,
          Property_Tax: Number(item.Property_Tax) || 5000,
          Stamp_Duty_Registration_Costs: Number(item.Stamp_Duty_Registration_Costs) || 100000,
          
          // Ensure nested objects have required name and distance fields
          Nearest_Schools: {
            name: item.Nearest_Schools?.name || 'Local School',
            distance: Number(item.Nearest_Schools?.distance) || 1.0
          },
          Nearest_Colleges: {
            name: item.Nearest_Colleges?.name || 'Local College',
            distance: Number(item.Nearest_Colleges?.distance) || 2.0
          },
          Nearest_Hospitals: {
            name: item.Nearest_Hospitals?.name || 'Local Hospital',
            distance: Number(item.Nearest_Hospitals?.distance) || 1.5
          },
          Nearest_Markets: {
            name: item.Nearest_Markets?.name || 'Local Market',
            distance: Number(item.Nearest_Markets?.distance) || 0.5
          },
          Nearest_Public_Transport: {
            name: item.Nearest_Public_Transport?.name || 'Bus Stop',
            distance: Number(item.Nearest_Public_Transport?.distance) || 0.3
          },
          Nearest_Restaurants: {
            name: item.Nearest_Restaurants?.name || 'Restaurant',
            distance: Number(item.Nearest_Restaurants?.distance) || 0.8
          },
          Nearest_Railway_Stations: {
            name: item.Nearest_Railway_Stations?.name || 'Railway Station',
            distance: Number(item.Nearest_Railway_Stations?.distance) || 3.0
          },
          Nearest_Malls: {
            name: item.Nearest_Malls?.name || 'Shopping Mall',
            distance: Number(item.Nearest_Malls?.distance) || 2.5
          },
          
          Swimming_Pool: Boolean(item.Swimming_Pool !== false),
          Playground: Boolean(item.Playground !== false),
          RERA_Registration_Number: Number(item.RERA_Registration_Number) || Math.floor(Math.random() * 100000),
          '24x7_Security': Boolean(item['24x7_Security'] !== false),
          Visitor_Parking: Boolean(item.Visitor_Parking !== false),
          Intercom_Facility: Boolean(item.Intercom_Facility),
          Power_Backup: Boolean(item.Power_Backup !== false),
          Water_Supply: item.Water_Supply || '24/7',
          Pet_Friendly: Boolean(item.Pet_Friendly),
          Fire_Safety_Installed: Boolean(item.Fire_Safety_Installed !== false)
        };
      } catch (error) {
        console.error(`Error processing item ${index + 1}:`, error);
        return null;
      }
    }).filter(item => item !== null);

    console.log(`Processed ${processedData.length} valid properties`);

    // Insert data in batches to avoid memory issues
    const batchSize = 100;
    let inserted = 0;

    for (let i = 0; i < processedData.length; i += batchSize) {
      const batch = processedData.slice(i, i + batchSize);
      await FlatData.insertMany(batch);
      inserted += batch.length;
      console.log(`Imported ${inserted}/${processedData.length} properties`);
    }

    console.log(`Successfully imported ${inserted} properties`);
    process.exit(0);

  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

importData();