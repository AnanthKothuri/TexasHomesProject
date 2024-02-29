from googleapiclient.discovery import build

google_api_key = "AIzaSyBq8FPWJxKm3odyidqfXyHrUP3qRwx4c3s"
from bs4 import BeautifulSoup

def get_video_ids(query):
    youtube = build('youtube', 'v3', developerKey=google_api_key, cache_discovery=False)
    request = youtube.search().list(part='id', type='video', q=query, maxResults=5)
    response = request.execute()
    ids = response['items']
    return [x['id']['videoId'] for x in ids]

def get_video_details(video_id):
    youtube = build('youtube', 'v3', developerKey=google_api_key, cache_discovery=False)
    request = youtube.videos().list(part='player', id=video_id)
    response = request.execute()
    return response

def parse_video_details(details):
    html = details['items'][0]['player']['embedHtml']
    soup = BeautifulSoup(html, 'html.parser')
    iframe = soup.find('iframe')
    return 'https:' + iframe.get('src') if iframe else None

def search_video(query):
    ids = get_video_ids(query)
    if len(ids) == 0 : return None

    details = get_video_details(ids[0])
    html = parse_video_details(details)
    return html

# print(search_video("SOUPMOBILE, homelessness and housing, volunteering"))