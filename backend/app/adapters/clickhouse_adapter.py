import time
import clickhouse_connect


class ClickHouseAdapter:
    def __init__(self, config):
        self.config = config or {}

    def _client(self):
        return clickhouse_connect.get_client(
            host=self.config.get("host"),
            port=int(self.config.get("port", 8443)),
            username=self.config.get("user", "default"),
            password=self.config.get("password", ""),
            database=self.config.get("database", "default"),
            secure=True,
        )

    def test_connection(self):
        start = time.time()

        try:
            client = self._client()
            result = client.query("SELECT version()")
            runtime_ms = round((time.time() - start) * 1000, 2)

            return {
                "success": True,
                "message": f"ClickHouse connection successful. Version: {result.result_rows[0][0]}",
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

    def execute_query(self, sql, limit=100):
        start = time.time()

        try:
            client = self._client()
            result = client.query(sql)

            runtime_ms = round((time.time() - start) * 1000, 2)

            return {
                "success": True,
                "columns": result.column_names,
                "rows": result.result_rows[:limit],
                "row_count": len(result.result_rows),
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