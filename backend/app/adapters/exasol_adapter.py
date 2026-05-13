import time
from typing import Any, Dict

import pyexasol

from .base import BaseAdapter


class ExasolAdapter(BaseAdapter):
    def _connect(self):
        host = self.config.get("host", "localhost")
        port = self.config.get("port", "8563")
        user = self.config.get("user")
        password = self.config.get("password")
        schema = self.config.get("schema")

        dsn = f"{host}:{port}"

        conn = pyexasol.connect(
            dsn=dsn,
            user=user,
            password=password,
            schema=schema,
            encryption=True,
        )

        return conn

    def test_connection(self) -> Dict[str, Any]:
        try:
            conn = self._connect()
            result = conn.export_to_list("SELECT CURRENT_USER")
            conn.close()

            return {
                "status": "success",
                "message": "Exasol connection successful",
                "result": result,
            }

        except Exception as exc:
            return {
                "status": "error",
                "message": str(exc),
            }

    def execute_query(self, sql: str, limit: int = 100) -> Dict[str, Any]:
        start = time.perf_counter()

        try:
            conn = self._connect()
            stmt = conn.execute(sql)
            rows_raw = stmt.fetchmany(limit)
            columns = [col["name"] for col in stmt.columns()]
            conn.close()

            rows = [
                {columns[index]: value for index, value in enumerate(row)}
                for row in rows_raw
            ]

            runtime_ms = round((time.perf_counter() - start) * 1000, 2)

            return {
                "status": "success",
                "runtime_ms": runtime_ms,
                "columns": columns,
                "rows": rows,
                "error": None,
            }

        except Exception as exc:
            runtime_ms = round((time.perf_counter() - start) * 1000, 2)

            return {
                "status": "error",
                "runtime_ms": runtime_ms,
                "columns": [],
                "rows": [],
                "error": str(exc),
            }