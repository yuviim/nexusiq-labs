const API_BASE = "http://localhost:8000";

export async function runQuery(payload) {
  const response = await fetch(`${API_BASE}/query/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Query execution failed");
  }

  return response.json();
}

export async function testConnection(payload) {
  const response = await fetch(`${API_BASE}/connections/test`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Connection test failed");
  }

  return response.json();
}