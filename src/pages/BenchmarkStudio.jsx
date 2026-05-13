import { useState } from "react";
import {
  Activity,
  BarChart3,
  Clock,
  Database,
  FileText,
  Gauge,
  GitCompare,
  Play,
  Server,
  Sparkles,
} from "lucide-react";
import RuntimeBarChart from "../components/charts/RuntimeBarChart";
import { useLab } from "../context/LabContext";

const benchmarks = [
  {
    title: "BI Dashboard Latency",
    workload: "Interactive analytics",
    dataset: "Retail Sales / 50M rows",
    runtime: "1.8s",
    gain: "3.2x faster",
  },
  {
    title: "Federated SQL Query",
    workload: "External source access",
    dataset: "S3 Parquet + CRM",
    runtime: "4.6s",
    gain: "Less movement",
  },
  {
    title: "Lakehouse Query",
    workload: "Parquet analytics",
    dataset: "Partitioned sales lake",
    runtime: "6.1s",
    gain: "Hot data candidate",
  },
];

const history = [
  ["BI latency test", "Exasol", "1.8s", "Completed"],
  ["S3 federation", "Exasol", "4.6s", "Completed"],
  ["Warehouse compare", "Snowflake", "7.2s", "Draft"],
  ["Lakehouse scan", "Databricks", "6.8s", "Review"],
];

function BenchmarkCard({ item }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="rounded-xl bg-violet-50 p-2 text-violet-700">
          <Gauge size={16} />
        </div>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
          {item.gain}
        </span>
      </div>

      <h3 className="mt-3 text-[15px] font-semibold text-slate-950">{item.title}</h3>
      <p className="mt-1 text-[12px] text-slate-500">{item.workload}</p>

      <div className="mt-4 rounded-xl bg-slate-50 p-3">
        <div className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
          Dataset
        </div>
        <div className="mt-1 text-[12px] font-medium text-slate-700">{item.dataset}</div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
            Runtime
          </div>
          <div className="text-2xl font-semibold text-slate-950">{item.runtime}</div>
        </div>

        <button className="rounded-xl bg-slate-950 px-3 py-2 text-[12px] font-medium text-white">
          View
        </button>
      </div>
    </div>
  );
}

export default function BenchmarkStudio() {
  const { engines, activeEngine, setActiveEngine, activeDataset } = useLab();
  const [running, setRunning] = useState(false);

  function runBenchmark() {
    setRunning(true);
    setTimeout(() => setRunning(false), 1500);
  }

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-700">
              <GitCompare size={13} /> BENCHMARK STUDIO
            </div>

            <h1 className="mt-3 text-[28px] font-semibold tracking-normal text-slate-950">
              Analytical Engine Benchmark Workspace
            </h1>

            <p className="mt-2 max-w-3xl text-[13px] leading-6 text-slate-500">
              Compare Exasol, Snowflake, Databricks and ClickHouse using repeatable
              workloads, datasets, runtime metrics and content-ready benchmark narratives.
            </p>
          </div>

          <button
            onClick={runBenchmark}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm"
          >
            <Play size={15} />
            {running ? "Running..." : "Run benchmark"}
          </button>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.8fr_1.4fr_0.9fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-[15px] font-semibold text-slate-950">Engine selector</h2>
            <p className="mt-1 text-[12px] text-slate-500">Choose engines for comparison.</p>

            <div className="mt-4 grid gap-2">
              {engines.map((engine) => (
                <button
                  key={engine.name}
                  onClick={() => setActiveEngine(engine)}
                  className={`rounded-xl border px-3 py-3 text-left transition ${
                    activeEngine.name === engine.name
                      ? "border-transparent bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="text-[12px] font-semibold">{engine.name}</div>
                  <div
                    className={`text-[10px] ${
                      activeEngine.name === engine.name ? "text-violet-100" : "text-slate-400"
                    }`}
                  >
                    {engine.role}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-[15px] font-semibold text-slate-950">Dataset profile</h2>

            <div className="mt-4 space-y-3">
              {[
                ["Dataset", activeDataset.name],
                ["Format", activeDataset.format],
                ["Rows", activeDataset.rows],
                ["Storage", activeDataset.storage],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-[11px] font-medium text-slate-400">{k}</span>
                  <span className="text-[12px] font-medium text-slate-700">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <Clock className="text-violet-600" size={17} />
              <div className="mt-3 text-2xl font-semibold">1.8s</div>
              <div className="text-[12px] font-medium text-slate-500">Best runtime</div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <Activity className="text-violet-600" size={17} />
              <div className="mt-3 text-2xl font-semibold">3.2x</div>
              <div className="text-[12px] font-medium text-slate-500">Acceleration</div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <Database className="text-violet-600" size={17} />
              <div className="mt-3 text-2xl font-semibold">06</div>
              <div className="text-[12px] font-medium text-slate-500">Engines tested</div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {benchmarks.map((item) => (
              <BenchmarkCard key={item.title} item={item} />
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[15px] font-semibold text-slate-950">Runtime comparison</h2>
                <p className="mt-1 text-[12px] text-slate-500">Cross-engine benchmark runtime.</p>
              </div>
              <BarChart3 size={18} className="text-violet-600" />
            </div>

            <div className="mt-4">
              <RuntimeBarChart />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-violet-600" />
              <h2 className="text-[15px] font-semibold text-slate-950">
                {activeEngine.name} insight
              </h2>
            </div>

            <p className="mt-3 text-[12px] leading-5 text-slate-500">
              {activeEngine.name} is selected as the active analytical engine for this
              benchmark workspace. Runtime, SQL routing and dataset context will use this
              engine state across NexusIQ Labs.
            </p>

            <div className="mt-4 rounded-xl bg-gradient-to-br from-slate-950 to-violet-950 p-3 text-white">
              <div className="text-[11px] font-semibold text-violet-100">Narrative angle</div>
              <div className="mt-1 text-[13px] font-medium leading-5">
                “Not every workload needs the same analytical engine. The right platform
                depends on workload, data shape and consumption pattern.”
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-violet-600" />
              <h2 className="text-[15px] font-semibold text-slate-950">SQL preview</h2>
            </div>

            <pre className="mt-3 overflow-hidden rounded-xl bg-slate-950 p-3 text-[11px] leading-5 text-violet-100">
{`SELECT
  region,
  product_category,
  SUM(revenue) AS revenue,
  AVG(order_value) AS avg_order
FROM retail_sales
WHERE order_date >= DATE '2025-01-01'
GROUP BY 1, 2
ORDER BY revenue DESC;`}
            </pre>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-[15px] font-semibold text-slate-950">Benchmark history</h2>

            <div className="mt-3 space-y-2">
              {history.map(([name, engine, time, status]) => (
                <div key={name} className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
                  <div className="flex items-center justify-between">
                    <div className="text-[12px] font-semibold text-slate-800">{name}</div>
                    <div className="text-[10px] font-semibold text-violet-700">{status}</div>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{engine}</span>
                    <span>{time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Server size={16} className="text-violet-600" />
          <h2 className="text-[15px] font-semibold text-slate-950">
            Benchmark execution pipeline
          </h2>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {["Select dataset", "Choose engines", "Run workload", "Compare metrics", "Generate narrative"].map(
            (step, index) => (
              <div key={step} className="rounded-xl bg-slate-50 p-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-[11px] font-semibold text-violet-700">
                  {index + 1}
                </div>
                <div className="mt-3 text-[12px] font-semibold text-slate-800">{step}</div>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}