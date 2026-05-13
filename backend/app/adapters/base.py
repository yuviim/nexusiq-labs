from abc import ABC, abstractmethod
from typing import Any, Dict, List


class BaseAdapter(ABC):
    def __init__(self, config: Dict[str, Any]):
        self.config = config

    @abstractmethod
    def test_connection(self) -> Dict[str, Any]:
        pass

    @abstractmethod
    def execute_query(self, sql: str, limit: int = 100) -> Dict[str, Any]:
        pass