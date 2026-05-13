export default function SectionCard({
  title,
  description,
  action,
  children,
  className = "",
}) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}
    >
      {(title || description || action) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && (
              <h2 className="text-[15px] font-semibold text-slate-950">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-1 text-[12px] leading-5 text-slate-500">
                {description}
              </p>
            )}
          </div>

          {action}
        </div>
      )}

      {children}
    </section>
  );
}