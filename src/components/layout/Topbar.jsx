import { Bell, Search, Server, Sparkles } from "lucide-react";
import { useLab } from "../../context/LabContext";

export default function Topbar() {
  const { datasets, activeDataset, setActiveDataset, activeEngine } = useLab();

  return (
    <header className="mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 text-white shadow-sm">
          <Sparkles size={17} />
        </div>

        <div>
          <div className="text-[14px] font-semibold text-slate-900">
            NexusIQ Labs Workspace
          </div>
          <div className="text-[11px] font-normal text-slate-400">
            Active engine: {activeEngine.name}
          </div>
        </div>
      </div>

      <div className="hidden min-w-[360px] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 lg:flex">
        <Search size={14} className="text-slate-400" />
        <input
          placeholder="Search datasets, benchmarks, architectures..."
          className="w-full bg-transparent text-[12px] outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center gap-2">
        <select
          value={activeDataset.name}
          onChange={(e) =>
            setActiveDataset(datasets.find((d) => d.name === e.target.value))
          }
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[12px] font-medium text-slate-700 outline-none"
        >
          {datasets.map((dataset) => (
            <option key={dataset.name}>{dataset.name}</option>
          ))}
        </select>

        <div className="hidden items-center gap-2 rounded-xl bg-violet-50 px-3 py-2 text-[12px] font-medium text-violet-700 md:flex">
          <Server size={14} />
          {activeEngine.name}
        </div>

        <button className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500">
          <Bell size={15} />
        </button>
      </div>
    </header>
  );
}
