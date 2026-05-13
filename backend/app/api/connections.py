from fastapi import APIRouter
from pydantic import BaseModel
from time import perf_counter

router = APIRouter(prefix="/connections", tags=["connections"])


class ConnectionTestRequest(BaseModel):
    engine: str
    host: str | None = None
    port: int | None = None
    database: str | None = None
    schema_name: str | None = None
    username: str | None = None
    password: str | None = None
    token: str | None = None
    warehouse: str | None = None
    http_path: str | None = None


@router.post("/test")
async def test_connection(payload: ConnectionTestRequest):
    start = perf_counter()

    try:
        # Mock-safe first version
        if not payload.engine:
            raise ValueError("Engine is required")

        if payload.engine.lower() in ["exasol", "snowflake", "clickhouse", "databricks", "bigquery", "trino"]:
            latency_ms = round((perf_counter() - start) * 1000, 2)

            return {
                "success": True,
                "engine": payload.engine,
                "latency_ms": latency_ms,
                "message": f"{payload.engine} connection test completed successfully.",
            }

        return {
            "success": False,
            "engine": payload.engine,
            "latency_ms": round((perf_counter() - start) * 1000, 2),
            "message": f"Unsupported engine: {payload.engine}",
        }

    except Exception as e:
        return {
            "success": False,
            "engine": payload.engine,
            "latency_ms": round((perf_counter() - start) * 1000, 2),
            "message": str(e),
        }