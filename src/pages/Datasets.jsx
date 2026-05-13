import {
  Database,
  FileText,
  Layers3,
  Sparkles,
  Table2,
} from "lucide-react";

const datasets = [
  {
    name: "Retail Sales Lake",
    domain: "Retail Analytics",
    rows: "50M",
    format: "Parquet",
    storage: "S3 / ADLS",
    readiness: "Benchmark Ready",
  },
  {
    name: "ERP Orders",
    domain: "Finance / Operations",
    rows: "18M",
    format: "Relational",
    storage: "PostgreSQL",
    readiness: "Federation Ready",
  },
  {
    name: "CRM Customers",
    domain: "Customer 360",
    rows: "6M",
    format: "Relational",
    storage: "Snowflake",
    readiness: "AI Ready",
  },
  {
    name: "SharePoint Docs",
    domain: "Enterprise Knowledge",
    rows: "200K docs",
    format: "Documents",
    storage: "SharePoint",
    readiness: "RAG Ready",
  },
];

export default function Datasets() {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-700">
          <Database size={13} /> DATASETS
        </div>

        <h1 className="mt-3 text-[28px] font-semibold tracking-normal text-slate-950">
          Analytical Dataset Catalog
        </h1>

        <p className="mt-2 max-w-3xl text-[13px] leading-6 text-slate-500">
          Manage benchmark datasets, storage formats, federation targets and AI-ready
          semantic data assets used across NexusIQ Labs.
        </p>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[15px] font-semibold text-slate-950">
                Dataset inventory
              </h2>
              <p className="mt-1 text-[12px] text-slate-500">
                Central catalog for benchmark and AI workloads.
              </p>
            </div>

            <button className="rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2 text-[12px] font-semibold text-white">
              Register dataset
            </button>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {datasets.map((dataset) => (
              <div
                key={dataset.name}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-xl bg-violet-50 p-2 text-violet-700">
                    <Table2 size={16} />
                  </div>

                  <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-semibold text-violet-700">
                    {dataset.readiness}
                  </span>
                </div>

                <h3 className="mt-3 text-[15px] font-semibold text-slate-950">
                  {dataset.name}
                </h3>

                <p className="mt-1 text-[12px] text-slate-500">
                  {dataset.domain}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[
                    ["Rows", dataset.rows],
                    ["Format", dataset.format],
                    ["Storage", dataset.storage],
                    ["Use", dataset.readiness],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-slate-50 px-3 py-2">
                      <div className="text-[10px] font-medium text-slate-400">
                        {k}
                      </div>
                      <div className="mt-1 text-[12px] font-semibold text-slate-700">
                        {v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Layers3 size={16} className="text-violet-600" />
              <h2 className="text-[15px] font-semibold text-slate-950">
                Federation view
              </h2>
            </div>

            <div className="mt-4 space-y-3">
              {[
                "S3 / ADLS Parquet through Exasol Virtual Schemas",
                "PostgreSQL operational data through JDBC federation",
                "Snowflake customer data for comparison workloads",
                "SharePoint documents for RAG and AI context",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl bg-slate-50 px-3 py-3 text-[12px] font-medium leading-5 text-slate-600"
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
                AI dataset intelligence
              </h2>
            </div>

            <div className="mt-4 rounded-2xl bg-gradient-to-br from-slate-950 to-violet-950 p-4 text-white">
              <div className="text-[11px] font-semibold text-violet-100">
                Recommendation
              </div>

              <div className="mt-2 text-[13px] font-semibold leading-6">
                Retail Sales Lake is the best candidate for BI latency benchmarks,
                lakehouse acceleration and Exasol federation demos.
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-violet-600" />
              <h2 className="text-[15px] font-semibold text-slate-950">
                Benchmark readiness
              </h2>
            </div>

            <div className="mt-4 space-y-2">
              {[
                ["BI benchmarks", "Ready"],
                ["Federated SQL", "Ready"],
                ["AI + SQL", "Ready"],
                ["RAG workloads", "Partial"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"
                >
                  <span className="text-[12px] font-semibold text-slate-600">
                    {k}
                  </span>
                  <span className="text-[11px] font-semibold text-violet-700">
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}