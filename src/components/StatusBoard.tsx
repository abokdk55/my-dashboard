import type { StatusColumn, StatusName } from "@/lib/dashboard-data";
import ProjectCard from "@/components/ProjectCard";

const statusStyle: Record<StatusName, string> = {
  운영중: "bg-emerald-50 text-emerald-700",
  진행중: "bg-indigo-50 text-indigo-700",
  계획단계: "bg-slate-100 text-slate-600",
};

const statusDot: Record<StatusName, string> = {
  운영중: "bg-emerald-500",
  진행중: "bg-indigo-500",
  계획단계: "bg-slate-400",
};

export default function StatusBoard({ columns }: { columns: StatusColumn[] }) {
  return (
    <div className="flex flex-col gap-4">
      {columns.map((column) => (
        <div
          key={column.status}
          className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
        >
          <div
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[column.status]}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${statusDot[column.status]}`} />
            {column.status}
            <span className="text-[10px] font-normal opacity-70">{column.items.length}개</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {column.items.map((item) => (
              <ProjectCard
                key={item.id}
                id={item.id}
                name={item.name}
                priority={item.priority}
                nextAction={item.nextAction}
                progress={item.effectiveProgress}
                meta={item.groupName}
              />
            ))}
            {column.items.length === 0 && (
              <p className="text-xs text-slate-400">해당 없음</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
