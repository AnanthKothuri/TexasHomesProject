from fastapi import FastAPI
from routers import counties, events, shelters

app = FastAPI()


app.include_router(counties.router)
app.include_router(events.router)
app.include_router(shelters.router)


@app.get("/")
async def root():
    return {"message": "Hello Texas!"}
