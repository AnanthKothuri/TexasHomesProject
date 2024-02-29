from googlemaps import Client as GoogleMaps
import googlemaps
import gmaps

google_api_key = "AIzaSyBq8FPWJxKm3odyidqfXyHrUP3qRwx4c3s"
gmaps = googlemaps.Client(key=google_api_key)

def get_coordinates(address):
    result = gmaps.geocode(address)
    if len(result) == 0: return None

    lat = result[0]['geometry']['location']['lat']
    long = result[0]['geometry']['location']['lng']
    return lat, long