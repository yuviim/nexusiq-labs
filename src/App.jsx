import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LabProvider } from "./context/LabContext";

import AppShell from "./components/layout/AppShell";

import Dashboard from "./pages/Dashboard";
import BenchmarkStudio from "./pages/BenchmarkStudio";
import ArchitectureStudio from "./pages/ArchitectureStudio";
import AISQLLab from "./pages/AISQLLab";
import Datasets from "./pages/Datasets";
import Governance from "./pages/Governance";
import FeatureLab from "./pages/FeatureLab";
import DemoFactory from "./pages/DemoFactory";
import SettingsConnections from "./pages/SettingsConnections";

export default function App() {
  return (
    <LabProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<Navigate to="/dashboard" replace />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="benchmark-studio" element={<BenchmarkStudio />} />
            <Route path="architecture-studio" element={<ArchitectureStudio />} />
            <Route path="ai-sql-lab" element={<AISQLLab />} />
            <Route path="datasets" element={<Datasets />} />
            <Route path="feature-lab" element={<FeatureLab />} />
            <Route path="demo-factory" element={<DemoFactory />} />
            <Route path="governance" element={<Governance />} />
            <Route path="settings-connections" element={<SettingsConnections />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </LabProvider>
  );
}
