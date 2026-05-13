import { useState } from "react";
import {
  BrainCircuit,
  Code2,
  Database,
  FileText,
  FlaskConical,
  Layers3,
  Play,
  Rocket,
  Sparkles,
  Zap,
} from "lucide-react";

const features = [
  {
    name: "Virtual Schemas",
    category: "Federation",
    status: "Ready",
    icon: Layers3,
    description:
      "Test external source federation across S3, Snowflake, PostgreSQL and lakehouse data.",
    useCase: "Query external data without copying everything into Exasol.",
  },
  {
    name: "AI + SQL UDFs",
    category: "AI inside SQL",
    status: "Prototype",
    icon: BrainCircuit,
    description:
      "Explore Python/Lua UDFs for sentiment, classification, enrichment and AI inference.",
    useCase: "Run AI-style logic closer to analytical data.",
  },
  {
    name: "Hot Data Materialization",
    category: "Performance",
    status: "Planned",
    icon: Zap,
    description:
      "Identify slow external workloads and selectively materialize hot datasets inside Exasol.",
    useCase: "Accelerate dashboards without moving the full lakehouse.",
  },
  {
    name: "MPP Query Behavior",
    category: "Engine internals",
    status: "Research",
    icon: Database,
    description:
      "Study how Exasol handles parallel execution, joins, aggregations and analytical workloads.",
    useCase: "Explain why Exasol feels fast for BI and analytical queries.",
  },
];

const experiments = [
  ["Virtual Schema over S3 Parquet", "Federation", "In progress"],
  ["Python UDF sentiment classification", "AI + SQL", "Draft"],
  ["Materialized hot table benchmark", "Performance", "Planned"],
  ["BI dashboard latency workload", "Benchmark", "Ready"],
];

const featureNarratives = [
  "Exasol can act as a federated analytical speed layer.",
  "Not every lakehouse workload needs full ingestion.",
  "UDFs make AI + SQL demos possible inside analytical workflows.",
  "Hot data materialization can turn slow repeated workloads into fast dashboard experiences.",
];

export default function FeatureLab() {
  const [selectedFeature, setSelectedFeature] = useState(features[0]);
  const [running, setRunning] = useState(false);

  function runExperiment() {
    setRunning(true);
    setTimeout(() => setRunning(false), 1200);
  }

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-700">
              <FlaskConical size={13} />
              FEATURE LAB
            </div>

            <h1 className="mt-3 text-[28px] font-semibold tracking-normal text-slate-950">
              Exasol Capability Testing Workspace
            </h1>

            <p className="mt-2 max-w-3xl text-[13px] leading-6 text-slate-500">
              Test Exasol features, create technical proof points, and convert
              product capabilities into demos, benchmarks and content narratives.
            </p>
          </div>

          <button
            onClick={runExperiment}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2 text-[12px] font-semibold text-white shadow-sm"
          >
            <Play size={14} />
            {running ? "Running..." : "Run experiment"}
          </button>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.8fr_1.4fr_0.9fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-[15px] font-semibold text-slate-950">
              Feature catalog
            </h2>

            <div className="mt-4 space-y-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                const active = selectedFeature.name === feature.name;

                return (
                  <button
                    key={feature.name}
                    onClick={() => setSelectedFeature(feature)}
                    className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                      active
                        ? "border-transparent bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-xl p-2 ${
                          active
                            ? "bg-white/20 text-white"
                            : "bg-violet-50 text-violet-700"
                        }`}
                      >
                        <Icon size={15} />
                      </div>

                      <div>
                        <div className="text-[12px] font-semibold">
                          {feature.name}
                        </div>
                        <div
                          className={`mt-0.5 text-[10px] ${
                            active ? "text-violet-100" : "text-slate-400"
                          }`}
                        >
                          {feature.category}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-[15px] font-semibold text-slate-950">
              Experiment queue
            </h2>

            <div className="mt-4 space-y-2">
              {experiments.map(([name, type, status]) => (
                <div
                  key={name}
                  className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[12px] font-semibold text-slate-800">
                        {name}
                      </div>
                      <div className="mt-1 text-[11px] text-slate-400">
                        {type}
                      </div>
                    </div>

                    <span className="rounded-full bg-violet-50 px-2 py-1 text-[10px] font-semibold text-violet-700">
                      {status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[18px] font-semibold text-slate-950">
                  {selectedFeature.name}
                </h2>

                <p className="mt-1 text-[12px] text-slate-500">
                  {selectedFeature.category} · {selectedFeature.status}
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-3 text-violet-700">
                <selectedFeature.icon size={20} />
              </div>
            </div>

            <p className="mt-5 text-[13px] leading-6 text-slate-600">
              {selectedFeature.description}
            </p>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Why this matters
              </div>

              <div className="mt-2 text-[13px] font-medium leading-6 text-slate-700">
                {selectedFeature.useCase}
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {["Design", "Test", "Narrate"].map((step, index) => (
                <div key={step} className="rounded-xl bg-slate-50 p-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-[11px] font-semibold text-violet-700">
                    {index + 1}
                  </div>

                  <div className="mt-3 text-[12px] font-semibold text-slate-800">
                    {step}
                  </div>

                  <div className="mt-1 text-[11px] leading-5 text-slate-400">
                    Convert capability into technical proof.
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Code2 size={16} className="text-violet-600" />
              <h2 className="text-[15px] font-semibold text-slate-950">
                Technical test plan
              </h2>
            </div>

            <pre className="mt-4 overflow-hidden rounded-2xl bg-slate-950 p-4 text-[12px] leading-6 text-violet-100">
{`-- Example feature validation query
SELECT
  workload_name,
  engine_name,
  runtime_seconds,
  data_movement_mb,
  acceleration_factor
FROM feature_experiments
WHERE feature_name = '${selectedFeature.name}'
ORDER BY runtime_seconds ASC;`}
            </pre>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Rocket size={16} className="text-violet-600" />
              <h2 className="text-[15px] font-semibold text-slate-950">
                Content angle
              </h2>
            </div>

            <div className="mt-4 rounded-2xl bg-gradient-to-br from-slate-950 to-violet-950 p-4 text-white">
              <div className="text-[11px] font-semibold text-violet-100">
                Demo narrative
              </div>

              <div className="mt-2 text-[13px] font-medium leading-6">
                “Feature testing becomes more valuable when every technical
                experiment is converted into a benchmark, architecture insight
                and product story.”
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-violet-600" />

              <h2 className="text-[15px] font-semibold text-slate-950">
                Narrative snippets
              </h2>
            </div>

            <div className="mt-4 space-y-2">
              {featureNarratives.map((item) => (
                <div
                  key={item}
                  className="rounded-xl bg-slate-50 px-3 py-3 text-[12px] leading-5 text-slate-600"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-violet-600" />

              <h2 className="text-[15px] font-semibold text-slate-950">
                Output assets
              </h2>
            </div>

            <div className="mt-4 grid gap-2">
              {[
                "LinkedIn carousel idea",
                "Medium article outline",
                "Demo script",
                "Benchmark screenshot",
                "Architecture proof point",
              ].map((asset) => (
                <button
                  key={asset}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-[12px] font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  {asset}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}