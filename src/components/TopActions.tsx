import type { TopAction } from "@/lib/dashboard-data";

export default function TopActions({ actions }: { actions: TopAction[] }) {
  return (
    <div className="rounded-xl bg-indigo-600 p-5 shadow-sm sm:p-6">
      <p className="text-sm font-medium text-indigo-100">지금 당장 해야 할 일 Top 3</p>
      <ol className="mt-4 flex flex-col gap-4 sm:flex-row">
        {actions.map((action, index) => (
          <li
            key={action.id}
            className="flex-1 rounded-lg bg-indigo-500/40 p-4 ring-1 ring-inset ring-indigo-300/30"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-indigo-700">
                {index + 1}
              </span>
              <p className="text-sm font-semibold text-white">{action.title}</p>
            </div>
            <p className="mt-2 text-sm text-indigo-100">{action.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
