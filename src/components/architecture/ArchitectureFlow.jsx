import { useEffect, useMemo, useRef, useState } from "react";
import {
  Background,
  Controls,
  Handle,
  Position,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

const modeConfig = {
  federation: {
    label: "Federation Flow",
    focus: "Shows external systems queried through a federated analytical layer.",
    runtime: "1.8s",
    movement: "Low",
    workload: "Federated SQL",
  },
  streaming: {
    label: "Streaming Flow",
    focus: "Shows event streams flowing into analytical acceleration.",
    runtime: "2.4s",
    movement: "Medium",
    workload: "Event Analytics",
  },
  lakehouse: {
    label: "Lakehouse Flow",
    focus: "Shows lakehouse storage and processing connected to Exasol.",
    runtime: "4.6s",
    movement: "Low",
    workload: "Parquet Analytics",
  },
  ai: {
    label: "AI Orchestration Flow",
    focus: "Shows AI agents generating SQL and routing analytical workloads.",
    runtime: "3.1s",
    movement: "Low",
    workload: "Text-to-SQL",
  },
  bi: {
    label: "BI & Applications Flow",
    focus: "Shows Exasol accelerating BI dashboards and application workloads.",
    runtime: "1.2s",
    movement: "Very Low",
    workload: "BI Dashboard",
  },
  rag: {
    label: "Enterprise RAG Flow",
    focus: "Shows governed document context connected with AI retrieval.",
    runtime: "3.8s",
    movement: "Controlled",
    workload: "RAG + SQL",
  },
  crossplatform: {
    label: "Cross-platform Flow",
    focus: "Shows Exasol, Snowflake and Databricks in one analytical landscape.",
    runtime: "5.2s",
    movement: "Mixed",
    workload: "Engine Compare",
  },
};

const nodeMeta = {
  sharepoint: {
    label: "SharePoint",
    type: "Docs",
    role: "Enterprise documents and RAG context.",
    primary: false,
  },
  s3: {
    label: "S3 / ADLS",
    type: "Lake",
    role: "Parquet and lakehouse storage.",
    primary: false,
  },
  kafka: {
    label: "Kafka",
    type: "Events",
    role: "Streaming and event feeds.",
    primary: false,
  },
  databricks: {
    label: "Databricks",
    type: "Lakehouse",
    role: "Engineering and ML workflows.",
    primary: false,
  },
  snowflake: {
    label: "Snowflake",
    type: "Warehouse",
    role: "Cloud warehouse comparison layer.",
    primary: false,
  },
  exasol: {
    label: "Exasol",
    type: "Speed Layer",
    role: "MPP analytical acceleration layer.",
    primary: true,
  },
  powerbi: {
    label: "Power BI",
    type: "BI",
    role: "Dashboard and reporting consumption.",
    primary: false,
  },
  aiagents: {
    label: "AI Agents",
    type: "AI",
    role: "Text-to-SQL and analytical agents.",
    primary: false,
  },
  apps: {
    label: "Applications",
    type: "Apps",
    role: "Embedded analytics and APIs.",
    primary: false,
  },
};

const basePositions = {
  sharepoint: { x: 40, y: 40 },
  s3: { x: 295, y: 40 },
  kafka: { x: 550, y: 40 },

  databricks: { x: 135, y: 190 },
  snowflake: { x: 455, y: 190 },

  exasol: { x: 295, y: 340 },

  powerbi: { x: 40, y: 510 },
  aiagents: { x: 295, y: 510 },
  apps: { x: 550, y: 510 },
};

const fullscreenPositions = {
  sharepoint: { x: 100, y: 70 },
  s3: { x: 420, y: 70 },
  kafka: { x: 740, y: 70 },

  databricks: { x: 250, y: 270 },
  snowflake: { x: 620, y: 270 },

  exasol: { x: 430, y: 470 },

  powerbi: { x: 130, y: 720 },
  aiagents: { x: 430, y: 720 },
  apps: { x: 730, y: 720 },
};

const baseEdges = [
  ["sharepoint", "exasol", "docs"],
  ["s3", "exasol", "parquet"],
  ["kafka", "exasol", "events"],
  ["databricks", "exasol", "lakehouse"],
  ["snowflake", "exasol", "warehouse"],
  ["exasol", "powerbi", "BI"],
  ["exasol", "aiagents", "AI + SQL"],
  ["exasol", "apps", "APIs"],
];

const replaySteps = {
  federation: [
    {
      label: "Discover external systems",
      nodes: ["sharepoint", "s3", "snowflake"],
      edges: [],
    },
    {
      label: "Federate query through Exasol",
      nodes: ["sharepoint", "s3", "snowflake", "exasol"],
      edges: ["sharepoint-exasol", "s3-exasol", "snowflake-exasol"],
    },
    {
      label: "Serve BI / AI consumers",
      nodes: ["exasol", "powerbi", "aiagents"],
      edges: ["exasol-powerbi", "exasol-aiagents"],
    },
  ],
  streaming: [
    {
      label: "Capture events",
      nodes: ["kafka"],
      edges: [],
    },
    {
      label: "Stream into analytical layer",
      nodes: ["kafka", "exasol"],
      edges: ["kafka-exasol"],
    },
    {
      label: "Expose real-time insights",
      nodes: ["exasol", "powerbi", "aiagents", "apps"],
      edges: ["exasol-powerbi", "exasol-aiagents", "exasol-apps"],
    },
  ],
  lakehouse: [
    {
      label: "Read lakehouse data",
      nodes: ["s3", "databricks"],
      edges: [],
    },
    {
      label: "Accelerate through Exasol",
      nodes: ["s3", "databricks", "exasol"],
      edges: ["s3-exasol", "databricks-exasol"],
    },
    {
      label: "Deliver analytics",
      nodes: ["exasol", "powerbi", "apps"],
      edges: ["exasol-powerbi", "exasol-apps"],
    },
  ],
  ai: [
    {
      label: "User asks analytical question",
      nodes: ["aiagents"],
      edges: [],
    },
    {
      label: "Generate SQL and route workload",
      nodes: ["aiagents", "exasol", "s3"],
      edges: ["s3-exasol", "exasol-aiagents"],
    },
    {
      label: "Return governed answer",
      nodes: ["exasol", "aiagents", "apps"],
      edges: ["exasol-aiagents", "exasol-apps"],
    },
  ],
  bi: [
    {
      label: "BI workload triggered",
      nodes: ["powerbi"],
      edges: [],
    },
    {
      label: "Query acceleration layer",
      nodes: ["powerbi", "exasol"],
      edges: ["exasol-powerbi"],
    },
    {
      label: "Compare analytical engines",
      nodes: ["exasol", "snowflake", "databricks", "powerbi"],
      edges: ["snowflake-exasol", "databricks-exasol", "exasol-powerbi"],
    },
  ],
  rag: [
    {
      label: "Retrieve governed documents",
      nodes: ["sharepoint"],
      edges: [],
    },
    {
      label: "Combine document context with SQL",
      nodes: ["sharepoint", "exasol", "aiagents"],
      edges: ["sharepoint-exasol", "exasol-aiagents"],
    },
    {
      label: "Generate trusted answer",
      nodes: ["aiagents", "apps"],
      edges: ["exasol-aiagents", "exasol-apps"],
    },
  ],
  crossplatform: [
    {
      label: "Select common workload",
      nodes: ["s3", "databricks", "snowflake"],
      edges: [],
    },
    {
      label: "Route comparison through Exasol",
      nodes: ["s3", "databricks", "snowflake", "exasol"],
      edges: ["s3-exasol", "databricks-exasol", "snowflake-exasol"],
    },
    {
      label: "Compare outputs and latency",
      nodes: ["exasol", "powerbi", "apps"],
      edges: ["exasol-powerbi", "exasol-apps"],
    },
  ],
};

function getModeFromTemplate(template) {
  if (template === "Lakehouse Federation") return "lakehouse";
  if (template === "BI Acceleration") return "bi";
  if (template === "AI + SQL Architecture") return "ai";
  if (template === "Enterprise RAG") return "rag";
  if (template === "Cross-platform Analytics") return "crossplatform";
  return "federation";
}

function getModeFromLayer(layer) {
  if (!layer) return null;
  if (layer === "Data Sources") return "federation";
  if (layer === "Streaming & Events") return "streaming";
  if (layer === "Lakehouse Storage") return "lakehouse";
  if (layer === "Federated Query") return "federation";
  if (layer === "AI Orchestration") return "ai";
  if (layer === "BI & Applications") return "bi";
  return null;
}

function getActiveNodes(mode) {
  if (mode === "streaming") {
    return ["kafka", "exasol", "powerbi", "aiagents", "apps"];
  }

  if (mode === "lakehouse") {
    return ["s3", "databricks", "exasol", "powerbi", "apps"];
  }

  if (mode === "bi") {
    return ["exasol", "powerbi", "apps", "snowflake", "databricks"];
  }

  if (mode === "ai") {
    return ["s3", "exasol", "aiagents", "apps"];
  }

  if (mode === "rag") {
    return ["sharepoint", "exasol", "aiagents", "apps"];
  }

  if (mode === "crossplatform") {
    return ["s3", "databricks", "snowflake", "exasol", "powerbi", "apps"];
  }

  return ["sharepoint", "s3", "snowflake", "exasol", "powerbi", "aiagents"];
}

function getVisibleNodes(mode) {
  if (mode === "streaming") {
    return ["kafka", "exasol", "powerbi", "aiagents", "apps"];
  }

  if (mode === "rag") {
    return ["sharepoint", "exasol", "aiagents", "apps"];
  }

  if (mode === "bi") {
    return ["databricks", "snowflake", "exasol", "powerbi", "apps"];
  }

  if (mode === "ai") {
    return ["s3", "exasol", "aiagents", "apps"];
  }

  if (mode === "lakehouse") {
    return ["s3", "databricks", "exasol", "powerbi", "apps"];
  }

  if (mode === "crossplatform") {
    return ["s3", "databricks", "snowflake", "exasol", "powerbi", "apps"];
  }

  return Object.keys(nodeMeta);
}

function ArchitectureNode({ data }) {
  const active = data.active;
  const primary = data.primary;
  const replayActive = data.replayActive;

  return (
    <div
      className={`min-w-[145px] rounded-xl border px-3 py-2 shadow-sm transition ${
        primary
          ? "border-violet-300 bg-gradient-to-r from-violet-500 to-indigo-500 text-white"
          : replayActive
          ? "border-emerald-300 bg-emerald-50 text-slate-900 ring-2 ring-emerald-100"
          : active
          ? "border-violet-200 bg-violet-50 text-slate-900"
          : "border-slate-200 bg-white text-slate-700"
      }`}
    >
      <Handle type="target" position={Position.Top} />

      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold">{data.label}</div>
          <div
            className={`mt-0.5 text-[9px] ${
              primary ? "text-violet-100" : "text-slate-400"
            }`}
          >
            {data.type}
          </div>
        </div>

        <div
          className={`h-2 w-2 rounded-full ${
            replayActive
              ? "bg-emerald-500"
              : primary
              ? "bg-white"
              : active
              ? "bg-violet-500"
              : "bg-slate-300"
          }`}
        />
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

const nodeTypes = {
  architectureNode: ArchitectureNode,
};

export default function ArchitectureFlow({ template, selectedLayer }) {
  const normalFlowRef = useRef(null);
  const fullscreenFlowRef = useRef(null);

  const [mode, setMode] = useState(getModeFromTemplate(template));
  const [selectedNode, setSelectedNode] = useState(nodeMeta.exasol);
  const [isReplaying, setIsReplaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const layerMode = getModeFromLayer(selectedLayer);
    const templateMode = getModeFromTemplate(template);
    const nextMode = layerMode || templateMode;

    setMode(nextMode);
    setSelectedNode(nodeMeta.exasol);
    setIsReplaying(false);
    setCurrentStep(0);
  }, [template, selectedLayer]);

  useEffect(() => {
    if (!isReplaying) return;

    const steps = replaySteps[mode] || [];

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(timer);
          setIsReplaying(false);
          return prev;
        }

        return prev + 1;
      });
    }, 1100);

    return () => clearInterval(timer);
  }, [isReplaying, mode]);

  const steps = replaySteps[mode] || [];
  const activeStep = steps[currentStep] || steps[0];

  const activeIds = getActiveNodes(mode);
  const visibleIds = getVisibleNodes(mode);

  const replayNodes = isReplaying || currentStep > 0 ? activeStep.nodes : [];
  const replayEdges = isReplaying || currentStep > 0 ? activeStep.edges : [];

  const nodes = useMemo(
    () =>
      visibleIds.map((id) => ({
        id,
        type: "architectureNode",
        position: basePositions[id],
        data: {
          ...nodeMeta[id],
          active: activeIds.includes(id),
          replayActive: replayNodes.includes(id),
        },
      })),
    [mode, currentStep, isReplaying]
  );

  const fullscreenNodes = useMemo(
    () =>
      visibleIds.map((id) => ({
        id,
        type: "architectureNode",
        position: fullscreenPositions[id],
        data: {
          ...nodeMeta[id],
          active: activeIds.includes(id),
          replayActive: replayNodes.includes(id),
        },
      })),
    [mode, currentStep, isReplaying]
  );

  const edges = useMemo(
    () =>
      baseEdges
        .filter(
          ([source, target]) =>
            visibleIds.includes(source) && visibleIds.includes(target)
        )
        .map(([source, target, label]) => {
          const edgeId = `${source}-${target}`;
          const flowActive =
            activeIds.includes(source) || activeIds.includes(target);
          const replayActive = replayEdges.includes(edgeId);

          return {
            id: edgeId,
            source,
            target,
            label,
            animated: replayActive || flowActive,
            type: "smoothstep",
            style: {
              stroke: replayActive
                ? "#10b981"
                : flowActive
                ? "#8b5cf6"
                : "#cbd5e1",
              strokeWidth: replayActive ? 3 : flowActive ? 2 : 1,
            },
            labelStyle: {
              fontSize: 9,
              fontWeight: 500,
              fill: "#475569",
            },
            labelBgStyle: {
              fill: "#ffffff",
              fillOpacity: 0.85,
            },
          };
        }),
    [mode, currentStep, isReplaying]
  );

  function startReplay() {
    setCurrentStep(0);
    setIsReplaying(true);
  }

  async function exportArchitecture() {
    const target = isFullscreen ? fullscreenFlowRef.current : normalFlowRef.current;

    if (!target) return;

    try {
      const dataUrl = await toPng(target, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#f8fafc",
      });

      saveAs(dataUrl, `${mode}-architecture.png`);
    } catch (error) {
      console.error("PNG export failed", error);
    }
  }

  function FlowCanvas({ fullscreen = false }) {
    return (
      <div
        ref={fullscreen ? fullscreenFlowRef : normalFlowRef}
        className={`overflow-hidden border border-slate-200 bg-slate-50 ${
          fullscreen
            ? "h-[calc(100vh-120px)] rounded-3xl shadow-sm"
            : "h-[620px] rounded-2xl"
        }`}
      >
        <ReactFlow
          nodes={fullscreen ? fullscreenNodes : nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          nodesDraggable
          nodesConnectable={false}
          elementsSelectable
          onNodeClick={(_, node) => setSelectedNode(node.data)}
        >
          <Background gap={18} size={1} />
          <Controls />
        </ReactFlow>
      </div>
    );
  }

  function RuntimePanel() {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="text-[10px] font-semibold text-violet-700">
          ACTIVE FLOW
        </div>

        <div className="mt-1 text-[14px] font-semibold text-slate-950">
          {modeConfig[mode].label}
        </div>

        <p className="mt-2 text-[11px] leading-5 text-slate-500">
          {modeConfig[mode].focus}
        </p>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-slate-50 p-2">
            <div className="text-[9px] text-slate-400">Runtime</div>
            <div className="text-[12px] font-semibold text-slate-800">
              {modeConfig[mode].runtime}
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-2">
            <div className="text-[9px] text-slate-400">Movement</div>
            <div className="text-[12px] font-semibold text-slate-800">
              {modeConfig[mode].movement}
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-2">
            <div className="text-[9px] text-slate-400">Workload</div>
            <div className="text-[12px] font-semibold text-slate-800">
              {modeConfig[mode].workload}
            </div>
          </div>
        </div>

        <button
          onClick={startReplay}
          className="mt-3 w-full rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-3 py-2 text-[12px] font-semibold text-white shadow-sm"
        >
          {isReplaying ? "Replaying..." : "Run Architecture Replay"}
        </button>

        <button
          onClick={() => setIsFullscreen(true)}
          className="mt-2 w-full rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-[12px] font-semibold text-violet-700 transition hover:bg-violet-100"
        >
          Expand Canvas
        </button>

        <button
          onClick={exportArchitecture}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-[12px] font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Export PNG
        </button>
      </div>
    );
  }

  function TimelinePanel() {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="text-[10px] font-semibold text-slate-400">
          TIMELINE
        </div>

        <div className="mt-3 space-y-2">
          {steps.map((step, index) => (
            <div
              key={step.label}
              className={`rounded-xl px-3 py-2 text-[11px] ${
                index === currentStep
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-50 text-slate-500"
              }`}
            >
              <span className="font-semibold">Step {index + 1}:</span>{" "}
              {step.label}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function SelectedPanel() {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="text-[10px] font-semibold text-slate-400">
          SELECTED
        </div>

        <div className="mt-1 text-[14px] font-semibold text-slate-950">
          {selectedNode.label}
        </div>

        <div className="mt-1 text-[11px] font-medium text-violet-700">
          {selectedNode.type}
        </div>

        <p className="mt-3 text-[11px] leading-5 text-slate-500">
          {selectedNode.role}
        </p>
      </div>
    );
  }

  return (
    <>
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-[#f7f8fd] p-5">
          <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div>
              <div className="text-[20px] font-semibold text-slate-950">
                Architecture Canvas
              </div>

              <div className="mt-1 text-[12px] text-slate-500">
                Template: {template}
                {selectedLayer ? ` · Layer: ${selectedLayer}` : ""} · Flow:{" "}
                {modeConfig[mode].label}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={startReplay}
                className="rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-3 py-2 text-[12px] font-semibold text-white"
              >
                {isReplaying ? "Replaying..." : "Run Replay"}
              </button>

              <button
                onClick={exportArchitecture}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[12px] font-semibold text-slate-700"
              >
                Export PNG
              </button>

              <button
                onClick={() => setIsFullscreen(false)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[12px] font-semibold text-slate-700"
              >
                Close
              </button>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[1fr_280px]">
            <FlowCanvas fullscreen />

            <div className="space-y-3">
              <RuntimePanel />
              <TimelinePanel />
              <SelectedPanel />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="grid gap-3 xl:grid-cols-[1fr_220px]">
          <FlowCanvas />

          <div className="space-y-3">
            <RuntimePanel />
            <TimelinePanel />
            <SelectedPanel />
          </div>
        </div>
      </div>
    </>
  );
}