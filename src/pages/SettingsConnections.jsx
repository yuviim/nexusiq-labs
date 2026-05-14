import { useState } from "react";
import {
  Activity,
  CheckCircle2,
  Cloud,
  Database,
  KeyRound,
  Play,
  Save,
  Server,
  Settings,
  ShieldCheck,
  Snowflake,
  Workflow,
  Zap,
  XCircle,
} from "lucide-react";
import { useLab } from "../context/LabContext";
import { testConnection } from "../services/connectionApi";

const engines = [
  {
    id: "exasol",
    name: "Exasol",
    type: "MPP Analytics",
    status: "Ready",
    color: "violet",
    fields: ["host", "port", "user", "password", "schema"],
  },
  {
    id: "snowflake",
    name: "Snowflake",
    type: "Cloud Warehouse",
    status: "Configured",
    color: "sky",
    fields: [
      "account",
      "warehouse",
      "database",
      "schema",
      "role",
      "user",
      "password",
      "passcode",
      "authenticator",
    ],
  },
  {
    id: "clickhouse",
    name: "ClickHouse",
    type: "Realtime Analytics",
    status: "Configured",
    color: "yellow",
    fields: ["host", "port", "database", "user", "password"],
  },
  {
    id: "databricks",
    name: "Databricks",
    type: "Lakehouse SQL",
    status: "Not configured",
    color: "orange",
    fields: ["serverHostname", "httpPath", "catalog", "schema", "token"],
  },
  {
    id: "bigquery",
    name: "BigQuery",
    type: "Cloud Analytics",
    status: "Not configured",
    color: "blue",
    fields: ["projectId", "dataset", "serviceAccountJson"],
  },
  {
    id: "trino",
    name: "Trino",
    type: "Federated Query",
    status: "Not configured",
    color: "emerald",
    fields: ["host", "port", "catalog", "schema", "user", "password"],
  },
];

const defaultValues = {
  exasol: {
    host: "",
    port: "8563",
    user: "sys",
    password: "",
    schema: "",
  },
  snowflake: {
    account: "",
    warehouse: "",
    database: "",
    schema: "",
    role: "",
    user: "",
    password: "",
    passcode: "",
    authenticator: "snowflake",
  },
  clickhouse: {
    host: "",
    port: "8443",
    database: "",
    user: "default",
    password: "",
  },
  databricks: {
    serverHostname: "",
    httpPath: "",
    catalog: "",
    schema: "",
    token: "",
  },
  bigquery: {
    projectId: "",
    dataset: "",
    serviceAccountJson: "",
  },
  trino: {
    host: "",
    port: "443",
    catalog: "",
    schema: "",
    user: "",
    password: "",
  },
};

const preferences = [
  "Enable parallel benchmark execution",
  "Capture runtime metrics",
  "Capture row count and preview",
  "Allow federated query mode",
  "Enable result caching simulation",
  "Store benchmark history locally",
];

function EngineIcon({ engine }) {
  if (engine.id === "snowflake") return <Snowflake size={17} />;
  if (engine.id === "databricks") return <Workflow size={17} />;
  if (engine.id === "bigquery") return <Cloud size={17} />;
  if (engine.id === "trino") return <Server size={17} />;
  if (engine.id === "clickhouse") return <Zap size={17} />;
  return <Database size={17} />;
}

function FieldInput({ label, value, onChange, secret, engineId }) {
  if (engineId === "snowflake" && label === "authenticator") {
    return (
      <div>
        <label className="text-[11px] font-medium text-slate-500">
          authenticator
        </label>

        <select
          value={value || "snowflake"}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-[12px] text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white"
        >
          <option value="snowflake">Password</option>
          <option value="externalbrowser">External Browser / SSO / MFA</option>
        </select>
      </div>
    );
  }

  return (
    <div>
      <label className="text-[11px] font-medium text-slate-500">{label}</label>

      <input
        type={secret ? "password" : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter ${label}`}
        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-[12px] text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white"
      />
    </div>
  );
}

function buildConnectionPayload(engineId, values) {
  return {
    engine: engineId,
    config: {
      ...values,
      port: values.port ? Number(values.port) : undefined,
    },
  };
}

export default function SettingsConnections() {
  const { activeEngine, setActiveEngine } = useLab();

  const [selectedEngine, setSelectedEngine] = useState(engines[0]);
  const [connectionValues, setConnectionValues] = useState(defaultValues);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  function updateField(engineId, field, value) {
    setConnectionValues((prev) => ({
      ...prev,
      [engineId]: {
        ...prev[engineId],
        [field]: value,
      },
    }));
  }

  async function handleTestConnection() {
    setTesting(true);
    setTestResult(null);

    try {
      const selectedValues = connectionValues[selectedEngine.id] || {};
      const payload = buildConnectionPayload(selectedEngine.id, selectedValues);

      const result = await testConnection(payload);

      setTestResult({
        success: Boolean(result.success),
        message:
          result.message ||
          `${selectedEngine.name} connection test completed successfully.`,
        latency_ms: result.latency_ms || result.runtime_ms,
        engine: result.engine || selectedEngine.id,
      });
    } catch (error) {
      setTestResult({
        success: false,
        message:
          error.message ||
          `Unable to test ${selectedEngine.name} connection. Please check backend.`,
      });
    } finally {
      setTesting(false);
    }
  }

  function saveConnection() {
    setTestResult({
      success: true,
      saved: true,
      message: `${selectedEngine.name} connection settings saved locally in UI state.`,
    });
  }

  function activateEngine() {
    setActiveEngine({
      id: selectedEngine.id,
      name: selectedEngine.name,
      role: selectedEngine.type,
      config: connectionValues[selectedEngine.id] || {},
    });
  }

  const selectedValues = connectionValues[selectedEngine.id] || {};

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-700">
              <Settings size={13} />
              SETTINGS / CONNECTIONS
            </div>

            <h1 className="mt-3 text-[28px] font-semibold tracking-normal text-slate-950">
              Engine Connection Control Plane
            </h1>

            <p className="mt-2 max-w-3xl text-[13px] leading-6 text-slate-500">
              Configure real analytical engines for SQL execution, benchmarking,
              federation tests and cross-platform workload comparison.
            </p>
          </div>

          <button
            onClick={activateEngine}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2 text-[12px] font-semibold text-white shadow-sm"
          >
            <Activity size={14} />
            Activate {selectedEngine.name}
          </button>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.85fr_1.35fr_0.9fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-[15px] font-semibold text-slate-950">
              Database engines
            </h2>

            <p className="mt-1 text-[12px] text-slate-500">
              Select an engine to configure.
            </p>

            <div className="mt-4 space-y-2">
              {engines.map((engine) => {
                const active = selectedEngine.id === engine.id;

                return (
                  <button
                    key={engine.id}
                    onClick={() => {
                      setSelectedEngine(engine);
                      setTestResult(null);
                    }}
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
                        <EngineIcon engine={engine} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-[12px] font-semibold">
                          {engine.name}
                        </div>

                        <div
                          className={`mt-0.5 text-[10px] ${
                            active ? "text-violet-100" : "text-slate-400"
                          }`}
                        >
                          {engine.type}
                        </div>
                      </div>

                      {activeEngine?.name === engine.name && (
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                          Active
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-[15px] font-semibold text-slate-950">
              Active runtime engine
            </h2>

            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
              <div className="text-[11px] font-medium text-slate-400">
                Current engine
              </div>

              <div className="mt-1 text-[18px] font-semibold text-slate-950">
                {activeEngine?.name || "ClickHouse"}
              </div>

              <div className="mt-1 text-[12px] text-slate-500">
                {activeEngine?.role || "Realtime Analytics"}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-[18px] font-semibold text-slate-950">
                  {selectedEngine.name} connection
                </h2>

                <p className="mt-1 text-[12px] text-slate-500">
                  Configure connection details for {selectedEngine.type}.
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-3 text-violet-700">
                <EngineIcon engine={selectedEngine} />
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {selectedEngine.fields.map((field) => (
                <FieldInput
                  key={field}
                  label={field}
                  engineId={selectedEngine.id}
                  value={selectedValues[field] || ""}
                  secret={
                    field.toLowerCase().includes("password") ||
                    field.toLowerCase().includes("token") ||
                    field.toLowerCase().includes("secret") ||
                    field.toLowerCase().includes("json")
                  }
                  onChange={(value) =>
                    updateField(selectedEngine.id, field, value)
                  }
                />
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={handleTestConnection}
                disabled={testing}
                className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2 text-[12px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Play size={14} />
                {testing ? "Testing..." : "Test connection"}
              </button>

              <button
                onClick={saveConnection}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[12px] font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Save size={14} />
                Save connection
              </button>

              <button
                onClick={activateEngine}
                className="flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2 text-[12px] font-semibold text-violet-700 hover:bg-violet-100"
              >
                <CheckCircle2 size={14} />
                Set active
              </button>
            </div>

            {testResult && (
              <div
                className={`mt-4 rounded-xl px-3 py-3 text-[12px] font-medium ${
                  testResult.success
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  {testResult.success ? (
                    <CheckCircle2 size={15} />
                  ) : (
                    <XCircle size={15} />
                  )}

                  <span>
                    {testResult.success
                      ? testResult.saved
                        ? "Connection saved"
                        : "Connection successful"
                      : "Connection failed"}
                  </span>
                </div>

                <div className="mt-1 pl-6">{testResult.message}</div>

                {testResult.latency_ms !== undefined && (
                  <div className="mt-1 pl-6 text-[11px] opacity-80">
                    Latency: {testResult.latency_ms} ms
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <KeyRound size={16} className="text-violet-600" />

              <h2 className="text-[15px] font-semibold text-slate-950">
                Connection JSON preview
              </h2>
            </div>

            <pre className="mt-4 overflow-hidden rounded-2xl bg-slate-950 p-4 text-[12px] leading-6 text-violet-100">
              {JSON.stringify(
                {
                  engine: selectedEngine.id,
                  type: selectedEngine.type,
                  config: selectedValues,
                  apiPayload: buildConnectionPayload(
                    selectedEngine.id,
                    selectedValues
                  ),
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-violet-600" />

              <h2 className="text-[15px] font-semibold text-slate-950">
                Execution preferences
              </h2>
            </div>

            <div className="mt-4 space-y-2">
              {preferences.map((item, index) => (
                <label
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3"
                >
                  <input
                    type="checkbox"
                    defaultChecked={index < 3}
                    className="h-4 w-4 accent-violet-600"
                  />

                  <span className="text-[12px] font-medium text-slate-600">
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-[15px] font-semibold text-slate-950">
              Backend roadmap
            </h2>

            <div className="mt-4 space-y-3">
              {[
                ["Phase 1", "UI to /connections/test API"],
                ["Phase 2", "Real engine adapter validation"],
                ["Phase 3", "Secure credential storage"],
                ["Phase 4", "Real benchmark runner"],
                ["Phase 5", "Query history + metrics"],
              ].map(([phase, text]) => (
                <div
                  key={phase}
                  className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-3"
                >
                  <div className="text-[11px] font-semibold text-violet-700">
                    {phase}
                  </div>

                  <div className="mt-1 text-[12px] font-medium text-slate-700">
                    {text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-[15px] font-semibold text-slate-950">
              Adapter architecture
            </h2>

            <div className="mt-4 rounded-2xl bg-gradient-to-br from-slate-950 to-violet-950 p-4 text-white">
              <div className="text-[11px] font-semibold text-violet-100">
                Universal execution layer
              </div>

              <div className="mt-2 text-[13px] font-medium leading-6">
                React UI calls FastAPI, FastAPI validates the connection through
                engine adapters, and each adapter returns success, error message,
                and latency metrics.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}