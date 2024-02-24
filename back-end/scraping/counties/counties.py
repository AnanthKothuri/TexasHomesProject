"""
https://www.texas-demographics.com/counties_by_population   - population per county

Youtube API
GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=Promise%20House%20homeless%20shelter&key=[YOUR_API_KEY] HTTP/1.1

Authorization: Bearer [YOUR_ACCESS_TOKEN]
Accept: application/json

"""
import os
import sys
import json
import csv
sys.path.insert(0, '../../')
sys.path.insert(0, '../../supabase_func')
import scraping.wikipedia as wikipedia
import supabase_func as supa

def parse_housing_data_line(line):
    first_dot = line.index(".")
    last_dot = line.rfind(".")
    name = line[: first_dot - 1]
    line = line[last_dot + 2:]
    data = line.split(" ")
    population = int(data[0].replace(",", ""))
    housing = int(data[5].replace(",", ""))

    return {
        'name': name,
        'population': population,
        'housing_units': housing
    }

def parse_housing_data(counties, filename):
    assert filename != ""
    assert os.path.exists(filename)

    with open(filename) as file:
        lines = file.readlines()
        id = 0
        for line in lines:
           result = parse_housing_data_line(line)
           result["id"] = id
           result["related_models"] = {}
           id += 1
           counties.append(result)


def parse_housing_locations(counties, filename):
    assert filename != ""
    assert os.path.exists(filename)

    with open(filename, "r") as file:
        reader = csv.reader(file)
        for i, line in enumerate(reader):
            if i == 0: continue
            lat = float(line[0])
            long = float(line[1])
            name = line[2].strip()

            for county in counties:
                county_name = county["name"][:county["name"].index("County") - 1]
                if name.lower() == county_name.lower():
                    county["lat"] = lat
                    county["long"] = long
                    break

def get_county_wikipedia_data(counties):
    assert counties != None

    for county in counties:
        results = wikipedia.search_page(f"{county['name']}, Texas", "Demographics")

        county['website_url'] = results["website_url"]
        county['description'] = results['summary']
        county['text'] = results["first_section"]


def get_county_wikipedia_media(counties):
    assert counties != None
    num_with_map = 0

    for county in counties:
        county['map'] = ""
        county["image_url"] = ""
        results = wikipedia.get_media_for_page(f"{county['name']}, Texas")

        images = []
        if "items" not in results: continue
        for item in results['items']:
            if 'srcset' in item and len(item['srcset']) != 0:
                if 'map' in item['title'].lower():
                    county['map'] = item['srcset'][-1]['src'][2:]
                    num_with_map += 1

                else:
                    images.append(item['srcset'][-1]['src'][2:])

        # adding image if it's not there already
        if len(images) > 0:
            county['image_url'] = images[0]

    print("number of counties with map: ", num_with_map)


def print_missing_values(counties):
    missing_vals = [0] * 11
    for county in counties:
        if county["name"] == "": missing_vals[0] += 1
        if county["population"] == 0: missing_vals[1] += 1
        if county["housing_units"] == 0: missing_vals[2] += 1
        if county["website_url"] == "": missing_vals[3] += 1
        if county["description"] == "": missing_vals[4] += 1
        if county["image_url"] == "": missing_vals[5] += 1
        if county["map"] == "": missing_vals[6] += 1
        if county["lat"] == 0: missing_vals[7] += 1
        if county["long"] == 0: missing_vals[8] += 1
        if county["related_models"] == {}: missing_vals[9] += 1
        if county["text"] == "": missing_vals[10] += 1
    
    print(f"Missing name: {missing_vals[0]}")
    print(f"Missing population: {missing_vals[1]}")
    print(f"Missing housing_units: {missing_vals[2]}")
    print(f"Missing website_url: {missing_vals[3]}")
    print(f"Missing description: {missing_vals[4]}")
    print(f"Missing image_url: {missing_vals[5]}")
    print(f"Missing map: {missing_vals[6]}")
    print(f"Missing lat: {missing_vals[7]}")
    print(f"Missing long: {missing_vals[8]}")
    # print(f"Missing related_models: {missing_vals[9]}")
    print(f"Missing text: {missing_vals[10]}")

# main method
if __name__ == "__main__":
    json_path = "county_data.json"
    
    if not os.path.exists(json_path):
        counties = []
        parse_housing_data(counties, 'county_populations_and_housing.txt')
        parse_housing_locations(counties, 'Texas_Counties_Centroid_Map.csv')
        get_county_wikipedia_data(counties)
        get_county_wikipedia_media(counties)

        print_missing_values(counties)

        data = {
            "counties" : counties
        }
        with open('county_data.json', 'w') as f:
            json.dump(data, f)

    with open(json_path, "r") as file:
        data = json.load(file)["counties"]
        for county in data:
            supa.insert_county(county)
