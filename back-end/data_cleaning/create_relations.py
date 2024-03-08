import sys
sys.path.insert(0, '../')
sys.path.insert(0, '../supabase_func')
import supabase_func
import geopy.distance


def county_to_county():
    '''
    connects each county to its nearest neighboring county
    '''
    counties = supabase_func.get_all_counties()

    DIST_INDEX = 1
    MAX_PER_COUNTY = 1

    for county in counties:
        closest_counties = []

        if county["related_models"]["counties"]:
            continue

        for other in counties:
            if county["id"] == other["id"]: continue
        
            cord1 = (county["lat"], county["long"])
            cord2 = (other["lat"], other["long"])
            distance = geopy.distance.geodesic(cord1, cord2).miles

            if len(closest_counties) < MAX_PER_COUNTY:
                # start by populating this county's 5 closes neighbors with the first 5 other counties we see
                closest_counties.append((other["id"], distance, other["name"]))
                closest_counties.sort(key=lambda x: x[DIST_INDEX])
                continue

            if distance < closest_counties[-1][DIST_INDEX]:
                closest_counties[-1] = (other["id"], distance, other["name"])
                closest_counties.sort(key=lambda x: x[DIST_INDEX])
                
        # now, we must update the closest counties for the current iteration of the outer for-loop
        county["related_models"]["counties"] = [county_id for county_id, _, _ in closest_counties]
        supabase_func.update_county(county)


def event_to_event():
    '''
    connect each event to its closest neighboring event
    '''
    events = supabase_func.get_all_events()

    for event in events:
        min_event = -1
        min_distance = sys.maxsize

        for other in events:
            if event["id"] == other["id"]: continue

            cord1 = (event["lat"], event["long"])
            cord2 = (other["lat"], other["long"])
            distance = geopy.distance.geodesic(cord1, cord2).miles

            if distance < min_distance:
                min_distance = distance
                min_event = other["id"]
        
        event["related_models"]["events"] = [min_event]
        supabase_func.update_event(event)


def shelter_to_shelter():
    '''
    connect each shelter to its closest neighboring shelter
    '''
    shelters = supabase_func.get_all_shelters()

    for shelter in shelters:
        min_shelter = -1
        min_distance = sys.maxsize

        for other in shelters:
            if shelter["id"] == other["id"]: continue

            cord1 = (shelter["lat"], shelter["long"])
            cord2 = (other["lat"], other["long"])
            distance = geopy.distance.geodesic(cord1, cord2).miles

            if distance < min_distance:
                min_distance = distance
                min_shelter = other["id"]

        shelter["related_models"]["shelters"] = [min_shelter]
        supabase_func.update_shelter(shelter)


def shelter_to_county():
    '''
    connect shelters to their respective counties; connect counties will all of shelters located within them
    '''
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
            if county["id"] == min_county and shelter["id"] not in county["related_models"]["shelters"]:
                county["related_models"]["shelters"].append(shelter["id"])

    sorted_counties = sorted(counties, key=lambda x: len(x["related_models"]["shelters"]), reverse=True)
    for county in sorted_counties:
        # print(county["name"][:-7], len(county["related_models"]["shelters"]))
        supabase_func.update_county(county)


def event_to_county():
    '''
    connect event its county; connect up to 10 events happening within each county
    '''
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


def shelter_to_event():
    '''
    connect shelter to closest event(s); connect event to closest shelter
    '''
    shelters = supabase_func.get_all_shelters()
    events = supabase_func.get_all_events()
    
    # point each event to the closest shelter
    for event in events:
        min_shelter = -1
        min_distance = sys.maxsize

        for shelter in shelters:
            cord1 = (event["lat"], event["long"])
            cord2 = (shelter["lat"], shelter["long"])
            distance = geopy.distance.geodesic(cord1, cord2).miles

            if distance < min_distance:
                min_distance = distance
                min_shelter = shelter["id"]

        event["related_models"]["shelters"] = [min_shelter]
        supabase_func.update_event(event)

    # point each shelter to the closest event
    for shelter in shelters:
        min_event = -1
        min_distance = sys.maxsize

        for event in events:
            cord1 = (shelter["lat"], shelter["long"])
            cord2 = (event["lat"], event["long"])
            distance = geopy.distance.geodesic(cord1, cord2).miles

            if distance < min_distance:
                min_distance = distance
                min_event = event["id"]
        
        if len(shelter["related_models"]["events"]) == 0:
            # only include this event if this shelter currently has no event to point to
            shelter["related_models"]["events"] = [min_event]
            supabase_func.update_shelter(shelter)


def county_to_nearest_shelter_and_event():
    '''
    connects each county to the closest shelter and event
    '''
    counties = supabase_func.get_all_counties()
    shelters = supabase_func.get_all_shelters()
    events = supabase_func.get_all_events()

    for county in counties:

        if county["related_models"]["nearest_event"] and county["related_models"]["nearest_shelter"]:
            continue

        '''point each county to its nearest shelter'''
        min_shelter = -1
        min_distance = sys.maxsize

        for shelter in shelters:
            cord1 = (county["lat"], county["long"])
            cord2 = (shelter["lat"], shelter["long"])
            distance = geopy.distance.geodesic(cord1, cord2).miles

            if distance < min_distance:
                min_distance = distance
                min_shelter = shelter["id"]

        # after inner for-loop finishes, update min_shelter found
        county["related_models"]["nearest_shelter"] = [min_shelter]

        '''point each county to its nearest event'''
        min_event = -1
        min_distance = sys.maxsize

        for event in events:
            cord1 = (county["lat"], county["long"])
            cord2 = (event["lat"], event["long"])
            distance = geopy.distance.geodesic(cord1, cord2).miles

            if distance < min_distance:
                min_distance = distance
                min_event = event["id"]

        # after inner for-loop finishes, update min_event found
        county["related_models"]["nearest_event"] = [min_event]

        # reflect update in supabase
        supabase_func.update_county(county)


if __name__ == "__main__":
    pass
