from dotenv import load_dotenv
import os

load_dotenv()


class Settings:
    ACTIVE_ENGINE = os.getenv("ACTIVE_ENGINE", "clickhouse")

    CLICKHOUSE_HOST = os.getenv("CLICKHOUSE_HOST")
    CLICKHOUSE_PORT = int(os.getenv("CLICKHOUSE_PORT", 8443))
    CLICKHOUSE_DATABASE = os.getenv("CLICKHOUSE_DATABASE")
    CLICKHOUSE_USER = os.getenv("CLICKHOUSE_USER")
    CLICKHOUSE_PASSWORD = os.getenv("CLICKHOUSE_PASSWORD")


settings = Settings()