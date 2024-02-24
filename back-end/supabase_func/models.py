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