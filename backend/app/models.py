from pydantic import BaseModel, Field
from typing import Any, Dict, List, Optional


class ConnectionConfig(BaseModel):
    engine: str
    config: Optional[Dict[str, Any]] = None


class QueryRequest(BaseModel):
    engine: str
    sql: str
    config: Optional[Dict[str, Any]] = None
    limit: int = Field(default=100, ge=1, le=1000)


class QueryResponse(BaseModel):
    engine: str
    success: bool
    runtime_ms: float
    columns: List[str]
    rows: List[Any]
    row_count: int = 0
    message: Optional[str] = None