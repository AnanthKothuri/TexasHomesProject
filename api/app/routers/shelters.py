from sqlalchemy import text
from fastapi import APIRouter, HTTPException, Depends
from dependencies import get_db
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(
    prefix="/shelters",
    tags=["shelters"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def getAll(session: AsyncSession = Depends(get_db)):
    res = await session.execute(text("SELECT * from shelters"))
    return [x._asdict() for x in res.all()]


@router.get("/{ID}")
async def get(id: int, session: AsyncSession = Depends(get_db)):
    res = await session.execute(
        text('SELECT * from "Shelters" WHERE id=:id').bindparams(id=id)
    )

    data = res.first()

    if not data:
        raise HTTPException(status_code=404, detail="Not found")

    return data._asdict()
