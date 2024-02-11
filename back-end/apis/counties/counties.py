"""
https://www.thn.org/thdsn/data/ - data with homelessness by zipcode location in Texas
https://api-ninjas.com/api/zipcode  - zipcode to county API
https://rapidapi.com/topapis/api/homeless-shelter   - get homeless shelter data per zipcode
https://www.texas-demographics.com/counties_by_population   - population per county

Youtube API
GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=Promise%20House%20homeless%20shelter&key=[YOUR_API_KEY] HTTP/1.1

Authorization: Bearer [YOUR_ACCESS_TOKEN]
Accept: application/json

"""
import os
import sys
import json
sys.path.insert(0, '../')
import wikipedia

def parse_housing_data_line(line):
    first_dot = line.index(".")
    last_dot = line.rfind(".")
    name = line[: first_dot - 1]
    line = line[last_dot + 2:]
    data = line.split(" ")
    population = data[0]
    housing = data[5]

    return {
        'name': name,
        'population': population,
        'housing': housing
    }

def parse_housing_data(filename):
    assert filename != ""
    assert os.path.exists(filename)

    results = []
    with open(filename) as file:
        lines = file.readlines()

        for line in lines:
           results.append(parse_housing_data_line(line))

    return results

def get_county_wikipedia_data(counties):
    assert counties != None
    num_with_images = 0

    for county in counties:
        results = wikipedia.search_page(county['name'])
        # print('got results')

        # print(results)
        county['website_url'] = results['content_urls']['desktop']['page']
        county['short_description'] = results['description']
        county['long_description'] = results['extract']

        if 'originalimage' in results:
            county['image_url'] = results['originalimage']['source']
            num_with_images += 1
        else:
            county['image_url'] = ""

    print("number of counties with images: ", num_with_images)

def get_county_wikipedia_media(counties):
    assert counties != None
    num_with_map = 0

    for county in counties:
        results = wikipedia.get_media_for_page(county['name'])

        images = []
        county['map'] = ""
        for item in results['items']:
            # print(item)
            if 'srcset' in item and len(item['srcset']) != 0:
                if 'map' in item['title'].lower():
                    county['map'] = item['srcset'][-1]['src'][2:]
                    num_with_map += 1

                else:
                    images.append(item['srcset'][-1]['src'][2:])

        county['images'] = images
        # print(images)

    print("number of counties with map: ", num_with_map)
    

counties = parse_housing_data('county_populations_and_housing.txt')
get_county_wikipedia_data(counties)
    
# counties = {}
# with open('county_data.json', 'r') as file:
#     counties = json.load(file)['counties']

get_county_wikipedia_media(counties)

print(len(counties))
final_counties = {
    "counties": counties
}
with open("county_data.json", 'w') as file:
    json.dump(final_counties, file)
