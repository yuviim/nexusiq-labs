import { NavLink } from "react-router-dom";
import {
  BarChart3,
  BrainCircuit,
  Database,
  GitCompare,
  Layers3,
  ShieldCheck,
  Sparkles,
  FlaskConical,
  Clapperboard,
  Settings,
  Zap,
} from "lucide-react";


function SidebarItem({ icon: Icon, label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] transition ${
          isActive
            ? "bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-md shadow-violet-200"
            : "text-slate-600 hover:bg-slate-100"
        }`
      }
    >
      <Icon size={15} />
      <span className="font-semibold">{label}</span>
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden w-60 border-r border-slate-200 bg-white px-4 py-5 lg:block">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 text-white shadow-md shadow-violet-200">
          <Sparkles size={18} />
        </div>
        <div>
          <div className="text-[15px] font-semibold tracking-normal">NexusIQ Labs</div>
          <div className="text-[11px] font-medium text-slate-400">Exasol Testing Hub</div>
        </div>
      </div>

      <nav className="mt-7 space-y-1.5">
        <SidebarItem icon={BarChart3} label="Dashboard" to="/dashboard" />
        <SidebarItem icon={GitCompare} label="Benchmark Studio" to="/benchmark-studio" />
        <SidebarItem icon={Layers3} label="Architecture Studio" to="/architecture-studio" />
        <SidebarItem icon={Database} label="Datasets" to="/datasets" />
        <SidebarItem icon={BrainCircuit} label="AI + SQL Lab" to="/ai-sql-lab" />
        <SidebarItem icon={FlaskConical} label="Feature Lab" to="/feature-lab" />
        <SidebarItem icon={Clapperboard} label="Demo Factory" to="/demo-factory" />
        <SidebarItem icon={ShieldCheck} label="Governance" to="/governance" />
        <SidebarItem icon={Settings} label="Settings" to="/settings-connections" />
      </nav>

      <div className="mt-7 rounded-2xl bg-gradient-to-br from-slate-950 to-violet-950 p-3.5 text-white">
        <div className="flex items-center gap-2 text-[12px] font-semibold">
          <Zap size={14} /> Know Exasol Series
        </div>
        <p className="mt-2.5 text-[12px] leading-5 text-violet-100">
          Convert every experiment into proof, benchmark and product narrative.
        </p>
      </div>
    </aside>
  );
}