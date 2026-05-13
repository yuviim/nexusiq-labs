import {
  Activity,
  FileCheck2,
  KeyRound,
  Lock,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";

const controls = [
  ["RBAC", "Role-based access for labs, datasets and engines", "Active"],
  ["Row-level security", "Restrict analytical results by user context", "Planned"],
  ["Audit trails", "Track prompts, SQL, engine route and result access", "Active"],
  ["Dataset ACLs", "Control visibility across federated sources", "Active"],
];

export default function Governance() {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-700">
          <ShieldCheck size={13} /> GOVERNANCE
        </div>

        <h1 className="mt-3 text-[28px] font-semibold tracking-normal text-slate-950">
          Enterprise AI Governance Layer
        </h1>

        <p className="mt-2 max-w-3xl text-[13px] leading-6 text-slate-500">
          Manage access controls, auditability, dataset security, query visibility and
          enterprise trust controls across NexusIQ Labs.
        </p>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[15px] font-semibold text-slate-950">
                Governance controls
              </h2>
              <p className="mt-1 text-[12px] text-slate-500">
                Security and trust controls for analytical AI workflows.
              </p>
            </div>

            <button className="rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2 text-[12px] font-semibold text-white">
              New policy
            </button>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {controls.map(([title, desc, status]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-xl bg-violet-50 p-2 text-violet-700">
                    <Lock size={16} />
                  </div>

                  <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-semibold text-violet-700">
                    {status}
                  </span>
                </div>

                <h3 className="mt-3 text-[15px] font-semibold text-slate-950">
                  {title}
                </h3>

                <p className="mt-2 text-[12px] leading-5 text-slate-500">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <UserCheck size={16} className="text-violet-600" />
              <h2 className="text-[15px] font-semibold text-slate-950">
                Identity context
              </h2>
            </div>

            <div className="mt-4 space-y-3">
              {[
                ["User", "yuvaraj.m"],
                ["Tenant", "Exasol Labs"],
                ["Role", "Platform Evangelist"],
                ["Access scope", "Benchmark + AI Labs"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-3"
                >
                  <span className="text-[11px] font-medium text-slate-400">
                    {k}
                  </span>
                  <span className="text-[12px] font-semibold text-slate-700">
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-violet-600" />
              <h2 className="text-[15px] font-semibold text-slate-950">
                Trust narrative
              </h2>
            </div>

            <div className="mt-4 rounded-2xl bg-gradient-to-br from-slate-950 to-violet-950 p-4 text-white">
              <div className="text-[11px] font-semibold text-violet-100">
                Enterprise AI Positioning
              </div>

              <div className="mt-2 text-[13px] font-semibold leading-6">
                “AI analytics becomes enterprise-ready only when every prompt,
                query, dataset and result is governed by identity-aware controls.”
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {[
          ["Access decisions", "1,248", KeyRound],
          ["Audited AI queries", "382", Activity],
          ["Policy violations", "03", FileCheck2],
        ].map(([title, value, Icon]) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <Icon size={17} className="text-violet-600" />
            <div className="mt-3 text-2xl font-semibold text-slate-950">
              {value}
            </div>
            <div className="text-[12px] font-semibold text-slate-500">
              {title}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}