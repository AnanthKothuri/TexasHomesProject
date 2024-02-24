from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from time import sleep
from bs4 import BeautifulSoup
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

base_url = 'https://www.volunteermatch.org'
options = Options()
options.add_argument('--headless')
options.add_argument('--disable-gpu')
driver = webdriver.Chrome(options=options)

def click_read_more():
    loop = True
    # while(loop):
    #     try:
    #         wait = WebDriverWait(driver, 10)
    #         wait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/div[4]/div[2]/main/div/section[1]/div[3]"))).click()
    #     except:
    #         print("didn't finish in time, retrying")
    #         continue
    #     else:
    #         loop = False

def get_event_details(county_name, id, url):
    assert url != ""
    assert base_url in url

    try:
        driver.get(url)
        click_read_more()
        soup = BeautifulSoup(driver.page_source, "lxml")
        event = {}
        event["id"] = id
        event["title"] = soup.find("h1", class_="opp-dtl__title opp-dtl__title--main text-lg-rwd gray-drk").contents[0].strip()
        event["organization"] = soup.find("a", class_="hvr-o caps").get_text(strip=True)
        description_box = soup.find("div", class_="opp-dtl__summary js-ddd-truncate ddd-truncated")
        event["description"] = description_box.contents[1]

        print(event)
    except:
        raise KeyError(f"Could not get event details for url: {url}")



def get_events_for_name(name):
    assert name != ""

    words = name.split(" ")
    search_url = 'https://www.volunteermatch.org/search/index.jsp?l=' + words[0]
    for word in words[1:]:
        search_url += f"+{word}"
    search_url += "&v=false&cats=7&r=subregion"

    try:
        driver.get(search_url)
    except:
        raise KeyError(f"No such events page for name: {name}")
    
    try:
        soup = BeautifulSoup(driver.page_source, "lxml")
        jobs = soup.find_all("a", class_="pub-srp-opps__title ga-track-to-opp-details")
        job_links = [base_url + x["href"] for x in jobs]

        id = 0
        for link in job_links:
            print(link)
            get_event_details(name, id, link)
            id += 1

    except Exception as e:
        print(e)

get_events_for_name("Collin County")
