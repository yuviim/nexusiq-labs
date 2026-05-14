from typing import Any, Dict

from app.settings import get_engine_config

from .mock_adapter import MockAdapter
from .clickhouse_adapter import ClickHouseAdapter
from .exasol_adapter import ExasolAdapter
from .snowflake_adapter import SnowflakeAdapter
from .databricks_adapter import DatabricksAdapter
from .bigquery_adapter import BigQueryAdapter

def get_adapter(engine: str, config: Dict[str, Any] | None = None):
    engine_key = (engine or "").lower()

    resolved_config = config or get_engine_config(engine_key)

    if engine_key == "clickhouse":
        return ClickHouseAdapter(resolved_config)

    if engine_key == "exasol":
        return ExasolAdapter(resolved_config)
    
    if engine_key == "snowflake":
        return SnowflakeAdapter(resolved_config)
    
    if engine_key == "databricks":
        return DatabricksAdapter(resolved_config)
    
    if engine_key == "bigquery":
        return BigQueryAdapter(resolved_config)

    # Temporary fallback adapters
    if engine_key in [
        "snowflake",
        "databricks",
        "bigquery",
        "trino",
    ]:
        return MockAdapter(
            {
                "engine": engine_key,
                **resolved_config,
            }
        )

    return MockAdapter(resolved_config)