import sys
sys.path.insert(0, '../')
sys.path.insert(0, '../supabase_func')
import supabase_func
import geopy.distance

MAX_PER_COUNTY = 10

def event_to_county():
    events = supabase_func.get_all_events()
    counties = supabase_func.get_all_counties()
    for county in counties:
        county["related_models"] = {
            "counties": [],
            "events": [],
            "shelters": []
        }

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
    event_to_county()