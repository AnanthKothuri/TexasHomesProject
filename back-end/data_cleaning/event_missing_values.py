import sys
sys.path.insert(0, '../')
sys.path.insert(0, '../supabase_func')
import supabase_func
from scraping import image_search
from scraping import youtube_api


def print_missing_values(events):
    missing_vals = [0] * 15
    for event in events:
        if event["title"] == "": missing_vals[0] += 1
        if event["organization"] == "": missing_vals[1] += 1
        if event["description"] == "": missing_vals[2] += 1
        if event["image_url"] == "": missing_vals[3] += 1
        if event["video_url"] == "": missing_vals[4] += 1
        if event["date_posted"] == "": missing_vals[5] += 1
        if event["time"] == "": missing_vals[6] += 1
        if event["cause_areas"] == []: missing_vals[7] += 1
        if event["address"] == "": missing_vals[8] += 1
        if event["lat"] == 0: missing_vals[9] += 1
        if event["long"] == 0: missing_vals[10] += 1
        if event["skills"] == []: missing_vals[11] += 1
        if event["requirements"] == []: missing_vals[12] += 1
        if event["good_for"] == []: missing_vals[13] += 1
        if event["map_url"] == "": missing_vals[14] += 1

    print(f"Total number of events: {len(events)}")
    print(f"Missing title: {missing_vals[0]}")
    print(f"Missing organization: {missing_vals[1]}")
    print(f"Missing description: {missing_vals[2]}")
    print(f"Missing image_url: {missing_vals[3]}")
    print(f"Missing video_url: {missing_vals[4]}")
    print(f"Missing date_posted: {missing_vals[5]}")
    print(f"Missing time: {missing_vals[6]}")
    print(f"Missing cause_areas: {missing_vals[7]}")
    print(f"Missing address: {missing_vals[8]}")
    print(f"Missing lat: {missing_vals[9]}")
    print(f"Missing long: {missing_vals[10]}")
    print(f"Missing skills: {missing_vals[11]}")
    print(f"Missing requirements: {missing_vals[12]}")
    print(f"Missing good_for: {missing_vals[13]}")
    print(f"Missing map_url: {missing_vals[14]}")

if __name__ == "__main__":
    events = supabase_func.get_all_events()
    print_missing_values(events)

    for event in events:
        # missing an image
        changed = False
        if event["image_url"] == "":
            event["image_url"] = image_search.get_image_for_query(f"{event['title']}, homeless volunteering")
            changed = True

        # missing a video
        if event["video_url"] == "":
            try:
                video = youtube_api.search_video(f"{event['organization']}, homelessness, volunteering, texas")
                event["video_url"] = video if video != None else ""
                changed = True
            except:
                event["video_url"] = ""

        if changed:
            supabase_func.update_event(event)

    print_missing_values(events)

