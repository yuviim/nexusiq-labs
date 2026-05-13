import { useState } from "react";
import {
  BrainCircuit,
  Boxes,
  Database,
  FileStack,
  Globe,
  Layers3,
  Network,
  Sparkles,
  Workflow,
} from "lucide-react";

import ArchitectureFlow from "../components/architecture/ArchitectureFlow";

const templates = [
  "Modern AI Data Platform",
  "Lakehouse Federation",
  "BI Acceleration",
  "Cross-platform Analytics",
  "AI + SQL Architecture",
  "Enterprise RAG",
];

const platformLayers = [
  "Data Sources",
  "Streaming & Events",
  "Lakehouse Storage",
  "Federated Query",
  "AI Orchestration",
  "BI & Applications",
];

const connectedSystems = [
  ["SharePoint", FileStack],
  ["S3 / ADLS", Database],
  ["Kafka", Workflow],
  ["Databricks", Layers3],
  ["Snowflake", Database],
  ["Power BI", Globe],
  ["AI Agents", BrainCircuit],
  ["Applications", Boxes],
];

const narratives = [
  "Federation instead of movement",
  "Exasol as speed layer",
  "AI + SQL orchestration",
  "Lakehouse acceleration",
  "Cross-platform analytics",
];

export default function ArchitectureStudio() {
  const [selectedTemplate, setSelectedTemplate] = useState(
    "Modern AI Data Platform"
  );

  const [selectedLayer, setSelectedLayer] = useState(null);

  function handleTemplateChange(value) {
    setSelectedTemplate(value);
    setSelectedLayer(null);
  }

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-700">
              <Network size={13} />
              ARCHITECTURE STUDIO
            </div>

            <h1 className="mt-3 text-[28px] font-semibold tracking-normal text-slate-950">
              Enterprise Architecture Workbench
            </h1>

            <p className="mt-2 max-w-3xl text-[13px] leading-6 text-slate-500">
              Design AI-native analytical architectures and position Exasol
              within federation, lakehouse and acceleration patterns.
            </p>
          </div>

          <button className="rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2 text-[12px] font-semibold text-white shadow-sm">
            Export Architecture
          </button>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.65fr_1.8fr_0.8fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-[15px] font-semibold text-slate-950">
              Architecture template
            </h2>

            <select
              value={selectedTemplate}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-[12px] font-medium text-slate-700 outline-none"
            >
              {templates.map((template) => (
                <option key={template}>{template}</option>
              ))}
            </select>

            <p className="mt-3 text-[12px] leading-5 text-slate-500">
              Choose a reference pattern to update the architecture canvas.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-[15px] font-semibold text-slate-950">
              Platform layers
            </h2>

            <div className="mt-4 space-y-2">
              {platformLayers.map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedLayer(item)}
                  className={`w-full rounded-xl px-3 py-2 text-left text-[12px] font-medium transition ${
                    selectedLayer === item
                      ? "bg-gradient-to-r from-violet-500 to-indigo-500 text-white"
                      : "bg-slate-50 text-slate-600 hover:bg-violet-50 hover:text-violet-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {selectedLayer && (
              <button
                onClick={() => setSelectedLayer(null)}
                className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-[12px] font-medium text-slate-600 hover:bg-slate-50"
              >
                Reset to template
              </button>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[15px] font-semibold text-slate-950">
                Architecture canvas
              </h2>

              <p className="mt-1 text-[12px] text-slate-500">
                Active template: {selectedTemplate}
                {selectedLayer ? ` · Layer: ${selectedLayer}` : ""}
              </p>
            </div>

            <div className="rounded-full bg-violet-50 px-3 py-1 text-[11px] font-semibold text-violet-700">
              REACT FLOW
            </div>
          </div>

          <div className="mt-4">
            <ArchitectureFlow
              template={selectedTemplate}
              selectedLayer={selectedLayer}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-violet-600" />

              <h2 className="text-[15px] font-semibold text-slate-950">
                Exasol positioning
              </h2>
            </div>

            <div className="mt-4 rounded-2xl bg-gradient-to-br from-slate-950 to-violet-950 p-4 text-white">
              <div className="text-[11px] font-semibold text-violet-100">
                Strategic role
              </div>

              <div className="mt-2 text-[13px] font-medium leading-6">
                Exasol acts as a high-performance analytical acceleration layer
                across lakehouse, warehouse and federated architectures.
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-[15px] font-semibold text-slate-950">
              Connected systems
            </h2>

            <div className="mt-4 space-y-3">
              {connectedSystems.map(([name, Icon]) => (
                <div
                  key={name}
                  className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3"
                >
                  <div className="rounded-xl bg-violet-50 p-2 text-violet-700">
                    <Icon size={15} />
                  </div>

                  <div>
                    <div className="text-[12px] font-semibold text-slate-800">
                      {name}
                    </div>

                    <div className="text-[11px] text-slate-400">
                      Architecture component
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-[15px] font-semibold text-slate-950">
              Architecture narratives
            </h2>

            <div className="mt-4 space-y-2">
              {narratives.map((item) => (
                <button
                  key={item}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-[12px] font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}