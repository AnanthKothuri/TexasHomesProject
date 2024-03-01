import os
import sys
import json
import requests

BASE_URL = "https://homeless-shelter.p.rapidapi.com/state-city"

# deprecated (used up 20/20 credit already for the month)
HEADERS = {
    "X-RapidAPI-Key": "bc198f9912msh7835012b5accb1ap1e59c9jsne8edd991dd48",
    "X-RapidAPI-Host": "homeless-shelter.p.rapidapi.com"
}

# Top-20 cities based on population (https://www.texas-demographics.com/cities_by_population)
texas_cities = [
    'Houston',
    'San Antonio',
    'Dallas',
    'Austin',
    'Fort Worth',
    'El Paso',
    'Arlington',
    'Corpus Christi',
    'Plano',
    'Lubbock',
    'Laredo',
    'Irving',
    'Garland',
    'Frisco',
    'Amarillo',
    'Grand Prairie',
    'McKinney',
    'Brownsville',
    'Killeen',
    'Pasadena'
]

# main method
if __name__ == "__main__":
    for city in texas_cities:
        json_path = f'cities/{city.lower().replace(" ", "-")}.json'
        if not os.path.exists(json_path):
            # only make API if we don't have city info yet
            querystring = {
                "state": "TX",
                "city": city
            }
            res = requests.get(BASE_URL, headers=HEADERS, params=querystring)
            data = { city : res.json() }
            with open(json_path, 'w') as f:
                json.dump(data, f)
