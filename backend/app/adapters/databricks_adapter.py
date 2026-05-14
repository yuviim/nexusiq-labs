import time
from databricks import sql


class DatabricksAdapter:
    def __init__(self, config):
        self.config = config or {}

    def _connect(self):
        return sql.connect(
            server_hostname=self.config.get("server_hostname"),
            http_path=self.config.get("http_path"),
            access_token=self.config.get("access_token"),
        )

    def test_connection(self):
        start = time.time()

        try:
            with self._connect() as conn:
                with conn.cursor() as cur:
                    cur.execute("SELECT current_version()")
                    row = cur.fetchone()

            runtime_ms = round((time.time() - start) * 1000, 2)

            return {
                "success": True,
                "message": f"Databricks connection successful. Version: {row[0] if row else 'OK'}",
                "runtime_ms": runtime_ms,
                "latency_ms": runtime_ms,
            }

        except Exception as e:
            return {
                "success": False,
                "message": str(e),
                "runtime_ms": 0,
                "latency_ms": 0,
            }

    def execute_query(self, sql_text, limit=100):
        start = time.time()

        try:
            with self._connect() as conn:
                with conn.cursor() as cur:
                    cur.execute(sql_text)
                    columns = [col[0] for col in cur.description] if cur.description else []
                    rows = cur.fetchmany(limit)

            runtime_ms = round((time.time() - start) * 1000, 2)

            return {
                "success": True,
                "columns": columns,
                "rows": rows,
                "row_count": len(rows),
                "runtime_ms": runtime_ms,
            }

        except Exception as e:
            return {
                "success": False,
                "message": str(e),
                "columns": ["error"],
                "rows": [[str(e)]],
                "row_count": 0,
                "runtime_ms": 0,
            }