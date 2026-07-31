import Link from "next/link";
import type { PendingAction } from "@/lib/dashboard-data";
import PriorityBadge from "@/components/PriorityBadge";

export default function PendingActionsList({ actions }: { actions: PendingAction[] }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <p className="text-sm font-medium text-slate-700">앞으로 해야 할 일 ({actions.length}개)</p>
      <p className="mt-1 text-xs text-slate-400">우선순위 순서대로 정리했어</p>

      <ul className="mt-4 flex flex-col gap-2">
        {actions.map((action) => (
          <li key={action.id}>
            <Link
              href={`/projects/${action.id}`}
              className="flex flex-col gap-1 rounded-lg bg-slate-50 px-3 py-2.5 hover:bg-slate-100 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
            >
              <div className="flex items-center gap-2">
                <PriorityBadge priority={action.priority} />
                <span className="text-sm font-medium text-slate-800">{action.name}</span>
                <span className="text-xs text-slate-400">· {action.groupName}</span>
              </div>
              <span className="text-xs text-slate-500 sm:text-right">{action.nextAction}</span>
            </Link>
          </li>
        ))}

        {actions.length === 0 && (
          <li className="text-sm text-slate-400">지금은 남은 할 일이 없어. 다 끝냈네!</li>
        )}
      </ul>
    </div>
  );
}
