import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell() {
  return (
    <div className="min-h-screen bg-[#f7f8fd] text-slate-950">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 px-4 py-4 lg:px-6">
          <Topbar />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
