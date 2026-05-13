export default function PageHeader({ badge, title, description, action }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          {badge && (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-700">
              {badge}
            </div>
          )}

          <h1 className="mt-3 text-[28px] font-semibold tracking-normal text-slate-950">
            {title}
          </h1>

          {description && (
            <p className="mt-2 max-w-3xl text-[13px] leading-6 text-slate-500">
              {description}
            </p>
          )}
        </div>

        {action}
      </div>
    </section>
  );
}