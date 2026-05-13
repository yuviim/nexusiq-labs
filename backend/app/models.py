from pydantic import BaseModel
from typing import Any, Dict, List, Optional


class ConnectionConfig(BaseModel):
    engine: str
    config: Dict[str, Any]


class QueryRequest(BaseModel):
    engine: str
    sql: str
    config: Optional[Dict[str, Any]] = None
    limit: int = 100


class QueryResponse(BaseModel):
    engine: str
    status: str
    runtime_ms: float
    columns: List[str]
    rows: List[Dict[str, Any]]
    error: Optional[str] = None