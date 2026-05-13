import { Link } from "react-router-dom";
import {
  BarChart3,
  BrainCircuit,
  Database,
  Factory,
  FlaskConical,
  GitCompare,
  Layers3,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    label: "Labs configured",
    value: "06",
    note: "Benchmark, Architecture, AI, Dataset, Feature and Demo labs",
    icon: FlaskConical,
  },
  {
    label: "Engines tracked",
    value: "04",
    note: "Exasol, Snowflake, Databricks, ClickHouse",
    icon: Database,
  },
  {
    label: "Workloads planned",
    value: "12",
    note: "BI, federation, lakehouse and AI scenarios",
    icon: TrendingUp,
  },
  {
    label: "Content assets",
    value: "18",
    note: "Posts, demos, diagrams and test notes",
    icon: BrainCircuit,
  },
];

const labs = [
  {
    title: "Benchmark Studio",
    description:
      "Compare analytical engines using workloads, runtime metrics and benchmark narratives.",
    path: "/benchmark-studio",
    icon: GitCompare,
    status: "Ready",
  },
  {
    title: "Architecture Studio",
    description:
      "Design federation, lakehouse, BI acceleration and AI-native architecture flows.",
    path: "/architecture-studio",
    icon: Layers3,
    status: "Live",
  },
  {
    title: "AI + SQL Lab",
    description:
      "Generate SQL, simulate query execution, and explain AI-native analytical routing.",
    path: "/ai-sql-lab",
    icon: BrainCircuit,
    status: "Ready",
  },
  {
    title: "Datasets",
    description:
      "Manage analytical datasets, federation targets and benchmark-ready data assets.",
    path: "/datasets",
    icon: Database,
    status: "Ready",
  },
  {
    title: "Feature Lab",
    description:
      "Test Exasol capabilities like Virtual Schemas, UDFs, MPP behavior and materialization.",
    path: "/feature-lab",
    icon: FlaskConical,
    status: "Planned",
  },
  {
    title: "Demo Factory",
    description:
      "Package experiments into LinkedIn posts, Medium narratives, demo scripts and screenshots.",
    path: "/demo-factory",
    icon: Factory,
    status: "Planned",
  },
];

const enginePulse = [
  {
    name: "Exasol",
    role: "Analytics speed layer",
    score: "92",
    trend: "+18%",
  },
  {
    name: "Snowflake",
    role: "Cloud warehouse",
    score: "78",
    trend: "+11%",
  },
  {
    name: "Databricks",
    role: "Lakehouse platform",
    score: "74",
    trend: "+9%",
  },
  {
    name: "ClickHouse",
    role: "Realtime analytics",
    score: "81",
    trend: "+14%",
  },
];

const workloads = [
  "BI dashboard latency benchmark",
  "Lakehouse federation with Parquet",
  "AI-generated SQL routing",
  "Cross-platform engine comparison",
];

function StatCard({ item }) {
  const Icon = item.icon;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="rounded-xl bg-violet-50 p-2 text-violet-700">
          <Icon size={16} />
        </div>

        <span className="rounded-full bg-violet-50 px-2 py-1 text-[10px] font-medium text-violet-700">
          Live
        </span>
      </div>

      <div className="mt-4 text-[28px] font-semibold text-slate-950">
        {item.value}
      </div>

      <div className="mt-1 text-[13px] font-medium text-slate-700">
        {item.label}
      </div>

      <p className="mt-2 text-[12px] leading-5 text-slate-400">
        {item.note}
      </p>
    </div>
  );
}

function LabCard({ lab }) {
  const Icon = lab.icon;

  return (
    <Link
      to={lab.path}
      className="group block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 p-3 text-white shadow-sm">
          <Icon size={18} />
        </div>

        <span className="rounded-full bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500 group-hover:bg-violet-50 group-hover:text-violet-700">
          {lab.status}
        </span>
      </div>

      <h3 className="mt-4 text-[16px] font-semibold text-slate-950">
        {lab.title}
      </h3>

      <p className="mt-2 text-[12px] leading-5 text-slate-500">
        {lab.description}
      </p>

      <div className="mt-4 text-[12px] font-medium text-violet-700">
        Open workspace →
      </div>
    </Link>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.5fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-[11px] font-semibold text-violet-700">
              <Sparkles size={13} />
              Analytical Engine Testing Hub
            </div>

            <h1 className="mt-4 max-w-4xl text-[34px] font-semibold leading-tight tracking-normal text-slate-950">
              Build, test and explain where Exasol fits in modern analytics.
            </h1>

            <p className="mt-4 max-w-4xl text-[14px] leading-7 text-slate-500">
              A frontend-first lab workspace for benchmarks, architecture patterns,
              demo creation, feature testing and engine comparison across Exasol,
              Snowflake, Databricks and ClickHouse.
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-violet-500 via-indigo-500 to-sky-500 p-5 text-white shadow-sm">
            <div className="text-[12px] font-medium text-violet-100">
              Primary focus
            </div>

            <div className="mt-3 text-[24px] font-semibold leading-tight">
              Exasol as Analytics Speed Layer
            </div>

            <div className="mt-5 rounded-2xl bg-white/15 p-4 text-[13px] leading-6 text-white">
              Federation + BI acceleration + lakehouse query + AI-in-SQL narratives.
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.25fr_0.85fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-[20px] font-semibold text-slate-950">
                Labs workspace
              </h2>

              <p className="mt-1 text-[13px] text-slate-500">
                Choose a lab to start a technical experiment or content workflow.
              </p>
            </div>

            <Link
              to="/benchmark-studio"
              className="rounded-xl bg-slate-950 px-4 py-2 text-[12px] font-semibold text-white shadow-sm"
            >
              New test
            </Link>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {labs.map((lab) => (
              <LabCard key={lab.title} lab={lab} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <BarChart3 size={17} className="text-violet-600" />

              <h2 className="text-[18px] font-semibold text-slate-950">
                Engine comparison pulse
              </h2>
            </div>

            <p className="mt-1 text-[13px] text-slate-500">
              A content-friendly view of platform positioning.
            </p>

            <div className="mt-5 space-y-4">
              {enginePulse.map((engine) => (
                <Link
                  key={engine.name}
                  to="/benchmark-studio"
                  className="block rounded-xl transition hover:bg-slate-50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[13px] font-semibold text-slate-900">
                        {engine.name}
                      </div>

                      <div className="text-[12px] text-slate-400">
                        {engine.role}
                      </div>
                    </div>

                    <div className="text-[12px] font-semibold text-emerald-600">
                      {engine.trend}
                    </div>
                  </div>

                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                      style={{ width: `${engine.score}%` }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck size={17} className="text-violet-600" />

              <h2 className="text-[18px] font-semibold text-slate-950">
                Next workloads
              </h2>
            </div>

            <div className="mt-5 space-y-3">
              {workloads.map((item) => (
                <Link
                  key={item}
                  to="/benchmark-studio"
                  className="block rounded-xl bg-slate-50 px-3 py-3 text-[12px] font-medium text-slate-600 transition hover:bg-violet-50 hover:text-violet-700"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}