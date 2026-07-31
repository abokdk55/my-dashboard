import Link from "next/link";
import type { Priority } from "@/lib/dashboard-data";

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

export default function ProjectCard({
  id,
  name,
  priority,
  nextAction,
  progress,
  meta,
}: {
  id: string;
  name: string;
  priority: Priority;
  nextAction: string;
  progress: number;
  meta?: string;
}) {
  return (
    <Link
      href={`/projects/${id}`}
      className={`flex w-full flex-col rounded-lg border-l-4 bg-slate-50 px-3 py-3 shadow-sm ring-1 ring-slate-100 transition-colors hover:bg-slate-100 sm:w-64 ${accentBorder[priority]}`}
    >
      <div className="flex items-center gap-1.5">
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${accentDot[priority]}`} />
        <span className="text-sm font-medium text-slate-800">{name}</span>
      </div>
      {meta && <p className="mt-0.5 text-[11px] text-slate-400">{meta}</p>}
      <p className="mt-1.5 line-clamp-2 text-xs text-slate-500">{nextAction}</p>
      <div className="mt-2 flex items-center gap-2">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-indigo-400" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-[10px] font-medium text-slate-400">{progress}%</span>
      </div>
    </Link>
  );
}
