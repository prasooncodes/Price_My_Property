import pandas as pd
import numpy as np
from datetime import datetime
import random

def generate_delhi_data(num_rows):
    """
    Generate synthetic real estate data for Delhi
    """
    
    # Delhi latitude/longitude ranges
    # Delhi approximately: Lat 28.4-28.9, Long 76.8-77.3
    delhi_lat_range = (28.4, 28.9)
    delhi_long_range = (76.8, 77.3)
    
    # Delhi localities
    delhi_localities = [
        'Connaught Place', 'Dwarka', 'Rohini', 'Saket', 'Vasant Kunj',
        'Greater Kailash', 'Nehru Place', 'Janakpuri', 'Lajpat Nagar', 'Karol Bagh',
        'Pitampura', 'Rajouri Garden', 'Mayur Vihar', 'Noida', 'Gurgaon',
        'Hauz Khas', 'Defence Colony', 'Green Park', 'Malviya Nagar', 'Vasant Vihar'
    ]
    
    # Property types
    property_types = ['Residential', 'Residentia', 'Commercial']
    
    # Transaction types
    transaction_types = ['Resale', 'New Property']
    
    # Furnish status
    furnish_status = ['Unfurnished', 'Semi-Furnished', 'Furnished']
    
    # Facing directions
    facing_directions = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West']
    
    # Property descriptions
    descriptions = ['Flat', 'Builder Floor', 'Apartment', 'Independent House', 'Villa', 'Penthouse']
    
    # Features patterns from the provided format
    feature_patterns = [
        [44, 23, 24, 25, 47, 17, 39, 6, 9, 40, 30, 41, 42, 31, 21, 32],
        [24, 17, 19, 9, 40, 41, 42, 21, 32],
        [44, 23, 17, 40, 30, 41, 42],
        [33, 24, 47, 25, 17, 28, 3, 5, 6, 9, 40, 41, 42, 21],
        [23, 40, 41],
        [23, 1, 12, 6, 19, 21],
        [33, 23, 12, 24, 25, 17, 19, 3, 5, 6, 9, 20, 21],
        [44, 24, 47, 19, 41, 42],
        [17, 6, 21],
        [24, 5, 8],
        [24, 25, 8, 40],
        [6],
        [44, 23, 12, 46, 47, 28, 19, 1, 3, 5, 6, 8, 9, 40, 41, 42, 43],
        [5, 20, 21],
        [1, 12, 24, 3, 6, 19, 9, 40, 30, 41, 21],
        [23, 12, 1, 3, 6, 9, 40, 41, 20, 42, 21],
        [12, 24, 3, 6, 17, 9, 40, 41, 42, 21],
        [1, 12, 3, 6, 28, 8, 9, 40, 41, 20, 42, 21],
        [24, 6, 19, 40, 41, 42],
        [24, 40, 41, 42, 21],
        [1, 12, 5, 6, 21],
        [33, 23, 12, 24, 25, 47, 19, 3, 5, 6, 9, 40, 41, 20, 42, 31, 21, 32],
        [23, 24, 47, 25, 6, 39, 19, 41, 42, 43],
        [23, 24, 47, 25, 17, 39, 28, 19, 5, 8, 9, 40, 41, 21, 43],
        [5, 17, 21],
        [23, 24, 25, 5, 6, 17, 19],
        [24, 25, 5, 8],
        [44, 23, 6, 39, 8, 40, 30, 41],
        [44, 23, 24, 25, 8, 30, 43],
        [5],
        [23],
        [23, 24, 17, 6, 19, 21],
        [44, 23, 12, 24, 47, 17, 39, 19, 3, 5, 8, 9, 40, 41, 42, 21, 43],
        [23, 24, 25, 19, 8],
        [1, 12, 3, 6, 9, 20, 21],
        [23, 12, 1, 3, 5, 6, 29, 9, 20, 31, 21],
        [23, 12, 1, 24, 3, 5, 17, 6, 19, 40, 20, 21],
        [24],
        [44, 24, 25, 6, 39, 40, 41, 42],
        [12, 23, 24, 25, 47, 17, 28, 1, 3, 5, 6, 9, 40, 30, 41, 20, 42, 31, 21, 43],
        [5],
        [1, 12, 3, 26, 6, 20, 21],
        [44, 23, 12, 3, 6, 17, 9, 40, 41, 20, 21],
        [33, 1, 12, 3, 6, 19, 8, 9, 30, 21],
        [21],
        [24, 39, 19, 40, 41, 32],
        [23, 12, 24, 26, 1, 3, 6, 9, 40, 41, 20, 42, 21],
        [23, 1, 12, 24, 5, 17, 6, 19, 20, 31, 21],
        [23, 24],
        [23, 24, 17, 19, 21],
        [23, 12, 24, 47, 17, 19, 1, 6, 9, 41, 20, 42, 31, 21, 10],
        [24],
        [45, 47, 25, 5, 19, 9, 41, 20, 42, 21],
        [23, 1, 24, 3, 26, 6, 17, 29, 19, 20, 21],
        [23, 24, 25, 5, 17, 19, 21],
        [12, 1, 6, 21],
        [24],
        [23, 24, 5, 17, 6, 19, 20, 21],
        [44, 33, 47, 25, 5, 39, 40, 41, 42],
        [23, 24],
        [31, 21],
        [23, 12, 24, 47, 25, 26, 17, 29, 19, 1, 3, 5, 6, 9, 40, 41, 20, 31, 21],
        [23],
        [8],
        [23, 24, 5, 17, 6, 19, 20, 21],
        [33, 23, 12, 26, 1, 3, 5, 6, 9, 30, 20, 31, 21],
        [17, 21],
        [44, 39, 40, 41, 42, 32],
        [24, 32],
        [19],
        [24, 5, 8],
        [44, 23, 39, 28, 19, 30, 41],
        [44, 23, 24, 25, 47, 39, 19, 40, 30, 41, 42, 32],
        [44, 24, 25, 47, 30],
        [24],
        [24, 25, 6, 8],
        [24, 40, 41],
        [6, 20, 21],
        [23, 24, 17, 6, 19, 20, 21],
        [23, 24, 17, 19, 21],
        [23, 24],
        [33, 23, 12, 24, 25, 47, 28, 19, 1, 3, 5, 6, 9, 31, 43],
        [23, 12, 1, 24, 3, 6, 17, 19, 20, 21],
        [33, 23, 12, 24, 25, 17, 19, 1, 3, 6, 9, 20, 21],
        [24, 6, 21],
        [23, 24, 17, 19, 21],
        [23, 24, 17, 19, 20, 21],
        [23, 1, 12, 24, 3, 5, 6, 17, 19, 20, 21],
        [23, 12, 24, 3, 17, 6, 19, 9, 41, 20, 31, 21],
        [44, 23, 24, 40, 41, 42, 32],
        [33, 1, 12, 3, 6, 19, 20, 21],
        [24, 5, 9, 40, 41, 42, 21],
        [24, 41, 21],
        [23, 24, 5, 19, 21],
        [44, 12, 24, 25, 47, 39, 28, 19, 3, 5, 6, 8, 9, 40, 30, 41, 42],
        [12, 24, 30],
        [12, 6, 21],
        [24, 6, 19, 9, 40, 41, 42],
        [44, 33, 25, 17, 9, 40, 41, 42, 21, 43],
        [24],
        [12, 3, 5, 6, 20, 21],
        [23, 25, 17, 28, 19, 8, 9, 30, 20, 31, 21, 10, 32],
        [23, 12, 1, 24, 17, 6, 40, 41, 42, 21],
        [33, 23, 45, 12, 17, 19, 1, 3, 6, 9, 40, 30, 20, 42, 21],
        [24, 25, 19, 8],
        [45, 40, 30, 41, 21, 32],
        [23, 30],
        [17, 20, 21],
        [23, 45, 12, 24, 47, 25, 26, 17, 19, 1, 3, 5, 6, 9, 40, 41, 20, 42, 31, 21],
        [44, 23, 12, 24, 25, 17, 19, 1, 3, 5, 6, 40, 30, 20, 42, 21, 32, 43],
        [23, 17, 6, 19, 21],
        [23, 24, 17, 6, 20, 21],
        [24, 5],
        [19],
        [24, 25, 39, 40, 31, 21],
        [23, 6, 20, 21],
        [21],
        [33, 23, 12, 24, 25, 26, 17, 1, 3, 6, 9, 20, 31, 21],
        [23, 24, 17, 21],
        [23, 24, 5, 6, 19, 20],
        [23, 21],
        [24, 21],
        [44, 33, 23, 12, 24, 25, 47, 26, 17, 28, 19, 1, 3, 5, 6, 8, 9, 40, 41, 20, 31, 21, 43],
        [23, 12, 24, 3, 6, 20, 21, 32],
        [9],
        [23, 45, 24, 47, 5, 39, 41, 42, 21],
        [1, 12, 3, 6, 17, 9, 31, 21],
        [5, 19, 8],
        [44, 19, 20],
        [44, 25, 47, 5, 17, 8, 40, 41, 42, 43],
        [33, 23, 12, 24, 17, 1, 3, 5, 6, 9, 40, 41, 42, 21],
        [24],
        [33, 23, 12, 24, 17, 19, 1, 3, 5, 6, 9, 20, 31, 21, 43],
        [24, 47, 17, 9, 40, 41, 42, 43],
        [23, 12, 24, 3, 26, 17, 19, 9, 21],
        [23, 5, 9, 21],
        [44, 23, 24, 25, 47, 19, 21],
        [24],
        [12, 24, 3, 5, 6, 9, 40, 41, 20, 42, 31, 21],
        [1, 12, 3, 20, 21],
        [33, 23, 12, 24, 47, 25, 39, 28, 29, 19, 3, 5, 6, 9, 40, 30, 41, 20, 42, 31, 21, 32],
        [24],
        [23, 19, 21],
        [24],
        [23, 24, 17, 6, 19, 20, 21],
        [23, 6, 19, 20, 21],
        [24, 47, 42, 21],
        [23, 12, 24, 25, 39, 19, 1, 3, 5, 6, 9, 40, 41, 21],
        [44, 33, 23, 12, 24, 47, 17, 19, 5, 40, 30, 41, 42, 21, 32, 43],
        [33, 23, 12, 24, 47, 25, 17, 19, 1, 3, 5, 6, 9, 40, 30, 41, 20, 31, 21],
        [24, 3, 5, 9, 40, 41, 42, 21],
        [23, 6, 20, 21],
        [33, 23, 12, 25, 26, 17, 19, 1, 3, 6, 9, 30, 20, 21],
        [45, 24, 25, 19, 9, 40, 41, 42],
        [24, 25],
        [44, 24, 5, 40, 41],
        [24, 40, 41, 42, 21],
        [23, 17],
        [23, 12, 1, 24, 17, 6, 19, 40, 20, 21],
        [23, 1, 12, 3, 5, 6, 9, 30, 20, 21],
        [24, 25, 5, 6, 19, 8],
        [5],
        [23, 24, 3, 25, 5, 17, 39, 19, 9, 41, 42, 21],
        [24, 47, 6, 19, 9, 40, 41, 42, 21, 32],
        [6],
        [23, 45, 12, 24, 47, 25, 17, 1, 3, 6, 9, 40, 30, 41, 20, 31, 42, 21, 32],
        [47, 39, 40, 30, 41, 42, 32],
        [23, 24, 5, 17, 6, 20, 21],
        [8],
        [24, 25, 5, 6, 19],
        [24, 19],
        [23, 24, 25, 5, 17],
        [44, 24, 46, 47, 8, 40, 41, 42, 32],
        [24, 5, 17, 6, 19, 9, 40, 41, 42, 21],
        [23, 12, 1, 24, 3, 25, 17, 6, 9, 21, 32],
        [23, 24],
        [23, 24, 17, 21],
        [44, 24, 25, 17, 39, 8, 40, 41],
        [5],
        [23, 24, 5, 17, 19, 21],
        [44, 33, 12, 26, 1, 3, 5, 6, 40, 30, 41, 20, 21],
        [23, 17, 21],
        [23, 12, 1, 3, 26, 5, 17, 6, 19, 9, 20, 21],
        [12, 1, 3, 26, 5, 17, 6, 9, 40, 41, 20, 21],
        [24, 40, 41, 42],
        [33, 23, 1, 12, 3, 26, 6, 9, 20, 31, 21],
        [3, 6, 20, 21],
        [44, 24, 47, 17, 30, 41, 21, 32, 43],
        [23, 24, 39, 19],
        [33, 1, 12, 23, 2, 24, 6, 17, 19, 30, 20, 21],
        [24],
        [24, 9],
        [33, 45, 12, 25, 47, 26, 1, 3, 5, 6, 9, 40, 41, 20, 42, 31, 21, 32],
        [44, 23, 24, 47, 17, 19, 9, 40, 41, 20, 21, 32],
        [23, 1, 12, 3, 6, 9, 20, 21],
        [33, 1, 12, 3, 6, 21],
        [24, 19]
    ]

    data = []
    
    for i in range(num_rows):
        # Generate unique property ID
        prop_id = f'DEL{str(i+1).zfill(6)}S'
        
        # Random property attributes
        bhk = random.choice([1, 2, 2, 3, 3, 3, 4, 4, 5])
        bedrooms = bhk
        bathrooms = random.randint(1, bhk + 1)
        
        # Price based on BHK (in range)
        price_base = {1: (3000, 6000), 2: (5000, 10000), 3: (8000, 15000), 
                     4: (12000, 25000), 5: (20000, 40000)}
        price = random.randint(*price_base.get(bhk, (5000, 15000)))
        
        # Convert price to lakhs or crores with 2 decimal precision
        if price >= 10000:  # More than 1 crore
            price_formatted = round(price / 10000, 2)
            price_str = f"{price_formatted} Cr"
        else:  # In lakhs
            price_formatted = round(price / 100, 2)
            price_str = f"{price_formatted} L"
        
        # Area based on BHK
        area_base = {1: (400, 700), 2: (700, 1200), 3: (1200, 1800), 
                    4: (1800, 2500), 5: (2500, 4000)}
        total_area = random.randint(*area_base.get(bhk, (800, 1500)))
        
        # Super area (typically 10-20% more than total area)
        super_area = int(total_area * random.uniform(1.1, 1.2))
        
        # Carpet area (typically 70-80% of total area)
        carpet_area = int(total_area * random.uniform(0.7, 0.8))
        
        # Built-up area (typically 80-90% of super area)
        buildup_area = int(super_area * random.uniform(0.8, 0.9))
        
        # Generate latitude and longitude within Delhi (6 decimal precision)
        latitude = round(random.uniform(*delhi_lat_range), 6)
        longitude = round(random.uniform(*delhi_long_range), 6)
        
        # Locality
        locality = random.choice(delhi_localities)
        
        # Age of property (digits 0-10 only)
        age = str(random.randint(0, 10))
        
        # Property description with coordinates
        desc = random.choice(descriptions)
        prop_desc = f"{desc} | {'UNDER CONSTRUCTION' if int(age) == 0 else 'READY TO MOVE'}"
        full_desc = f"{bhk} BHK {prop_desc}"
        
        # Floor information - only number, no Y or N
        total_floors = random.randint(1, 30)
        floor = random.randint(0, total_floors)
        
        # Transaction type - 1 or empty
        transact_type = "1" if random.random() > 0.5 else ""
        
        # Preference - s, r, or p only
        preference = random.choice(['s', 'r', 'p'])
        
        # Location format as specified
        location_dict = {
            'CITY': str(random.randint(1, 50)),
            'CITY_NAME': 'Delhi South',  # Use district
            'LOCALITY_ID': str(random.randint(1000, 9999)),
            'LOCALITY_NAME': locality,
            'ADDRESS': locality
        }
        
        # Features selection from the provided format - with random chance of N instead
        if random.random() < 0.1:  # 10% chance of using "N"
            features_str = "N"
        else:
            features_selected = random.choice(feature_patterns)
            if isinstance(features_selected, list):
                features_str = ",".join(map(str, features_selected))
            else:
                features_str = str(features_selected)
        
        row = {
            'PROP_ID': prop_id,
            'PREFERENCE': preference,
            'DESCRIPTION': desc,
            'PROPERTY_TYPE': random.choice(property_types),
            'CITY': 'Delhi',  # Use district for city
            'TRANSACT_TYPE': transact_type,
            'OWNTYPE': bhk,
            'BEDROOM_NUM': bedrooms,
            'PRICE_PER_UNIT_AREA': price,
            'FURNISH': random.choice([0, 1]),
            'FACING': random.choice([0, 1]),
            'AGE': age,
            'TOTAL_FLOOR': str(total_floors),  # Only number, no Y or N
            'FEATURES': features_str,
            'PROP_NAME': random.choice([
                # Luxury Developers
                'DLF', 'Godrej Properties', 'Prestige Group', 'Sobha Limited', 
                'Lodha Group', 'Oberoi Realty', 'Shapoorji Pallonji',
                # Delhi NCR Prominent Builders
                'Unitech', 'Ansal API', 'BPTP', 'Emaar India', 'Supertech',
                'ATS Infrastructure', 'Gaurs Group', 'Eldeco', 'Mahagun',
                'Ajnara India', 'Amrapali Group', 'Jaypee Greens', 'Parsvnath',
                # Mid-Segment Developers
                'Raheja Developers', 'Mahindra Lifespaces', 'Tata Housing',
                'Godrej Homes', 'Birla Estates', 'L&T Realty', 'Brigade Group',
                # Regional Builders
                'Sikka Group', 'Logix Group', 'Ace Group', 'Nirala Estate',
                'Prateek Group', 'Stellar Group', 'Saya Homes', 'Migsun Group',
                'CHD Developers', 'Spaze Towers', 'M3M India', 'SS Group',
                # Affordable Housing
                'Ashiana Housing', 'Puri Construction', 'Purvanchal Projects',
                'Cosmos Group', 'Today Homes', 'AVJ Heights', 'RPS Group'
            ]),
            'PRICE_SQFT': random.randint(3000, 12000),
            'MAP_DETAILS': f"{{'LATITUDE': '{latitude}', 'LONGITUDE': '{longitude}'}}",
            'AMENITIES': f"{random.randint(500, 5000)} sq.ft. | LATITUDE : '{latitude}' | {random.randint(1, 5)} BHK Flat | {'UNDER CONSTRUCTION' if int(age) == 0 else 'READY TO MOVE'}",
            'AREA': f'{total_area} sq.ft.',
            'PRICE': price_str,  # Use formatted price with L or Cr
            'PROP_HEADING': full_desc,
            'SECONDARY_TAGS': np.nan,
            'TOTAL_LANDMARK_COUNT': random.randint(5, 50),
            'FORMATTED_LANDMARK_DETAILS': f"[['category', 'MetroStation', '{random.choice(delhi_localities)}', {str(location_dict)}]",
            'SOCIETY_NAME': random.choice([
                # South Delhi
                'DLF Phase 1', 'DLF Phase 2', 'DLF Phase 3', 'DLF Phase 4', 'DLF Phase 5',
                'Greater Kailash I', 'Greater Kailash II', 'Saket Metro Society', 'Vasant Kunj Enclave',
                'Hauz Khas Enclave', 'Green Park Extension', 'Safdarjung Enclave', 'Panchsheel Enclave',
                # West Delhi
                'Dwarka Sector 3', 'Dwarka Sector 6', 'Dwarka Sector 10', 'Janakpuri Block C',
                'Rajouri Garden Complex', 'Paschim Vihar Block A', 'Vikaspuri Society',
                # North Delhi
                'Rohini Sector 7', 'Rohini Sector 13', 'Rohini Sector 24', 'Pitampura Block JJ',
                'Model Town Phase 1', 'Shalimar Bagh Block A', 'Ashok Vihar Phase 2',
                # East Delhi
                'Mayur Vihar Phase 1', 'Mayur Vihar Phase 2', 'Preet Vihar Block D',
                'Vasundhara Enclave', 'IP Extension Society', 'Patparganj Apartments',
                # Noida
                'Sector 62 Noida', 'Sector 18 Noida', 'Sector 50 Noida', 'Sector 137 Noida',
                'Gaur City', 'Supertech Capetown', 'ATS Village', 'Mahagun Moderne',
                # Gurgaon
                'DLF Cyber City', 'Golf Course Road', 'Sushant Lok Phase 1', 'South City 1',
                'Nirvana Country', 'Palm Drive', 'Palam Vihar', 'Sector 56 Gurgaon',
                # Premium Societies
                'Anand Niketan', 'Gulmohar Park', 'Jor Bagh', 'Sundar Nagar', 'Friends Colony West'
            ]),
            'BUILDING_NAME': random.choice(['Tower A', 'Tower B', 'Block C', 'Residency', 'Apartments']),
            'location': random.randint(1, 10),
            'BALCONY_NUM': random.randint(0, 3),
            'FLOOR_NUM': floor,
            'CARPET_SQFT': carpet_area if random.random() > 0.3 else np.nan,
            'SUPERBUILTUP_SQFT': super_area if random.random() > 0.2 else np.nan,
            'BUILTUP_SQFT': buildup_area if random.random() > 0.3 else np.nan,
            'SUPER_AREA': super_area if random.random() > 0.2 else np.nan,
            'SUPERAREA_UNIT': 'sq.ft.' if random.random() > 0.2 else np.nan,  # Use sq.ft.
            'SUPER_SQFT': super_area if random.random() > 0.2 else np.nan
        }
        
        data.append(row)
    
    return pd.DataFrame(data)


def append_to_kolkata_csv(num_rows):
    """
    Generate Delhi data and append to Kolkata CSV
    """
    # File path
    file_path = r"ML_Operations\kolkata.csv"
    
    try:
        # Read existing Kolkata data
        print("Reading existing Kolkata data...")
        df_kolkata = pd.read_csv(file_path)
        print(f"Existing data shape: {df_kolkata.shape}")
        
        # Generate Delhi data
        print(f"\nGenerating {num_rows} rows of Delhi data...")
        df_delhi = generate_delhi_data(num_rows)
        print(f"Delhi data generated: {df_delhi.shape}")
        
        # Align columns - ensure Delhi data has same columns as Kolkata
        # Fill missing columns with NaN
        for col in df_kolkata.columns:
            if col not in df_delhi.columns:
                df_delhi[col] = np.nan
        
        # Reorder Delhi columns to match Kolkata
        df_delhi = df_delhi[df_kolkata.columns]
        
        # Append Delhi data to Kolkata data
        df_combined = pd.concat([df_kolkata, df_delhi], ignore_index=True)
        
        # Save back to CSV
        print(f"\nSaving combined data to {file_path}...")
        df_combined.to_csv(file_path, index=False)
        
        print(f"\n✓ Success! Combined data shape: {df_combined.shape}")
        print(f"✓ Added {num_rows} Delhi properties to the dataset")
        print(f"✓ Total properties now: {len(df_combined)}")
        
        # Show sample of Delhi data
        print("\nSample of generated Delhi data:")
        print(df_delhi[['PROP_ID', 'CITY', 'OWNTYPE', 'PRICE', 'TOTAL_FLOOR', 'AGE', 'FEATURES']].head())
        
    except FileNotFoundError:
        print(f"Error: File not found at {file_path}")
        print("Please check the file path and try again.")
    except Exception as e:
        print(f"Error occurred: {str(e)}")


if __name__ == "__main__":
    # Get number of rows from user
    num_rows = int(input("Enter the number of Delhi property rows to generate: "))
    
    if num_rows <= 0:
        print("Please enter a positive number of rows.")
    else:
        append_to_kolkata_csv(num_rows)