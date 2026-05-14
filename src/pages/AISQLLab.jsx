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
import { runQuery } from "../services/connectionApi";

const suggestedQuestions = [
  "Compare AI provider latency and cost",
  "Analyze regional AI traffic",
  "Find most expensive AI models",
  "Find failed AI requests",
  "Generate semantic AI workload insights",
];

const generatedQueries = {
  revenue: `SELECT
    provider,
    count(*) AS total_requests,
    round(avg(latency_ms), 2) AS avg_latency_ms,
    sum(total_tokens) AS total_tokens_processed,
    round(sum(cost_usd), 3) AS total_cost_usd
FROM ai_gateway_logs
GROUP BY provider
ORDER BY total_requests DESC;`,

  latency: `SELECT
    region,
    count(*) AS requests,
    round(avg(latency_ms), 2) AS avg_latency_ms,
    round(sum(cost_usd), 3) AS total_cost_usd
FROM ai_gateway_logs
GROUP BY region
ORDER BY requests DESC;`,

  lakehouse: `SELECT
    model_name,
    provider,
    round(avg(latency_ms), 2) AS avg_latency_ms,
    round(sum(cost_usd), 3) AS total_cost_usd
FROM ai_gateway_logs
GROUP BY model_name, provider
ORDER BY total_cost_usd DESC;`,

  inventory: `SELECT
    provider,
    model_name,
    status_code,
    count(*) AS failed_requests
FROM ai_gateway_logs
WHERE status_code != 200
GROUP BY provider, model_name, status_code
ORDER BY failed_requests DESC;`,
};

function normalizeEngineId(engine) {
  const name = (engine?.id || engine?.name || "clickhouse").toLowerCase();

  if (name.includes("clickhouse")) return "clickhouse";
  if (name.includes("snowflake")) return "snowflake";
  if (name.includes("databricks")) return "databricks";
  if (name.includes("bigquery")) return "bigquery";
  if (name.includes("trino")) return "trino";
  if (name.includes("exasol")) return "exasol";

  return "clickhouse";
}

export default function AISQLLab() {
  const { engines, activeEngine, setActiveEngine } = useLab();

  const [question, setQuestion] = useState(suggestedQuestions[0]);
  const [generatedSql, setGeneratedSql] = useState(generatedQueries.revenue);

  const [queryResults, setQueryResults] = useState({
    columns: [],
    rows: [],
  });

  const [runtime, setRuntime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function resetResults() {
    setQueryResults({
      columns: [],
      rows: [],
    });
    setRuntime(null);
    setError(null);
  }

  function generateSQL(text) {
    const lower = text.toLowerCase();

    setQuestion(text);
    resetResults();

    if (lower.includes("region") || lower.includes("traffic") || lower.includes("latency")) {
      setGeneratedSql(generatedQueries.latency);
    } else if (
      lower.includes("expensive") ||
      lower.includes("model") ||
      lower.includes("cost")
    ) {
      setGeneratedSql(generatedQueries.lakehouse);
    } else if (
      lower.includes("failed") ||
      lower.includes("error") ||
      lower.includes("status")
    ) {
      setGeneratedSql(generatedQueries.inventory);
    } else {
      setGeneratedSql(generatedQueries.revenue);
    }
  }

  async function executeQuery() {
    try {
      setLoading(true);
      setError(null);
      setQueryResults({
        columns: [],
        rows: [],
      });
      setRuntime(null);

      const engineId = normalizeEngineId(activeEngine);

      const response = await runQuery({
        engine: engineId,
        sql: generatedSql,
        limit: 20,
      });

      console.log("BACKEND RESPONSE:", response);

      if (!response.success) {
        throw new Error(response.message || "Query failed");
      }

      setQueryResults({
        columns: response.columns || [],
        rows: response.rows || [],
      });

      setRuntime(response.runtime_ms || 0);
    } catch (err) {
      setError(err.message || "Query execution failed");
    } finally {
      setLoading(false);
    }
  }

  const activeEngineName = activeEngine?.name || "ClickHouse";

  const aiNarrative = useMemo(() => {
    return `The AI selected ${activeEngineName} as the analytical execution engine for this workload. The query pattern focuses on AI gateway observability, provider latency, token volume, and cost analytics across modern AI workloads.`;
  }, [activeEngineName]);

  return (
    <div className="space-y-4">
      <PageHeader
        badge="AI + SQL LAB"
        title="AI-Native SQL Intelligence Workspace"
        description="Convert business questions into SQL, execute them through FastAPI adapters, compare analytical engines, and explain query behavior."
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
                    onClick={() => {
                      setActiveEngine(engine);
                      resetResults();
                    }}
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
                      {engine.role || engine.status || "Analytical Engine"}
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
                  Aggregation-heavy AI observability workload with latency,
                  token volume, provider, and cost dimensions.
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
                  Route the query through the active database adapter and return
                  a consistent result contract: columns, rows, runtime, and
                  execution status.
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
            ) : queryResults.rows.length === 0 ? (
              <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-[12px] text-slate-500">
                No rows returned yet. Click Run Query to execute through FastAPI.
              </div>
            ) : (
              <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-[12px]">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      {queryResults.columns.map((column) => (
                        <th key={column} className="px-3 py-2 font-semibold">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {queryResults.rows.map((row, index) => (
                      <tr key={index} className="hover:bg-slate-50">
                        {row.map((value, idx) => (
                          <td key={idx} className="px-3 py-2 text-slate-700">
                            {typeof value === "number"
                              ? Number(value).toLocaleString()
                              : String(value)}
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
                ["Dataset", "AI Gateway Logs"],
                ["Rows", "Live / demo scale"],
                ["Format", "Analytical table"],
                ["Storage", "Cloud database"],
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
                ["Routing", activeEngineName],
                ["Workload", "AI observability analytics"],
                ["Execution", "FastAPI adapter"],
                ["Result contract", "Dynamic columns + rows"],
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
                ["ClickHouse", runtime !== null && activeEngineName === "ClickHouse" ? `${runtime} ms` : "Live adapter"],
                ["Snowflake", "Live adapter"],
                ["Databricks", "Live adapter"],
                ["BigQuery", "Live adapter"],
                ["Trino", "Live adapter"],
                ["Exasol", "Live adapter"],
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