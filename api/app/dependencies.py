from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine

db_pass = "texashomesproject!?"

db_url = f"postgresql+asyncpg://postgres.nnnfcaicnnrvlvfnbqdh:{db_pass}@aws-0-us-west-1.pooler.supabase.com:5432/postgres"

engine = create_async_engine(db_url, echo=True)

async def get_db():
    async with AsyncSession(engine) as session:
        yield session