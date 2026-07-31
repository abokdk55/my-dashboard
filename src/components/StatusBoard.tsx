import Link from "next/link";
import type { StatusColumn, StatusName, Priority } from "@/lib/dashboard-data";

const columnStyle: Record<StatusName, { header: string; dot: string }> = {
  운영중: { header: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  진행중: { header: "bg-indigo-50 text-indigo-700", dot: "bg-indigo-500" },
  계획단계: { header: "bg-slate-100 text-slate-600", dot: "bg-slate-400" },
};

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

export default function StatusBoard({ columns }: { columns: StatusColumn[] }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <p className="text-sm font-medium text-slate-700">사업 현황 보드</p>
      <p className="mt-1 text-xs text-slate-400">상태별로 모아봤어 · 색선은 우선순위</p>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {columns.map((column) => (
          <div key={column.status} className="rounded-lg bg-slate-50/60 p-3">
            <div
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${columnStyle[column.status].header}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${columnStyle[column.status].dot}`} />
              {column.status}
              <span className="text-[10px] font-normal opacity-70">{column.items.length}</span>
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {column.items.map((item) => (
                <Link
                  key={item.id}
                  href={`/projects/${item.id}`}
                  className={`block rounded-lg border-l-4 bg-white px-3 py-2.5 shadow-sm ring-1 ring-slate-100 transition-colors hover:bg-slate-50 ${accentBorder[item.priority]}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${accentDot[item.priority]}`} />
                    <span className="text-sm font-medium text-slate-800">{item.name}</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-slate-400">{item.groupName}</p>
                  <p className="mt-1.5 text-xs text-slate-500">{item.nextAction}</p>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-indigo-400"
                      style={{ width: `${item.effectiveProgress}%` }}
                    />
                  </div>
                </Link>
              ))}

              {column.items.length === 0 && (
                <p className="text-xs text-slate-400">해당 없음</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
