import sys
sys.path.insert(0, '../')
sys.path.insert(0, '../../')
sys.path.insert(0, '../../supabase_func')
import supabase_func
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from time import sleep
from bs4 import BeautifulSoup
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from youtube_api import search_video
from geocoding import get_coordinates
import json

base_url = 'https://www.volunteermatch.org'
options = Options()
options.add_argument('--headless')
options.add_argument('--disable-gpu')
driver = webdriver.Chrome(options=options)

def print_missing_values(events):
    missing_vals = [0] * 14
    for event in events:
        print(event)
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

def click_read_more():
    try:
        read_more_element = WebDriverWait(driver, 4).until(
            EC.element_to_be_clickable((By.CLASS_NAME, 'ddd-toggle'))
        )
        driver.execute_script("arguments[0].scrollIntoView();", read_more_element)
        driver.execute_script("arguments[0].click();", read_more_element)

    except Exception as error:
        print(f"Error clicking read more, or there is no read more button")


def get_event_details(id, url):
    assert url != ""
    assert base_url in url

    try:
        driver.get(url)
    except Exception as error: 
        raise ValueError(f"driver could not open url: {error}")

    try:
        click_read_more()
        soup = BeautifulSoup(driver.page_source, "lxml")

        event = {}
        event["id"] = id
        event["title"] = soup.find("h1", class_="opp-dtl__title opp-dtl__title--main text-lg-rwd gray-drk").contents[0].strip()
        event["organization"] = soup.find("a", class_="hvr-o caps").get_text(strip=True)

        # try getting full description, or truncated if it's not present
        description_box = soup.find("div", class_="opp-dtl__summary js-ddd-truncate")
        if not description_box:
            description_box = soup.find("div", class_="opp-dtl__summary js-ddd-truncate ddd-truncated")

        if description_box:
            description = ""
            for item in description_box:
                description += item.text.strip()
                description += "\n\n" if item.name == "p" else "\n"
            event["description"] = description
        else:
            event["description"] = ""

        img_box = description_box.find("img") if description_box else None
        event["image_url"] = img_box["src"] if img_box else ""
        # video = search_video(f"{event['organization']}, homelessness, volunteering, texas")
        # event["video_url"] = video if video != None else ""
        event["video_url"] = ""

        date_box = soup.find("section", class_="logistics__section logistics__section--date-posted").find("p")
        event["date_posted"] = date_box.text.strip() if date_box != None else "Unknown"

        time_box = soup.find("section", class_="logistics__section logistics__section--when").find("div")
        event["time"] = time_box.text.strip() if time_box != None else "Unknown"

        causes_box = soup.find("section", class_="logistics__section logistics__causes").find("div", class_="logistics__causes-list")
        cause_list = [x.strip().replace("\n", "") for x in causes_box.get_text(strip=True).split(",")] if causes_box != None else []
        # event["cause_areas"] = ", ".join(cause_list)
        event["cause_areas"] = cause_list

        try:
            address_box = soup.find("section", class_="grid grid-bleed justify-space-between logistics__section logistics__section--where")\
                .find("div", class_="col-7 address").find("address").find("p").find_all("span")
            if address_box:
                address_list = [x.text.replace(", ", "") for x in address_box]
                event["address"] = ", ".join(address_list)
            else:
                event["address"] = "Unknown"
        except: 
            event["address"] = "Unknown"

        result = get_coordinates(event["address"])
        if result != None:
            event["lat"] = result[0]
            event["long"] = result[1]
        else:
            event["lat"] = 0
            event["long"] = 0

        skills_box = soup.find("section", class_="col-7 logistics__section logistics__section--skills").find("ul")
        skills_list = [x.text.strip().replace("\n", "") for x in skills_box.find_all("li")] if skills_box != None else []
        # event["skills"] = ", ".join(skills_list)
        event["skills"] = skills_list

        req_box = soup.find("section", "logistics__section logistics__section--requirements").find("ul")
        req_list = [x.text.strip().replace("\n", "") for x in req_box.find_all("li")] if req_box != None else []
        # event["requirements"] = ", ".join(req_list)
        event["requirements"] = req_list

        good_box = soup.find("section", "col-sm-3 logistics__section logistics__section--friendlies").find("ul")
        good_list = [x.text.strip().replace("\n", "") for x in good_box.find_all("li")] if good_box != None else []
        # event["good_for"] = ", ".join(good_list)
        event["good_for"] = good_list
        event["map_url"] = ""

        # setting county as a related model
        event["related_models"] = {
            "counties": [],
            "events": [],
            "shelters": []
        }
        print(event)
        return event
    except Exception as error:
        raise KeyError(f"Could not get event details for url: {url}. Error: {error}")


def click_load_more():
    try:
        load_more_element = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, '/html/body/div[5]/div[2]/main/main/div[3]/div[1]/div[3]/div[1]/div'))
        )
        driver.execute_script("arguments[0].scrollIntoView();", load_more_element)
        # load_more_element.click()
        driver.execute_script("arguments[0].click();", load_more_element)
        try:
            WebDriverWait(driver, 10).until(EC.staleness_of(load_more_element))
            # or you can use other expected_conditions based on your scenario
        except Exception as e:
            print(e)

    except Exception as error:
        print(f"Error clicking load more, or there is no load more button")

def get_volunteermatch_events(base_event_id, save=False):
    search_url = "https://www.volunteermatch.org/search/index.jsp?v=false&s=&l=TX&r=region&specialGroupsData.groupSize=&na=&partner=&cats=7"

    try:
        driver.get(search_url)
    except:
        raise KeyError(f"No such events page for url")
    
    click_load_more()
    
    try:
        soup = BeautifulSoup(driver.page_source, "lxml")
        jobs = soup.find_all("a", class_="pub-srp-opps__title ga-track-to-opp-details")
        job_links = [base_url + x["href"] for x in jobs]
        print(len(job_links))
        events = []

        id = base_event_id
        for link in job_links:
            try:
                event = get_event_details(id, link)
                events.append(event)
                id += 1
                supabase_func.insert_event(event)

            except Exception as error:
                print(error)

        return events, id

    except Exception as e:
        print(e)


if __name__ == "__main__":
    base_id = 192
    events = get_volunteermatch_events(base_id, save=True)

