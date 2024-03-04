from sqlalchemy import text
from fastapi import APIRouter, HTTPException, Depends
from dependencies import get_db
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(
    prefix="/counties",
    tags=["counties"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def getAll(session: AsyncSession = Depends(get_db)):
    res = await session.execute(text("SELECT * from counties"))
    return [x._asdict() for x in res.all()]


@router.get("/{id}")
async def get(id: int, session: AsyncSession = Depends(get_db)):
    query = text('SELECT * FROM "Counties" WHERE id = :id')
    result = await session.execute(query, {"id": id})
    county = result.first()

    if not county:
        raise HTTPException(status_code=404, detail="Not found")

    return county._asdict()
