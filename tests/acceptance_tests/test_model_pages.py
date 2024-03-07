import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

URL = "https://www.texashomesproject.me/"


class Test(unittest.TestCase):
    @classmethod
    def setUpClass(self) -> None:
        options = webdriver.ChromeOptions()
        options.add_experimental_option("excludeSwitches", ["enable-logging"])
        options.add_argument("--headless")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--window-size=1920,1080")

        chrome_prefs = {}
        options.experimental_options["prefs"] = chrome_prefs
        # Disable images
        chrome_prefs["profile.default_content_settings"] = {"images": 2}
        self.driver = webdriver.Chrome(
            options=options, service=Service(ChromeDriverManager().install())
        )
        self.driver.get(URL)

    @classmethod
    def tearDownClass(self):
        self.driver.quit()

    def test_shelters(self):
        self.driver.get(URL + "shelters")
        self.assertEqual(self.driver.current_url, URL + "shelters")

        try:
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.XPATH, '/html/body/div/div/div/div[2]'))
            )
        except Exception as ex:
            print("Couldn't load items for page: " + str(ex))

        element = self.driver.find_element(By.XPATH, '/html/body/div/div/div/div[2]')
        self.assertTrue("Shelters" in element.text)


    def test_counties(self):
        self.driver.get(URL + "counties")
        self.assertEqual(self.driver.current_url, URL + "counties")

        try:
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.XPATH, '/html/body/div/div/div/div[2]'))
            )
        except Exception as ex:
            print("Couldn't load items for page: " + str(ex))

        element = self.driver.find_element(By.XPATH, '/html/body/div/div/div/div[2]')
        self.assertTrue("Counties" in element.text)

    def test_events(self):
        self.driver.get(URL + "events")
        self.assertEqual(self.driver.current_url, URL + "events")

        try:
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.XPATH, '/html/body/div/div/div/div[2]'))
            )
        except Exception as ex:
            print("Couldn't load items for page: " + str(ex))

        element = self.driver.find_element(By.XPATH, '/html/body/div/div/div/div[2]')
        self.assertTrue("Events" in element.text)


if __name__ == "__main__":
    unittest.main()
