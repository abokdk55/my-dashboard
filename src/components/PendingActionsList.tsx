import Link from "next/link";
import type { PendingAction, Priority } from "@/lib/dashboard-data";

const accentBorder: Record<Priority, string> = {
  상: "border-l-rose-400",
  중: "border-l-amber-400",
  하: "border-l-slate-300",
};

const accentDot: Record<Priority, string> = {
  상: "bg-rose-500",
  중: "bg-amber-500",
  하: "bg-slate-400",
};

function groupByCategory(actions: PendingAction[]) {
  const groups: { name: string; items: PendingAction[] }[] = [];
  for (const action of actions) {
    let group = groups.find((g) => g.name === action.groupName);
    if (!group) {
      group = { name: action.groupName, items: [] };
      groups.push(group);
    }
    group.items.push(action);
  }
  return groups;
}

export default function PendingActionsList({ actions }: { actions: PendingAction[] }) {
  const groups = groupByCategory(actions);

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-medium text-slate-700">앞으로 해야 할 일</p>
        <span className="text-xs text-slate-400">{actions.length}개 · 우선순위 순</span>
      </div>

      {actions.length === 0 ? (
        <p className="mt-4 text-sm text-slate-400">지금은 남은 할 일이 없어. 다 끝냈네!</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-3">
          {groups.map((group) => (
            <div key={group.name}>
              <div className="mb-2 flex items-center gap-2">
                <p className="text-xs font-semibold text-slate-500">{group.name}</p>
                <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                  {group.items.length}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {group.items.map((action) => (
                  <Link
                    key={action.id}
                    href={`/projects/${action.id}`}
                    className={`block rounded-lg border-l-4 bg-slate-50 px-3 py-2.5 transition-colors hover:bg-slate-100 ${accentBorder[action.priority]}`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${accentDot[action.priority]}`} />
                      <span className="text-sm font-medium text-slate-800">{action.name}</span>
                    </div>
                    <p className="mt-1 truncate text-xs text-slate-500">{action.nextAction}</p>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-indigo-400"
                        style={{ width: `${action.effectiveProgress}%` }}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
