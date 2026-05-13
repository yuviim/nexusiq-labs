import time
from typing import Any, Dict

from .base import BaseAdapter


class MockAdapter(BaseAdapter):
    def test_connection(self) -> Dict[str, Any]:
        return {
            "status": "success",
            "message": "Mock connection successful",
        }

    def execute_query(self, sql: str, limit: int = 100) -> Dict[str, Any]:
        start = time.perf_counter()

        rows = [
            {
                "region": "North",
                "product_category": "Electronics",
                "total_revenue": 4800000,
                "avg_order_value": 182,
                "total_orders": 26420,
            },
            {
                "region": "West",
                "product_category": "Home & Living",
                "total_revenue": 3900000,
                "avg_order_value": 146,
                "total_orders": 22180,
            },
            {
                "region": "South",
                "product_category": "Fashion",
                "total_revenue": 3200000,
                "avg_order_value": 121,
                "total_orders": 19440,
            },
        ]

        runtime_ms = round((time.perf_counter() - start) * 1000, 2)

        return {
            "status": "success",
            "runtime_ms": runtime_ms,
            "columns": list(rows[0].keys()),
            "rows": rows[:limit],
            "error": None,
        }