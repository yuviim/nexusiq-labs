from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .models import ConnectionConfig, QueryRequest
from .adapters.factory import get_adapter

app = FastAPI(title="NexusIQ Labs Backend", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "name": "NexusIQ Labs Backend",
        "status": "running",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }


@app.get("/engines")
def engines():
    return [
        {"name": "Exasol", "status": "real_adapter"},
        {"name": "Snowflake", "status": "planned"},
        {"name": "ClickHouse", "status": "planned"},
        {"name": "Databricks", "status": "planned"},
        {"name": "BigQuery", "status": "planned"},
        {"name": "Trino", "status": "planned"},
    ]


@app.post("/connections/test")
def test_connection(payload: ConnectionConfig):
    adapter = get_adapter(payload.engine, payload.config)
    result = adapter.test_connection()

    if "success" not in result:
        result["success"] = True

    return {
        "engine": payload.engine,
        **result,
    }


@app.post("/query/run")
def run_query(payload: QueryRequest):
    adapter = get_adapter(payload.engine, payload.config or {})
    result = adapter.execute_query(payload.sql, payload.limit)

    return {
        "engine": payload.engine,
        **result,
    }