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
    def setUpClass(cls):
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
        cls.driver = webdriver.Chrome(
            options=options, service=Service(ChromeDriverManager().install())
        )
        cls.driver.get(URL)

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def test_shelter_instance(self):
        self.driver.get(URL + "shelters")

        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable(
                    (By.XPATH, "/html/body/div/div/div/div[1]/div[1]/div/div/div[2]/button")
                )
            )
            element = self.driver.find_element(
                By.XPATH, "/html/body/div/div/div/div[1]/div[1]/div/div/div[2]/button"
            )
            element.click()
        except Exception as ex:
            raise Exception("Couldn't find Shelter button: " + str(ex))

        try:
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.XPATH, "/html/body/div/div/div/div[1]/div[3]/div/div"))
            )
        except Exception as ex:
            print("Couldn't find card-body element: " + str(ex))

        card_body = self.driver.find_element(By.XPATH, "/html/body/div/div/div/div[1]/div[3]/div/div")
        self.assertTrue("Description" in card_body.text)

    def test_county_instance(self):
        self.driver.get(URL + "counties")

        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable(
                    (By.XPATH, "/html/body/div/div/div/div[1]/div[1]/div/div/div[2]/button")
                )
            )
            element = self.driver.find_element(
                By.XPATH, "/html/body/div/div/div/div[1]/div[1]/div/div/div[2]/button"
            )
            element.click()
        except Exception as ex:
            raise Exception("Couldn't find County button: " + str(ex))

        try:
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.XPATH, "/html/body/div/div/div/div[1]/div[3]/div/h5[1]"))
            )
        except Exception as ex:
            print("Couldn't find card-body element: " + str(ex))

        card_body = self.driver.find_element(By.XPATH, "/html/body/div/div/div/div[1]/div[3]/div/h5[1]")
        self.assertTrue("Summary" in card_body.text)

    def test_event_instance(self):
        self.driver.get(URL + "events")

        try:
            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable(
                    (By.XPATH, "/html/body/div/div/div/div[1]/div[1]/div/div/div[2]/button")
                )
            )
            element = self.driver.find_element(
                By.XPATH, "/html/body/div/div/div/div[1]/div[1]/div/div/div[2]/button"
            )
            element.click()
        except Exception as ex:
            raise Exception("Couldn't find Event button: " + str(ex))

        try:
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.XPATH, "/html/body/div/div/div/div[1]/div[3]/div/div"))
            )
        except Exception as ex:
            print("Couldn't find card-body element: " + str(ex))

        card_body = self.driver.find_element(By.XPATH, "/html/body/div/div/div/div[1]/div[3]/div/div")
        self.assertTrue("Description" in card_body.text)

if __name__ == "__main__":
    unittest.main()
