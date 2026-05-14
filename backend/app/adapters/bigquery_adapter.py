import time
from google.cloud import bigquery
from google.oauth2 import service_account


class BigQueryAdapter:
    def __init__(self, config):
        self.config = config or {}

    def _client(self):
        credentials_path = self.config.get("credentials_path")
        project_id = self.config.get("project_id")

        if credentials_path:
            credentials = service_account.Credentials.from_service_account_file(
                credentials_path
            )
            return bigquery.Client(
                project=project_id,
                credentials=credentials,
            )

        return bigquery.Client(project=project_id)

    def test_connection(self):
        start = time.time()

        try:
            client = self._client()
            query_job = client.query("SELECT 1 AS ok")
            rows = list(query_job.result())

            runtime_ms = round((time.time() - start) * 1000, 2)

            return {
                "success": True,
                "message": f"BigQuery connection successful. SELECT 1 returned {rows[0].ok}",
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
            client = self._client()
            query_job = client.query(sql_text)
            result = query_job.result()

            columns = [field.name for field in result.schema]
            rows = []

            for row in result:
                rows.append([row[column] for column in columns])
                if len(rows) >= limit:
                    break

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