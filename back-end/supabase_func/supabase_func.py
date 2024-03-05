import os
from supabase import create_client, Client
from models import County, Event, Shelter
import json

url = "https://nnnfcaicnnrvlvfnbqdh.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ubmZjYWljbm5ydmx2Zm5icWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxODA0MjgsImV4cCI6MjAyMjc1NjQyOH0.9hRcAO7LLgaMtCqqJN7oq3_1Xzssz-GapF4vbcsakUQ"
# url: str = os.environ.get("SUPABASE_URL")
# key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def insert_shelter(shelter: Shelter):
    assert(shelter)
    try:
        data, count = supabase.table('Shelters').insert(shelter).execute()
    except Exception as error:
        print(f"Could not insert shelter to supabase: {error}")
    print("Successfully added shelter to supabase")

def update_shelter(shelter: Shelter):
    assert(shelter)
    try:
        data, count = supabase.table('Shelters').update(shelter).eq('id', shelter["id"]).execute()
    except Exception as error:
        print(f"Could not update shelter in supabase: {error}")
    print("Successfully updated shelter in supabase")

def get_all_shelters():
    try:
        data, count = supabase.table('Shelters').select("*").execute()
    except Exception as error:
        print(f"Could not get all shelters from supabase: {error}")
        return None
    
    print("Successfully retrieved all shelters from supabase")
    return data[1]


def insert_county(county: County):
    assert(county)
    try:
        data, count = supabase.table('Counties').insert(county).execute()
    except Exception as error:
        print(f"Could not insert county to supabase: {error}")
    print("Successfully added county to supabase")

def update_county(county: County):
    assert(county)
    try:
        data, count = supabase.table('Counties').update(county).eq('id', county["id"]).execute()
    except Exception as error:
        print(f"Could not update county in supabase: {error}")
    print("Successfully updated county in supabase")

def get_all_counties():
    try:
        data, count = supabase.table('Counties').select("*").execute()
    except Exception as error:
        print(f"Could not get all counties from supabase: {error}")
        return None
    
    print("Successfully retrieved all counties from supabase")
    return data[1]


def insert_event(event: Event):
    assert(event)
    try:
        data, count = supabase.table('Events').insert(event).execute()
    except Exception as error:
        print(f"Could not insert event to supabase: {error}")
    print("Successfully added event to supabase")

def update_event(event: Event):
    assert(event)
    try:
        data, count = supabase.table('Events').update(event).eq('id', event["id"]).execute()
    except Exception as error:
        print(f"Could not update event in supabase: {error}")
    print("Successfully updated event in supabase")

def get_all_events():
    try:
        data, count = supabase.table('Events').select("*").execute()
    except Exception as error:
        print(f"Could not get all events from supabase: {error}")
        return None
    
    print("Successfully retrieved all events from supabase")
    return data[1]