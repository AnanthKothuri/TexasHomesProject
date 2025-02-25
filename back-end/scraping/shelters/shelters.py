import os
import re
import sys
import json
import requests
sys.path.insert(0, '../../')
sys.path.insert(0, '../../supabase_func')
import supabase_func as supa
from city_data import texas_cities, filenames

BASE_URL = "https://homeless-shelter.p.rapidapi.com/state-city"

# deprecated (used up 20/20 credit already for the month)
HEADERS = {
    "X-RapidAPI-Key": "bc198f9912msh7835012b5accb1ap1e59c9jsne8edd991dd48",
    "X-RapidAPI-Host": "homeless-shelter.p.rapidapi.com"
}

def scrape_shelters_via_api():
    for city, filename in zip(texas_cities, filenames):
        if not os.path.exists(filename):
            # only make API call if we haven't already made one prior
            querystring = {
                "state": "TX",
                "city": city
            }
            res = requests.get(BASE_URL, headers=HEADERS, params=querystring)
            data = { city : res.json() }
            with open(filename, 'w') as f:
                json.dump(data, f, indent=2)


def clean_city_data():
    '''
    Cleans data received from our API calls.
    '''
    for city, filename in zip(texas_cities, filenames):
        assert os.path.exists(filename)

        with open(filename, 'r') as f:
            data = json.load(f)
        
        for shelter in data[city]:
            shelter['zip_code'] = int(shelter['zip_code'])
            if 'location' in shelter:
                # only execute code if we haven't already updated these values before
                latitude, longitude = extract_coordinates(shelter.pop('location'))
                shelter['lat'] = latitude
                shelter['long'] = longitude
            shelter['phone_number'] = normalize_contact_number(shelter['phone_number'])
            shelter['fax_number'] = normalize_contact_number(shelter['fax_number'])

        # write the updated data back to the file
        with open(filename, 'w') as f:
            json.dump(data, f, indent=2)


def extract_coordinates(location):
    '''
    Extracts latitude and longitude float values from string
    '''
    lat_str, long_str = location.split(',')
    lat = float(lat_str)
    long = float(long_str)
    return lat, long


def normalize_contact_number(n):
    '''
    Normalizes phone/fax numbers into the form: (###) ###-####
    '''
    pattern = r'(\d{3})[-.\s]?(\d{3})[-.\s]?(\d{4})|\((\d{3})\)\s*(\d{3})[-.\s]?(\d{4})'    
    return re.sub(pattern, r'(\1\4) \2\5-\3\6', n)


def find_null_keys():
    '''
    Based on our current city shelter data (json files from prior API calls), 
    check which keys map to null values. Useful for defining default types for
    Supabase database. Helper function which will not be run by default.
    '''
    result = set()
    for filename in filenames:
        assert os.path.exists(filename)
        with open(filename, 'r') as f:
            data = json.load(f)
        for _, shelters in data.items():
            for shelter in shelters:
                for key, value in shelter.items():
                    if value in [None, "", 0, []]:
                        result.add(key)
    print("Null keys:", result)


def aggregate_shelters_into_single_file():
    '''
    Aggregate all json files in `cities` directory into a single json file
    '''
    current_dir = os.path.dirname(os.path.abspath(__file__))
    directory = os.path.join(current_dir, 'cities')
    all_shelters = []
    shelter_id = 0
    for filename in os.listdir(directory):
        if filename.endswith('.json'):
            with open(os.path.join(directory, filename), 'r') as f:
                city_data = json.load(f)
                city_name = list(city_data.keys())[0]
                shelters_in_city = city_data[city_name]
                for shelter in shelters_in_city:
                    # include unique id for each shelter
                    shelter['id'] = shelter_id
                    shelter['related_models'] = {}
                    all_shelters.append(shelter)
                    shelter_id += 1
    aggregated_data = { 'shelters': all_shelters }
    # write the aggregated data back to the file
    with open('shelters.json', 'w') as f:
        json.dump(aggregated_data, f, indent=2)


def add_shelters_to_supabase():
    '''
    Adds contents of 'shelters.json' to Supabase db
    '''
    with open('shelters.json', "r") as file:
        data = json.load(file)['shelters']
        for shelter in data:
            supa.insert_shelter(shelter)


if __name__ == "__main__":
    # scrape_shelters_via_api()
    # clean_city_data()
    # aggregate_shelters_into_single_file()
    add_shelters_to_supabase()
