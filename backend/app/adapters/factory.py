from typing import Any, Dict

from .mock_adapter import MockAdapter
from .clickhouse_adapter import ClickHouseAdapter


def get_adapter(engine: str, config: Dict[str, Any] | None = None):
    engine_key = (engine or "").lower()
    config = config or {}

    if engine_key == "clickhouse":
        return ClickHouseAdapter(config)

    return MockAdapter(config)