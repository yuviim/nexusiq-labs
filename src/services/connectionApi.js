const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function testConnection(payload) {
  const response = await fetch(`${API_BASE_URL}/connections/test`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || `Connection test failed with status ${response.status}`);
  }

  return data;
}

export async function runQuery(payload) {
  const response = await fetch(`${API_BASE_URL}/query/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || `Query failed with status ${response.status}`);
  }

  return data;
}

export async function getEngines() {
  const response = await fetch(`${API_BASE_URL}/engines`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch engines");
  }

  return data;
}