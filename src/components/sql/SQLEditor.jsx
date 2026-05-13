import Editor from "@monaco-editor/react";

export default function SQLEditor({ value, onChange }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
      <Editor
        height="280px"
        defaultLanguage="sql"
        value={value}
        onChange={(value) => onChange(value || "")}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 12,
          lineHeight: 22,
          wordWrap: "on",
          scrollBeyondLastLine: false,
          padding: { top: 14, bottom: 14 },
        }}
      />
    </div>
  );
}
