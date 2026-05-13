export default function SQLResultsTable({
  engine,
  dataset,
  running,
  results,
}) {
  const columns = results?.columns || [];
  const rows = results?.rows || [];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-slate-950">
            Query results
          </h2>

          <p className="mt-1 text-[12px] text-slate-500">
            Backend execution results from FastAPI adapter layer
          </p>
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
          {running
            ? "Running..."
            : `Runtime: ${results?.runtime_ms || 0} ms`}
        </span>
      </div>

      <div className="mt-4 overflow-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-[12px]">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="whitespace-nowrap px-3 py-2 font-medium"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={running ? "opacity-40" : ""}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${rowIndex}-${cellIndex}`}
                      className="whitespace-nowrap px-3 py-2 text-slate-700"
                    >
                      {typeof cell === "number"
                        ? Number(cell).toLocaleString()
                        : String(cell)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length || 1}
                  className="px-3 py-6 text-center text-slate-400"
                >
                  {running
                    ? "Executing query..."
                    : "No rows returned yet. Click Run Query to execute through FastAPI."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}