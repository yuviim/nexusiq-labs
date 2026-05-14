from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .models import ConnectionConfig, QueryRequest
from .adapters.factory import get_adapter
from .settings import get_engine_config, get_enabled_engines

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


def clean_config(config: dict | None) -> dict:
    if not config:
        return {}

    return {
        key: value
        for key, value in config.items()
        if value not in [None, "", "undefined"]
    }


@app.get("/")
def root():
    return {
        "name": "NexusIQ Labs Backend",
        "status": "running",
        "version": "0.1.0",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "nexusiq-labs-backend",
    }


@app.get("/engines")
def engines():
    return get_enabled_engines()


@app.get("/api/sources/status")
def sources_status():
    return {
        "success": True,
        "sources": get_enabled_engines(),
    }


@app.post("/connections/test")
def test_connection(payload: ConnectionConfig):
    incoming_config = clean_config(payload.config)
    base_config = get_engine_config(payload.engine)
    config = {**base_config, **incoming_config}

    adapter = get_adapter(payload.engine, config)
    result = adapter.test_connection()

    return {
        "engine": payload.engine,
        "success": result.get("success", False),
        "message": result.get("message", ""),
        "latency_ms": result.get("latency_ms", result.get("runtime_ms", 0)),
        "runtime_ms": result.get("runtime_ms", result.get("latency_ms", 0)),
        **{
            key: value
            for key, value in result.items()
            if key not in ["success", "message", "latency_ms", "runtime_ms"]
        },
    }


@app.post("/query/run")
def run_query(payload: QueryRequest):
    incoming_config = clean_config(payload.config)
    config = incoming_config if incoming_config else get_engine_config(payload.engine)

    adapter = get_adapter(payload.engine, config)
    result = adapter.execute_query(payload.sql, payload.limit)

    return {
        "engine": payload.engine,
        "success": result.get("success", False),
        "columns": result.get("columns", []),
        "rows": result.get("rows", []),
        "row_count": result.get("row_count", 0),
        "runtime_ms": result.get("runtime_ms", 0),
        "message": result.get("message", ""),
    }