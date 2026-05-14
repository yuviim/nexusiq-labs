import time
import snowflake.connector


class SnowflakeAdapter:
    def __init__(self, config):
        self.config = config or {}

    def _connect(self):
        return snowflake.connector.connect(
            account=self.config.get("account"),
            user=self.config.get("user"),
            password=self.config.get("password"),
            warehouse=self.config.get("warehouse"),
            database=self.config.get("database"),
            schema=self.config.get("schema"),
            role=self.config.get("role"),
            authenticator=self.config.get("authenticator", "snowflake"),
        )
        passcode = self.config.get("passcode")
        if passcode:
            connect_args["passcode"] = passcode

        return snowflake.connector.connect(**connect_args)

    def test_connection(self):
        start = time.time()

        try:
            conn = self._connect()
            cur = conn.cursor()
            cur.execute("SELECT CURRENT_VERSION()")
            version = cur.fetchone()[0]
            cur.close()
            conn.close()

            runtime_ms = round((time.time() - start) * 1000, 2)

            return {
                "success": True,
                "message": f"Snowflake connection successful. Version: {version}",
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
            conn = self._connect()
            cur = conn.cursor()
            cur.execute(sql)

            columns = [col[0] for col in cur.description] if cur.description else []
            rows = cur.fetchmany(limit)

            cur.close()
            conn.close()

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