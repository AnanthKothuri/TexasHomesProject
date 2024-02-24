import os
from supabase import create_client, Client
from models import County

url = "https://nnnfcaicnnrvlvfnbqdh.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ubmZjYWljbm5ydmx2Zm5icWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxODA0MjgsImV4cCI6MjAyMjc1NjQyOH0.9hRcAO7LLgaMtCqqJN7oq3_1Xzssz-GapF4vbcsakUQ"
# url: str = os.environ.get("SUPABASE_URL")
# key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def insert_county(county: County):
    assert(county)
    try:
        data, count = supabase.table('Counties').insert(county).execute()
    except Exception as error:
        print(f"Could not insert county to supabase: {error}")
    print("Successfully added county to supabase")