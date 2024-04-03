from pydantic import BaseModel

class County(BaseModel):
    id: int
    name: str
    housing_units: int = 0
    website_url: str = ""
    description: str
    image_url: str = ""
    map: str = ""
    lat: float = 0
    long: float = 0
    related_models: dict = {}
    text: str
    population: int = 0

class Event(BaseModel):
    id: int
    title: str
    organization: str = ""
    description: str
    image_url: str = ""
    video_url: str = ""
    # posting_url: str = ""
    date_posted: str = ""
    time: str = ""
    cause_areas: list = []
    address: str = ""
    lat: float = 0
    long: float = 0
    skills: list = []
    requirements: list = []
    good_for: list = []
    related_models: dict = {}
    map_url: str = ""

class Shelter(BaseModel):
    id: int
    name: str
    address: str
    city: str
    state: str
    zip_code: int
    lat: float
    long: float
    phone_number: str
    email_address: str = ""
    fax_number: str = ""
    official_website: str = ""
    twitter: str = ""
    facebook: str = ""
    instagram: str = ""
    description: str = ""
    photo_urls: list = []
    related_models: dict = {}
    update_datetime: str
    short_description: str = ""
