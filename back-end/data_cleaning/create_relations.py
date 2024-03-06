import sys
sys.path.insert(0, '../')
sys.path.insert(0, '../supabase_func')
import supabase_func
import geopy.distance

def shelter_to_county():
    shelters = supabase_func.get_all_shelters()
    counties = supabase_func.get_all_counties()

    # dict to map county id to county name (for debugging)
    m = {county["id"]: county["name"] for county in counties}

    for shelter in shelters:
        min_county = -1
        min_distance = sys.maxsize

        if not shelter["related_models"]:
            # don't override data if already exists
            shelter["related_models"] = {
                "counties": [],
                "events": [],
                "shelters": []
            }

        for county in counties:
            # find the county which has the shortest distance to the homeless shelter address
            cord1 = (shelter["lat"], shelter["long"])
            cord2 = (county["lat"], county["long"])
            distance = geopy.distance.geodesic(cord1, cord2).miles

            if distance < min_distance:
                min_distance = distance
                min_county = county["id"]

        old_val = shelter["related_models"]["counties"]
        shelter["related_models"]["counties"] = [min_county]
        if old_val != [min_county]:
            supabase_func.update_shelter(shelter)
            # print(shelter["zip_code"], m[min_county][:-7])

        for county in counties:
            if county["id"] == min_county:
                if shelter["id"] not in county["related_models"]["shelters"]:
                    county["related_models"]["shelters"].append(shelter["id"])

    sorted_counties = sorted(counties, key=lambda x: len(x["related_models"]["shelters"]), reverse=True)
    for county in sorted_counties:
        # print(county["name"][:-7], len(county["related_models"]["shelters"]))
        supabase_func.update_county(county)


def event_to_county():
    events = supabase_func.get_all_events()
    counties = supabase_func.get_all_counties()
    for county in counties:
        county["related_models"] = {
            "counties": [],
            "events": [],
            "shelters": []
        }

    MAX_PER_COUNTY = 10
    for event in events:
        min_county = -1
        min_distance = sys.maxsize

        for county in counties:
            if len(county["related_models"]["events"]) >= MAX_PER_COUNTY: continue

            cord1 = (event["lat"], event["long"])
            cord2 = (county["lat"], county["long"])
            distance = geopy.distance.geodesic(cord1, cord2).miles

            if distance < min_distance:
                min_distance = distance
                min_county = county["id"]

        event["related_models"]["counties"] = [min_county]
        supabase_func.update_event(event)
        for county in counties:
            if county["id"] == min_county:
                county["related_models"]["events"].append(event["id"])

        # print(event["related_models"])
                
    for county in counties:
        supabase_func.update_county(county)

    
    # printing stats
    missing_events = 0
    for county in counties:
        if county["related_models"]["events"] == []: missing_events += 1
    print(f"Counties missing events: {missing_events}")


if __name__ == "__main__":
    shelter_to_county()
