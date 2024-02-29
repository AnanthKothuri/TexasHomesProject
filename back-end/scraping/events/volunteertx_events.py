import sys
sys.path.insert(0, '../')
sys.path.insert(0, '../../')
sys.path.insert(0, '../../supabase_func')
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from time import sleep
from bs4 import BeautifulSoup
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from youtube_api import search_video
from geocoding import get_coordinates
import json
import time
import supabase_func

base_url = 'https://www.volunteermatch.org'
options = Options()
# options.add_argument('--headless')
options.add_argument('--disable-gpu')
driver = webdriver.Chrome(options=options)


def scroll_to_bottom():
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

def click_all_filters():
    filters = ["hunger", "poverty", "disaster response & recovery"]
    try:
        container = driver.find_element(By.XPATH, "/html/body/div[1]/main/main/div[2]/div[2]/div[1]/div/div[6]/fieldset/div[2]/div")
        items = container.find_elements(By.CLASS_NAME, "py-1")

        for item in items:
            name = item.text[:-3].strip().lower()
            checkbox = item.find_element(By.TAG_NAME, "input")
            if name in filters:
                checkbox.click()


    except Exception as error:
        print(f"Could not click all filters")


def get_volunteer_link(index):
    search_url = "https://www.volunteertx.org/search/i/Ongoing+Volunteer+Opportunities"

    try:
        driver.get(search_url)
    except:
        raise KeyError(f"No such events page for url")
    
    try:
        time.sleep(1)
        click_all_filters()
        time.sleep(2)

        buttons = driver.find_elements(By.CLASS_NAME, "inline-flex")
        buttons = [b for b in buttons if "View opportunity" in b.text]

        old_len = len(buttons)
        while index >= len(buttons):
            scroll_to_bottom()
            time.sleep(1)

            buttons = driver.find_elements(By.CLASS_NAME, "inline-flex")
            buttons = [b for b in buttons if "View opportunity" in b.text]

            if old_len == len(buttons):
                print("reached end of list")
                return ""
            
            old_len = len(buttons)

        button = buttons[index]
        print(index, len(buttons))
        driver.execute_script("arguments[0].scrollTop = arguments[0].scrollHeight;", button)
        button.click()
        return driver.current_url
    except:
        print("An error occurred, probably stale element error")
        return ""
    

def get_event_details(index):
    event = {}
    event["id"] = index
    soup = BeautifulSoup(driver.page_source, "lxml")

    title_box = soup.find("h1", class_="text-2xl font-extrabold tracking-tight text-center text-gray-900 sm:text-4xl md:text-5xl md:leading-12")
    event["title"] = title_box.text.strip() if title_box else ""

    org_box = soup.find("dd", class_="block text-sm font-medium leading-6 text-center text-gray-500 uppercase sm:text-base")
    event["organization"] = org_box.text.strip() if org_box else ""

    desc_box = soup.find("div", class_="prose prose-sm max-w-none sm:prose")
    try:
        description = ""
        items = desc_box.find("div")
        for item in items:
            description += item.text.strip()
            description += "\n\n" if item.name == "p" else "\n"
        event["description"] = description
    except:
        event["description"] = ""

    event["image_url"] = ""  # add this later
    event["video_url"] = ""
    # video = search_video(f"{event['organization']}, homelessness, volunteering, texas")
    # event["video_url"] = video if video != None else ""

    date_box = soup.find("p", class_="text-sm leading-4 text-gray-400")
    if not date_box: 
        event["date_posted"] = ""
    else:
        time_box = date_box.find("time")
        event["date_posted"] = time_box["datetime"] if time_box else ""
        event["time"] = ""      # split returned datetime into separate date and time
    
    
    list_box = soup.find("div", class_="space-y-6 xl:col-start-1 xl:row-start-2 xl:pt-6")
    event["cause_areas"] = []
    event["skills"] = []
    event["requirements"] = []
    event["good_for"] = []
    try:
        lists = list_box.find_all("div")
        var = ""
        for item in lists:
            if "features" in item.text.strip().lower(): var = "good_for"
            elif "skills/interests" in item.text.strip().lower(): var = "skills"
            elif "issue area" in item.text.strip().lower(): var = "cause_areas"
            else: continue

            labels = item.find("ul").find_all("li")
            event[var] = [x.text.strip().lower() for x in labels] if labels else []
    except:
        pass

    address_box = soup.find("div", class_="xl:pt-2 space-y-4")
    if not address_box: event["address"] = ""
    try:
        boxes = address_box.find("div").find_all("div", class_="flex items-start")
        address = boxes[-1].find("div", class_="ml-3 w-0 flex-1 pt-0.5").find("p").text.strip()
        event["address"] = address
    except:
        event["address"] = ""

    if not address_box: event["map_url"] = ""
    try:
        map_box = address_box.find("div").find("div", class_="hidden xl:block")
        event["map_url"] = map_box.find("img")['src'] if map_box else ""
    except:
        event["map_url"] = ""

    result = get_coordinates(event["address"])
    if result != None:
        event["lat"] = result[0]
        event["long"] = result[1]
    else:
        event["lat"] = 0
        event["long"] = 0

    event["related_models"] = {
        "counties": [],
        "events": [],
        "shelters": []
    }

    return event


def get_events(end, start=0, save=False):
    events = []
    for i in range(start, end):

        link = get_volunteer_link(i)
        if link == "": continue
        print(link)

        event = get_event_details(i)
        print(event)

        if save:
            supabase_func.insert_event(event)

        events.append(event)

    return events



# main tester
if __name__ == "__main__":
    num_events = 222        # found from website
    start = 133
    events = get_events(num_events, start=start, save=True)

    # store links to file for now
    # with open("event_data2.json", "w") as file:
    #     file.writelines(events)

    print("FINISHED")