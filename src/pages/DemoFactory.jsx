import { useState } from "react";
import {
  Clapperboard,
  FileText,
  Mic,
  Play,
  Presentation,
  Rocket,
  Sparkles,
  WandSparkles,
} from "lucide-react";

const demoTypes = [
  {
    name: "LinkedIn Demo Clip",
    purpose: "Short technical storytelling post",
    output: "60–90 sec script",
  },
  {
    name: "Medium Article",
    purpose: "Long-form architecture narrative",
    output: "Article outline",
  },
  {
    name: "Leadership Demo",
    purpose: "Internal executive walkthrough",
    output: "Demo agenda",
  },
  {
    name: "Conference Talk",
    purpose: "External technical presentation",
    output: "Talk flow",
  },
];

const assets = [
  "Architecture PNG",
  "Benchmark screenshot",
  "SQL query example",
  "Runtime comparison",
  "Narrative angle",
  "Demo script",
];

const demoFlow = [
  "Hook",
  "Problem",
  "Architecture",
  "Experiment",
  "Result",
  "Exasol positioning",
  "Call to action",
];

export default function DemoFactory() {
  const [selectedDemo, setSelectedDemo] = useState(demoTypes[0]);
  const [generating, setGenerating] = useState(false);

  function generateDemo() {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 1200);
  }

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-700">
              <Clapperboard size={13} />
              DEMO FACTORY
            </div>

            <h1 className="mt-3 text-[28px] font-semibold tracking-normal text-slate-950">
              Content & Demo Packaging Studio
            </h1>

            <p className="mt-2 max-w-3xl text-[13px] leading-6 text-slate-500">
              Convert experiments, benchmark results, architecture diagrams and
              SQL workflows into polished demo narratives for LinkedIn, Medium,
              leadership updates and conference talks.
            </p>
          </div>

          <button
            onClick={generateDemo}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2 text-[12px] font-semibold text-white shadow-sm"
          >
            <WandSparkles size={14} />
            {generating ? "Generating..." : "Generate demo"}
          </button>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.8fr_1.4fr_0.9fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-[15px] font-semibold text-slate-950">
              Demo format
            </h2>

            <div className="mt-4 space-y-2">
              {demoTypes.map((demo) => {
                const active = selectedDemo.name === demo.name;

                return (
                  <button
                    key={demo.name}
                    onClick={() => setSelectedDemo(demo)}
                    className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                      active
                        ? "border-transparent bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="text-[12px] font-semibold">
                      {demo.name}
                    </div>

                    <div
                      className={`mt-1 text-[10px] ${
                        active ? "text-violet-100" : "text-slate-400"
                      }`}
                    >
                      {demo.purpose}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-[15px] font-semibold text-slate-950">
              Available assets
            </h2>

            <div className="mt-4 grid gap-2">
              {assets.map((asset) => (
                <div
                  key={asset}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"
                >
                  <span className="text-[12px] font-medium text-slate-600">
                    {asset}
                  </span>

                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    Ready
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[18px] font-semibold text-slate-950">
                  {selectedDemo.name}
                </h2>

                <p className="mt-1 text-[12px] text-slate-500">
                  Output: {selectedDemo.output}
                </p>
              </div>

              <div className="rounded-2xl bg-violet-50 p-3 text-violet-700">
                <Rocket size={20} />
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Demo objective
              </div>

              <div className="mt-2 text-[13px] font-medium leading-6 text-slate-700">
                Explain how Exasol fits as an analytical speed layer across
                federation, lakehouse, AI + SQL and BI acceleration patterns.
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-4">
              {["Architecture", "Benchmark", "SQL", "Narrative"].map(
                (item, index) => (
                  <div key={item} className="rounded-xl bg-slate-50 p-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-[11px] font-semibold text-violet-700">
                      {index + 1}
                    </div>

                    <div className="mt-3 text-[12px] font-semibold text-slate-800">
                      {item}
                    </div>

                    <div className="mt-1 text-[11px] leading-5 text-slate-400">
                      Demo building block
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Play size={16} className="text-violet-600" />
              <h2 className="text-[15px] font-semibold text-slate-950">
                Demo flow
              </h2>
            </div>

            <div className="mt-4 space-y-2">
              {demoFlow.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-[11px] font-semibold text-violet-700">
                    {index + 1}
                  </div>

                  <div>
                    <div className="text-[12px] font-semibold text-slate-800">
                      {step}
                    </div>

                    <div className="text-[11px] text-slate-400">
                      Build the storyline from technical evidence
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-violet-600" />

              <h2 className="text-[15px] font-semibold text-slate-950">
                Generated script preview
              </h2>
            </div>

            <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-white">
              <div className="text-[11px] font-semibold text-violet-100">
                Opening hook
              </div>

              <p className="mt-2 text-[13px] leading-6 text-violet-50">
                “Modern enterprises do not run on one data platform. They run
                on many. The real question is not which system replaces the
                others, but which layer can make analytics faster, simpler and
                easier to explain.”
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-violet-600" />

              <h2 className="text-[15px] font-semibold text-slate-950">
                LinkedIn packaging
              </h2>
            </div>

            <div className="mt-4 space-y-2">
              {[
                "Carousel title",
                "Opening post text",
                "Architecture screenshot",
                "Technical takeaway",
                "Comment CTA",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl bg-slate-50 px-3 py-3 text-[12px] font-medium text-slate-600"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Presentation size={16} className="text-violet-600" />

              <h2 className="text-[15px] font-semibold text-slate-950">
                Presentation assets
              </h2>
            </div>

            <div className="mt-4 rounded-2xl bg-gradient-to-br from-slate-950 to-violet-950 p-4 text-white">
              <div className="text-[11px] font-semibold text-violet-100">
                Slide narrative
              </div>

              <div className="mt-2 text-[13px] font-medium leading-6">
                “Exasol is best positioned as an acceleration and federation
                layer inside modern analytical architectures.”
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Mic size={16} className="text-violet-600" />

              <h2 className="text-[15px] font-semibold text-slate-950">
                Speaker notes
              </h2>
            </div>

            <div className="mt-4 space-y-2">
              {[
                "Start with data fragmentation",
                "Show architecture canvas",
                "Run benchmark simulation",
                "Explain Exasol fit",
                "Close with practical takeaway",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-100 bg-white px-3 py-2 text-[12px] font-medium text-slate-600"
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
                Export options
              </h2>
            </div>

            <div className="mt-4 grid gap-2">
              {[
                "Export script",
                "Export LinkedIn copy",
                "Export Medium outline",
                "Export slide notes",
              ].map((item) => (
                <button
                  key={item}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-[12px] font-medium text-slate-700 transition hover:bg-slate-50"
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