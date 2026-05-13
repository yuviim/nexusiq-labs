import { useMemo, useState } from "react";
import {
  Bot,
  Database,
  Play,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import SectionCard from "../components/common/SectionCard";
import SQLEditor from "../components/sql/SQLEditor";
import { useLab } from "../context/LabContext";
import { runQuery } from "../api/client";

const suggestedQuestions = [
  "Which product categories have the highest revenue growth in 2025?",
  "Compare BI dashboard latency by region",
  "Analyze lakehouse query acceleration opportunities",
  "Find slow-moving product categories",
  "Generate semantic revenue insights",
];

const generatedQueries = {
  revenue: `SELECT
  region,
  product_category,
  SUM(revenue) AS total_revenue,
  AVG(order_value) AS avg_order_value,
  COUNT(*) AS total_orders
FROM retail_sales
WHERE order_date >= DATE '2025-01-01'
GROUP BY 1, 2
ORDER BY total_revenue DESC;`,

  latency: `SELECT
  region,
  AVG(dashboard_latency_ms) AS avg_latency,
  AVG(query_runtime_ms) AS avg_query_runtime
FROM bi_dashboard_metrics
GROUP BY 1
ORDER BY avg_latency ASC;`,

  lakehouse: `SELECT
  dataset_name,
  scan_size_gb,
  query_runtime_seconds,
  acceleration_candidate
FROM lakehouse_runtime_metrics
WHERE acceleration_candidate = TRUE
ORDER BY query_runtime_seconds DESC;`,

  inventory: `SELECT
  product_category,
  product_name,
  SUM(quantity_sold) AS units_sold,
  SUM(revenue) AS total_revenue,
  AVG(days_in_inventory) AS avg_inventory_days
FROM retail_sales
WHERE order_date >= DATE '2025-01-01'
GROUP BY 1, 2
HAVING SUM(quantity_sold) < 1000
ORDER BY avg_inventory_days DESC;`,
};

export default function AISQLLab() {
  const { engines, activeEngine, setActiveEngine } = useLab();

  const [question, setQuestion] = useState(suggestedQuestions[0]);
  const [generatedSql, setGeneratedSql] = useState(generatedQueries.revenue);

  const [queryResults, setQueryResults] = useState([]);
  const [runtime, setRuntime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function generateSQL(text) {
    const lower = text.toLowerCase();

    setQuestion(text);
    setQueryResults([]);
    setRuntime(null);
    setError(null);

    if (lower.includes("latency")) {
      setGeneratedSql(generatedQueries.latency);
    } else if (lower.includes("lakehouse") || lower.includes("acceleration")) {
      setGeneratedSql(generatedQueries.lakehouse);
    } else if (lower.includes("slow-moving") || lower.includes("inventory")) {
      setGeneratedSql(generatedQueries.inventory);
    } else {
      setGeneratedSql(generatedQueries.revenue);
    }
  }

  async function executeQuery() {
  try {
    setLoading(true);
    setError(null);
    setQueryResults([]);
    setRuntime(null);

    const response = await runQuery({
      engine: "clickhouse",
      sql: generatedSql,
      config: {
        host: "kpu62rmyan.ap-south-1.aws.clickhouse.cloud",
        port: 8443,
        database: "nexusiq_lab",
        user: "default",
        password: "YOUR_CLICKHOUSE_PASSWORD",
      },
      limit: 20,
    });

    console.log("BACKEND RESPONSE:", response);

    setQueryResults(response.rows || []);
    setRuntime(response.runtime_ms);
  } catch (err) {
    setError(err.message || "Query execution failed");
  } finally {
    setLoading(false);
  }
}

  const aiNarrative = useMemo(() => {
    return `The AI selected ${
      activeEngine?.name || "Exasol"
    } as the preferred analytical execution engine because this workload involves aggregation-heavy BI analytical patterns where acceleration and federated execution can reduce latency significantly.`;
  }, [activeEngine]);

  return (
    <div className="space-y-4">
      <PageHeader
        badge="AI + SQL LAB"
        title="AI-Native SQL Intelligence Workspace"
        description="Convert business questions into SQL, compare execution across analytical engines, explain query behavior, and explore Exasol AI + SQL positioning."
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-violet-600" />

          <h2 className="text-[16px] font-semibold text-slate-950">
            Ask a business question
          </h2>
        </div>

        <div className="mt-4 flex gap-3">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask analytical questions..."
            className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white"
          />

          <button
            onClick={() => generateSQL(question)}
            className="rounded-2xl bg-slate-950 px-5 py-3 text-[12px] font-semibold text-white"
          >
            Generate SQL
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {suggestedQuestions.map((item) => (
            <button
              key={item}
              onClick={() => generateSQL(item)}
              className="rounded-full bg-violet-50 px-3 py-1.5 text-[11px] font-semibold text-violet-700 transition hover:bg-violet-100"
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.5fr_0.9fr]">
        <div className="space-y-4">
          <SectionCard title="Engine routing">
            <div className="space-y-3">
              {engines.map((engine) => {
                const active = activeEngine?.name === engine.name;

                return (
                  <button
                    key={engine.name}
                    onClick={() => setActiveEngine(engine)}
                    className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                      active
                        ? "border-transparent bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="text-[13px] font-semibold">
                      {engine.name}
                    </div>

                    <div
                      className={`mt-1 text-[11px] ${
                        active ? "text-violet-100" : "text-slate-400"
                      }`}
                    >
                      {engine.role}
                    </div>
                  </button>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard title="AI reasoning">
            <div className="space-y-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <Bot size={15} className="text-violet-600" />

                  <span className="text-[12px] font-semibold text-slate-700">
                    Query pattern detected
                  </span>
                </div>

                <p className="mt-2 text-[12px] leading-6 text-slate-500">
                  Aggregation-heavy BI analytical workload with federated access
                  patterns and dashboard-oriented execution.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <Workflow size={15} className="text-violet-600" />

                  <span className="text-[12px] font-semibold text-slate-700">
                    AI recommendation
                  </span>
                </div>

                <p className="mt-2 text-[12px] leading-6 text-slate-500">
                  Exasol acceleration layer is preferred for BI acceleration and
                  federated analytical access.
                </p>
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-4">
          <SectionCard title="Generated SQL">
            <SQLEditor value={generatedSql} onChange={setGeneratedSql} />

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                <Zap size={13} />
                SQL optimized for analytical aggregation
              </div>

              <button
                onClick={executeQuery}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2 text-[12px] font-semibold text-white shadow-sm disabled:opacity-60"
              >
                <Play size={14} />
                {loading ? "Executing..." : "Run Query"}
              </button>
            </div>
          </SectionCard>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[15px] font-semibold text-slate-950">
                  Query results
                </h2>

                <p className="mt-1 text-[12px] text-slate-500">
                  Backend execution results from FastAPI adapter layer
                </p>
              </div>

              {runtime !== null && (
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                  Runtime: {runtime} ms
                </div>
              )}
            </div>

            {loading ? (
              <div className="mt-4 rounded-xl bg-violet-50 px-4 py-3 text-[12px] font-medium text-violet-700">
                Executing query through backend...
              </div>
            ) : error ? (
              <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-[12px] font-medium text-red-700">
                {error}
              </div>
            ) : queryResults.length === 0 ? (
              <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-[12px] text-slate-500">
                No rows returned yet. Click Run Query to execute through FastAPI.
              </div>
            ) : (
              <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-[12px]">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      {Object.keys(queryResults[0]).map((column) => (
                        <th key={column} className="px-3 py-2 font-semibold">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {queryResults.map((row, index) => (
                      <tr key={index} className="hover:bg-slate-50">
                        {Object.values(row).map((value, idx) => (
                          <td key={idx} className="px-3 py-2 text-slate-700">
                            {String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <SectionCard title="AI explanation">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-[13px] leading-7 text-slate-600">
                {aiNarrative}
              </p>
            </div>
          </SectionCard>

          <SectionCard title="Dataset context">
            <div className="space-y-3">
              {[
                ["Dataset", "Retail Sales Lake"],
                ["Rows", "50M"],
                ["Format", "Parquet"],
                ["Storage", "S3 / ADLS"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-3"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    {label}
                  </span>

                  <span className="text-[12px] font-semibold text-slate-700">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Execution summary">
            <div className="space-y-3">
              {[
                ["Routing", activeEngine?.name || "Exasol"],
                ["Workload", "Analytical aggregation"],
                ["Movement", "Low"],
                ["Federation", "Enabled"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-3"
                >
                  <span className="text-[12px] text-slate-500">{label}</span>

                  <span className="text-[12px] font-semibold text-slate-800">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Cross-engine execution comparison">
            <div className="space-y-3">
              {[
                ["Exasol", "1.8s"],
                ["ClickHouse", "3.9s"],
                ["Trino", "4.8s"],
                ["Databricks", "6.8s"],
                ["BigQuery", "7.0s"],
                ["Snowflake", "7.2s"],
              ].map(([engine, time]) => (
                <div
                  key={engine}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-3"
                >
                  <div className="flex items-center gap-2">
                    <Database size={14} className="text-violet-600" />

                    <span className="text-[12px] font-semibold text-slate-700">
                      {engine}
                    </span>
                  </div>

                  <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-sm">
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </section>
    </div>
  );
}