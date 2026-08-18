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
  linkUrl,
}: {
  id: string;
  name: string;
  priority: Priority;
  nextAction: string;
  progress: number;
  meta?: string;
  linkUrl?: string | null;
}) {
  return (
    <div
      className={`relative w-full rounded-lg border-l-4 bg-slate-50 shadow-sm ring-1 ring-slate-100 transition-colors hover:bg-slate-100 sm:w-64 ${accentBorder[priority]}`}
    >
      <Link href={`/projects/${id}`} className="flex flex-col px-3 py-3">
        <div className="flex items-center gap-1.5 pr-5">
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
      {linkUrl && (
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="바로가기"
          className="absolute top-2.5 right-2.5 text-slate-300 hover:text-indigo-500"
        >
          ↗
        </a>
      )}
    </div>
  );
}
