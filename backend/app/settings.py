from dotenv import load_dotenv
import os

load_dotenv()


def _int_env(name: str, default: int) -> int:
    value = os.getenv(name)
    return int(value) if value else default


class Settings:
    ACTIVE_ENGINE = os.getenv("ACTIVE_ENGINE", "clickhouse")

    # -----------------------------------
    # ClickHouse
    # -----------------------------------
    CLICKHOUSE_HOST = os.getenv("CLICKHOUSE_HOST")
    CLICKHOUSE_PORT = _int_env("CLICKHOUSE_PORT", 8443)
    CLICKHOUSE_DATABASE = os.getenv("CLICKHOUSE_DATABASE", "default")
    CLICKHOUSE_USER = os.getenv("CLICKHOUSE_USER", "default")
    CLICKHOUSE_PASSWORD = os.getenv("CLICKHOUSE_PASSWORD", "")

    # -----------------------------------
    # Snowflake
    # -----------------------------------
    SNOWFLAKE_ACCOUNT = os.getenv("SNOWFLAKE_ACCOUNT")
    SNOWFLAKE_USER = os.getenv("SNOWFLAKE_USER")
    SNOWFLAKE_PASSWORD = os.getenv("SNOWFLAKE_PASSWORD")
    SNOWFLAKE_WAREHOUSE = os.getenv("SNOWFLAKE_WAREHOUSE")
    SNOWFLAKE_DATABASE = os.getenv("SNOWFLAKE_DATABASE")
    SNOWFLAKE_SCHEMA = os.getenv("SNOWFLAKE_SCHEMA")
    SNOWFLAKE_ROLE = os.getenv("SNOWFLAKE_ROLE")

    SNOWFLAKE_AUTHENTICATOR = os.getenv(
        "SNOWFLAKE_AUTHENTICATOR",
        "snowflake",
    )

    # -----------------------------------
    # Databricks
    # -----------------------------------
    DATABRICKS_SERVER_HOSTNAME = os.getenv(
        "DATABRICKS_SERVER_HOSTNAME"
    )

    DATABRICKS_HTTP_PATH = os.getenv(
        "DATABRICKS_HTTP_PATH"
    )

    DATABRICKS_ACCESS_TOKEN = os.getenv(
        "DATABRICKS_ACCESS_TOKEN"
    )

    DATABRICKS_CATALOG = os.getenv(
        "DATABRICKS_CATALOG"
    )

    DATABRICKS_SCHEMA = os.getenv(
        "DATABRICKS_SCHEMA"
    )

    # -----------------------------------
    # BigQuery
    # -----------------------------------
    BIGQUERY_PROJECT_ID = os.getenv(
        "BIGQUERY_PROJECT_ID"
    )

    BIGQUERY_DATASET = os.getenv(
        "BIGQUERY_DATASET"
    )

    GOOGLE_APPLICATION_CREDENTIALS = os.getenv(
        "GOOGLE_APPLICATION_CREDENTIALS"
    )

    # -----------------------------------
    # Trino
    # -----------------------------------
    TRINO_HOST = os.getenv("TRINO_HOST")
    TRINO_PORT = _int_env("TRINO_PORT", 443)
    TRINO_USER = os.getenv("TRINO_USER")
    TRINO_CATALOG = os.getenv("TRINO_CATALOG")
    TRINO_SCHEMA = os.getenv("TRINO_SCHEMA")

    TRINO_HTTP_SCHEME = os.getenv(
        "TRINO_HTTP_SCHEME",
        "https",
    )

    # -----------------------------------
    # Exasol
    # -----------------------------------
    EXASOL_HOST = os.getenv("EXASOL_HOST")
    EXASOL_PORT = _int_env("EXASOL_PORT", 8563)
    EXASOL_USER = os.getenv("EXASOL_USER", "sys")
    EXASOL_PASSWORD = os.getenv("EXASOL_PASSWORD", "")
    EXASOL_SCHEMA = os.getenv("EXASOL_SCHEMA")


settings = Settings()


# =========================================================
# ENGINE CONFIG RESOLUTION
# =========================================================

def get_engine_config(engine: str) -> dict:
    engine = (engine or settings.ACTIVE_ENGINE).lower()

    # -----------------------------------
    # ClickHouse
    # -----------------------------------
    if engine == "clickhouse":
        return {
            "host": settings.CLICKHOUSE_HOST,
            "port": settings.CLICKHOUSE_PORT,
            "database": settings.CLICKHOUSE_DATABASE,
            "user": settings.CLICKHOUSE_USER,
            "password": settings.CLICKHOUSE_PASSWORD,
        }

    # -----------------------------------
    # Snowflake
    # -----------------------------------
    if engine == "snowflake":
        return {
            "account": settings.SNOWFLAKE_ACCOUNT,
            "user": settings.SNOWFLAKE_USER,
            "password": settings.SNOWFLAKE_PASSWORD,
            "warehouse": settings.SNOWFLAKE_WAREHOUSE,
            "database": settings.SNOWFLAKE_DATABASE,
            "schema": settings.SNOWFLAKE_SCHEMA,
            "role": settings.SNOWFLAKE_ROLE,
            "authenticator": settings.SNOWFLAKE_AUTHENTICATOR,
        }

    # -----------------------------------
    # Databricks
    # -----------------------------------
    if engine == "databricks":
        return {
            "server_hostname": settings.DATABRICKS_SERVER_HOSTNAME,
            "http_path": settings.DATABRICKS_HTTP_PATH,
            "access_token": settings.DATABRICKS_ACCESS_TOKEN,
            "catalog": settings.DATABRICKS_CATALOG,
            "schema": settings.DATABRICKS_SCHEMA,
        }

    # -----------------------------------
    # BigQuery
    # -----------------------------------
    if engine == "bigquery":
        return {
            "project_id": settings.BIGQUERY_PROJECT_ID,
            "dataset": settings.BIGQUERY_DATASET,
            "credentials_path": settings.GOOGLE_APPLICATION_CREDENTIALS,
        }

    # -----------------------------------
    # Trino
    # -----------------------------------
    if engine == "trino":
        return {
            "host": settings.TRINO_HOST,
            "port": settings.TRINO_PORT,
            "user": settings.TRINO_USER,
            "catalog": settings.TRINO_CATALOG,
            "schema": settings.TRINO_SCHEMA,
            "http_scheme": settings.TRINO_HTTP_SCHEME,
        }

    # -----------------------------------
    # Exasol
    # -----------------------------------
    if engine == "exasol":
        return {
            "host": settings.EXASOL_HOST,
            "port": settings.EXASOL_PORT,
            "user": settings.EXASOL_USER,
            "password": settings.EXASOL_PASSWORD,
            "schema": settings.EXASOL_SCHEMA,
        }

    return {}


# =========================================================
# ENGINE STATUS HELPERS
# =========================================================

def _configured(required_values: list) -> bool:
    return all(value not in [None, ""] for value in required_values)


def get_enabled_engines() -> list:
    return [
        {
            "id": "clickhouse",
            "name": "ClickHouse",
            "role": "Realtime Analytics",
            "status": (
                "configured"
                if _configured([
                    settings.CLICKHOUSE_HOST,
                    settings.CLICKHOUSE_PASSWORD,
                ])
                else "missing_config"
            ),
        },

        {
            "id": "snowflake",
            "name": "Snowflake",
            "role": "Cloud Warehouse",
            "passcode": settings.SNOWFLAKE_PASSCODE,
            "status": (
                "configured"
                if _configured([
                    settings.SNOWFLAKE_ACCOUNT,
                    settings.SNOWFLAKE_USER,
                    
                ])
                else "missing_config"
            ),
        },

        {
            "id": "databricks",
            "name": "Databricks",
            "role": "Lakehouse Platform",
            "status": (
                "configured"
                if _configured([
                    settings.DATABRICKS_SERVER_HOSTNAME,
                    settings.DATABRICKS_HTTP_PATH,
                    settings.DATABRICKS_ACCESS_TOKEN,
                ])
                else "missing_config"
            ),
        },

        {
            "id": "bigquery",
            "name": "BigQuery",
            "role": "Cloud Analytics",
            "status": (
                "configured"
                if _configured([
                    settings.BIGQUERY_PROJECT_ID,
                    settings.GOOGLE_APPLICATION_CREDENTIALS,
                ])
                else "missing_config"
            ),
        },

        {
            "id": "trino",
            "name": "Trino",
            "role": "Federated Query",
            "status": (
                "configured"
                if _configured([
                    settings.TRINO_HOST,
                    settings.TRINO_USER,
                ])
                else "missing_config"
            ),
        },

        {
            "id": "exasol",
            "name": "Exasol",
            "role": "Analytics Speed Layer",
            "status": (
                "configured"
                if _configured([
                    settings.EXASOL_HOST,
                    settings.EXASOL_USER,
                    settings.EXASOL_PASSWORD,
                ])
                else "missing_config"
            ),
        },
    ]