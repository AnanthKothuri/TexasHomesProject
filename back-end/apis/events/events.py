from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC

base_url = 'https://www.volunteermatch.org/'
options = Options()
options.add_argument('--headless')
options.add_argument('--disable-gpu')
driver = webdriver.Chrome(options=options)

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
        container = driver.find_element(By.ID, "container")

        job_links = driver.find_elements(By.CLASS_NAME, "pub-srp-opps__title ga-track-to-opp-details")
        print(job_links)
        for link in job_links:
            print(link.text)
    except Exception as e:
        print(e)

get_events_for_name("Collin County")
