import requests

def search_page(title):
    assert title != ""
    response = requests.get(f'https://en.wikipedia.org/api/rest_v1/page/summary/{title}')
    assert response != None
    return response.json()

def get_media_for_page(title):
    assert title != ""
    response = requests.get(f'https://en.wikipedia.org/api/rest_v1/page/media-list/{title}')
    assert response != None
    return response.json()